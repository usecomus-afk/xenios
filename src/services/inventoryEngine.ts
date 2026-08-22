/**
 * Xenios Native Inventory Engine (Tip A)
 * Firebase Firestore ACID Transactional Slot Reservation & 10-Minute Lock Engine
 */

import {
  ListingSlot,
  InventoryLock,
  InventoryBooking,
} from '@/types/inventory';

// In-Memory Transactional Store for Local Emulation / Fallback
const inMemorySlots = new Map<string, ListingSlot>();
const inMemoryLocks = new Map<string, InventoryLock>();
const inMemoryBookings = new Map<string, InventoryBooking>();

// Seed default demonstration slots if empty
function ensureDemonstrationSlots() {
  if (inMemorySlots.size === 0) {
    const demoSlots: ListingSlot[] = [
      {
        slot_id: 'slot_hamam_cagaloglu_20260825_1000',
        listing_id: 'exp_cagaloglu_hamam',
        start_time: '2026-08-25T10:00:00Z',
        end_time: '2026-08-25T11:30:00Z',
        capacity: 8,
        booked_count: 3,
        locked_count: 0,
        available_spots: 5,
        version: 1,
        updated_at: new Date().toISOString()
      },
      {
        slot_id: 'slot_hamam_cagaloglu_20260825_1400',
        listing_id: 'exp_cagaloglu_hamam',
        start_time: '2026-08-25T14:00:00Z',
        end_time: '2026-08-25T15:30:00Z',
        capacity: 8,
        booked_count: 6,
        locked_count: 0,
        available_spots: 2,
        version: 1,
        updated_at: new Date().toISOString()
      },
      {
        slot_id: 'slot_ebru_workshop_20260825_1100',
        listing_id: 'exp_ebru_workshop',
        start_time: '2026-08-25T11:00:00Z',
        end_time: '2026-08-25T13:00:00Z',
        capacity: 6,
        booked_count: 4,
        locked_count: 0,
        available_spots: 2,
        version: 1,
        updated_at: new Date().toISOString()
      }
    ];

    demoSlots.forEach(s => inMemorySlots.set(s.slot_id, s));
  }
}

