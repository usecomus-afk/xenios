"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { Booking } from '@/lib/types';
import { CreditCard, ArrowUpRight, DollarSign, Calendar, EyeOff } from 'lucide-react';
import { DemoBadge } from '@/components/demo-badge';
import { toast } from 'sonner';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const refresh = () => {
    setBookings(XeniosStore.getBookings());
  };

  useEffect(() => {
    refresh();
    window.addEventListener('xenios_bookings_updated', refresh);
    window.addEventListener('xenios_demo_updated', refresh);
    return () => {
      window.removeEventListener('xenios_bookings_updated', refresh);
      window.removeEventListener('xenios_demo_updated', refresh);
    };
  }, []);

  const total = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const platformCut = Math.round(total * 0.15);

  return (
    <div className="space-y-6 text-zinc-900 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-zinc-900">Sanal POS & Finansal Raporlar</h1>
          <p className="text-xs text-zinc-500">Platform Geneli 3D Secure Rezervasyonlar, Komisyon Paylaşımları ve Gelir Raporu</p>
        </div>

        {!XeniosStore.isDemoDataHidden() && (
          <button
            onClick={() => {
              XeniosStore.setHideDemoData(true);
              toast.success('Tüm örnek kayıtlar gizlendi.');
              refresh();
            }}
            className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl border border-amber-300 flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Örnek Verileri Gizle</span>
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-xs">
          <span className="text-[10px] text-zinc-500 uppercase font-bold">Toplam POS Cirosu</span>
          <div className="text-2xl font-bold text-zinc-900 mt-1 font-mono">€{total}</div>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-xs">
          <span className="text-[10px] text-emerald-700 uppercase font-bold">Net Platform Komisyonu (%15)</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono">€{platformCut}</div>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-xs">
          <span className="text-[10px] text-amber-800 uppercase font-bold">Başarılı Rezervasyon</span>
          <div className="text-2xl font-bold text-amber-800 mt-1 font-mono">{bookings.length} Adet</div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-amber-200/80 p-5 space-y-3 shadow-xs">
        <h3 className="text-sm font-bold text-zinc-900">Son İşlem Kayıtları</h3>
        {bookings.length === 0 ? (
          <p className="text-xs text-zinc-500 py-8 text-center">Henüz finansal işlem veya rezervasyon kaydı bulunmuyor.</p>
        ) : (
          <div className="space-y-2.5">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 bg-amber-50/40 rounded-2xl border border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-zinc-900 block text-sm font-bold">{b.experienceTitle}</strong>
                    {b.isDemo && <DemoBadge />}
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    {b.guestName} ({b.guestPhone}) • {b.hotelName} (Oda {b.roomNumber || '101'})
                  </span>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    Tarih: {b.bookingDate} {b.bookingTime} • Kod: {b.confirmationCode}
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <strong className="text-emerald-700 font-mono text-base block font-bold">€{b.amount}</strong>
                  <span className="text-[10px] text-zinc-500">Platform Payı: €{Math.round(b.amount * 0.15)}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold block mt-1">
                    {b.status === 'confirmed' ? 'Onaylandı' : 'Ödendi'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
