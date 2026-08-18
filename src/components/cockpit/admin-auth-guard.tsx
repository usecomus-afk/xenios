"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { BrandMark } from '@/components/brand-mark';
import { Lock, KeyRound, ShieldCheck, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const check = () => {
      setIsAuth(XeniosStore.isMasterAdminLoggedIn());
    };
    check();
    window.addEventListener('xenios_master_admin_auth', check);
    return () => window.removeEventListener('xenios_master_admin_auth', check);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username.trim().toLowerCase() === 'admin' && password === 'xenios2026') ||
      (username.trim().toLowerCase() === 'proje' && password === 'xenios123') ||
      (username.trim() !== '' && password === 'xenios2026')
    ) {
      XeniosStore.setMasterAdminLoggedIn(true);
      toast.success("Master Proje Yöneticisi girişi başarılı!");
      setError('');
    } else {
      setError("Hatalı kullanıcı adı veya şifre! (Demo: admin / xenios2026)");
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 border border-amber-300 text-[11px] font-bold uppercase tracking-wider font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Master Proje Yöneticisi Girişi</span>
            </div>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              Xenios Master Operations Deck ve merkezi platform kontrolü için kimliğinizi doğrulayın.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Kullanıcı Adı</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Güvenlik Şifresi</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                />
              </div>
            </div>

            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-[11px] text-amber-900 flex items-center justify-between">
              <span>Demo Giriş:</span>
              <strong className="font-mono text-zinc-800">admin / xenios2026</strong>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold rounded-xl shadow-md shadow-amber-500/20 text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Güvenli Giriş Yap</span>
            </button>
          </form>

          <div className="pt-2 text-center border-t border-zinc-100">
            <Link href="/" className="text-xs text-zinc-500 hover:text-amber-800 font-semibold transition">
              ← Misafir Uygulamasına Geri Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