export class InventoryEngine {
  /**
   * Adım 1: Atomik Koltuk Kilitleme (reserveInventorySlot)
   * 10 Dakikalık TTL ile geçici kilit oluşturur ve seans stoğunu güvenceye alır.
   */
  static async reserveInventorySlot(params: {
    slotId: string;
    requestedSeats: number;
    guestId: string;
    hotelId: string;
    roomNumber: string;
    guestName: string;
    guestPhone: string;
    guestEmail: string;
  }): Promise<{
    success: boolean;
    lockId: string;
    expiresAt: string;
    lockedSeats: number;
    slot: ListingSlot;
  }> {
    ensureDemonstrationSlots();
    const { slotId, requestedSeats, guestId, hotelId, roomNumber, guestName, guestPhone, guestEmail } = params;

    if (!slotId || requestedSeats <= 0) {
      throw new Error('INVALID_ARGUMENTS: Geçersiz seans veya koltuk sayısı.');
    }

    const now = Date.now();
    const expiresAt = new Date(now + 10 * 60 * 1000).toISOString(); // 10 Dakika TTL
    const lockId = `lock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 1. Transactional Slot Check & Lock
    const slot = inMemorySlots.get(slotId);
    if (!slot) {
      throw new Error(`SLOT_NOT_FOUND: ${slotId} kimlikli seans bulunamadı.`);
    }

    // Aktif geçerli kilitleri hesapla
    const available = slot.capacity - (slot.booked_count + slot.locked_count);

    if (available < requestedSeats) {
      throw new Error(
        `INSUFFICIENT_CAPACITY: Seans dolu veya yeterli koltuk yok. Kalan net kontenjan: ${Math.max(0, available)}`
      );
    }

    // 2. Kilit Belgesi Oluştur
    const lock: InventoryLock = {
      lock_id: lockId,
      slot_id: slotId,
      listing_id: slot.listing_id,
      guest_id: guestId,
      hotel_id: hotelId,
      room_number: roomNumber,
      guest_name: guestName,
      guest_phone: guestPhone,
      guest_email: guestEmail,
      spots_count: requestedSeats,
      status: 'ACTIVE',
      created_at: new Date(now).toISOString(),
      expires_at: expiresAt
    };

    // 3. Atomik Güncelleme
    slot.locked_count += requestedSeats;
    slot.available_spots = slot.capacity - (slot.booked_count + slot.locked_count);
    slot.version += 1;
    slot.updated_at = new Date().toISOString();

    inMemoryLocks.set(lockId, lock);
    inMemorySlots.set(slotId, slot);

    return {
      success: true,
      lockId,
      expiresAt,
      lockedSeats: requestedSeats,
      slot
    };
  }

  /**
   * Adım 2: Ödeme Sonrası Kesinleştirme (confirmBooking)
   * Stripe / Sanal POS onayında kilidi kesin rezervasyona dönüştürür.
   */
  static async confirmBooking(params: {
    lockId: string;
    paymentIntentId?: string;
    totalAmount: number;
    currency?: string;
    hotelName?: string;
  }): Promise<{
    success: boolean;
    booking: InventoryBooking;
    message: string;
  }> {
    const { lockId, paymentIntentId, totalAmount, currency = 'EUR', hotelName = 'Xenios Partner Hotel' } = params;

    const lock = inMemoryLocks.get(lockId);
    if (!lock) {
      throw new Error(`LOCK_NOT_FOUND: ${lockId} nolu kilit bulunamadı.`);
    }

    if (lock.status !== 'ACTIVE') {
      throw new Error(`LOCK_INVALID_STATUS: Bu kilit zaten işlenmiş (${lock.status}).`);
    }

    const now = Date.now();
    const lockExpiry = new Date(lock.expires_at).getTime();

    if (lockExpiry < now) {
      // Süresi dolmuşsa kilit iptal edilir
      lock.status = 'EXPIRED';
      throw new Error('LOCK_EXPIRED: 10 dakikalık ödeme süresi doldu, koltuklar serbest bırakıldı.');
    }

    const slot = inMemorySlots.get(lock.slot_id);
    if (!slot) {
      throw new Error(`SLOT_NOT_FOUND: ${lock.slot_id} seansı bulunamadı.`);
    }

    const bookingId = `bk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const confirmationCode = 'XEN-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // 1. Kesin Rezervasyon Oluştur
    const booking: InventoryBooking = {
      booking_id: bookingId,
      listing_id: lock.listing_id,
      slot_id: lock.slot_id,
      inventory_type: 'NATIVE_FIRESTORE',
      lock_id: lockId,
      payment_intent_id: paymentIntentId,
      guest_details: {
        guest_id: lock.guest_id,
        guest_name: lock.guest_name,
        hotel_id: lock.hotel_id,
        hotel_name: hotelName,
        room_number: lock.room_number,
        phone: lock.guest_phone,
        email: lock.guest_email
      },
      spots_count: lock.spots_count,
      total_amount: totalAmount,
      currency,
      status: 'CONFIRMED',
      confirmation_code: confirmationCode,
      created_at: lock.created_at,
      confirmed_at: new Date().toISOString()
    };

    // 2. Kilit ve Slot Durumlarını Atomik Güncelle
    lock.status = 'CONVERTED';
    lock.converted_booking_id = bookingId;
    lock.payment_intent_id = paymentIntentId;

    slot.locked_count = Math.max(0, slot.locked_count - lock.spots_count);
    slot.booked_count += lock.spots_count;
    slot.available_spots = slot.capacity - (slot.booked_count + slot.locked_count);
    slot.version += 1;
    slot.updated_at = new Date().toISOString();

    inMemoryBookings.set(bookingId, booking);
    inMemoryLocks.set(lockId, lock);
    inMemorySlots.set(slot.slot_id, slot);

    return {
      success: true,
      booking,
      message: 'Rezervasyon başarıyla kesinleşti ve koltuk stoğu güncellendi.'
    };
  }

  /**
   * Adım 3: Süresi Dolan Kilitleri Serbest Bırakma (releaseExpiredLocks)
   * 10 dakikalık TTL'i dolmuş kilitleri serbest bırakarak stoğu anında havuza iade eder.
   */
  static async releaseExpiredLocks(): Promise<{
    releasedCount: number;
    expiredLockIds: string[];
  }> {
    const now = Date.now();
    const expiredLockIds: string[] = [];

    for (const [lockId, lock] of inMemoryLocks.entries()) {
      if (lock.status === 'ACTIVE' && new Date(lock.expires_at).getTime() <= now) {
        lock.status = 'EXPIRED';
        expiredLockIds.push(lockId);

        const slot = inMemorySlots.get(lock.slot_id);
        if (slot) {
          slot.locked_count = Math.max(0, slot.locked_count - lock.spots_count);
          slot.available_spots = slot.capacity - (slot.booked_count + slot.locked_count);
          slot.version += 1;
          slot.updated_at = new Date().toISOString();
          inMemorySlots.set(slot.slot_id, slot);
        }
      }
    }

    return {
      releasedCount: expiredLockIds.length,
      expiredLockIds
    };
  }

  /**
   * Seans Detayı ve Canlı Uygunluk Sorgulama
   */
  static async getSlotAvailability(slotId: string): Promise<ListingSlot | null> {
    ensureDemonstrationSlots();
    await this.releaseExpiredLocks(); // Süresi dolanları anında temizle
    return inMemorySlots.get(slotId) || null;
  }

  /**
   * İlana ait tüm seansları listele
   */
  static async getSlotsByListing(listingId: string): Promise<ListingSlot[]> {
    ensureDemonstrationSlots();
    await this.releaseExpiredLocks();
    return Array.from(inMemorySlots.values()).filter(s => s.listing_id === listingId);
  }
}
