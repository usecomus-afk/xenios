"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { ServiceRequest, Booking } from '@/lib/types';
import Link from 'next/link';
import {
  DoorOpen,
  CalendarSync,
  BellRing,
  CreditCard,
  QrCode,
  ArrowRight,
  LayoutGrid,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  Settings,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { DemoBadge } from '@/components/demo-badge';

export default function HotelPortalDashboard() {
  const hotels = XeniosStore.getHotels();
  const activeHotelId = XeniosStore.getActiveHotelId();
  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const refresh = () => {
      setRequests(XeniosStore.getRequests().filter(r => r.hotelId === currentHotel.id || !r.hotelId));
      setBookings(XeniosStore.getBookings());
    };
    refresh();
    window.addEventListener('xenios_requests_updated', refresh);
    window.addEventListener('xenios_bookings_updated', refresh);
    window.addEventListener('xenios_demo_updated', refresh);
    return () => {
      window.removeEventListener('xenios_requests_updated', refresh);
      window.removeEventListener('xenios_bookings_updated', refresh);
      window.removeEventListener('xenios_demo_updated', refresh);
    };
  }, [currentHotel.id]);

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const hotelBookings = bookings.filter(b => b.roomNumber);
  const totalHotelRevenue = hotelBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const hotelCommissionCut = Math.round(totalHotelRevenue * 0.15);

  const roomStats = {
    total: currentHotel.rooms.length || 42,
    occupied: Math.round((currentHotel.rooms.length || 42) * 0.5),
    available: Math.round((currentHotel.rooms.length || 42) * 0.42),
    reserved: Math.round((currentHotel.rooms.length || 42) * 0.08),
    occupancyRate: 50
  };

  return (
    <div className="space-y-6 text-zinc-900 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/15 via-amber-100/40 to-amber-50/70 p-6 rounded-3xl border border-amber-300 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-300 font-mono">
              {currentHotel.type}
            </span>
            <span className="text-xs text-zinc-600 font-medium">{currentHotel.district}, İstanbul</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-zinc-900 mt-1.5">
            {currentHotel.name} Otel Yönetim Paneli
          </h1>
          <p className="text-xs text-zinc-600 mt-1 max-w-2xl leading-relaxed">
            Oda envanteri, kat hizmetleri canlı talepleri, oda içi hizmet menüsü ve OTA/iCal kanalları kontrol paneli.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/hotel-portal/requests"
            className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 shadow-md shadow-red-600/20 transition cursor-pointer"
          >
            <BellRing className="w-4 h-4" />
            <span>Canlı Talepler ({pendingRequests.length})</span>
          </Link>
          <Link
            href="/hotel-portal/services"
            className="px-3.5 py-2.5 bg-white hover:bg-amber-50 text-zinc-800 border border-amber-200 font-bold rounded-2xl text-xs flex items-center gap-1.5 transition shadow-xs"
          >
            <LayoutGrid className="w-4 h-4 text-amber-600" />
            <span>Hizmet & Menü</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Oda Durumları */}
        <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="font-bold text-zinc-900">Oda Durumları</span>
            <DoorOpen className="w-4 h-4 text-amber-600" />
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-zinc-900">{roomStats.total}</span>
              <span className="text-xs text-zinc-500">Toplam Oda</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 mt-2 text-center">
              <div className="bg-red-50 border border-red-200 p-1.5 rounded-xl">
                <span className="text-[10px] text-red-700 block font-bold">Dolu</span>
                <strong className="text-xs font-mono text-red-800 font-bold">{roomStats.occupied}</strong>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-1.5 rounded-xl">
                <span className="text-[10px] text-emerald-700 block font-bold">Boş</span>
                <strong className="text-xs font-mono text-emerald-800 font-bold">{roomStats.available}</strong>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-1.5 rounded-xl">
                <span className="text-[10px] text-amber-700 block font-bold">Rezerve</span>
                <strong className="text-xs font-mono text-amber-800 font-bold">{roomStats.reserved}</strong>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 pt-1 border-t border-zinc-100 flex items-center justify-between">
            <span>Doluluk Oranı:</span>
            <strong className="text-amber-800 font-mono font-bold">%{roomStats.occupancyRate}</strong>
          </div>
        </div>

        {/* 2. iCal & OTA Kanalları */}
        <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="font-bold text-zinc-900">iCal & OTA Kanalları</span>
            <CalendarSync className="w-4 h-4 text-sky-600" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold text-emerald-800">4 Aktif Kanal Bağlı</span>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="px-2 py-0.5 rounded-lg bg-zinc-100 border border-zinc-200 text-[10px] text-zinc-700 font-medium">Airbnb</span>
              <span className="px-2 py-0.5 rounded-lg bg-zinc-100 border border-zinc-200 text-[10px] text-zinc-700 font-medium">Booking.com</span>
              <span className="px-2 py-0.5 rounded-lg bg-zinc-100 border border-zinc-200 text-[10px] text-zinc-700 font-medium">Expedia</span>
              <span className="px-2 py-0.5 rounded-lg bg-zinc-100 border border-zinc-200 text-[10px] text-zinc-700 font-medium">VRBO</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 pt-1 border-t border-zinc-100 flex items-center justify-between">
            <span>2 Yönlü Eşitleme:</span>
            <strong className="text-sky-700 font-mono font-bold">15 dk önce</strong>
          </div>
        </div>

        {/* 3. Bekleyen Oda Talepleri */}
        <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="font-bold text-zinc-900">Bekleyen Oda Talepleri</span>
            <BellRing className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-amber-700">
              {pendingRequests.length}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">Kat hizmetleri, mutfak ve resepsiyon</p>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1 border-t border-zinc-100 flex items-center justify-between">
            <span>Ortalama Yanıt:</span>
            <strong className="text-emerald-700 font-mono font-bold">3.2 dk</strong>
          </div>
        </div>

        {/* 4. Otel Komisyon Kazancı */}
        <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500 text-xs">
            <span className="font-bold text-zinc-900">Otel Komisyon Payı</span>
            <CreditCard className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-700">
              €{hotelCommissionCut}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">Misafir tur & bilet harcamalarından</p>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1 border-t border-zinc-100 flex items-center justify-between">
            <span>Ödeme Durumu:</span>
            <strong className="text-zinc-700 font-mono font-bold">Ay Sonu Havale</strong>
          </div>
        </div>
      </div>

      {/* Otel İçi Hizmetler & Menü Yönetimi Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-amber-50/50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-zinc-900">Otel İçi Hizmetler & Menü Yönetimi</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-200">
                Canlı Senkronize
              </span>
            </div>
            <p className="text-xs text-zinc-600 mt-0.5">
              Odanızdaki QR menüde misafirlerin gördüğü hizmetleri ekleyin, düzenleyin, fiyatlandırın veya gizleyin.
            </p>
          </div>
        </div>

        <Link
          href="/hotel-portal/services"
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 shadow-md shadow-amber-500/20"
        >
          <span>Hizmetleri & Menüyü Yönet →</span>
        </Link>
      </div>

      {/* Live In-Room Requests Section */}
      <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h3 className="text-sm font-bold text-zinc-900">Canlı Oda Talepleri Masası ({currentHotel.name})</h3>
          </div>
          <Link
            href="/hotel-portal/requests"
            className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
          >
            <span>Tüm Talepler ({requests.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {requests.length === 0 ? (
          <p className="text-xs text-zinc-500 py-6 text-center">Bu otel için henüz aktif talep bulunmuyor.</p>
        ) : (
          <div className="space-y-2.5">
            {requests.slice(0, 5).map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono font-bold text-[11px] shrink-0 border border-amber-200">
                      Oda {req.roomNumber}
                    </span>
                    <strong className="text-zinc-900 truncate font-bold">{req.serviceTitle}</strong>
                    {req.isDemo && <DemoBadge />}
                    {req.department && (
                      <span className="text-zinc-500 text-[10px] truncate">• {req.department}</span>
                    )}
                  </div>
                  {req.notes && (
                    <p className="text-zinc-600 text-[11px] line-clamp-2">
                      {req.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                    req.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : req.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800 animate-pulse'
                  }`}>
                    {req.status === 'completed' ? 'Tamamlandı' : req.status === 'in_progress' ? 'İşlemde' : 'Bekliyor'}
                  </span>
                  
                  {req.status !== 'completed' && (
                    <button
                      onClick={() => XeniosStore.updateRequestStatus(req.id, 'completed')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition shrink-0 cursor-pointer shadow-xs"
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
