"use client";

import { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Building2, 
  Key, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'guest' | 'hotel';
}

export function AuthModal({ isOpen, onClose, defaultRole = 'guest' }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'guest' | 'hotel'>(defaultRole);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hotelCode, setHotelCode] = useState('FATIH-HERITAGE-01');

  if (!isOpen) return null;

  const handleGoogleAuth = () => {
    toast.success("Google ile başarıyla giriş yapıldı! Hoş geldiniz.");
    setTimeout(() => {
      onClose();
      if (role === 'hotel') {
        router.push('/dashboard');
      }
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (role === 'hotel') {
        toast.success("Otel & Host Yönetim Girişi Başarılı! Kokpite yönlendiriliyorsunuz...");
        setTimeout(() => {
          onClose();
          router.push('/dashboard');
        }, 800);
      } else {
        toast.success(`Hoş geldiniz ${email || 'Misafir'}!`);
        setTimeout(() => onClose(), 600);
      }
    } else {
      toast.success("Hesabınız başarıyla oluşturuldu! Hoş geldiniz.");
      setTimeout(() => {
        onClose();
        if (role === 'hotel') router.push('/dashboard');
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in zoom-in-95 relative text-zinc-900 flex flex-col max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1 mb-5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 block">
            Xenios İstanbul
          </span>
          <h2 className="text-xl font-bold font-serif text-zinc-900">
            {mode === 'login' ? 'Hesabınıza Giriş Yapın' : 'Yeni Hesap Oluşturun'}
          </h2>
          <p className="text-xs text-zinc-500">
            {mode === 'login' 
              ? 'Oda hizmetleri, rezervasyonlarınız ve otel yönetimi için giriş yapın.' 
              : 'İstanbul misafir ayrıcalıklarından ve hızlı rezervasyondan yararlanın.'}
          </p>
        </div>

        {/* Mode Switcher Tabs (Giriş Yap / Kayıt Ol) */}
        <div className="flex rounded-2xl bg-zinc-100 p-1 mb-4 border border-zinc-200">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Role Switcher in Login Mode (Misafir Girişi vs Otel/Host Kokpit Girişi) */}
        {mode === 'login' && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              onClick={() => setRole('guest')}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                role === 'guest'
                  ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-400/40 text-amber-950'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
              }`}
            >
              <User className={`w-4 h-4 mb-1 ${role === 'guest' ? 'text-amber-700' : 'text-zinc-400'}`} />
              <div>
                <strong className="text-xs block font-bold">Misafir Girişi</strong>
                <span className="text-[10px] text-zinc-500 block">Otel & Şehir Hizmetleri</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('hotel')}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                role === 'hotel'
                  ? 'bg-zinc-900 border-zinc-950 ring-2 ring-amber-400 text-white'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
              }`}
            >
              <Building2 className={`w-4 h-4 mb-1 ${role === 'hotel' ? 'text-amber-400' : 'text-zinc-400'}`} />
              <div>
                <strong className="text-xs block font-bold">Yönetim & Kokpit</strong>
                <span className={`text-[10px] block ${role === 'hotel' ? 'text-zinc-400' : 'text-zinc-500'}`}>Otel & Host Girişi</span>
              </div>
            </button>
          </div>
        )}

        {/* Google OAuth 1-Click Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full py-2.5 px-4 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-2xl text-xs font-bold text-zinc-800 flex items-center justify-center gap-2.5 shadow-xs transition mb-3.5 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Google Hesabı ile {mode === 'login' ? 'Giriş Yap' : 'Kaydol'}</span>
        </button>

        <div className="relative flex items-center justify-center mb-3.5">
          <div className="border-t border-zinc-200 w-full" />
          <span className="bg-white px-2 text-[10px] text-zinc-400 uppercase font-semibold">veya e-posta ile</span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <>
              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1">Ad Soyad</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1">Telefon Numarası</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+90 5XX XXX XX XX"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>
            </>
          )}

          {mode === 'login' && role === 'hotel' && (
            <div>
              <label className="text-[11px] font-bold text-zinc-700 block mb-1">Otel / Tesis Kodu</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={hotelCode}
                  onChange={(e) => setHotelCode(e.target.value)}
                  placeholder="Örn: FATIH-HERITAGE-01"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-mono font-bold"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-zinc-700 block mb-1">E-Posta Adresi</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'hotel' ? "hotel@xenios.com" : "misafir@gmail.com"}
                className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-zinc-700 block mb-1">Şifre</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2 ${
              role === 'hotel' && mode === 'login'
                ? 'bg-zinc-900 hover:bg-black text-amber-400 shadow-zinc-900/30'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30'
            }`}
          >
            <span>{mode === 'login' ? (role === 'hotel' ? 'Kokpit Paneline Giriş Yap' : 'Giriş Yap') : 'Hesabı Oluştur'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-zinc-100 text-center">
          <p className="text-[10px] text-zinc-400">
            Xenios 256-Bit SSL şifreleme ve KVKK güvencesiyle korunmaktadır.
          </p>
        </div>
      </div>
    </div>
  );
}
