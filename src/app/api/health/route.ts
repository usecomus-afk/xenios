import { NextResponse } from 'next/server';
import { ObservabilityService } from '@/services/observabilityService';

export async function GET() {
  try {
    const healthReport = await ObservabilityService.checkSystemHealth();
    const httpStatus = healthReport.overall_status === 'DOWN' ? 503 : 200;

    return NextResponse.json(healthReport, { status: httpStatus });
  } catch (err: any) {
    return NextResponse.json(
      {
        overall_status: 'DOWN',
        error: err.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
