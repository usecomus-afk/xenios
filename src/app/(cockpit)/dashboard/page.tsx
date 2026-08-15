"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { ServiceRequest, Booking } from '@/lib/types';
import Link from 'next/link';
import { 
  Building2, 
  Compass, 
  BellRing, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  QrCode,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CockpitDashboard() {
  const hotels = XeniosStore.getHotels();
  const experiences = XeniosStore.getExperiences();

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setRequests(XeniosStore.getRequests());
    setBookings(XeniosStore.getBookings());

    const handleReq = () => setRequests(XeniosStore.getRequests());
    const handleBook = () => setBookings(XeniosStore.getBookings());

    window.addEventListener('xenios_requests_updated', handleReq);
    window.addEventListener('xenios_bookings_updated', handleBook);
    return () => {
      window.removeEventListener('xenios_requests_updated', handleReq);
      window.removeEventListener('xenios_bookings_updated', handleBook);
    };
  }, []);

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/20 via-[#171a22] to-[#12141a] p-6 rounded-3xl border border-amber-500/30">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">ComusV2 Central Operation Deck</span>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-white mt-1">
            Xenios İstanbul Kokpit
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            43 Otel, 52 Deneyim Sağlayıcısı ve Canlı Oda Talepleri Yönetim Masası
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/qr-generator"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-2xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition"
          >
            <QrCode className="w-4 h-4" />
            <span>Oda QR Kodları</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Active Hotels */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Aktif Oteller</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{hotels.length}</div>
          <p className="text-[10px] text-zinc-500">Sultanahmet, Beyoğlu, Karaköy...</p>
        </div>

        {/* 2. Experiences */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Deneyim Kataloğu</span>
            <Compass className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{experiences.length}</div>
          <p className="text-[10px] text-zinc-500">13 Kategori • TÜRSAB Lisanslı</p>
        </div>

        {/* 3. Live Requests */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Bekleyen Oda Talepleri</span>
            <BellRing className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {pendingRequests.length}
          </div>
          <p className="text-[10px] text-zinc-500">Anlık kat hizmetleri masası</p>
        </div>

        {/* 4. POS Revenue */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Sanal POS Satışları</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            €{totalRevenue}
          </div>
          <p className="text-[10px] text-zinc-500">{bookings.length} Başarılı Sipariş</p>
        </div>
      </div>

      {/* Live In-Room Requests Section */}
      <div className="p-6 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white">Canlı Oda Talepleri Masası</h3>
          </div>
          <Link
            href="/live-requests"
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
          >
            <span>Tümünü Gör</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {requests.length === 0 ? (
          <p className="text-xs text-zinc-500 py-4 text-center">Henüz talep bulunmuyor.</p>
        ) : (
          <div className="space-y-2">
            {requests.slice(0, 5).map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-2xl bg-[#12141a] border border-[#2c313d] flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-mono font-bold text-[11px]">
                      Oda {req.roomNumber}
                    </span>
                    <strong className="text-zinc-200">{req.serviceTitle}</strong>
                    <span className="text-zinc-500 text-[10px]">• {req.hotelName}</span>
                  </div>
                  {req.notes && <p className="text-zinc-400 text-[11px]">{req.notes}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    req.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : req.status === 'in_progress'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-amber-500/20 text-amber-400 animate-pulse'
                  }`}>
                    {req.status === 'completed' ? 'Tamamlandı' : req.status === 'in_progress' ? 'İşlemde' : 'Bekliyor'}
                  </span>
                  
                  {req.status !== 'completed' && (
                    <button
                      onClick={() => XeniosStore.updateRequestStatus(req.id, 'completed')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold transition"
                    >
                      ✓ Çözüldü
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
