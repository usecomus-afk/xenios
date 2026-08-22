import { NextResponse } from 'next/server';
import { WhatsAppService, WhatsAppBookingDetailsDTO } from '@/services/whatsappService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action = 'CONFIRMATION', phone, bookingDetails, location } = body as {
      action?: 'CONFIRMATION' | 'LOCATION_PIN';
      phone: string;
      bookingDetails?: WhatsAppBookingDetailsDTO;
      location?: {
        latitude: number;
        longitude: number;
        name: string;
        address?: string;
      };
    };

    if (!phone) {
      return NextResponse.json({ success: false, error: 'Telefon numarası zorunludur.' }, { status: 400 });
    }

    if (action === 'LOCATION_PIN' && location) {
      const res = await WhatsAppService.sendLocationPinWhatsApp(
        phone,
        location.latitude,
        location.longitude,
        location.name,
        location.address
      );
      return NextResponse.json(res);
    }

    if (!bookingDetails) {
      return NextResponse.json({ success: false, error: 'Rezervasyon detayları eksik.' }, { status: 400 });
    }

    const res = await WhatsAppService.sendBookingConfirmationWhatsApp(phone, bookingDetails);
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
