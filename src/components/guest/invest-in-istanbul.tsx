"use client";

import { NotificationService } from "@/lib/notification-service";
import { FirestoreService } from "@/lib/firestore-service";

import { useState, useEffect } from 'react';
import { PropertyListing, InvestorPersona, Hotel } from '@/lib/types';
import { XeniosStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  Building2, MapPin, BedDouble, Maximize2, TrendingUp, ShieldCheck, Phone, Globe,
  X, Send, Sparkles, Search, CheckCircle2, Calendar, Car, MessageCircle, ExternalLink,
  ChevronRight, Compass, Shield
} from 'lucide-react';

interface InvestInIstanbulProps {
  hotel: Hotel;
  roomNumber: string;
}

const PERSONA_META: Record<InvestorPersona, { label: string; emoji: string; desc: string }> = {
  citizenship: { label: 'Vatandaşlık Hedefli ($400k+)', emoji: '🛂', desc: 'Türk pasaportu ve vatandaşlık şartlarını karşılayan mülkler' },
  short_term_rental: { label: 'Yüksek Airbnb & Kısa Dönem', emoji: '🏠', desc: 'Turistik döviz kira getirisi ve yüksek amortisman' },
  luxury_lifestyle: { label: 'Lüks Boğaz & Prestij', emoji: '🌊', desc: 'Boğaziçi yalıları, penthouse ve müstakil villalar' }
};

function formatUSD(amount: number) {
  return `$${amount.toLocaleString('en-US')}`;
}

