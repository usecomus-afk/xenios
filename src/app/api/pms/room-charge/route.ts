import { NextResponse } from 'next/server';
import { PmsAdapter, RoomChargePayload } from '@/services/pmsAdapter';

export async function POST(req: Request) {
  try {
    const payload = await req.json() as RoomChargePayload;

    if (!payload.hotelId || !payload.roomNumber || !payload.guestLastName || !payload.amount) {
      return NextResponse.json(
        { success: false, error: 'Eksik PMS parametreleri (hotelId, roomNumber, guestLastName, amount zorunludur).' },
        { status: 400 }
      );
    }

    // Ensure idempotency key exists
    if (!payload.idempotencyKey) {
      payload.idempotencyKey = `idemp_${payload.bookingId || Date.now()}_${payload.roomNumber}`;
    }

    const result = await PmsAdapter.postRoomCharge(payload);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[PMS ROOM CHARGE API ERROR]:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 422 });
  }
}
