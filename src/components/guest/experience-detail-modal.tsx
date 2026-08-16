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
  Shield
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

  // Dynamic tailored steps based on category
  const steps = [
    {
      title: "Buluşma & Sıcak Karşılama",
      desc: `${experience.provider} ekibi tarafından belirlenen noktada Türk çayı veya ikramlarla samimi bir karşılama.`,
      img: imageSrc
    },
    {
      title: "Tarih ve Zanaat Hikayesi",
      desc: "Uzman rehber ve zanaatkarlardan deneyimin köklü İstanbul tarihi ve inceliklerini öğrenin.",
      img: "/images/istanbul/499db9bf1acc9374f13ea0b3d0043ce6.webp"
    },
    {
      title: "Uygulama & Ana Deneyim",
      desc: `Rehberlik eşliğinde ${experience.title.toLowerCase()} sürecine bizzat dahil olun.`,
      img: "/images/istanbul/63bab1fbccecc867bfd70f0f41b0d943.webp"
    },
    {
      title: "İkramlar & Fotoğraf Çekimi",
      desc: "Geleneksel Türk lezzetlerinin tadını çıkarırken unutulmaz anı fotoğrafları çekilin.",
      img: "/images/istanbul/il_1588xN.7346047570_63w8.webp"
    },
    {
      title: "Kapanış & Hatıra",
      desc: "Deneyiminizi benzersiz bir anı veya eserle tamamlayıp güvenle ayrılın.",
      img: "/images/istanbul/il_1588xN.7982654509_jcsh.webp"
    }
  ];

  // Dynamic reviews
  const reviews = [
    {
      author: "Anais M.",
      location: "Lille, Fransa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      rating: 5,
      date: "Dün",
      content: `Bu deneyim kesinlikle seyahatimizin en güzel anıydı! ${experience.provider} ekibi çok nazik ve misafirperverdi. Her şey adım adım açıklandı. İstanbul'a gelen herkese tavsiye ederim.`
    },
    {
      author: "David & Sarah K.",
      location: "Londra, İngiltere",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      rating: 5,
      date: "3 gün önce",
      content: `${experience.title} beklentilerimizin çok üzerindeydi. Otelimizden ulaşım da çok rahattı. Hem eğlenceli hem çok bilgilendirici bir etkinlikti.`
    }
  ];

  // Time slots
  const slots = [
    { id: 0, day: "Bugün", time: "16:00 – 18:00", quota: "10 uygun yer var" },
    { id: 1, day: "Bugün", time: "19:00 – 21:00", quota: "6 uygun yer var" },
    { id: 2, day: "Yarın", time: "14:00 – 16:00", quota: "12 uygun yer var" }
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
          
          {/* TÜRSAB Verified Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-zinc-900 text-xs font-bold shadow-md backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>TÜRSAB Lisanslı</span>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        </div>

        {/* Title & Headline Section */}
        <div className="space-y-3 pb-5 border-b border-zinc-200">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900 leading-tight">
            {experience.title}
          </h1>

          <p className="text-sm text-zinc-600 leading-relaxed font-sans">
            {experience.agentNote}
          </p>

          <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
            <Globe className="w-4 h-4 text-zinc-400" />
            <span>Türkçe, İngilizce & Arapça rehberlik desteği</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 pt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-zinc-900 text-zinc-900" />
              <span>{experience.scoreStr || '4.94'}</span>
            </div>
            <span>·</span>
            <span className="underline font-semibold text-zinc-700">1.239 değerlendirme</span>
          </div>
        </div>

        {/* Host Info & Quick Specs */}
        <div className="space-y-4 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-300 flex items-center justify-center text-amber-900 font-bold font-serif text-lg">
              {experience.provider.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">İlan Sahibi: {experience.provider}</h3>
              <p className="text-xs text-zinc-500">{experience.categoryTag || experience.category} Uzmanı</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 text-xs text-zinc-700">
            <MapPin className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-zinc-900">{experience.location}</strong>
              <span className="text-zinc-500">İstanbul</span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 text-xs text-zinc-700">
            <Clock className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-zinc-900">Yaklaşık {experience.duration} süreli deneyim</strong>
              <span className="text-zinc-500">Bu ilan Türkçe ve İngilizce sunuluyor</span>
            </div>
          </div>
        </div>

        {/* NELER YAPACAKSINIZ? (Timeline Step-by-Step) */}
        <div className="space-y-4 pb-7 border-b border-zinc-200">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
            Neler yapacaksınız?
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

        {/* DEĞERLENDİRMELER (Airbnb Review Cards) */}
        <div className="space-y-4 pb-7 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-zinc-900 text-zinc-900" />
            <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
              {experience.scoreStr || '4.94'} · 1.239 değerlendirme
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reviews.map((rev, rIdx) => (
              <div key={rIdx} className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative bg-zinc-200">
                    <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-900">{rev.author}</h5>
                    <span className="text-[10px] text-zinc-500">{rev.location} · {rev.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed line-clamp-4">
                  "{rev.content}"
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => toast.info("Tüm değerlendirmeler 5 üzerinden 4.94 puana sahiptir.")}
            className="w-full py-2.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-800 text-xs font-bold transition cursor-pointer"
          >
            Tüm değerlendirmeleri göster
          </button>
        </div>

        {/* YAKIN GELECEKTEKİ UYGUNLUK DURUMU (Slots) */}
        <div className="space-y-3 pb-7 border-b border-zinc-200">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
            Yakın gelecekteki uygunluk durumu
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {slots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  selectedSlot === slot.id
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-400/40'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-zinc-900 block">{slot.day}</span>
                  <strong className="text-sm font-mono text-zinc-800 block">{slot.time}</strong>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-2 inline-block">
                  {slot.quota}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BULUŞACAĞIMIZ YER (Meeting Point & Map) */}
        <div className="space-y-3 pb-7 border-b border-zinc-200">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
            Buluşacağımız yer
          </h2>
          <p className="text-xs text-zinc-600 font-mono">
            {experience.location}, İstanbul
          </p>

          {/* Stylized Google Maps Container */}
          <div className="relative h-56 rounded-3xl overflow-hidden border border-zinc-200 shadow-inner bg-zinc-100">
            <Image
              src="/images/istanbul/il_1588xN.6201904451_eqr3.webp"
              alt="Harita Konumu"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Map Pin Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="px-3 py-1.5 rounded-full bg-zinc-900 text-white text-[11px] font-bold shadow-xl flex items-center gap-1.5 animate-bounce">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Buluşma Noktası</span>
              </div>
            </div>

            {/* Transit Trigger Button over map */}
            <button
              onClick={() => onOpenTransit(experience)}
              className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-zinc-900 text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-md transition cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-600" />
              <span>Otelden Ulaşım Rehberi</span>
            </button>
          </div>
        </div>

        {/* HAKKIMDA (Host Profile Box) */}
        <div className="space-y-4 pb-7 border-b border-zinc-200">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
            Hakkımda
          </h2>

          <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-white font-serif font-bold text-xl flex items-center justify-center">
                {experience.provider.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">{experience.provider}</h3>
                <p className="text-xs text-zinc-500">TÜRSAB Kayıtlı Deneyim Tasarımcısı</p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              Selam! İstanbul'un zengin kültür ve tarihini yerel zanaatkarlar ve uzman rehberlerle misafirlerimize sunmaktan mutluluk duyuyoruz. Amacımız şehrimizden unutulmaz, samimi ve güvenli anılarla ayrılmanızı sağlamak.
            </p>

            <button
              onClick={() => toast.info(`${experience.provider} resepsiyon veya Xenios üzerinden anında yönlendirilmektedir.`)}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              <span>{experience.provider} için bir mesaj gönderin</span>
            </button>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/60 text-[11px] text-zinc-500 flex items-start gap-2">
            <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>Ödemenizi ve misafir haklarınızı korumak için rezervasyonlarınızı her zaman Xenios Güvenli Sanal POS üzerinden gerçekleştirin.</p>
          </div>
        </div>

        {/* BİLİNMESİ GEREKENLER (Requirements & Cancellation Policy) */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-zinc-900">
            Bilinmesi gerekenler
          </h2>

          <div className="space-y-4 text-xs text-zinc-700">
            <div className="flex items-start gap-3.5">
              <Users className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-bold">Misafir gereklilikleri</strong>
                <p className="text-zinc-500 mt-0.5">Her yaştan misafirler katılabilir. Grup mevcudu en fazla 10-15 kişi ile sınırlıdır.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Activity className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-bold">Etkinlik seviyesi</strong>
                <p className="text-zinc-500 mt-0.5">Hafif düzey ve keyifli bir akışa sahiptir. Özel deneyim gerektirmez.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <CalendarCheck className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 font-bold">İptal politikası</strong>
                <p className="text-zinc-500 mt-0.5">Tam para iadesi almak için rezervasyonunuzu başlangıç saatinden en az 24 saat önce iptal edebilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FLOATING AIRBNB STYLED BOTTOM BAR (Sticky Footer) */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-zinc-200 p-4 safe-bottom z-50 shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Ücretsiz iptal (24 saat öncesine kadar)</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Başlangıç Fiyatı</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-bold font-mono text-zinc-900">
                  {formatPrice(experience.price, experience.currency)}
                </span>
                <span className="text-xs text-zinc-500">/ misafir</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenCheckout(experience)}
              className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-lg shadow-black/20 flex items-center gap-2 transition transform active:scale-95 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Tarihleri Göster & Rezerve Et</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
