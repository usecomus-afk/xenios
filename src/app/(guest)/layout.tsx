import type { Metadata } from 'next';

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
    <div className="min-h-screen bg-[#f8f6f0] text-zinc-900 w-full relative flex flex-col antialiased">
      <div className="flex-1 pb-24">
        {children}
      </div>
    </div>
  );
}

