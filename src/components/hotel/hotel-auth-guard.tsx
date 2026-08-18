"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { BrandMark } from '@/components/brand-mark';
import { Hotel, Lock, ShieldCheck, ArrowRight, Building2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export function HotelAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [hotelPin, setHotelPin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const hotels = XeniosStore.getHotels();
  const activeHotelId = XeniosStore.getActiveHotelId();
  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  useEffect(() => {
    const check = () => {
      setIsAuth(XeniosStore.isHotelPortalLoggedIn());
    };
    check();
    window.addEventListener('xenios_hotel_portal_auth', check);
    return () => window.removeEventListener('xenios_hotel_portal_auth', check);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (hotelPin.trim().toLowerCase() === 'hotel' && password === 'hotel2026') ||
      (hotelPin.trim() !== '' && (password === 'hotel2026' || password === 'xenios2026' || password === '1234'))
    ) {
      XeniosStore.setHotelPortalLoggedIn(true);
      toast.success(`${currentHotel.name} Yönetim Paneline giriş başarılı!`);
      setError('');
    } else {
      setError("Hatalı otel kullanıcı adı veya şifre! (Demo: hotel / hotel2026)");
      toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz.");
    }
  };

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center p-4">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl border border-amber-200/90 space-y-6 animate-in zoom-in-95">
          <div className="text-center space-y-3">
            <div className="inline-block">
              <BrandMark size={48} showText={true} theme="light" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-900 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider font-mono">
              <Hotel className="w-3.5 h-3.5 text-emerald-700" />
              <span>Partner Otel Yönetim Paneli Girişi</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900">{currentHotel.name}</h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              Oda talepleri, iCal kanalları ve otel içi hizmet menüsü yönetimi için giriş yapınız.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Otel Yetkilisi Kullanıcı Adı / Kod</label>
              <input
                type="text"
                required
                value={hotelPin}
                onChange={(e) => setHotelPin(e.target.value)}
                placeholder="hotel"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Yetkili Şifresi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between">
              <span>Demo Giriş:</span>
              <strong className="font-mono text-zinc-800">hotel / hotel2026</strong>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-xl shadow-md text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Otel Yönetim Paneline Giriş Yap</span>
            </button>
          </form>

          <div className="pt-2 text-center border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <Link href="/" className="hover:text-amber-800 font-semibold transition">
              ← Misafir Ekranı
            </Link>
            <Link href="/dashboard" className="hover:text-amber-800 font-semibold transition">
              Admin Masası →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
