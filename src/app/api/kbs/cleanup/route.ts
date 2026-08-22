import { NextResponse } from 'next/server';
import { KbsService } from '@/services/kbsService';

export async function POST() {
  try {
    const result = KbsService.purgeExpiredKbsRecords(30);
    return NextResponse.json({
      success: true,
      purgedCount: result.purgedCount,
      purgedRecordIds: result.purgedRecordIds,
      message: '30 günü geçen KBS misafir kayıtları ve pasaport görselleri KVKK uyarınca imha edildi.'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
