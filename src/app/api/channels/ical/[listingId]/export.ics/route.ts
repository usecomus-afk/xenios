import { NextResponse } from 'next/server';
import { ICalSyncService } from '@/services/icalSyncService';

export async function GET(
  req: Request,
  props: { params: Promise<{ listingId: string }> }
) {
  try {
    const { listingId } = await props.params;

    // Örnek dolu seanslar (Gerçekte Firestore / Booking veritabanından çekilir)
    const sampleEvents = [
      {
        id: '1',
        title: 'Özel Yat Boğaz Turu',
        startTime: '2026-08-25T17:30:00Z',
        endTime: '2026-08-25T20:30:00Z',
        guestCount: 4,
        description: 'Xenios VIP Guest Booking'
      },
      {
        id: '2',
        title: 'Tarihi Hamam Paketi',
        startTime: '2026-08-26T11:00:00Z',
        endTime: '2026-08-26T13:00:00Z',
        guestCount: 2,
        description: 'Confirmed Reservation'
      }
    ];

    const icsContent = ICalSyncService.generateICalFeed({
      listingId,
      listingTitle: `Xenios Experience #${listingId}`,
      events: sampleEvents
    });

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="xenios-${listingId}.ics"`,
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
