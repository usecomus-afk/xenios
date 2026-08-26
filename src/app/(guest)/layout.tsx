import type { Metadata } from 'next';
import { MobileFooterNav } from '@/components/navigation/MobileFooterNav';

export const metadata: Metadata = {
  title: 'Xenios - Misafir Rehberi & Concierge',
  description: 'İstanbul Dijital Otel Rehberi, Oda İçi Hizmetler, Şehir Deneyimleri & AI Concierge',
};

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f6f0] text-zinc-900 w-full flex flex-col antialiased">
      {/* 1. Ana içerik alanına alt bar yüksekliği kadar padding-bottom (pb-24) ver. */}
      {/* 2. Ana içerikte transform veya perspective kullanma. */}
      <div className="flex-1 pb-24">
        {children}
      </div>
      {/* Alt Navibar doğrudan root layout seviyesinde render edilmeli. */}
      <MobileFooterNav />
    </div>
  );
}

