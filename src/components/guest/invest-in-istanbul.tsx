"use client";

import { NotificationService } from "@/lib/notification-service";
import { FirestoreService } from "@/lib/firestore-service";
import { useState, useEffect } from 'react';
import { PropertyListing, InvestorPersona, Hotel, Language } from '@/lib/types';
import { XeniosStore } from '@/lib/store';
import { getT } from '@/lib/i18n';
import { toast } from 'sonner';
import {
  Building2, MapPin, BedDouble, Maximize2, ShieldCheck,
  Search, Bath
} from 'lucide-react';

interface InvestInIstanbulProps {
  hotel: Hotel;
  roomNumber: string;
  lang?: Language;
}

function formatUSD(amount: number) {
  return `$${amount.toLocaleString('en-US')}`;
}

export function InvestInIstanbul({ hotel, roomNumber, lang = "tr" }: InvestInIstanbulProps) {
  const t = getT(lang);
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [personaFilter, setPersonaFilter] = useState<'all' | InvestorPersona>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<PropertyListing | null>(null);
  
  // VIP Keşif Turu Modal State
  const [tourProperty, setTourProperty] = useState<PropertyListing | null>(null);
  const [tourName, setTourName] = useState('');
  const [tourContact, setTourContact] = useState('');
  const [tourDate, setTourDate] = useState('Yarın (10:30)');
  const [tourVehicle, setTourVehicle] = useState('VIP Mercedes Vito');
  const [tourLanguage, setTourLanguage] = useState('English / Türkçe');
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
      (p.agency && p.agency.toLowerCase().includes(search.toLowerCase()));
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
      toast.error('Lütfen bilgilerinizi giriniz.');
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
      toast.success(t.bookDiscoveryTour, {
        description: `${hotel.name} ${t.room} ${roomNumber} · VIP Transfer`
      });
      setIsSubmitting(false);
      closeTourModal();
      if (selected) setSelected(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold font-serif text-zinc-900">{t.investTitle}</h2>
        <p className="text-xs text-zinc-500 max-w-xl">{t.investSubtitle}</p>
      </div>

      {/* Filter Personas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setPersonaFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
            personaFilter === 'all'
              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
              : 'bg-white text-zinc-700 hover:bg-amber-50 border-amber-200'
          }`}
        >
          {t.allPersonas}
        </button>
        <button
          onClick={() => setPersonaFilter('citizenship')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
            personaFilter === 'citizenship'
              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
              : 'bg-white text-zinc-700 hover:bg-amber-50 border-amber-200'
          }`}
        >
          🛂 {t.citizenshipFilter}
        </button>
        <button
          onClick={() => setPersonaFilter('short_term_rental')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
            personaFilter === 'short_term_rental'
              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
              : 'bg-white text-zinc-700 hover:bg-amber-50 border-amber-200'
          }`}
        >
          🏠 {t.airbnbFilter}
        </button>
        <button
          onClick={() => setPersonaFilter('luxury_lifestyle')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
            personaFilter === 'luxury_lifestyle'
              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
              : 'bg-white text-zinc-700 hover:bg-amber-50 border-amber-200'
          }`}
        >
          🌊 {t.luxuryFilter}
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-2xl border border-amber-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        />
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((p) => {
          return (
            <div
              key={p.id}
              onClick={() => openDetail(p)}
              className="bg-white rounded-3xl overflow-hidden border border-amber-200/80 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={(p as any).images?.[0] || p.image || '/images/realestate/vadi-1.jpg'}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {p.citizenshipEligible && (
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{t.citizenshipEligible}</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {p.district}
                    </span>
                    <h3 className="text-sm font-bold font-serif truncate group-hover:text-amber-300 transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-zinc-600">
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-amber-600" />
                      <span>{p.bedrooms} {t.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>{p.areaM2} m²</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-100">
                    <div>
                      <span className="text-[10px] text-zinc-400 block uppercase font-semibold">{t.priceRange}</span>
                      <strong className="text-base font-bold text-amber-800 font-mono">
                        {formatUSD(p.priceUSD)}
                      </strong>
                    </div>

                    <button
                      onClick={(e) => openTourModal(p, e)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition cursor-pointer"
                    >
                      {t.bookDiscoveryTour}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Property Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 max-h-[88vh] overflow-y-auto space-y-4 animate-in zoom-in-95 text-zinc-900 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="relative h-56 rounded-2xl overflow-hidden bg-zinc-900">
              <img
                src={selected.image || '/images/realestate/vadi-1.jpg'}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {selected.district}
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold font-serif">{selected.title}</h2>
              <p className="text-xs text-zinc-500">{selected.developer || 'Xenios Prime Real Estate'}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center p-3 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 block">{t.bedrooms}</span>
                <strong className="text-zinc-900">{selected.bedrooms}</strong>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">{t.grossArea}</span>
                <strong className="text-zinc-900">{selected.areaM2} m²</strong>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block">{t.priceRange}</span>
                <strong className="text-amber-800 font-mono">{formatUSD(selected.priceUSD)}</strong>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed bg-[#fbf8f1] p-3.5 rounded-2xl border border-amber-200/60">
              {selected.description}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={(e) => openTourModal(selected, e)}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-xs shadow-md transition cursor-pointer"
              >
                {t.bookDiscoveryTour}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIP Discovery Tour Modal */}
      {tourProperty && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in zoom-in-95 space-y-4 text-zinc-900 relative">
            <button
              onClick={closeTourModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1 pr-6">
              <h3 className="text-base font-bold font-serif">{t.bookDiscoveryTour}</h3>
              <p className="text-xs text-zinc-500">{tourProperty.title}</p>
            </div>

            <form onSubmit={handleTourSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-700 font-bold block mb-1">Ad Soyad / Full Name</label>
                <input
                  type="text"
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  placeholder="İsminiz"
                  className="w-full p-2.5 bg-white rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500/40 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-zinc-700 font-bold block mb-1">Telefon / WhatsApp</label>
                <input
                  type="text"
                  value={tourContact}
                  onChange={(e) => setTourContact(e.target.value)}
                  placeholder="+90 5XX XXX XX XX"
                  className="w-full p-2.5 bg-white rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500/40 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-zinc-700 font-bold block mb-1">Not / Tercihler</label>
                <textarea
                  value={tourNote}
                  onChange={(e) => setTourNote(e.target.value)}
                  placeholder="Vatandaşlık, yatırım amacı vb."
                  rows={2}
                  className="w-full p-2.5 bg-white rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500/40 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? '...' : t.bookDiscoveryTour}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
