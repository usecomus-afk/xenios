"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { ServiceRequest, Booking } from '@/lib/types';
import Link from 'next/link';
import { 
  Building2, 
  DoorOpen, 
  Layers,
  CalendarSync, 
  BellRing, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  QrCode, 
  ArrowRight,
  Settings,
  ShieldCheck
} from 'lucide-react';

export default function CockpitDashboard() {
  const hotels = XeniosStore.getHotels();
  const currentHotel = hotels[0]; // Active hotel focus

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

  // Room Inventory Simulation (42 Rooms: 21 Occupied, 18 Available, 3 Reserved)
  const roomStats = {
    total: 42,
    occupied: 21,
    available: 18,
    reserved: 3,
    occupancyRate: 50
  };

  // OTA & iCal Connected Channels
  const otaChannels = [
    { name: 'Airbnb', status: 'Senkronize', count: '14 Rezervasyon' },
    { name: 'Booking.com', status: 'Senkronize', count: '19 Rezervasyon' },
    { name: 'Expedia', status: 'Senkronize', count: '6 Rezervasyon' },
    { name: 'VRBO', status: 'Senkronize', count: '3 Rezervasyon' }
  ];

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
            {currentHotel.name} • Oda Envanteri, iCal/OTA Kanal Yönetimi ve Canlı Kat Hizmetleri Masası
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/settings"
            className="px-4 py-2.5 bg-[#12141a] hover:bg-[#1a1d26] text-amber-400 border border-amber-500/30 font-bold rounded-2xl text-xs flex items-center gap-1.5 transition"
          >
            <Settings className="w-4 h-4" />
            <span>Kanal & Ayarlar</span>
          </Link>
          <Link
            href="/qr-generator"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-2xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition"
          >
            <QrCode className="w-4 h-4" />
            <span>Oda QR Kodları</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid (Odalar + iCal/OTA + Bekleyen İstekler + Sanal POS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Odalar & Doluluk Kartı (Replaced Aktif Oteller) */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold text-white">Oda Durumları</span>
            <DoorOpen className="w-4 h-4 text-amber-400" />
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">{roomStats.total}</span>
              <span className="text-xs text-zinc-400">Toplam Oda</span>
            </div>

            {/* Detailed Room Status Badges */}
            <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-center">
              <div className="bg-red-500/15 border border-red-500/30 p-1.5 rounded-xl">
                <span className="text-[10px] text-red-400 block font-semibold">Dolu</span>
                <strong className="text-xs font-mono text-red-300 font-bold">{roomStats.occupied}</strong>
              </div>
              <div className="bg-emerald-500/15 border border-emerald-500/30 p-1.5 rounded-xl">
                <span className="text-[10px] text-emerald-400 block font-semibold">Boş</span>
                <strong className="text-xs font-mono text-emerald-300 font-bold">{roomStats.available}</strong>
              </div>
              <div className="bg-amber-500/15 border border-amber-500/30 p-1.5 rounded-xl">
                <span className="text-[10px] text-amber-400 block font-semibold">Rezerve</span>
                <strong className="text-xs font-mono text-amber-300 font-bold">{roomStats.reserved}</strong>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 pt-1 border-t border-[#2c313d] flex items-center justify-between">
            <span>Doluluk Oranı:</span>
            <strong className="text-amber-400 font-mono font-bold">%{roomStats.occupancyRate}</strong>
          </div>
        </div>

        {/* 2. iCal & OTA Kanal Entegrasyonu Kartı (Replaced Deneyim Kataloğu) */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold text-white">iCal & OTA Kanalları</span>
            <CalendarSync className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">4 Aktif Kanal Bağlı</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded-lg bg-[#12141a] border border-[#2c313d] text-[10px] text-zinc-300 font-medium">Airbnb</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#12141a] border border-[#2c313d] text-[10px] text-zinc-300 font-medium">Booking.com</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#12141a] border border-[#2c313d] text-[10px] text-zinc-300 font-medium">Expedia</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#12141a] border border-[#2c313d] text-[10px] text-zinc-300 font-medium">VRBO</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 pt-1 border-t border-[#2c313d] flex items-center justify-between">
            <span>2 Yönlü Eşitleme:</span>
            <strong className="text-cyan-400 font-mono">15 dk önce</strong>
          </div>
        </div>

        {/* 3. Live Requests */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold text-white">Bekleyen Oda Talepleri</span>
            <BellRing className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-amber-400">
              {pendingRequests.length}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">Anlık kat hizmetleri & resepsiyon</p>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1 border-t border-[#2c313d] flex items-center justify-between">
            <span>Ortalama Yanıt:</span>
            <strong className="text-emerald-400 font-mono">3.2 dk</strong>
          </div>
        </div>

        {/* 4. POS Revenue */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold text-white">Sanal POS Satışları</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              €{totalRevenue}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">{bookings.length} Başarılı Sipariş & Rezervasyon</p>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1 border-t border-[#2c313d] flex items-center justify-between">
            <span>Güvence:</span>
            <strong className="text-zinc-400">3D Secure Aktif</strong>
          </div>
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
          <p className="text-xs text-zinc-500 py-4 text-center">Henüz aktif talep bulunmuyor.</p>
        ) : (
          <div className="space-y-2.5">
            {requests.slice(0, 5).map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-2xl bg-[#12141a] border border-[#2c313d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs overflow-hidden"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-mono font-bold text-[11px] shrink-0">
                      Oda {req.roomNumber}
                    </span>
                    <strong className="text-zinc-200 truncate">{req.serviceTitle}</strong>
                    <span className="text-zinc-500 text-[10px] truncate">• {req.hotelName}</span>
                  </div>
                  {req.notes && (
                    <p className="text-zinc-400 text-[11px] line-clamp-2 break-words">
                      {req.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
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
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold transition shrink-0 whitespace-nowrap cursor-pointer"
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
