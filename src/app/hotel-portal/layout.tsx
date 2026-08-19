"use client";

import { useState } from "react";
import { HotelSideNav } from "@/components/hotel/hotel-side-nav";
import { HotelAuthGuard } from "@/components/hotel/hotel-auth-guard";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Menu, ArrowLeft, Building2, BellRing, QrCode, LogOut, UserCog } from "lucide-react";
import { XeniosStore } from "@/lib/store";
import { toast } from "sonner";

export default function HotelPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hotels = XeniosStore.getHotels();
  const activeHotelId = XeniosStore.getActiveHotelId();
  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  const handleLogout = () => {
    XeniosStore.setHotelPortalLoggedIn(false);
    toast.info("Otel Yönetim Paneli oturumu kapatıldı.");
  };

  return (
    <HotelAuthGuard>
      <div className="min-h-screen bg-[#f8f6f0] text-zinc-900 flex flex-col md:flex-row">
        <HotelSideNav
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Top Header */}
        <div className="md:hidden flex items-center justify-between p-3.5 bg-white border-b border-amber-200/80 sticky top-0 z-40 shadow-xs">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-amber-50 text-zinc-700 hover:text-zinc-900 border border-amber-200 cursor-pointer"
              aria-label="Menüyü Aç"
            >
              <Menu className="w-4 h-4" />
            </button>
            <BrandMark size={28} showText={true} theme="light" />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/hotel-portal/requests"
              className="p-2 rounded-xl bg-amber-500/15 text-amber-900 border border-amber-300 relative shadow-xs"
            >
              <BellRing className="w-4 h-4 text-amber-700" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-1.5 bg-zinc-100 hover:bg-red-50 text-zinc-600 hover:text-red-700 border border-zinc-200 rounded-xl transition cursor-pointer"
              title="Çıkış Yap"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-amber-200/80 bg-white/85 backdrop-blur-md sticky top-0 z-30 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs text-zinc-900 font-bold">
                {currentHotel.name} • Otel Yönetim Paneli
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold border border-amber-300">
                {currentHotel.rooms.length} Oda Canlı
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/hotel-portal/profile"
                className="px-3.5 py-1.5 bg-white hover:bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              >
                <UserCog className="w-3.5 h-3.5 text-amber-700" />
                <span>Profil & Ayarlar</span>
              </Link>
              <Link
                href="/hotel-portal/requests"
                className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              >
                <BellRing className="w-3.5 h-3.5 text-red-600" />
                <span>Canlı Talepler</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-white hover:bg-red-50 text-zinc-600 hover:text-red-700 border border-zinc-200 hover:border-red-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Çıkış</span>
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto space-y-6">
            {children}
          </main>
        </div>
      </div>
    </HotelAuthGuard>
  );
}
