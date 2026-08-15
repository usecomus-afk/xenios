import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { experienceId, hotelId, roomNumber, guestName, guestPhone, guestEmail, guestCount, bookingDate, bookingTime, amount } = body;

    const confirmationCode = 'XEN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const bookingId = `book-${Date.now()}`;

    // Simulated SMS and Email dispatch
    console.log(`[SIMULATION SMS/EMAIL] Sent to provider for booking ${bookingId}: Please confirm at http://localhost:3000/confirm-booking/${bookingId}`);

    return NextResponse.json({
      success: true,
      bookingId,
      confirmationCode,
      message: "Ödeme başarıyla tamamlandı. Sağlayıcıya onay linki iletildi."
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
