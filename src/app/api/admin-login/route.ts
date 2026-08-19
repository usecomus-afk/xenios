import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = (process.env.ADMIN_EMAIL || 'anilaslan@usecomus.com').trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || 'Camille+1618';

    const providedEmail = (email ?? '').toString().trim().toLowerCase();
    const providedPassword = (password ?? '').toString();

    const isMatch = (providedEmail === expectedEmail || providedEmail === 'anilaslan') && providedPassword === expectedPassword;

    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'E-posta veya şifre hatalı.' }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      email: expectedEmail,
      name: 'Anıl Aslan',
      role: 'pilot'
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Geçersiz istek.' }, { status: 400 });
  }
}
