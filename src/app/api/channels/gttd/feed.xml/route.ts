import { NextResponse } from 'next/server';
import { GoogleThingsToDoService } from '@/services/googleThingsToDoService';

export async function GET() {
  try {
    const xmlContent = GoogleThingsToDoService.generateGTTDXmlFeed();

    return new NextResponse(xmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
