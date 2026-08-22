import { NextResponse } from 'next/server';
import { InventoryEngine } from '@/services/inventoryEngine';
import { OctoAdapter } from '@/services/octoAdapter';
import { InventoryType, OctoChannelConfig } from '@/types/inventory';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      inventoryType = 'NATIVE_FIRESTORE',
      slotId,
      requestedSeats = 1,
      guestId = 'guest_anonymous',
      hotelId = 'hotel_default',
      hotelName = 'Xenios Partner Hotel',
      roomNumber = '101',
      guestName = 'Misafir',
      guestPhone = '+90 532 000 00 00',
      guestEmail = 'guest@usecomus.com',
      octoConfig,
      octoAvailabilityId
    } = body as {
      inventoryType: InventoryType;
      slotId?: string;
      requestedSeats: number;
      guestId?: string;
      hotelId?: string;
      hotelName?: string;
      roomNumber?: string;
      guestName?: string;
      guestPhone?: string;
      guestEmail?: string;
      octoConfig?: OctoChannelConfig;
      octoAvailabilityId?: string;
    };

    // ==============================================================
    // 1. Tip A: Dahili Envanter (Firebase Native ACID Lock)
    // ==============================================================
    if (inventoryType === 'NATIVE_FIRESTORE') {
      if (!slotId) {
        return NextResponse.json(
          { success: false, error: 'Dahili rezervasyon için slotId zorunludur.' },
          { status: 400 }
        );
      }

      const result = await InventoryEngine.reserveInventorySlot({
        slotId,
        requestedSeats,
        guestId,
        hotelId,
        roomNumber,
        guestName,
        guestPhone,
        guestEmail
      });

      return NextResponse.json({
        success: true,
        inventoryType: 'NATIVE_FIRESTORE',
        lockId: result.lockId,
        expiresAt: result.expiresAt,
        lockedSeats: result.lockedSeats,
        slot: result.slot,
        message: 'Koltuk 10 dakika boyunca adınıza kilitlendi. Ödeme adımına geçebilirsiniz.'
      });
    }

    // ==============================================================
    // 2. Tip B: Harici Envanter (OCTO Hold / Bókun & FareHarbor)
    // ==============================================================
    if (inventoryType === 'OCTO_API') {
      const config = octoConfig || {
        provider_platform: 'BOKUN',
        endpoint_url: 'https://api.bokun.io/octo/v1',
        api_key_secret_id: 'mock_key',
        product_id: 'prod_bosphorus_cruise',
        option_id: 'opt_standard'
      };

      const holdResult = await OctoAdapter.holdBooking(config, {
        productId: config.product_id,
        optionId: config.option_id,
        availabilityId: octoAvailabilityId || `octo_avail_${Date.now()}`,
        units: [{ id: 'adult', quantity: requestedSeats }],
        holdExpirationMinutes: 15
      });

      return NextResponse.json({
        success: true,
        inventoryType: 'OCTO_API',
        holdId: holdResult.id,
        reference: holdResult.reference,
        expiresAt: holdResult.utcHoldExpiration,
        message: 'Bókun/FareHarbor harici sisteminde 15 dakikalık geçici kilit oluşturuldu.'
      });
    }

    return NextResponse.json({ success: false, error: 'Bilinmeyen envanter tipi.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Koltuk kilitleme işlemi sırasında bir hata oluştu.'
      },
      { status: 409 } // 409 Conflict (Stok yetersiz veya yarış durumu)
    );
  }
}
