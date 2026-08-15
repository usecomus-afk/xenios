"use client";

import { useState } from 'react';
import { Sparkles, Save, ShieldCheck, Key, Globe, Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState('');
  const [adminPhone, setAdminPhone] = useState('+90 532 000 00 00');
  const [defaultCurrency, setDefaultCurrency] = useState('EUR');

  const handleSave = () => {
    toast.success("Ayarlar başarıyla kaydedildi.");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold font-serif text-white">Google Ekosistemi & Sistem Ayarları</h1>
        <p className="text-xs text-zinc-400">Google Gemini API, WhatsApp bildirimleri ve POS parametreleri</p>
      </div>

      <div className="bg-[#171a22] p-6 rounded-3xl border border-[#2c313d] space-y-4 text-xs">
        <div className="space-y-1.5">
          <label className="text-zinc-300 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Google Gemini API Key:</span>
          </label>
          <input
            type="password"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full p-2.5 bg-[#12141a] border border-[#2c313d] rounded-xl text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <p className="text-[10px] text-zinc-500">
            Boş bırakıldığında comusAI akıllı yerleşik simülasyon motorunu kullanır.
          </p>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-[#2c313d]">
          <label className="text-zinc-300 font-bold flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Kat Hizmetleri / Resepsiyon Bildirim WhatsApp Numarası:</span>
          </label>
          <input
            type="text"
            value={adminPhone}
            onChange={(e) => setAdminPhone(e.target.value)}
            className="w-full p-2.5 bg-[#12141a] border border-[#2c313d] rounded-xl text-white font-mono"
          />
        </div>

        <div className="space-y-1.5 pt-2 border-t border-[#2c313d]">
          <label className="text-zinc-300 font-bold flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Varsayılan Para Birimi:</span>
          </label>
          <select
            value={defaultCurrency}
            onChange={(e) => setDefaultCurrency(e.target.value)}
            className="w-full p-2.5 bg-[#12141a] border border-[#2c313d] rounded-xl text-white"
          >
            <option value="EUR">Euro (€)</option>
            <option value="USD">Dolar ($)</option>
            <option value="TRY">Türk Lirası (₺)</option>
          </select>
        </div>

        <div className="pt-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs flex items-center gap-2 transition"
          >
            <Save className="w-4 h-4" />
            <span>Ayarları Kaydet</span>
          </button>
        </div>
      </div>
    </div>
  );
}
