"use client";

import { useState, useEffect } from 'react';
import { PropertyListing, InvestorPersona, Hotel } from '@/lib/types';
import { XeniosStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  Building2, MapPin, BedDouble, Maximize2, TrendingUp, ShieldCheck, Phone, Globe,
  X, Send, Sparkles, Search
} from 'lucide-react';

interface InvestInIstanbulProps {
  hotel: Hotel;
  roomNumber: string;
}

const PERSONA_META: Record<InvestorPersona, { label: string; emoji: string; desc: string }> = {
  citizenship: { label: 'Vatandaşlık Hedefli', emoji: '🛂', desc: '$400K+ bütçe, aile tipi rezidans talepleri' },
  short_term_rental: { label: 'Kısa Dönem Kiralama', emoji: '🏠', desc: 'Yüksek amortisman ve pasif gelir' },
  luxury_lifestyle: { label: 'Lüks Yaşam', emoji: '🌊', desc: 'Boğaz hattı, yalı & premium penthouse' }
};

function formatUSD(amount: number) {
  return `$${amount.toLocaleString('en-US')}`;
}

function PropertyThumb({ property, size = 'card' }: { property: PropertyListing; size?: 'card' | 'hero' }) {
  const dims = size === 'hero' ? 'h-40' : 'h-36';
  if (property.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={property.image} alt={property.title} className={`w-full ${dims} object-cover`} />
    );
  }
  return (
    <div className={`w-full ${dims} bg-gradient-to-br from-zinc-800 via-zinc-900 to-amber-950 flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />
      <Building2 className="w-10 h-10 text-amber-400/70 relative z-10" />
    </div>
  );
}

export function InvestInIstanbul({ hotel, roomNumber }: InvestInIstanbulProps) {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [personaFilter, setPersonaFilter] = useState<'all' | InvestorPersona>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<PropertyListing | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadNote, setLeadNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const refresh = () => setProperties(XeniosStore.getPropertyListings());
    refresh();
    window.addEventListener('xenios_properties_updated', refresh);
    return () => window.removeEventListener('xenios_properties_updated', refresh);
  }, []);

  const visible = properties.filter((p) => {
    if (p.status === 'suspended') return false;
    const matchesPersona = personaFilter === 'all' || p.personas.includes(personaFilter);
    const matchesSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.district.toLowerCase().includes(search.toLowerCase()) ||
      p.propertyType.toLowerCase().includes(search.toLowerCase());
    return matchesPersona && matchesSearch;
  });

  const openDetail = (p: PropertyListing) => {
    setSelected(p);
    setShowLeadForm(false);
    XeniosStore.trackPropertyView(p);
  };

  const closeAll = () => {
    setSelected(null);
    setShowLeadForm(false);
    setLeadName('');
    setLeadContact('');
    setLeadNote('');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (!leadName.trim() || !leadContact.trim()) {
      toast.error('Lütfen adınızı ve iletişim bilginizi girin.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const profile = XeniosStore.getGuestProfile();
      XeniosStore.addInvestmentLead({
        propertyId: selected.id,
        propertyTitle: selected.title,
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomNumber,
        guestName: leadName.trim(),
        guestContact: leadContact.trim(),
        note: leadNote.trim() || undefined,
        personaGuess: profile.investPersonaGuess
      });
      toast.success('Talebiniz alındı! Xenios yatırım danışmanımız en kısa sürede sizinle iletişime geçecek.', {
        description: 'Kişisel bilgileriniz yalnızca bu talebi yanıtlamak için kullanılır.'
      });
      setIsSubmitting(false);
      closeAll();
    }, 400);
  };

  return (
    <section className="space-y-5">
      {/* Hero / Intro */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950 rounded-3xl p-6 text-white space-y-2.5 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider relative z-10">
          <Sparkles className="w-3 h-3" /> Xenios Invest
        </span>
        <h2 className="text-xl font-bold font-serif relative z-10">İstanbul'da Yatırım & Yaşam</h2>
        <p className="text-xs text-zinc-300 max-w-xl relative z-10 leading-relaxed">
          İstanbul'u keşfederken şehrin seçkin gayrimenkul fırsatlarını da keşfedin. Xenios güvencesiyle doğrulanmış geliştiricilerden, ilginizi çekebilecek seçilmiş ilanlar — hiçbir yükümlülük veya baskı olmadan.
        </p>
      </div>

      {/* Persona Filter Chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setPersonaFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
            personaFilter === 'all' ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-amber-200 text-zinc-600 hover:border-amber-400'
          }`}
        >
          Tüm İlanlar
        </button>
        {(Object.entries(PERSONA_META) as [InvestorPersona, typeof PERSONA_META[InvestorPersona]][]).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => setPersonaFilter(key)}
            title={meta.desc}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
              personaFilter === key ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-amber-200 text-zinc-600 hover:border-amber-400'
            }`}
          >
            {meta.emoji} {meta.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="İlan, bölge veya mülk tipi ara..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-amber-200/70 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        />
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visible.map((p) => (
          <button
            key={p.id}
            onClick={() => openDetail(p)}
            className="text-left bg-white rounded-3xl border border-amber-200/70 hover:border-amber-400/90 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col cursor-pointer"
          >
            <PropertyThumb property={p} />
            <div className="p-4 space-y-2 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                  {p.propertyType}
                </span>
                {p.citizenshipEligible && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-2.5 h-2.5" /> Vatandaşlık
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 font-serif leading-snug line-clamp-2">{p.title}</h3>
              <p className="text-[11px] text-zinc-500 flex items-center gap-1"><MapPin className="w-3 h-3 shrink-0" /> {p.district}</p>
              <div className="flex items-center gap-3 text-[11px] text-zinc-500 pt-0.5">
                <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> {p.bedrooms}</span>
                <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" /> {p.areaM2} m²</span>
              </div>
              <div className="pt-2 mt-auto border-t border-zinc-100 flex items-center justify-between">
                <strong className="text-sm font-mono font-bold text-amber-700">{formatUSD(p.priceUSD)}</strong>
                {p.roiEstimate && (
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {p.roiEstimate.split(' ')[0]}</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center text-zinc-500 border border-amber-200/70 space-y-2">
          <Building2 className="w-8 h-8 mx-auto text-amber-400 opacity-50" />
          <p className="text-xs">Bu filtreye uygun ilan bulunamadı.</p>
        </div>
      )}

      {/* Detail / Lead Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="relative">
              <PropertyThumb property={selected} size="hero" />
              <button
                onClick={closeAll}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!showLeadForm ? (
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                      {selected.propertyType}
                    </span>
                    {selected.citizenshipEligible && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Vatandaşlık Başvurusuna Uygun
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold font-serif text-zinc-900">{selected.title}</h3>
                  <p className="text-xs text-zinc-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selected.district}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/50">
                    <span className="text-[9px] text-zinc-500 block">Fiyat</span>
                    <strong className="text-xs font-mono text-amber-800">{formatUSD(selected.priceUSD)}</strong>
                  </div>
                  <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/50">
                    <span className="text-[9px] text-zinc-500 block">Oda Sayısı</span>
                    <strong className="text-xs text-zinc-800">{selected.bedrooms}</strong>
                  </div>
                  <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/50">
                    <span className="text-[9px] text-zinc-500 block">Alan</span>
                    <strong className="text-xs text-zinc-800">{selected.areaM2} m²</strong>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed">{selected.description}</p>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-zinc-700">Öne Çıkan Özellikler</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.highlights.map((h) => (
                      <span key={h} className="text-[10px] px-2 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-600">{h}</span>
                    ))}
                  </div>
                </div>

                {selected.roiEstimate && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                    <TrendingUp className="w-4 h-4 shrink-0" /> {selected.roiEstimate}
                  </div>
                )}

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1 text-[11px] text-zinc-600">
                  <p className="font-bold text-zinc-800">{selected.developer}</p>
                  <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {selected.contactPhone}</p>
                  <p className="flex items-center gap-1.5 truncate"><Globe className="w-3 h-3 shrink-0" /> {selected.contactWebsite}</p>
                </div>

                <button
                  onClick={() => setShowLeadForm(true)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/30 transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> İlgileniyorum — Danışmana Ulaştır
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="p-6 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Yatırım Danışmanına Ulaşın</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">"{selected.title}" için bilgilerinizi bırakın, Xenios yatırım danışmanı sizinle iletişime geçsin.</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-700 block">Adınız Soyadınız</label>
                  <input
                    type="text" required value={leadName} onChange={(e) => setLeadName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-700 block">Telefon veya E-posta</label>
                  <input
                    type="text" required value={leadContact} onChange={(e) => setLeadContact(e.target.value)}
                    placeholder="+90 5xx xxx xx xx veya e-posta"
                    className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-700 block">Not (İsteğe Bağlı)</label>
                  <textarea
                    value={leadNote} onChange={(e) => setLeadNote(e.target.value)}
                    placeholder="Sormak istediğiniz bir şey var mı?"
                    className="w-full h-16 text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button type="button" onClick={() => setShowLeadForm(false)} className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition">
                    Geri
                  </button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-amber-500/30 transition">
                    {isSubmitting ? 'Gönderiliyor...' : 'Talebi Gönder'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
