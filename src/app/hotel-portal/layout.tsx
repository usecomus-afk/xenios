"use client";

import { useState } from "react";
import { HotelSideNav } from "@/components/hotel/hotel-side-nav";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Menu, ArrowLeft, Building2, BellRing, QrCode } from "lucide-react";
import { XeniosStore } from "@/lib/store";

export default function HotelPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hotels = XeniosStore.getHotels();
  const activeHotelId = XeniosStore.getActiveHotelId();
  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-[#f2efe8] flex flex-col md:flex-row">
      <HotelSideNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-3.5 bg-[#12141a] border-b border-[#2c313d] sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-[#171a22] text-zinc-300 hover:text-white border border-[#2c313d] cursor-pointer"
            aria-label="Menüyü Aç"
          >
            <Menu className="w-4 h-4" />
          </button>
          <BrandMark size={28} showText={true} theme="dark" />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/hotel-portal/requests"
            className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 relative"
          >
            <BellRing className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="px-2 py-1.5 bg-[#171a22] text-zinc-300 border border-[#2c313d] rounded-xl text-[11px] font-semibold flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-[#2c313d] bg-[#12141a]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-300 font-bold">
              {currentHotel.name}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-mono font-bold border border-amber-500/30">
              {currentHotel.rooms.length} Oda Canlı
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hotel-portal/requests"
              className="px-3.5 py-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <BellRing className="w-3.5 h-3.5 text-red-400" />
              <span>Canlı Talepler</span>
            </Link>
            <Link
              href="/hotel-portal/qr-generator"
              className="px-3.5 py-1.5 bg-[#171a22] hover:bg-[#202430] text-zinc-300 border border-[#2c313d] rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-400" />
              <span>Oda QR'ları</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
