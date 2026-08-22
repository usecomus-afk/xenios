import { NextResponse } from 'next/server';
import { NotificationDispatcher, UserDeviceDTO } from '@/services/notificationDispatcher';

export async function POST(req: Request) {
  try {
    const body = await req.json() as UserDeviceDTO;

    if (!body.deviceToken || !body.platform) {
      return NextResponse.json(
        { success: false, error: 'deviceToken ve platform parametreleri zorunludur.' },
        { status: 400 }
      );
    }

    const result = NotificationDispatcher.registerDevice({
      deviceToken: body.deviceToken,
      platform: body.platform,
      userId: body.userId,
      role: body.role || 'guest',
      hotelId: body.hotelId,
      roomNumber: body.roomNumber,
      phone: body.phone,
      lastActive: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Cihaz başarıyla FCM/APNs bildirim servisine kaydedildi.',
      totalRegisteredDevices: result.deviceCount
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const devices = NotificationDispatcher.getRegisteredDevices();
  return NextResponse.json({ success: true, count: devices.length, devices });
}