export function InvestInIstanbul({ hotel, roomNumber }: InvestInIstanbulProps) {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [personaFilter, setPersonaFilter] = useState<'all' | InvestorPersona>('all');
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selected, setSelected] = useState<PropertyListing | null>(null);
  
  // VIP Keşif Turu Modal State
  const [tourProperty, setTourProperty] = useState<PropertyListing | null>(null);
  const [tourName, setTourName] = useState('');
  const [tourContact, setTourContact] = useState('');
  const [tourDate, setTourDate] = useState('Yarın (10:30)');
  const [tourVehicle, setTourVehicle] = useState('VIP Mercedes Vito ile Otelden Alınış');
  const [tourLanguage, setTourLanguage] = useState('Türkçe / English');
  const [tourNote, setTourNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const refresh = () => setProperties(XeniosStore.getPropertyListings());
    refresh();
    window.addEventListener('xenios_properties_updated', refresh);
    return () => window.removeEventListener('xenios_properties_updated', refresh);
  }, []);

  const visible = properties.filter((p) => {
    if (p.status === 'suspended') return false;
    const matchesPersona = personaFilter === 'all' || p.personas?.includes(personaFilter);
    const matchesSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.district.toLowerCase().includes(search.toLowerCase()) ||
      p.propertyType?.toLowerCase().includes(search.toLowerCase()) ||
      (p.agency && p.agency.toLowerCase().includes(search.toLowerCase())) ||
      (p.targetProfile && p.targetProfile.toLowerCase().includes(search.toLowerCase()));
    return matchesPersona && matchesSearch;
  });

  const openDetail = (p: PropertyListing) => {
    setSelected(p);
    XeniosStore.trackPropertyView(p);
  };

  const openTourModal = (p: PropertyListing, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTourProperty(p);
    XeniosStore.trackPropertyView(p);
  };

  const closeTourModal = () => {
    setTourProperty(null);
    setTourName('');
    setTourContact('');
    setTourNote('');
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourProperty) return;
    if (!tourName.trim() || !tourContact.trim()) {
      toast.error('Lütfen adınızı ve iletişim numaranızı / e-postanızı girin.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const profile = XeniosStore.getGuestProfile();
      const newLead = XeniosStore.addInvestmentLead({
        propertyId: tourProperty.id,
        propertyTitle: tourProperty.title,
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomNumber,
        guestName: tourName.trim(),
        guestContact: tourContact.trim(),
        note: `[VIP Keşif Turu Talebi] Tarih: ${tourDate} | Transfer: ${tourVehicle} | Dil: ${tourLanguage} | Not: ${tourNote.trim() || 'Yok'}`,
        personaGuess: profile.investPersonaGuess
      });

      FirestoreService.addInvestmentLead(newLead);
      NotificationService.notifyInvestmentLead(newLead, tourProperty);
      toast.success('VIP Keşif Turu Rezervasyonunuz Alındı!', {
        description: `${hotel.name} Oda ${roomNumber} için VIP transfer ve danışman ekibimiz sizinle en kısa sürede irtibata geçecektir.`
      });
      setIsSubmitting(false);
      closeTourModal();
      if (selected) setSelected(null);
    }, 500);
  };

  return (
    <section className="space-y-6 pb-12 animate-in fade-in">
      {/* Hero / Intro Banner (Light Luxury Theme) */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-100/30 to-amber-50/60 rounded-3xl p-6 sm:p-8 text-zinc-900 space-y-3.5 border border-amber-200/80 shadow-xs relative overflow-hidden">
        <span className="text-[11px] font-bold text-amber-800 tracking-widest uppercase block">
          Xenios Invest in Istanbul
        </span>
        
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight text-zinc-900">
            İstanbul'da Yatırım & Seçkin Gayrimenkuller
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
            İstanbul ziyaretiniz sırasında şehrin en seçkin yatırım fırsatlarını keşfedin. Türkiye'nin lider uluslararası gayrimenkul şirketlerinin doğrulanmış ilanları ile vatandaşlık, yüksek döviz kira getirisi ve boğaz yaşamı portföyü.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-zinc-700 font-medium">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200/80 shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-amber-600" /> <span>Türk Vatandaşlığı ($400K+)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200/80 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> <span>Yüksek Dolar Bazlı ROI</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200/80 shadow-2xs">
            <Car className="w-3.5 h-3.5 text-amber-600" /> <span>Otelden Ücretsiz VIP Keşif Turu</span>
          </div>
        </div>
      </div>

      {/* Interactive Search Bar & Dynamic Persona Options on Click */}
      <div className="relative">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onFocus={() => setIsSearchFocused(true)}
            onClick={() => setIsSearchFocused(true)}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="İlan adı, semt (Cihangir, Bebek, Levent...), aracı şirket veya özellik ara..."
            className="w-full pl-10 pr-10 py-3 text-xs bg-white rounded-2xl border border-amber-200/80 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 shadow-sm"
          />
          {(search || personaFilter !== 'all') && (
            <button
              onClick={() => { setSearch(''); setPersonaFilter('all'); }}
              className="absolute right-3.5 top-3 text-zinc-400 hover:text-zinc-600 text-xs p-1 rounded-full cursor-pointer"
              title="Aramayı ve Filtreyi Sıfırla"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Persona Options: Revealed when search is clicked/focused or active filter selected */}
        {(isSearchFocused || personaFilter !== 'all') && (
          <div className="mt-2.5 p-3 bg-white rounded-2xl border border-amber-200/80 shadow-md space-y-2 animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-semibold px-1">
              <span>Hızlı Kategori Seçenekleri:</span>
              <button 
                onClick={() => setIsSearchFocused(false)} 
                className="text-zinc-400 hover:text-zinc-700 text-[10px] cursor-pointer"
              >
                Kapat ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => { setPersonaFilter('all'); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  personaFilter === 'all'
                    ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                Tüm İlanlar (20)
              </button>
              {(Object.entries(PERSONA_META) as [InvestorPersona, typeof PERSONA_META[InvestorPersona]][]).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => { setPersonaFilter(key); }}
                  title={meta.desc}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                    personaFilter === key
                      ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                >
                  <span>{meta.emoji}</span>
                  <span>{meta.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visible.map((p) => {
          const isCitizenship = p.citizenshipEligible || p.priceUSD >= 400000;
          const isAirbnb = p.airbnbEligible || p.categoryType?.toLowerCase().includes('airbnb') || p.roiEstimate?.toLowerCase().includes('airbnb');

          return (
            <div
              key={p.id}
              onClick={() => openDetail(p)}
              className="bg-white rounded-3xl border border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
            >
              {/* Image Banner & Overlays */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-zinc-900">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badge: Agency & Property Type */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%]">
                  <span className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-amber-300 font-bold text-[10px] border border-amber-400/30">
                    {p.agency || p.developer}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-zinc-800 font-semibold text-[10px]">
                    {p.propertyType || p.categoryType?.split('/')[0]}
                  </span>
                </div>

                {/* USD Price Badge */}
                <div className="absolute top-3 right-3">
                  <div className="px-3 py-1.5 rounded-2xl bg-amber-500 text-white font-mono font-bold text-sm sm:text-base shadow-lg shadow-amber-500/30 border border-amber-300/40">
                    {formatUSD(p.priceUSD)}
                  </div>
                </div>

                {/* Bottom Image Info: Title & Location */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] text-amber-300 font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span className="truncate">{p.district}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-serif leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {p.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col">
                {/* Citizenship / Airbnb / Residence Eligibility Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {isCitizenship && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Türk Vatandaşlığına Uygun ($400k+)
                    </span>
                  )}
                  {isAirbnb && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 text-[10px] font-bold border border-amber-200">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Yüksek Airbnb & Kısa Dönem
                    </span>
                  )}
                  {p.citizenshipStatus && !isCitizenship && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-900 text-[10px] font-bold border border-sky-200">
                      <CheckCircle2 className="w-3 h-3 text-sky-600" /> {p.citizenshipStatus}
                    </span>
                  )}
                </div>

                {/* Description (Full text, not cut off) */}
                <p className="text-xs text-zinc-600 leading-relaxed bg-amber-50/40 p-3 rounded-2xl border border-amber-100/60">
                  {p.description}
                </p>

                {/* Target Tourist Profile */}
                {p.targetProfile && (
                  <div className="text-[11px] text-zinc-500 flex items-start gap-1.5">
                    <span className="font-bold text-zinc-700 shrink-0">Hedef Profil:</span>
                    <span className="line-clamp-1">{p.targetProfile}</span>
                  </div>
                )}

                {/* Highlights Chips */}
                {p.highlights && p.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.highlights.slice(0, 4).map((h, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[10px] font-medium border border-zinc-200"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* ROI / Kira Getirisi Box */}
                {p.roiEstimate && (
                  <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                    <span className="font-bold flex items-center gap-1 text-[11px]">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Tahmini Getiri & ROI:
                    </span>
                    <span className="font-bold font-mono text-[11px] text-emerald-800">{p.roiEstimate}</span>
                  </div>
                )}

                {/* Specs: Bedrooms & Area */}
                <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-zinc-700">
                      <BedDouble className="w-3.5 h-3.5 text-amber-600" /> {p.bedrooms} Yatak Odası
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-zinc-700">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-600" /> {p.areaM2} m²
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {p.agency}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 mt-auto grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={(e) => openTourModal(p, e)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Car className="w-3.5 h-3.5 shrink-0" />
                    <span>VIP Keşif Turu</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openDetail(p)}
                    className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>İncele & Detay</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center text-zinc-500 border border-amber-200/80 space-y-3">
          <Building2 className="w-10 h-10 mx-auto text-amber-400 opacity-60" />
          <h4 className="text-base font-bold text-zinc-800">İlan Bulunamadı</h4>
          <p className="text-xs max-w-sm mx-auto">Aramanıza veya seçilen filtreye uygun gayrimenkul ilanı bulunamadı. Lütfen filtreleri sıfırlayın.</p>
          <button
            onClick={() => { setPersonaFilter('all'); setSearch(''); }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold"
          >
            Tüm İlanları Göster
          </button>
        </div>
      )}

      {/* Property Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 flex flex-col">
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full bg-zinc-900 shrink-0">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-xl bg-amber-500 text-white font-mono font-bold text-base shadow-md">
                  {formatUSD(selected.priceUSD)}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
                <span className="text-xs text-amber-300 font-semibold">{selected.agency || selected.developer}</span>
                <h3 className="text-lg sm:text-xl font-bold font-serif leading-snug">{selected.title}</h3>
                <p className="text-xs text-zinc-300 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> {selected.district}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200">
                  {selected.propertyType || selected.categoryType}
                </span>
                {selected.citizenshipEligible && (
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Vatandaşlık Şartlarına Uygun
                  </span>
                )}
                {selected.airbnbEligible && (
                  <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Yüksek Airbnb Potansiyeli
                  </span>
                )}
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/60">
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Satış Fiyatı</span>
                  <strong className="text-sm font-mono text-amber-800">{formatUSD(selected.priceUSD)}</strong>
                </div>
                <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/60">
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Oda Sayısı</span>
                  <strong className="text-sm text-zinc-800">{selected.bedrooms} Yatak Odası</strong>
                </div>
                <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/60">
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Kullanım Alanı</span>
                  <strong className="text-sm text-zinc-800">{selected.areaM2} m²</strong>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">İlan Açıklaması</h4>
                <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200">
                  {selected.description}
                </p>
              </div>

              {/* Highlights */}
              {selected.highlights && selected.highlights.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Öne Çıkan Özellikler</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.highlights.map((h, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Profile */}
              {selected.targetProfile && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950">
                  <span className="font-bold block mb-0.5">🎯 Hedef Yatırımcı & Turist Profili:</span>
                  <p className="text-zinc-700">{selected.targetProfile}</p>
                </div>
              )}

              {/* ROI Box */}
              {selected.roiEstimate && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-0.5">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-800">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Tahmini Kira Getirisi & ROI
                  </span>
                  <p className="font-semibold">{selected.roiEstimate}</p>
                </div>
              )}

              {/* Agency Info & Direct Links */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">{selected.agency || selected.developer}</span>
                  {selected.referenceUrl && (
                    <a
                      href={selected.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 text-[11px]"
                    >
                      Resmi İlanı Aç <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 text-zinc-600 text-[11px]">
                  {selected.contactPhone && (
                    <a href={`tel:${selected.contactPhone}`} className="flex items-center gap-1 hover:text-amber-700">
                      <Phone className="w-3.5 h-3.5 text-amber-600" /> {selected.contactPhone}
                    </a>
                  )}
                  {selected.contactWebsite && (
                    <a href={selected.contactWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-amber-700 truncate max-w-[200px]">
                      <Globe className="w-3.5 h-3.5 text-amber-600 shrink-0" /> {selected.contactWebsite.replace('https://', '').replace('http://', '')}
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => openTourModal(selected)}
                  className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Car className="w-4 h-4" /> VIP Keşif Turu Rezerve Et
                </button>

                {selected.referenceUrl && (
                  <a
                    href={selected.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold text-xs transition flex items-center justify-center gap-2 text-center"
                  >
                    <ExternalLink className="w-4 h-4" /> Resmi Web Sitesi
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIP Keşif Turu Reservation Modal */}
      {tourProperty && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-amber-200 max-h-[92vh] overflow-y-auto animate-in zoom-in-95">
            <div className="bg-gradient-to-r from-zinc-900 to-amber-950 p-5 text-white relative rounded-t-3xl">
              <button
                onClick={closeTourModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Car className="w-3 h-3" /> Xenios Concierge Yatırım Hizmeti
                </span>
                <h3 className="text-lg font-bold font-serif">VIP Keşif Turu Rezerve Et</h3>
                <p className="text-xs text-zinc-300 line-clamp-1">{tourProperty.title}</p>
              </div>
            </div>

            <form onSubmit={handleTourSubmit} className="p-6 space-y-4">
              {/* Hotel & Room Info Box */}
              <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 font-semibold block">Konaklanan Otel & Oda</span>
                  <strong className="text-zinc-900">{hotel.name} — Oda {roomNumber}</strong>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-[10px]">
                  VIP Misafir
                </span>
              </div>

              {/* Name Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-800 block">Adınız & Soyadınız *</label>
                <input
                  type="text"
                  required
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  placeholder="Örn: Alexander Smith / Fatma Al-Mansoor"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900"
                />
              </div>

              {/* Contact Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-800 block">Telefon / WhatsApp Numarası *</label>
                <input
                  type="text"
                  required
                  value={tourContact}
                  onChange={(e) => setTourContact(e.target.value)}
                  placeholder="+90 5xx xxx xx xx veya WhatsApp numaranız"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900"
                />
              </div>

              {/* Tour Date Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-800 block flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" /> Tercih Edilen Zaman
                  </label>
                  <select
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900"
                  >
                    <option value="Bugün Öğleden Sonra (14:30)">Bugün Öğleden Sonra (14:30)</option>
                    <option value="Yarın Sabah (10:30)">Yarın Sabah (10:30)</option>
                    <option value="Yarın Öğleden Sonra (15:00)">Yarın Öğleden Sonra (15:00)</option>
                    <option value="Hafta Sonu Özel Seans">Hafta Sonu Özel Seans</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-800 block flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-amber-600" /> Danışman Dili
                  </label>
                  <select
                    value={tourLanguage}
                    onChange={(e) => setTourLanguage(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900"
                  >
                    <option value="Türkçe / English">Türkçe / English</option>
                    <option value="العربية (Arabic)">العربية (Arabic)</option>
                    <option value="Русский (Russian)">Русский (Russian)</option>
                    <option value="Deutsch (German)">Deutsch (German)</option>
                    <option value="Français (French)">Français (French)</option>
                  </select>
                </div>
              </div>

              {/* Transfer Option */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-800 block flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-amber-600" /> Transfer ve Görüşme Biçimi
                </label>
                <select
                  value={tourVehicle}
                  onChange={(e) => setTourVehicle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900"
                >
                  <option value="VIP Mercedes Vito ile Otelden Alınış ve Yerinde İnceleme">VIP Mercedes Vito ile Otelden Alınış & Yerinde Keşif</option>
                  <option value="Otel Lobby / Lounge Alanında Yüz Yüze Özel Sunum">Otel Lobby / Lounge Alanında Yüz Yüze Sunum</option>
                  <option value="WhatsApp Üzerinden Dijital Portföy ve Video Turu">WhatsApp Üzerinden Dijital Portföy & Video Turu</option>
                </select>
              </div>

              {/* Optional Notes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-800 block">Özel Notlar veya Sorular (İsteğe Bağlı)</label>
                <textarea
                  value={tourNote}
                  onChange={(e) => setTourNote(e.target.value)}
                  placeholder="Vatandaşlık süreci, taksit imkanları veya özel istekleriniz..."
                  className="w-full h-16 text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeTourModal}
                  className="flex-1 py-3 rounded-2xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-amber-500/25 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    'Kaydediliyor...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Rezervasyonu Onayla
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
