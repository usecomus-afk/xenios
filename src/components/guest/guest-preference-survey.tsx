"use client";

import { useState } from 'react';
import { GuestProfile } from '@/lib/types';
import { ShieldCheck, HeartPulse, ShoppingBag, Compass, Briefcase, UtensilsCrossed, Sparkles, Trash2 } from 'lucide-react';

interface GuestPreferenceSurveyProps {
  initialProfile: GuestProfile;
  onSave: (profile: GuestProfile) => void;
  onClear: () => void;
  onCancel: () => void;
}

const OPTIONS = {
  travelStyle: [
    { value: 'solo', label: 'Yalnız Gezgin' },
    { value: 'couple', label: 'Çift / Romantik' },
    { value: 'family', label: 'Aile (Çocuklu)' },
    { value: 'business', label: 'İş Seyahati' }
  ] as const,
  budgetLevel: [
    { value: 'economy', label: 'Ekonomik & Pratik' },
    { value: 'moderate', label: 'Dengeli / Standart' },
    { value: 'luxury', label: 'Lüks & VIP' }
  ] as const,
  tourPace: [
    { value: 'sakin', label: 'Sakin (Az Program)' },
    { value: 'dengeli', label: 'Dengeli' },
    { value: 'yogun', label: 'Yoğun (Maksimum Program)' }
  ] as const,
  interests: ['Tarih & Kültür', 'Boğaz & Deniz', 'Gastronomi', 'Gece Hayatı', 'Alışveriş', 'Sanat & Müzeler', 'Doğa & Yürüyüş', 'Spor & Aktivite', 'Fotoğrafçılık', 'Yerel Yaşam'],
  allergies: ['Fıstık / Kuruyemiş', 'Deniz Ürünleri', 'Süt Ürünleri (Laktoz)', 'Gluten', 'Arı Sokması', 'İlaç Alerjisi (Penisilin vb.)', 'Polen / Toz'],
  dietaryRestrictions: ['Helal', 'Vejetaryen', 'Vegan', 'Glutensiz', 'Şeker / Diyabetik', 'Deniz Ürünü Yemem'],
  gastronomyPreferences: ['Türk Mutfağı', 'Deniz Ürünleri', 'Sokak Lezzetleri', 'Fine Dining / Michelin', 'Kahve & Pastane Kültürü', 'Vegan / Vejetaryen Mekanlar'],
  shoppingInterests: ['Halı & Kilim', 'Deri Ürünleri', 'Kuyumcu & Mücevher', 'Tekstil & Kumaş', 'El Sanatları', 'Marka Mağazalar / AVM', 'Antika & Koleksiyon', 'Baharat & Yerel Ürünler'],
  cityTourInterests: ['Tarihi Yarımada', 'Boğaz Turu', 'Adalar', 'Gece Hayatı & Rooftop', 'Doğa & Orman', 'Sanat & Müzeler', 'Yerel Pazarlar', 'Dini / Kutsal Mekanlar'],
  businessNeeds: ['Toplantı Odası', 'İş Merkezi / Yazıcı', 'Hızlı & Kesintisiz WiFi', 'Havalimanı VIP Transfer', 'Kuru Temizleme / Ütü Servisi', 'Sessiz Çalışma Alanı']
};

