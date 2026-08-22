import { NextResponse } from 'next/server';
import { KbsService } from '@/services/kbsService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { base64Image, mimeType = 'image/jpeg' } = body;

    if (!base64Image) {
      return NextResponse.json(
        { success: false, error: 'base64Image parametresi zorunludur.' },
        { status: 400 }
      );
    }

    const parsedData = await KbsService.processPassportWithDocumentAI(base64Image, mimeType);

    return NextResponse.json({
      success: true,
      parsedData,
      message: 'Pasaport Google Document AI OCR ile başarıyla okundu.'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
