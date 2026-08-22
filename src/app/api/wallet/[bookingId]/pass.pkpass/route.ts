import { NextResponse } from 'next/server';
import { PassKitService, PassTicketDataDTO } from '@/services/passKitService';

export async function GET(
  req: Request,
  props: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await props.params;

    // Örnek Bilet Verisi (Gerçekte Firestore / Booking üzerinden sorgulanır)
    const ticketData: PassTicketDataDTO = {
      bookingId,
      confirmationCode: `XEN-${bookingId.substring(0, 6).toUpperCase()}`,
      experienceTitle: 'Özel Yat ile Boğaz Turu & Akşam Yemeği',
      providerName: 'Mega Lüfer Yachts',
      guestName: 'Alex Mercer',
      guestCount: 2,
      bookingDate: '2026-08-25',
      bookingTime: '17:30',
      hotelName: 'Pera Palace Hotel',
      roomNumber: '304',
      amount: 130,
      currency: 'EUR',
      locationName: 'Karaköy Şehir Hatları İskelesi',
      latitude: 41.0232,
      longitude: 28.9752,
      voucherUrl: `https://xenios.usecomus.com/confirm-booking/${bookingId}`
    };

    const passBuffer = await PassKitService.generatePassKitBuffer(ticketData);

    return new NextResponse(passBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename="xenios-ticket-${bookingId}.pkpass"`,
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