function ChipMultiSelect({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(active ? value.filter((v) => v !== opt) : [...value, opt])}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition ${
              active ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-amber-200 text-zinc-600 hover:border-amber-400'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function RadioRow<T extends string>({ options, value, onChange }: { options: readonly { value: T; label: string }[]; value: T | undefined; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          type="button"
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition ${
            value === opt.value ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-amber-200 text-zinc-600 hover:border-amber-400'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Section({ icon, title, hint, children }: { icon: React.ReactNode; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 py-3 border-b border-amber-100 last:border-0">
      <div className="flex items-center gap-1.5">
        <span className="text-amber-600">{icon}</span>
        <h4 className="text-xs font-bold text-zinc-800">{title}</h4>
        <span className="text-[10px] text-zinc-400 font-normal">(İsteğe Bağlı)</span>
      </div>
      {hint && <p className="text-[10px] text-zinc-500">{hint}</p>}
      {children}
    </div>
  );
}

export function GuestPreferenceSurvey({ initialProfile, onSave, onClear, onCancel }: GuestPreferenceSurveyProps) {
  const [profile, setProfile] = useState<GuestProfile>(initialProfile);
  const [consent, setConsent] = useState<boolean>(!!initialProfile.kvkkConsent);

  const set = <K extends keyof GuestProfile>(key: K, val: GuestProfile[K]) => setProfile((p) => ({ ...p, [key]: val }));

  const handleSave = () => {
    if (!consent) return;
    onSave({ ...profile, kvkkConsent: true, consentTimestamp: new Date().toISOString() });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-1">
        <Section icon={<Compass className="w-3.5 h-3.5" />} title="Seyahat Tarzı & Bütçe">
          <div className="space-y-2">
            <RadioRow options={OPTIONS.travelStyle} value={profile.travelStyle} onChange={(v) => set('travelStyle', v)} />
            <RadioRow options={OPTIONS.budgetLevel} value={profile.budgetLevel} onChange={(v) => set('budgetLevel', v)} />
          </div>
        </Section>

        <Section icon={<Sparkles className="w-3.5 h-3.5" />} title="Genel İlgi Alanları">
          <ChipMultiSelect options={OPTIONS.interests} value={profile.interests ?? []} onChange={(v) => set('interests', v)} />
        </Section>

        <Section
          icon={<HeartPulse className="w-3.5 h-3.5" />}
          title="Sağlık & Alerjiler"
          hint="Otel ekibinin acil bir durumda bilmesi faydalı olacak bilgiler."
        >
          <div className="space-y-2">
            <ChipMultiSelect options={OPTIONS.allergies} value={profile.allergies ?? []} onChange={(v) => set('allergies', v)} />
            <textarea
              value={profile.healthNotes ?? ''}
              onChange={(e) => set('healthNotes', e.target.value)}
              placeholder="Kronik rahatsızlık, hareket kısıtlılığı veya bilinmesini istediğiniz başka bir sağlık notu..."
              className="w-full h-16 text-xs rounded-xl border border-amber-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-amber-50/20"
            />
          </div>
        </Section>

        <Section icon={<UtensilsCrossed className="w-3.5 h-3.5" />} title="Gastronomi & Beslenme">
          <div className="space-y-2">
            <ChipMultiSelect options={OPTIONS.dietaryRestrictions} value={profile.dietaryRestrictions ?? []} onChange={(v) => set('dietaryRestrictions', v)} />
            <ChipMultiSelect options={OPTIONS.gastronomyPreferences} value={profile.gastronomyPreferences ?? []} onChange={(v) => set('gastronomyPreferences', v)} />
          </div>
        </Section>

        <Section icon={<ShoppingBag className="w-3.5 h-3.5" />} title="Alışveriş İlgi Alanları">
          <ChipMultiSelect options={OPTIONS.shoppingInterests} value={profile.shoppingInterests ?? []} onChange={(v) => set('shoppingInterests', v)} />
        </Section>

        <Section icon={<Compass className="w-3.5 h-3.5" />} title="Şehir Gezisi Tercihleri">
          <div className="space-y-2">
            <ChipMultiSelect options={OPTIONS.cityTourInterests} value={profile.cityTourInterests ?? []} onChange={(v) => set('cityTourInterests', v)} />
            <RadioRow options={OPTIONS.tourPace} value={profile.tourPace} onChange={(v) => set('tourPace', v)} />
          </div>
        </Section>

        <Section icon={<Briefcase className="w-3.5 h-3.5" />} title="İş Seyahati İhtiyaçları">
          <ChipMultiSelect options={OPTIONS.businessNeeds} value={profile.businessNeeds ?? []} onChange={(v) => set('businessNeeds', v)} />
        </Section>

        <div className="space-y-2 py-3">
          <h4 className="text-xs font-bold text-zinc-800">Paylaşmak İstediğiniz Başka Bir Şey</h4>
          <textarea
            value={profile.notes ?? ''}
            onChange={(e) => set('notes', e.target.value)}
            placeholder="comusAI'ın bilmesini istediğiniz her şeyi buraya yazabilirsiniz..."
            className="w-full h-16 text-xs rounded-xl border border-amber-200 p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-amber-50/20"
          />
        </div>

        {/* KVKK Consent */}
        <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-3.5 space-y-2.5 mt-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-bold text-amber-950">KVKK Aydınlatma & Açık Rıza Onayı</span>
          </div>
          <label className="flex items-start gap-2 text-[11px] text-zinc-700 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-amber-600 shrink-0"
            />
            <span>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında; sağlık, alerji ve diğer kişisel tercihlerime dair
              paylaştığım bilgilerin, yalnızca bana özel rehberlik ve öneri sunmak amacıyla Xenios ve konakladığım otel ekibi
              (concierge, mutfak, güvenlik gibi ilgili birimler) tarafından işlenmesini kabul ediyorum. Bu onayı istediğim zaman
              geri çekebilir, bilgilerimi güncelleyebilir veya tamamen silebilirim.
            </span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 mt-1 border-t border-amber-100">
        <button
          type="button"
          onClick={onClear}
          title="Tüm tercihlerimi ve onayımı sil"
          className="p-2.5 rounded-xl border border-zinc-200 text-zinc-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition"
        >
          Vazgeç
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!consent}
          className="flex-[2] py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-amber-500/30 transition"
        >
          Tercihlerimi Kaydet & Rehberliği Kişiselleştir
        </button>
      </div>
    </div>
  );
}
