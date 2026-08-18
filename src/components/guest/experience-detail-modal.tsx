"use client";

import { useState } from 'react';
import { Experience, Hotel, Language } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Star, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Users, 
  Activity, 
  Accessibility, 
  CalendarCheck, 
  MessageSquare, 
  Navigation, 
  CreditCard,
  Maximize2,
  CheckCircle2,
  ChevronRight,
  Shield,
  ExternalLink,
  Phone,
  Utensils
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface ExperienceDetailModalProps {
  experience: Experience | null;
  hotel: Hotel;
  lang: Language;
  onClose: () => void;
  onOpenTransit: (exp: Experience) => void;
  onOpenCheckout: (exp: Experience) => void;
}

export function ExperienceDetailModal({
  experience,
  hotel,
  lang,
  onClose,
  onOpenTransit,
  onOpenCheckout
}: ExperienceDetailModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number>(0);

  if (!experience) return null;

  const t = getT(lang);
  const imageSrc = experience.image || `/images/experiences/${experience.id}.jpg`;
  const isRestaurant = experience.category.toLowerCase().includes('restoran') || experience.id.startsWith('rest-');

  // Dynamic tailored steps based on category
  const steps = [
    {
      title: isRestaurant ? "Masa Rezervasyonu & Karşılama" : "Buluşma & Sıcak Karşılama",
      desc: isRestaurant 
        ? `${experience.title} ekibi tarafından kapıda karşılama ve ayrılan masanıza yerleşim.` 
        : `${experience.provider} ekibi tarafından belirlenen noktada Türk çayı veya ikramlarla samimi bir karşılama.`,
      img: imageSrc
    },
    {
      title: isRestaurant ? "Menü & Gurme Tadım Rehberi" : "Tarih ve Zanaat Hikayesi",
      desc: isRestaurant 
        ? `${experience.cuisine || 'Şef'} imzalı mevsimlik lezzetler ve imza spesiyallerin tanıtımı.` 
        : "Uzman rehber ve zanaatkarlardan deneyimin köklü İstanbul tarihi ve inceliklerini öğrenin.",
      img: "/images/istanbul/499db9bf1acc9374f13ea0b3d0043ce6.webp"
    },
    {
      title: isRestaurant ? "Ana Lezzet & Gastronomi Şöleni" : "Uygulama & Ana Deneyim",
      desc: isRestaurant 
        ? `Taze yerel malzemeler ve usta şefler tarafından hazırlanan özel tabakların sunumu.` 
        : `Rehberlik eşliğinde ${experience.title.toLowerCase()} sürecine bizzat dahil olun.`,
      img: "/images/istanbul/63bab1fbccecc867bfd70f0f41b0d943.webp"
    },
    {
      title: isRestaurant ? "Geleneksel Tatlı & İkramlar" : "İkramlar & Fotoğraf Çekimi",
      desc: isRestaurant 
        ? "İstanbul usulü kahve veya geleneksel tatlı ikramlarıyla lezzet deneyiminin tamamlanması." 
        : "Geleneksel Türk lezzetlerinin tadını çıkarırken unutulmaz anı fotoğrafları çekilin.",
      img: "/images/istanbul/il_1588xN.7346047570_63w8.webp"
    }
  ];

  // Time slots
  const slots = [
    { id: 0, day: "Bugün", time: "18:00 – 20:00", quota: "Masa müsait" },
    { id: 1, day: "Bugün", time: "20:30 – 22:30", quota: "Popüler saat" },
    { id: 2, day: "Yarın", time: "19:00 – 21:00", quota: "Rezervasyon açık" }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: experience.title,
        text: experience.agentNote,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("İlan bağlantısı kopyalandı!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-5 duration-300">
      
      {/* Top Floating Airbnb Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-800 transition cursor-pointer"
          aria-label="Geri Dön"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-semibold text-zinc-600 truncate max-w-[200px] sm:max-w-md">
          {experience.location} · {experience.categoryTag || experience.category}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-700 transition cursor-pointer"
            title="Paylaş"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              toast.success(isLiked ? "Favorilerden çıkarıldı" : "Favorilere eklendi!");
            }}
            className="w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-700 transition cursor-pointer"
            title="Favorilere Ekle"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Content Scroll Area */}
      <div className="max-w-2xl mx-auto px-4 pt-4 pb-32 space-y-7">
        
        {/* Hero Photo Carousel Card */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg bg-zinc-900">
          <Image
            src={imageSrc}
            alt={experience.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          {/* TÜRSAB / Verified Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-zinc-900 text-xs font-bold shadow-md backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isRestaurant ? 'Doğrulanmış Restoran' : 'TÜRSAB Lisanslı'}</span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 text-amber-300 text-xs font-bold shadow-md backdrop-blur-md border border-amber-400/40">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{experience.scoreStr || '4.8/5'}</span>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        </div>

        {/* Title & Headline Section */}
        <div className="space-y-3 pb-5 border-b border-zinc-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              {experience.categoryTag || experience.category}
            </span>
            {experience.cuisine && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200">
                🍽️ {experience.cuisine}
              </span>
            )}
            {experience.priceLevel && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                💰 {experience.priceLevel}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900 leading-tight">
            {experience.title}
          </h1>

          <p className="text-sm text-zinc-600 leading-relaxed font-sans">
            {experience.agentNote}
          </p>

          {/* Öne Çıkan Lezzetler / Specialties Section */}
          {experience.specialties && experience.specialties.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Öne Çıkan İmza Lezzetler</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {experience.specialties.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-white text-zinc-800 border border-amber-300 shadow-2xs"
                  >
                    <span className="text-amber-600">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
            <Globe className="w-4 h-4 text-zinc-400" />
            <span>Türkçe, İngilizce & Uluslararası menü desteği</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 pt-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Xenios Doğrulanmış İşletme & Tüketici Güvencesi</span>
            </span>
          </div>
        </div>

        {/* Host Info & Quick Specs */}
        <div className="space-y-4 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-300 flex items-center justify-center text-amber-900 font-bold font-serif text-lg">
              {experience.provider.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">{experience.provider}</h3>
              <p className="text-xs text-zinc-500">{experience.cuisine || (experience.categoryTag || experience.category)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 text-xs text-zinc-700">
            <MapPin className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-zinc-900">{experience.location}</strong>
              <span className="text-zinc-500">İstanbul</span>
            </div>
          </div>

          {experience.phone && (
            <div className="flex items-start gap-3.5 text-xs text-zinc-700">
              <Phone className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900">Telefon & Rezervasyon</strong>
                <a href={`tel:${experience.phone}`} className="text-amber-700 font-mono font-semibold hover:underline">
                  {experience.phone}
                </a>
              </div>
            </div>
          )}

          {experience.website && (
            <div className="flex items-start gap-3.5 text-xs text-zinc-700">
              <Globe className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900">Resmi Web Sitesi / Menü</strong>
                <a 
                  href={experience.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-amber-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>{experience.website}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* NELER YAPACAKSINIZ? (Timeline Step-by-Step) */}
        <div className="space-y-4 pb-7 border-b border-zinc-200">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
            {isRestaurant ? 'Gastronomi Deneyimi Akışı' : 'Neler yapacaksınız?'}
          </h2>

          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3.5 rounded-2xl bg-zinc-50 hover:bg-amber-50/40 border border-zinc-100 transition">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative bg-zinc-200 shadow-xs">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900">{step.title}</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DEĞERLENDİRMELER & KALİTE GÜVENCESİ */}
        <div className="space-y-4 pb-7 border-b border-zinc-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
              Misafir Değerlendirmeleri & Puan
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{experience.scoreStr || '4.8/5'}</span>
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-lg">
                ★
              </div>
              <div>
                <strong className="text-xs text-zinc-900 block font-bold">
                  {experience.reviewsCount ? `${experience.reviewsCount} Google / Tripadvisor Skoru` : 'Yüksek Misafir Memnuniyeti'}
                </strong>
                <span className="text-[11px] text-zinc-500">Bu işletme Xenios kalite ve tüketici hakları onaylıdır.</span>
              </div>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Ziyaretiniz sonrasında değerlendirme yaparak İstanbul'u keşfeden diğer misafirlere rehberlik edebilirsiniz.
            </p>
          </div>
        </div>

        {/* BULUŞACAĞIMIZ YER (Meeting Point & Map) */}
        <div className="space-y-3 pb-7 border-b border-zinc-200">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
            {isRestaurant ? 'Restoran Konumu & Ulaşım' : 'Buluşacağımız yer'}
          </h2>
          <p className="text-xs text-zinc-600 font-mono">
            {experience.location}, İstanbul
          </p>

          {/* Live Open Google Maps Container */}
          <div className="space-y-2.5">
            <div className="relative h-64 w-full rounded-3xl overflow-hidden border border-zinc-300 shadow-md bg-zinc-100">
              <iframe
                title="Google Maps Buluşma Noktası"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(experience.location + ', Istanbul, Turkey')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(experience.location + ', Istanbul, Turkey')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Haritalar'da Aç</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <button
                type="button"
                onClick={() => onOpenTransit(experience)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Otelden Ulaşım Rotası</span>
              </button>
            </div>
          </div>
        </div>

        {/* HAKKIMDA / İŞLETME PROFİLİ */}
        <div className="space-y-4 pb-7 border-b border-zinc-200">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
            {isRestaurant ? 'İşletme & Mutfak Hakkında' : 'Hakkımda'}
          </h2>

          <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-white font-serif font-bold text-xl flex items-center justify-center">
                {experience.provider.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">{experience.title}</h3>
                <p className="text-xs text-zinc-500">{experience.cuisine || experience.provider}</p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              {experience.agentNote}
            </p>

            <div className="flex items-center gap-2 pt-1">
              {experience.phone && (
                <a
                  href={`tel:${experience.phone}`}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Telefonla Rezervasyon</span>
                </a>
              )}
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                  <span>Web Sitesi & Menü</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* BİLİNMESİ GEREKENLER (Requirements & Policy) */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
            Bilinmesi gerekenler
          </h2>

          <div className="space-y-4 text-xs text-zinc-700">
            <div className="flex items-start gap-3.5">
              <Users className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-bold">Rezervasyon Politikası</strong>
                <p className="text-zinc-500 mt-0.5">Akşam saatleri ve teras masaları için önceden telefonla veya web üzerinden rezervasyon önerilir.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Activity className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-bold">Kıyafet & Atmosfer</strong>
                <p className="text-zinc-500 mt-0.5">Smart Casual / Şık günlük kıyafet tarzı uygundur.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FLOATING BOTTOM BAR (Sticky Footer) */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-zinc-200 p-4 safe-bottom z-50 shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Xenios Onaylı Mekan</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                {isRestaurant ? 'Fiyat Seviyesi' : 'Başlangıç Fiyatı'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-bold font-mono text-zinc-900">
                  {experience.priceLevel || formatPrice(experience.price, experience.currency)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isRestaurant ? (
              <>
                {experience.phone && (
                  <a
                    href={`tel:${experience.phone}`}
                    className="px-4 sm:px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition transform active:scale-95 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Ara / Rezervasyon</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onOpenTransit(experience)}
                  className="px-3.5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/25 flex items-center gap-1.5 transition cursor-pointer"
                  title="Yol Tarifi"
                >
                  <Navigation className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onOpenCheckout(experience)}
                className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-lg shadow-black/20 flex items-center gap-2 transition transform active:scale-95 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Tarihleri Göster & Rezerve Et</span>
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
