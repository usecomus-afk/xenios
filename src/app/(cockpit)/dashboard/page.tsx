"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { Booking, Complaint, PropertyListing } from '@/lib/types';
import Link from 'next/link';
import {
  Building2,
  CreditCard,
  CheckCircle2,
  Clock,
  TrendingUp,
  QrCode,
  ArrowRight,
  Settings,
  ShieldCheck,
  Compass,
  Scale,
  Sparkles,
  Hotel,
  ArrowUpRight,
  Users,
  MapPin,
  FileCheck,
  DollarSign
} from 'lucide-react';

export default function MasterAdminDashboard() {
  const hotels = XeniosStore.getHotels();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [properties, setProperties] = useState<PropertyListing[]>([]);

  useEffect(() => {
    setBookings(XeniosStore.getBookings());
    setComplaints(XeniosStore.getComplaints());
    setProperties(XeniosStore.getPropertyListings());

    const handleBook = () => setBookings(XeniosStore.getBookings());
    const handleComp = () => setComplaints(XeniosStore.getComplaints());
    const handleProp = () => setProperties(XeniosStore.getPropertyListings());

    window.addEventListener('xenios_bookings_updated', handleBook);
    window.addEventListener('xenios_complaints_updated', handleComp);
    window.addEventListener('xenios_properties_updated', handleProp);

    return () => {
      window.removeEventListener('xenios_bookings_updated', handleBook);
      window.removeEventListener('xenios_complaints_updated', handleComp);
      window.removeEventListener('xenios_properties_updated', handleProp);
    };
  }, []);

  const totalPosRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const platformCommission = Math.round(totalPosRevenue * 0.15);
  const pendingComplaints = complaints.filter(c => c.status === 'under_review').length;
  const resolvedRefunds = complaints.filter(c => c.status === 'resolved_refunded').length;

  return (
    <div className="space-y-6 text-zinc-100 pb-12">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/20 via-[#171a22] to-[#12141a] p-6 rounded-3xl border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-mono">
              Xenios Master Operations Deck
            </span>
            <span className="text-xs text-zinc-400">Proje Yöneticisi Masası</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1.5">
            İstanbul Turizm & Partnerlik Yönetimi
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Platform geneli 43 partner otel, 72 doğrulanmış İstanbul deneyimi, 20 gayrimenkul yatırım portföyü ve misafir hakem masası merkezi kontrolü.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/hotel-portal"
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-2xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            <Hotel className="w-4 h-4" />
            <span>Otel Kokpitine Geç ↗</span>
          </Link>
          <Link
            href="/admin"
            className="px-3.5 py-2.5 bg-[#171a22] hover:bg-[#202430] text-zinc-300 border border-[#2c313d] font-bold rounded-2xl text-xs flex items-center gap-1.5 transition"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>İlanları Yönet</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Deck (Platform Global Stats) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* 1. Finansal POS Cirosu */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold text-white">Toplam Platform Cirosu</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              €{totalPosRevenue.toLocaleString('tr-TR')}
            </div>
            <p className="text-[10px] text-zinc-400 mt-0.5">
              Net Komisyon: <strong className="text-amber-400 font-mono">€{platformCommission}</strong> (%15)
            </p>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1.5 border-t border-[#2c313d] flex items-center justify-between">
            <span>Toplam İşlem:</span>
            <strong className="text-zinc-300 font-mono">{bookings.length} Rezervasyon</strong>
          </div>
        </div>

        {/* 2. Partner Oteller */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold text-white">Anlaşmalı Partner Oteller</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">
              {hotels.length}
            </div>
            <p className="text-[10px] text-zinc-400 mt-0.5">
              Tarihi Yarımada, Boğaz & Beyoğlu
            </p>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1.5 border-t border-[#2c313d] flex items-center justify-between">
            <span>Toplam Oda Kapasitesi:</span>
            <strong className="text-amber-400 font-mono">1.840+ Oda</strong>
          </div>
        </div>

        {/* 3. İlan Portföyü */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold text-white">Doğrulanmış İlan Kataloğu</span>
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-cyan-400">
              72 + 20
            </div>
            <p className="text-[10px] text-zinc-400 mt-0.5">
              72 Tur & Restoran + 20 Yatırım
            </p>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1.5 border-t border-[#2c313d] flex items-center justify-between">
            <span>Kategori Sayısı:</span>
            <strong className="text-cyan-300 font-mono">13 Özel Kategori</strong>
          </div>
        </div>

        {/* 4. Hakem & Tüketici Kalkanı */}
        <div className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-bold text-white">Misafir Hakları & Hakem</span>
            <Scale className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-red-400">
              {pendingComplaints}
            </div>
            <p className="text-[10px] text-zinc-400 mt-0.5">
              İncelenen Mağduriyet / İade
            </p>
          </div>
          <div className="text-[10px] text-zinc-500 pt-1.5 border-t border-[#2c313d] flex items-center justify-between">
            <span>Çözülen İadeler:</span>
            <strong className="text-emerald-400 font-mono">{resolvedRefunds} Misafir</strong>
          </div>
        </div>
      </div>

      {/* Shortcut Module: Partner Otel Portalı Köprüsü */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#171a22] to-[#12141a] border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Hotel className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Otel Yönetimi Kokpiti (Partner Otel Girişi)</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                Otele Özel Ekran
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 max-w-xl">
              Anlaşmalı otellerin kat hizmetleri, canlı oda talepleri masası, iCal/OTA kanal senkronizasyonu ve oda envanterini test etmek için otel kokpitine geçebilirsiniz.
            </p>
          </div>
        </div>

        <Link
          href="/hotel-portal"
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 shadow-md shadow-amber-500/20"
        >
          <span>Otel Paneline Gir →</span>
        </Link>
      </div>

      {/* Partner Hotels Table / List with Direct Access */}
      <div className="p-6 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Anlaşmalı Partner Oteller Listesi</h3>
            <p className="text-xs text-zinc-400">Tesislerin durumunu inceleyin veya otele ait operasyon kokpitine doğrudan bağlanın.</p>
          </div>
          <Link
            href="/hotels"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            <span>Tüm Oteller ({hotels.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {hotels.slice(0, 6).map((hotel) => (
            <div
              key={hotel.id}
              className="p-4 rounded-2xl bg-[#0f1116] border border-[#2c313d] hover:border-amber-500/40 transition flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-semibold">
                      {hotel.type}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1 leading-snug">{hotel.name}</h4>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-bold bg-[#171a22] px-2 py-0.5 rounded-lg border border-[#2c313d]">
                    ★ {hotel.ratingStr.split(' ')[0]}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="truncate">{hotel.district}, İstanbul</span>
                </p>
              </div>

              <div className="pt-2.5 border-t border-[#2c313d] flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 font-mono">{hotel.rooms.length} Oda</span>
                <Link
                  href={`/hotel-portal?hotelId=${hotel.id}`}
                  className="px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 rounded-xl text-[11px] font-bold flex items-center gap-1 transition"
                >
                  <span>Otel Kokpiti</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sanal POS Bookings & Guest Protection Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Bookings */}
        <div className="p-6 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Son Sanal POS Rezervasyonları</span>
            </h3>
            <Link href="/bookings" className="text-xs text-amber-400 hover:text-amber-300 font-semibold">
              Tümü →
            </Link>
          </div>

          {bookings.length === 0 ? (
            <p className="text-xs text-zinc-500 py-4 text-center">Henüz işlem bulunmuyor.</p>
          ) : (
            <div className="space-y-2">
              {bookings.slice(0, 4).map((b) => (
                <div key={b.id} className="p-3 bg-[#0f1116] rounded-xl border border-[#2c313d] flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-white block">{b.experienceTitle}</strong>
                    <span className="text-[10px] text-zinc-400">{b.guestName} • Oda {b.roomNumber}</span>
                  </div>
                  <div className="text-right">
                    <strong className="text-emerald-400 font-mono block">€{b.amount}</strong>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      {b.status === 'confirmed' ? 'Onaylandı' : 'Ödendi'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Disputes & Consumer Protection */}
        <div className="p-6 rounded-3xl bg-[#171a22] border border-[#2c313d] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-red-400" />
              <span>Misafir Hakları & Hakem Masası</span>
            </h3>
            <Link href="/disputes" className="text-xs text-amber-400 hover:text-amber-300 font-semibold">
              Masaya Git →
            </Link>
          </div>

          {complaints.length === 0 ? (
            <p className="text-xs text-zinc-500 py-4 text-center">Aktif hakem şikayeti bulunmuyor.</p>
          ) : (
            <div className="space-y-2">
              {complaints.slice(0, 4).map((c) => (
                <div key={c.id} className="p-3 bg-[#0f1116] rounded-xl border border-[#2c313d] flex items-center justify-between text-xs">
                  <div className="min-w-0 flex-1 pr-2">
                    <strong className="text-white block truncate">{c.businessName}</strong>
                    <span className="text-[10px] text-zinc-400">{c.businessCategory} • {c.guestName}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <strong className="text-red-400 font-mono block">{c.amountPaid} {c.currency}</strong>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                      İnceleniyor
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
