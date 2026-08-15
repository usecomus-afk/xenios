"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { Booking } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { CreditCard, CheckCircle2, Calendar, Phone, Mail, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const refreshData = () => {
    setBookings(XeniosStore.getBookings());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('xenios_bookings_updated', refreshData);
    return () => window.removeEventListener('xenios_bookings_updated', refreshData);
  }, []);

  const handleApprove = (id: string) => {
    XeniosStore.updateBookingStatus(id, 'confirmed');
    toast.success("Rezervasyon onaylandı ve misafirin takvimine hazırlandı.");
    refreshData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold font-serif text-white">Sanal POS Siparişleri & Onay Döngüsü</h1>
        <p className="text-xs text-zinc-400">Misafirlerin satın aldığı deneyimler, sağlayıcı SMS/E-posta onayları ve Google Takvim bağlantıları</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-[#171a22] rounded-3xl p-12 text-center text-zinc-500 border border-[#2c313d] space-y-2">
          <CreditCard className="w-8 h-8 mx-auto text-emerald-400 opacity-40" />
          <p className="text-xs">Henüz sanal POS üzerinden bir satın alma kaydı yok.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] hover:border-amber-500/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">
                    {b.confirmationCode}
                  </span>
                  <strong className="text-sm text-white">{b.experienceTitle}</strong>
                </div>

                <div className="text-[11px] text-zinc-400 space-y-0.5">
                  <p>
                    <strong>Misafir:</strong> {b.guestName} ({b.hotelName} - Oda {b.roomNumber}) • Tel: {b.guestPhone}
                  </p>
                  <p>
                    <strong>Sağlayıcı:</strong> {b.providerName} (Tel: {b.providerPhone})
                  </p>
                  <p>
                    <strong>Tarih:</strong> {b.bookingDate} {b.bookingTime} • {b.guestCount} Kişi • Tutar: <span className="text-amber-400 font-bold">{formatPrice(b.amount, b.currency)}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                <a
                  href={`/confirm-booking/${b.id}`}
                  target="_blank"
                  className="px-3 py-2 bg-[#12141a] hover:bg-white/5 border border-[#2c313d] text-zinc-300 rounded-xl font-semibold flex items-center gap-1 transition"
                >
                  <span>SMS/E-posta Onay Sayfası</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {b.status === 'confirmed' ? (
                  <span className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold">
                    ✓ Onaylandı
                  </span>
                ) : (
                  <button
                    onClick={() => handleApprove(b.id)}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Onayla</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
