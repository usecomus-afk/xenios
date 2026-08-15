"use client";

import { CockpitSideNav } from "@/components/cockpit/side-nav";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { ArrowLeft, Bell, ShieldCheck } from "lucide-react";

export default function CockpitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b0c0f] text-[#f2efe8] flex flex-col md:flex-row">
      <CockpitSideNav />

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-3 bg-[#12141a] border-b border-[#2c313d]">
        <BrandMark size={32} showText={true} theme="dark" />
        <Link
          href="/"
          className="px-2.5 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Misafir PWA</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-[#2c313d] bg-[#12141a]/60 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400 font-mono">Xenios Canlı Yönetim Masası (43 Otel Aktif)</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/qr-generator"
              className="px-3 py-1.5 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold hover:bg-amber-500/25 transition"
            >
              + Yeni Oda QR Kod Üret
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
