"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { ServiceRequest, Hotel } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight
} from 'lucide-react';

interface PortalModule {
  id: string;
  title: string;
  desc: string;
  href: string;
  iconPath: string;
  badge?: string;
  badgeType?: 'danger' | 'warning' | 'success' | 'neutral';
  hasPulse?: boolean;
}

export default function HotelPortalDashboard() {
  const [hotels, setHotels] = useState<Hotel[]>(() => XeniosStore.getHotels());
  const [activeHotelId, setActiveHotelId] = useState<string>(() => XeniosStore.getActiveHotelId());
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  const refresh = () => {
    const list = XeniosStore.getHotels();
    setHotels(list);
    const id = XeniosStore.getActiveHotelId();
    setActiveHotelId(id);
    setRequests(XeniosStore.getRequests().filter(r => r.hotelId === id || !r.hotelId));
  };

  useEffect(() => {
    refresh();
    window.addEventListener('xenios_requests_updated', refresh);
    window.addEventListener('xenios_hotels_updated', refresh);
    return () => {
      window.removeEventListener('xenios_requests_updated', refresh);
      window.removeEventListener('xenios_hotels_updated', refresh);
    };
  }, []);

  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0] || {
    id: 'hotel-1',
    name: 'Pera Palace Hotel',
    district: 'Beyoğlu',
    type: 'Tarihi Lüks Otel',
    rooms: []
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const hasUnread = pendingRequests.length > 0;

  const modules: PortalModule[] = [
    {
      id: 'requests',
      title: 'Canlı Oda Talepleri',
      desc: 'Oda içi servisler, kat hizmetleri, mutfak ve resepsiyon talepleri masası',
      href: '/hotel-portal/requests',
      iconPath: '/icons/hotel-portal/canli-oda-talepleri.png',
      badge: hasUnread ? `${pendingRequests.length} Yeni Talep` : 'Talep Yok',
      badgeType: hasUnread ? 'danger' : 'neutral',
      hasPulse: hasUnread
    },
    {
      id: 'services',
      title: 'Otel İçi Hizmetler & Menü Yönetimi',
      desc: '16+ Otel içi servis kontrolü, F&B oda servisi menüsüne ürün, içerik ve fiyat ekleme',
      href: '/hotel-portal/services',
      iconPath: '/icons/hotel-portal/otel-ici-hizmetler-menu.png',
      badge: 'Canlı Senkronize',
      badgeType: 'success'
    },
    {
      id: 'rooms',
      title: 'Oda Panosu',
      desc: 'Oda durumları, kat envanteri, anlık doluluk ve temizlik takibi',
      href: '/hotel-portal/rooms',
      iconPath: '/icons/hotel-portal/oda-panosu.png',
      badge: `${currentHotel.rooms?.length || 0} Tanımlı Oda`,
      badgeType: 'neutral'
    },
    {
      id: 'channels',
      title: 'iCal & OTA Kanalları',
      desc: 'Airbnb, Booking.com, VRBO ve Expedia 2 yönlü takvim entegrasyonu',
      href: '/hotel-portal/channels',
      iconPath: '/icons/hotel-portal/ical-ota-kanallari.png',
      badge: '2 Yönlü Eşitleme',
      badgeType: 'success'
    },
    {
      id: 'qr-generator',
      title: 'Oda QR Kodları',
      desc: 'Her odaya özel dijital concierge standee QR kodları ve .ics takvim adresleri',
      href: '/hotel-portal/qr-generator',
      iconPath: '/icons/hotel-portal/oda-qr-kodlari.png',
      badge: 'Yazdır & İndir',
      badgeType: 'neutral'
    },
    {
      id: 'profile',
      title: 'Otel & Profil Ayarları',
      desc: 'Otel iletişim bilgileri, ön büro yöneticisi profili ve anlık bildirim tercihleri',
      href: '/hotel-portal/profile',
      iconPath: '/icons/hotel-portal/otel-profil-ayarlari.png',
      badge: 'Yönetici Profili',
      badgeType: 'neutral'
    },
    {
      id: 'kbs',
      title: 'Online Check-in & KBS',
      desc: 'Google Cloud Document AI OCR ile pasaport tarama ve EGM KBS kimlik bildirim sistemi',
      href: '/hotel-portal/kbs',
      iconPath: '/icons/hotel-portal/online-checkin-kbs.png',
      badge: 'EGM Uyumlu',
      badgeType: 'success'
    },
    {
      id: 'reports',
      title: 'Raporlar',
      desc: 'Misafir uygulama kullanımı, satış/randevu metrikleri ve Comus AI pasta dilimi dağılımı',
      href: '/hotel-portal/reports',
      iconPath: '/icons/hotel-portal/raporlar.png',
      badge: 'Canlı Analitik',
      badgeType: 'success'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-12">
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {modules.map((mod) => (
          <Link
            key={mod.id}
            href={mod.href}
            className="btn-3d p-3.5 sm:p-5 flex flex-col justify-between gap-3 sm:gap-4 group cursor-pointer text-left min-h-[170px] sm:min-h-[190px]"
          >
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-amber-50/80 border border-amber-200/70 p-1.5 sm:p-2 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform overflow-hidden relative">
                <Image
                  src={mod.iconPath}
                  alt={mod.title}
                  width={56}
                  height={56}
                  unoptimized
                  className="w-full h-full object-contain"
                />
                {mod.hasPulse && (
                  <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-rose-600"></span>
                  </span>
                )}
              </div>

              {mod.badge && (
                <span
                  className={`text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border shadow-2xs shrink-0 ${
                    mod.badgeType === 'danger'
                      ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                      : mod.badgeType === 'success'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  {mod.badge}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2 sm:line-clamp-1">
                {mod.title}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 leading-relaxed line-clamp-2">
                {mod.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-amber-700 group-hover:text-amber-900">
              <span>Modülü Aç</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform text-amber-600" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
