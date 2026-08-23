import { NextResponse } from 'next/server';
import { AestheticServiceEngine } from '@/services/aestheticService';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clinicId = searchParams.get('clinicId') || 'clinic_quartz';
    const serviceId = searchParams.get('serviceId') || 'srv_quartz_glow';
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    const slots = await AestheticServiceEngine.getClinicAvailableSlots(clinicId, serviceId, date);

    return NextResponse.json({
      success: true,
      clinicId,
      serviceId,
      date,
      slots
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
