import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || '';

    if (!expectedEmail || !expectedPassword) {
      return NextResponse.json(
        { success: false, error: 'Yönetici girişi sunucuda henüz yapılandırılmadı. ADMIN_EMAIL / ADMIN_PASSWORD ortam değişkenlerini ayarlayın.' },
        { status: 503 }
      );
    }

    const providedEmail = (email ?? '').toString().trim().toLowerCase();
    const providedPassword = (password ?? '').toString();

    if (providedEmail !== expectedEmail || providedPassword !== expectedPassword) {
      return NextResponse.json({ success: false, error: 'E-posta veya şifre hatalı.' }, { status: 401 });
    }

    return NextResponse.json({ success: true, email: expectedEmail });
  } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }
}
