"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { XeniosStore } from "@/lib/store";
import { Hotel } from "@/lib/types";
import {
  LayoutDashboard,
  BellRing,
  LayoutGrid,
  DoorOpen,
  CalendarSync,
  CreditCard,
  QrCode,
  ArrowLeft,
  X,
  ChevronDown,
  Building2,
  ShieldCheck,
  Sparkles
} from "lucide-react";

interface HotelSideNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function HotelSideNav({ isOpen, onClose }: HotelSideNavProps) {
  const pathname = usePathname();
  const hotels = XeniosStore.getHotels();
  const [activeHotelId, setActiveHotelId] = useState<string>(() => XeniosStore.getActiveHotelId());
  const [pendingReqCount, setPendingReqCount] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const id = XeniosStore.getActiveHotelId();
      setActiveHotelId(id);
      const reqs = XeniosStore.getRequests().filter(r => r.status === 'pending');
      setPendingReqCount(reqs.length);
    };
    refresh();
    window.addEventListener('xenios_requests_updated', refresh);
    return () => window.removeEventListener('xenios_requests_updated', refresh);
  }, []);

  const activeHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  const handleHotelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setActiveHotelId(newId);
    XeniosStore.setActiveHotelId(newId);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // Otel Yönetimi Menü Listesi
  const navItems = [
    { href: "/hotel-portal", label: "Otel Kokpiti / Özet", icon: LayoutDashboard },
    { href: "/hotel-portal/requests", label: "Canlı Oda Talepleri", icon: BellRing, badge: pendingReqCount > 0 ? `${pendingReqCount} Canlı` : undefined },
    { href: "/hotel-portal/services", label: "Otel İçi Hizmetler & Menü", icon: LayoutGrid },
    { href: "/hotel-portal/rooms", label: "Oda Durumları & Envanter", icon: DoorOpen },
    { href: "/hotel-portal/channels", label: "iCal & OTA Kanalları", icon: CalendarSync },
    { href: "/hotel-portal/bookings", label: "Misafir Rezervasyon & Gelir", icon: CreditCard },
    { href: "/hotel-portal/qr-generator", label: "Oda QR Kodları", icon: QrCode },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#12141a] text-zinc-100">
      {/* Brand Header */}
      <div className="border-b border-[#2c313d] px-5 py-4 flex items-center justify-between">
        <div>
          <BrandMark size={34} showText={true} theme="dark" />
          <p className="text-[10px] text-amber-400 font-mono tracking-wider mt-1 uppercase">
            Partner Otel Yönetim Portalı
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg bg-[#171a22] text-zinc-400 hover:text-white border border-[#2c313d] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hotel Switcher Selector */}
      <div className="p-3 border-b border-[#2c313d] bg-[#171a22]/80">
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-1 mb-1.5">
          <Building2 className="w-3 h-3 text-amber-400" /> Aktif Yönetilen Otel
        </label>
        <div className="relative">
          <select
            value={activeHotel.id}
            onChange={handleHotelChange}
            className="w-full text-xs font-bold bg-[#0f1116] border border-amber-500/40 text-amber-300 rounded-xl px-3 py-2 pr-7 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
          >
            {hotels.map((h) => (
              <option key={h.id} value={h.id} className="bg-[#12141a] text-white">
                {h.name} ({h.district})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-amber-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
        <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1.5 px-0.5">
          <span>{activeHotel.rooms.length} Tanımlı Oda</span>
          <span className="text-emerald-400 font-mono font-bold">● Canlı Bağlantı</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/hotel-portal' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                active
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Return to Master Admin & Guest PWA */}
      <div className="p-3 border-t border-[#2c313d] space-y-2">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#171a22] hover:bg-[#202430] text-amber-400 rounded-xl text-xs font-bold border border-amber-500/30 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Master Admin Masasına Dön</span>
        </Link>
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#0f1116] hover:bg-[#171a22] text-zinc-400 rounded-xl text-[11px] font-semibold border border-[#2c313d] transition"
        >
          <span>Misafir PWA Ekranı (Önizleme)</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-[#2c313d] bg-[#12141a]/95 md:flex md:flex-col text-zinc-100">
        {content}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 border-r border-[#2c313d]">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
