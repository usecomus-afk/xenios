"use client";

import { Language } from '@/lib/types';
import { XeniosStore } from '@/lib/store';
import { useState, useEffect } from 'react';

const langs: { code: Language; flag: string; label: string }[] = [
  { code: 'tr', flag: '🇹🇷', label: 'TR' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'ar', flag: '🇸🇦', label: 'AR' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
];

export function LanguageSelector({ currentLang, onSelect }: { currentLang: Language; onSelect: (l: Language) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-bold text-zinc-800 hover:bg-amber-50 transition cursor-pointer"
      >
        <span>{langs.find(l => l.code === currentLang)?.flag || '🇹🇷'}</span>
        <span>{currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-2xl shadow-xl border border-amber-100 p-1 z-50 animate-in fade-in zoom-in-95">
          {langs.map(l => (
            <button
              key={l.code}
              onClick={() => {
                onSelect(l.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition ${
                currentLang === l.code ? 'bg-amber-100/70 font-bold text-amber-900' : 'text-zinc-700 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </div>
              {currentLang === l.code && <span className="text-amber-700 text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
