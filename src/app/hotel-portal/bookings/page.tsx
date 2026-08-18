"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { Booking } from '@/lib/types';
import { CreditCard, ArrowUpRight, DollarSign, Calendar } from 'lucide-react';

export default function HotelBookingsPage() {
  const hotels = XeniosStore.getHotels();
  const activeHotelId = XeniosStore.getActiveHotelId();
  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const refresh = () => setBookings(XeniosStore.getBookings());
    refresh();
    window.addEventListener('xenios_bookings_updated', refresh);
    return () => window.removeEventListener('xenios_bookings_updated', refresh);
  }, []);

  const total = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const hotelCut = Math.round(total * 0.15);

  return (
    <div className="space-y-6 text-zinc-100 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2c313d] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{currentHotel.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
            Misafir Rezervasyonları & Partner Komisyon Gelirleri
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Otelinizin misafirlerinin Xenios üzerinden satın aldığı tur, bilet ve aktivitelerden kazandığınız net pay.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Toplam Misafir Harcaması</span>
          <div className="text-2xl font-bold text-white mt-1 font-mono">€{total}</div>
        </div>
        <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 uppercase font-bold">Otele Aktarılacak Net Komisyon (%15)</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">€{hotelCut}</div>
        </div>
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-400 uppercase font-bold">Toplam Başarılı İşlem</span>
          <div className="text-2xl font-bold text-amber-400 mt-1 font-mono">{bookings.length} Adet</div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#171a22] rounded-3xl border border-[#2c313d] p-5 space-y-3">
        <h3 className="text-sm font-bold text-white">İşlem Detayları</h3>
        {bookings.length === 0 ? (
          <p className="text-xs text-zinc-500 py-6 text-center">Henüz rezervasyon kaydı bulunmuyor.</p>
        ) : (
          <div className="space-y-2">
            {bookings.map((b) => (
              <div key={b.id} className="p-3.5 bg-[#0f1116] rounded-2xl border border-[#2c313d] flex items-center justify-between text-xs">
                <div>
                  <strong className="text-white block text-sm">{b.experienceTitle}</strong>
                  <span className="text-[11px] text-zinc-400">{b.guestName} • Oda {b.roomNumber || '101'}</span>
                </div>
                <div className="text-right">
                  <strong className="text-emerald-400 font-mono text-sm block">€{b.amount}</strong>
                  <span className="text-[10px] text-amber-400 font-mono">Otel Payı: €{Math.round(b.amount * 0.15)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
