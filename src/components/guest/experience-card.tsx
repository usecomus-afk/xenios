"use client";

import { Experience, Hotel, Language } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { MapPin, Clock, Star, Navigation, CreditCard, Info } from 'lucide-react';
import Image from 'next/image';

interface ExperienceCardProps {
  experience: Experience;
  hotel: Hotel;
  lang: Language;
  onSelect: (exp: Experience) => void;
  onOpenTransit: (exp: Experience) => void;
  onOpenCheckout: (exp: Experience) => void;
}

export function ExperienceCard({ 
  experience, 
  hotel, 
  lang, 
  onSelect,
  onOpenTransit, 
  onOpenCheckout 
}: ExperienceCardProps) {
  const t = getT(lang);
  const imageSrc = experience.image || `/images/experiences/${experience.id}.jpg`;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-amber-200/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      {/* Clickable Card Header & Image Area */}
      <div 
        onClick={() => onSelect(experience)}
        className="cursor-pointer"
      >
        {/* Photo + Category + Rating Tag */}
        <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
          <Image
            src={imageSrc}
            alt={experience.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-amber-900 shadow-sm backdrop-blur-md">
              {experience.categoryTag || experience.category.split('.')[1] || experience.category}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold bg-black/60 text-amber-400 backdrop-blur-md border border-amber-500/30">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{experience.scoreStr || '4.9/5'}</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-[11px] text-amber-300 font-medium block truncate">
              {experience.provider}
            </span>
            <h3 className="text-sm font-bold font-serif leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
              {experience.title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-1 truncate max-w-[170px]">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">{experience.location}</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-zinc-700">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{experience.duration}</span>
            </div>
          </div>

          <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/60">
            {experience.agentNote}
          </p>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold">{t.price}</span>
              <span className="text-base font-bold text-zinc-900 font-mono">
                {formatPrice(experience.price, experience.currency)}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(experience);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 text-xs font-semibold border border-amber-200 transition cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>Detaylar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0 flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenTransit(experience);
          }}
          className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold flex items-center justify-center transition cursor-pointer"
          title="Otelden Ulaşım Seçenekleri"
        >
          <Navigation className="w-4 h-4 text-amber-700" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenCheckout(experience);
          }}
          className="flex-1 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 transition transform active:scale-95 cursor-pointer"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>{t.buyNow} ({formatPrice(experience.price, experience.currency)})</span>
        </button>
      </div>
    </div>
  );
}
