"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HotelAuthGuard } from "@/components/hotel/hotel-auth-guard";
import { BrandMark } from "@/components/brand-mark";
import { Building2, BellRing, LogOut, ArrowLeft, ChevronDown } from "lucide-react";
import { XeniosStore } from "@/lib/store";
import { toast } from "sonner";

export default function HotelPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hotels, setHotels] = useState(() => XeniosStore.getHotels());
  const [activeHotelId, setActiveHotelId] = useState(() => XeniosStore.getActiveHotelId());
  const [pendingReqCount, setPendingReqCount] = useState(0);

  const refreshState = () => {
    const list = XeniosStore.getHotels();
    setHotels(list);
    const id = XeniosStore.getActiveHotelId();
    setActiveHotelId(id);
    const reqs = XeniosStore.getRequests().filter(
      r => (r.hotelId === id || !r.hotelId) && r.status === 'pending'
    );
    setPendingReqCount(reqs.length);
  };

  useEffect(() => {
    refreshState();
    window.addEventListener('xenios_hotels_updated', refreshState);
    window.addEventListener('xenios_requests_updated', refreshState);
    return () => {
      window.removeEventListener('xenios_hotels_updated', refreshState);
      window.removeEventListener('xenios_requests_updated', refreshState);
    };
  }, []);

  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0] || {
    id: 'hotel-1',
    name: 'Pera Palace Hotel',
    district: 'Beyoğlu',
    rooms: []
  };

  const handleHotelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setActiveHotelId(newId);
    XeniosStore.setActiveHotelId(newId);
    toast.success(`Yönetilen Otel: ${hotels.find(h => h.id === newId)?.name || newId}`);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleLogout = () => {
    XeniosStore.setHotelPortalLoggedIn(false);
    toast.info("Yönetim Paneli oturumu kapatıldı.");
  };

  const isSubPage = pathname !== '/hotel-portal';

  return (
    <HotelAuthGuard>
      <div className="min-h-screen bg-[#f8f6f0] text-zinc-900 flex flex-col">
        {/* Modern Top Header Bar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs px-3.5 sm:px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            
            {/* Left: Brand & Title / Back Button */}
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/hotel-portal" className="flex items-center gap-2.5 shrink-0">
                <BrandMark size={32} showText={false} theme="light" />
                <div className="hidden xs:block">
                  <span className="font-serif font-extrabold text-sm sm:text-base text-zinc-900 tracking-tight block leading-tight">
                    XENIOS
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                    Yönetim Paneli
                  </span>
                </div>
              </Link>

              {isSubPage && (
                <Link
                  href="/hotel-portal"
                  className="px-3 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 text-xs font-bold border border-amber-200/80 shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Yönetim Paneline Dön</span>
                  <span className="sm:hidden">Ana Sayfa</span>
                </Link>
              )}
            </div>

            {/* Right: Hotel Switcher, Live Notifications & Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Hotel Selector */}
              <div className="relative">
                <select
                  value={currentHotel.id}
                  onChange={handleHotelChange}
                  className="text-xs font-bold bg-amber-50/60 hover:bg-amber-50 border border-amber-300/80 text-zinc-900 rounded-2xl px-3 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-amber-500/40 appearance-none cursor-pointer shadow-xs max-w-[140px] sm:max-w-[210px] truncate"
                  title="Yönetilen Otel"
                >
                  {hotels.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-amber-800 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>

              {/* Notification Button */}
              <Link
                href="/hotel-portal/requests"
                className={`p-2 rounded-2xl border transition relative shadow-xs flex items-center gap-1.5 text-xs font-bold ${
                  pendingReqCount > 0
                    ? 'bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100'
                    : 'bg-white border-amber-200 text-zinc-700 hover:bg-amber-50'
                }`}
                title="Canlı Oda Talepleri"
              >
                <BellRing className={`w-4 h-4 ${pendingReqCount > 0 ? 'text-rose-600 animate-bounce' : 'text-zinc-600'}`} />
                {pendingReqCount > 0 && (
                  <span className="flex items-center gap-1 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    <span>{pendingReqCount}</span>
                  </span>
                )}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 sm:px-3 sm:py-1.5 bg-white hover:bg-rose-50 text-zinc-600 hover:text-rose-700 border border-zinc-200 hover:border-rose-200 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Çıkış Yap"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Çıkış</span>
              </button>
            </div>

          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 max-w-6xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </HotelAuthGuard>
  );
}

