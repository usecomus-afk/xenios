"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { 
  LayoutDashboard, 
  Building2, 
  QrCode, 
  Sparkles, 
  BellRing, 
  CreditCard, 
  Settings, 
  ArrowLeft,
  Compass,
  Scale
} from "lucide-react";

export function CockpitSideNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Kokpit / Özet", icon: LayoutDashboard },
    { href: "/live-requests", label: "Canlı Oda Talepleri", icon: BellRing, badge: "Canlı" },
    { href: "/disputes", label: "Misafir Hakları & Hakem", icon: Scale, badge: "Hakem" },
    { href: "/hotels", label: "43 Otel Yönetimi", icon: Building2 },
    { href: "/qr-generator", label: "Oda QR Üretici", icon: QrCode },
    { href: "/experiences", label: "52 Deneyim Kataloğu", icon: Compass },
    { href: "/bookings", label: "Sanal POS Rezervasyonları", icon: CreditCard },
    { href: "/settings", label: "Gemini & Sistem Ayarları", icon: Settings },
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#2c313d] bg-[#12141a]/95 md:flex md:flex-col text-zinc-100">
      {/* Brand Header */}
      <div className="cockpit-scan border-b border-[#2c313d] px-5 py-4">
        <BrandMark size={38} showText={true} theme="dark" />
        <p className="text-[10px] text-amber-400/80 uppercase tracking-widest mt-1">ComusV2 Central Deck</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                active
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-pulse ${
                  item.badge === 'Hakem' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Return to Guest App */}
      <div className="p-3 border-t border-[#2c313d]">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl text-xs font-bold border border-amber-500/30 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Misafir PWA Moduna Geç</span>
        </Link>
      </div>
    </aside>
  );
}
