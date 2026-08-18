"use client";

import { useState } from 'react';
import { XeniosStore } from '@/lib/store';
import { CalendarSync, CheckCircle2, RotateCw, Globe, Link as LinkIcon, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function HotelChannelsPage() {
  const hotels = XeniosStore.getHotels();
  const activeHotelId = XeniosStore.getActiveHotelId();
  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  const [isSyncing, setIsSyncing] = useState(false);

  const channels = [
    { name: 'Airbnb', type: 'iCal 2-Way Sync', status: 'Senkronize', count: '14 Rezervasyon', lastSync: '12 dk önce', active: true },
    { name: 'Booking.com', type: 'Channel Manager / iCal', status: 'Senkronize', count: '19 Rezervasyon', lastSync: '8 dk önce', active: true },
    { name: 'Expedia Partner', type: 'iCal API', status: 'Senkronize', count: '6 Rezervasyon', lastSync: '15 dk önce', active: true },
    { name: 'VRBO / HomeAway', type: 'iCal Sync', status: 'Senkronize', count: '3 Rezervasyon', lastSync: '22 dk önce', active: true },
    { name: 'Tripadvisor Rentals', type: 'iCal Feed', status: 'Bağlantı Hazır', count: '0 Rezervasyon', lastSync: 'Beklemede', active: false }
  ];

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Tüm OTA ve iCal kanalları başarıyla senkronize edildi (42 oda takvimi güncellendi).');
    }, 1200);
  };

  return (
    <div className="space-y-6 text-zinc-100 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2c313d] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{currentHotel.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
            iCal & OTA Kanal Entegrasyon Masası
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Airbnb, Booking.com ve Expedia takvimlerini Xenios oda envanteri ile 2 yönlü canlı senkronize edin.
          </p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RotateCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Eşitleniyor...' : 'Şimdi Manuel Eşitle'}</span>
        </button>
      </div>

      {/* Channels List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((ch, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0f1116] border border-[#2c313d] flex items-center justify-center text-amber-400 font-bold text-sm">
                    {ch.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{ch.name}</h3>
                    <span className="text-[10px] text-zinc-400">{ch.type}</span>
                  </div>
                </div>

                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                  ch.active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-700 text-zinc-400'
                }`}>
                  {ch.status}
                </span>
              </div>

              <div className="p-3 bg-[#0f1116] rounded-xl border border-[#2c313d] text-xs flex items-center justify-between">
                <span className="text-zinc-400">Aktif Çekilen Rezervasyon:</span>
                <strong className="text-white font-mono">{ch.count}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-[#2c313d] flex items-center justify-between text-[11px] text-zinc-500">
              <span>Son Senkronizasyon: <strong className="text-zinc-400">{ch.lastSync}</strong></span>
              <button
                onClick={() => toast.info(`${ch.name} iCal bağlantısı güncellendi.`)}
                className="text-amber-400 hover:underline font-semibold cursor-pointer"
              >
                Ayarlar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
