"use client";

import { Experience, Hotel, Language } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { 
  MapPin, 
  Clock, 
  Star, 
  Navigation, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Sparkles
} from 'lucide-react';
import Image from 'next/image';

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
  if (!experience) return null;

  const t = getT(lang);
  const imageSrc = experience.image || `/images/experiences/${experience.id}.jpg`;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200 animate-in zoom-in-95 flex flex-col relative text-zinc-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Image & Category Badges */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-zinc-900 shrink-0">
          <Image
            src={imageSrc}
            alt={experience.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
              {experience.categoryTag || experience.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-zinc-800 shadow-sm backdrop-blur-sm flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>TÜRSAB Onaylı</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs text-amber-300 font-semibold block">
              {experience.provider}
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-serif leading-snug mt-0.5">
              {experience.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 flex-1">
          
          {/* Key Metrics Bar (Score, Duration, Location, Price) */}
          <div className="grid grid-cols-3 gap-2 bg-[#fbf8f1] p-3 rounded-2xl border border-amber-200/60 text-center text-xs">
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-medium">Puan</span>
              <div className="flex items-center justify-center gap-1 font-bold text-zinc-800 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{experience.scoreStr || '4.9/5'}</span>
              </div>
            </div>
            <div className="border-x border-amber-200/70 px-1">
              <span className="text-[10px] text-zinc-400 block uppercase font-medium">Süre</span>
              <div className="flex items-center justify-center gap-1 font-bold text-zinc-800 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{experience.duration}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-medium">Fiyat</span>
              <div className="font-bold text-zinc-900 font-mono text-sm mt-0.5">
                {formatPrice(experience.price, experience.currency)}
              </div>
            </div>
          </div>

          {/* Experience Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Deneyim Açıklaması & Concierge Notu</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100/80">
              {experience.agentNote}
            </p>
          </div>

          {/* Highlights & Inclusions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Dahil Olan Ayrıcalıklar
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
              <div className="flex items-center gap-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lisanslı Profesyonel Rehberlik</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hızlı Giriş & Sıra Beklememe</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Otelden Ulaşım & Transfer Rehberi</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3D Secure Güvenli Ödeme & Rezervasyon</span>
              </div>
            </div>
          </div>

          {/* Location & Meeting Point */}
          <div className="bg-[#fbf8f1] p-3.5 rounded-2xl border border-amber-200/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-zinc-800 truncate">{experience.location}</strong>
                <span className="text-[11px] text-zinc-500 truncate block">{hotel.name} otelinizden kolay ulaşım</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenTransit(experience);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 font-bold flex items-center gap-1 transition shrink-0 ml-2 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Nasıl Gidilir?</span>
            </button>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-zinc-50 border-t border-amber-200/60 flex items-center justify-between gap-3 shrink-0 rounded-b-3xl">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Toplam Tutar</span>
            <span className="text-lg font-bold font-mono text-zinc-900">
              {formatPrice(experience.price, experience.currency)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenTransit(experience);
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-bold border border-zinc-200 shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Ulaşım Planı</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenCheckout(experience);
              }}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-lg shadow-amber-500/30 flex items-center gap-2 transition transform active:scale-95 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Hemen Rezerve Et</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
