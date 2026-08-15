"use client";

import { Hotel, Language } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { LanguageSelector } from './language-selector';
import { Wifi, Phone, MapPin, Copy, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { BrandMark } from '../brand-mark';

interface HotelHeaderProps {
  hotel: Hotel;
  roomNumber: string;
  lang: Language;
  onLanguageChange: (l: Language) => void;
}

export function HotelHeader({ hotel, roomNumber, lang, onLanguageChange }: HotelHeaderProps) {
  const t = getT(lang);
  const [copied, setCopied] = useState(false);

  const room = hotel.rooms.find(r => r.number === roomNumber) || hotel.rooms[0];
  const wifiPass = room?.wifiPass || 'Xenios2026!';
  const wifiSsid = room?.wifiSsid || `${hotel.name.split(' ')[0]}_Guest`;

  const copyWifi = () => {
    navigator.clipboard.writeText(wifiPass);
    setCopied(true);
    toast.success(t.wifiCopied);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="bg-gradient-to-b from-amber-500/10 via-amber-100/30 to-transparent pt-3 pb-4 px-4 border-b border-amber-200/50">
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Top bar: Brand + Room Badge + Lang */}
        <div className="flex items-center justify-between">
          <BrandMark size={36} showText={true} />
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold shadow-sm tracking-wide">
              <span>{t.room}</span>
              <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[11px]">{roomNumber}</span>
            </div>
            <LanguageSelector currentLang={lang} onSelect={onLanguageChange} />
          </div>
        </div>

        {/* Hotel Info Banner */}
        <div className="bg-white/95 rounded-2xl p-4 shadow-sm border border-amber-200/60 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-serif text-zinc-900 leading-tight">
                  {hotel.name}
                </h1>
                <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-medium">
                  {hotel.type}
                </span>
              </div>
              <p className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{hotel.address}</span>
              </p>
            </div>

            {/* Quick Actions / Hours */}
            <div className="flex items-center gap-2 text-xs text-zinc-600 pt-2 sm:pt-0 border-t sm:border-t-0 border-amber-100">
              <div className="bg-amber-50/80 px-2.5 py-1.5 rounded-xl border border-amber-200/40">
                <span className="text-[10px] uppercase text-zinc-400 block font-semibold">{t.breakfast}</span>
                <span className="font-semibold text-zinc-800">{hotel.breakfastHours}</span>
              </div>
              <div className="bg-amber-50/80 px-2.5 py-1.5 rounded-xl border border-amber-200/40">
                <span className="text-[10px] uppercase text-zinc-400 block font-semibold">{t.checkout}</span>
                <span className="font-semibold text-zinc-800">{hotel.checkoutTime}</span>
              </div>
            </div>
          </div>

          {/* Wi-Fi Credentials Bar */}
          <div className="mt-3 pt-3 border-t border-dashed border-amber-200 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-amber-500/5 via-amber-100/20 to-transparent p-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-700">
                <Wifi className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-zinc-500 font-medium">{t.wifiNetwork}: </span>
                <strong className="text-zinc-800 font-bold">{wifiSsid}</strong>
                <span className="mx-2 text-zinc-300">|</span>
                <span className="text-zinc-500 font-medium">{t.wifiPassword}: </span>
                <code className="bg-white px-2 py-0.5 rounded text-amber-900 font-mono font-bold border border-amber-200">
                  {wifiPass}
                </code>
              </div>
            </div>

            <button
              onClick={copyWifi}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold shadow-sm transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.wifiCopied : t.wifiCopy}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
