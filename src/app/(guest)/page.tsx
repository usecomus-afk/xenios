"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { XeniosStore } from '@/lib/store';
import { Hotel, Experience, Language, ServiceRequest } from '@/lib/types';
import { detectBrowserLanguage, getT } from '@/lib/i18n';
import { HotelHeader } from '@/components/guest/hotel-header';
import { InRoomServices } from '@/components/guest/in-room-services';
import { ExperienceCard } from '@/components/guest/experience-card';
import { TransitModal } from '@/components/guest/transit-modal';
import { VirtualPosModal } from '@/components/guest/virtual-pos-modal';
import { AiChatDrawer } from '@/components/guest/ai-chat-drawer';
import { GuestTabBar } from '@/components/guest/guest-tab-bar';
import { BrandMark } from '@/components/brand-mark';
import { 
  Sparkles, 
  Search, 
  CreditCard, 
  ExternalLink, 
  Compass, 
  BookOpen, 
  Bell, 
  CheckCircle2, 
  Clock, 
  Building2, 
  QrCode, 
  MapPin,
  ShieldCheck,
  Flame
} from 'lucide-react';
import Image from 'next/image';

export default function GuestPage() {
  const hotels = XeniosStore.getHotels();
  const allExperiences = XeniosStore.getExperiences() as Experience[];

  const [activeHotelId, setActiveHotelId] = useState(XeniosStore.getActiveHotelId());
  const [activeRoomNumber, setActiveRoomNumber] = useState(XeniosStore.getActiveRoomId());
  const [lang, setLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<'services' | 'experiences' | 'ai' | 'practical' | 'requests'>('services');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [transitExp, setTransitExp] = useState<Experience | null>(null);
  const [checkoutExp, setCheckoutExp] = useState<Experience | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [showHotelPicker, setShowHotelPicker] = useState(false);

  useEffect(() => {
    // Auto-detect browser language on first load
    const detected = detectBrowserLanguage();
    setLang(detected);
    XeniosStore.setLanguage(detected);

    setRequests(XeniosStore.getRequests());

    const handleReqUpdate = () => {
      setRequests(XeniosStore.getRequests());
    };
    window.addEventListener('xenios_requests_updated', handleReqUpdate);
    return () => window.removeEventListener('xenios_requests_updated', handleReqUpdate);
  }, []);

  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];
  const t = getT(lang);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(allExperiences.map(e => e.category)))];

  // Filter experiences
  const filteredExperiences = allExperiences.filter(e => {
    const matchesCat = selectedCategory === 'all' || e.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    XeniosStore.setLanguage(newLang);
  };

  const handleHotelChange = (hId: string, rNum: string) => {
    setActiveHotelId(hId);
    setActiveRoomNumber(rNum);
    XeniosStore.setActiveHotelId(hId);
    XeniosStore.setActiveRoomId(rNum);
    setShowHotelPicker(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] pb-28 text-zinc-900">
      {/* Hotel Header & Credentials */}
      <HotelHeader
        hotel={currentHotel}
        roomNumber={activeRoomNumber}
        lang={lang}
        onLanguageChange={handleLanguageChange}
      />

      {/* Hotel & Room Switcher Bar (Demo & Testing Purpose) */}
      <div className="max-w-4xl mx-auto px-4 mt-2">
        <div className="bg-amber-500/10 border border-amber-200 rounded-2xl px-3 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-zinc-600">
              QR Simülasyonu: <strong>{currentHotel.name} (Oda {activeRoomNumber})</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHotelPicker(true)}
              className="font-bold text-amber-800 hover:text-amber-950 underline text-[11px]"
            >
              Oteli / Odayı Değiştir
            </button>
            <span className="text-zinc-300">|</span>
            <a
              href="/dashboard"
              className="px-2 py-1 bg-zinc-900 text-amber-400 hover:bg-zinc-800 rounded-lg text-[10px] font-bold tracking-wider uppercase transition shadow-sm"
            >
              Kokpit Paneli ➔
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 mt-4 space-y-6">
        {/* Tab 1: In-Room Services */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <InRoomServices
              hotel={currentHotel}
              roomNumber={activeRoomNumber}
              lang={lang}
            />

            {/* Quick Banner for Curated Experiences */}
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-black font-bold uppercase tracking-wider">
                    Öne Çıkanlar
                  </span>
                  <span className="text-xs text-amber-400 font-serif">İstanbul'da Bugün Ne Var?</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-serif text-white">
                  Boğaz Turları, Tarihi Hamamlar & VIP Deneyimler
                </h3>
                <p className="text-xs text-zinc-400 max-w-md">
                  52 seçkin ve lisanslı acente ilanı arasından otelinizden tek tıkla rezervasyon yapın.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('experiences')}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-2xl text-xs shadow-lg shadow-amber-500/30 shrink-0 transition"
              >
                Kataloğu Keşfet →
              </button>
            </div>

            {/* Tourist Ombudsman & Consumer Rights Banner */}
            <div className="bg-white rounded-3xl p-5 border border-red-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-100 text-red-800 font-bold uppercase tracking-wider">
                    🛡️ Misafir Güvencesi
                  </span>
                  <span className="text-xs text-zinc-500 font-serif">İstanbul Misafir Hakları & Hakem Masası</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900">
                  Fahiş Fiyat, Dolandırıcılık veya Haksız Kazanç Mağduru musunuz?
                </h4>
                <p className="text-xs text-zinc-500 max-w-lg">
                  Şüpheli taksi, restoran veya alışveriş fişinizi bildirin. İşletmeyle resmi temasa geçerek haksız farkı hesabınıza iade ettiriyoruz.
                </p>
              </div>

              <Link
                href="/complaints"
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md shadow-red-500/20 shrink-0 transition flex items-center gap-1.5"
              >
                <span>Şikayet & İade Masası →</span>
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Experiences & Tours */}
        {activeTab === 'experiences' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-zinc-900">{t.experiencesTitle}</h2>
              <p className="text-xs text-zinc-500">{t.experiencesSubtitle}</p>
            </div>

            {/* Search & Category Filter */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-2xl border border-amber-200/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              {/* Horizontal Scroll Categories */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {categories.map((cat, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[11px] px-3.5 py-1.5 rounded-xl whitespace-nowrap font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-white font-bold shadow-sm'
                        : 'bg-white text-zinc-600 hover:bg-amber-50 border border-amber-200/60'
                    }`}
                  >
                    {cat === 'all' ? t.allCategories : cat.replace(/^[0-9]+.s*/, '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Experiences Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredExperiences.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  hotel={currentHotel}
                  lang={lang}
                  onOpenTransit={(e) => setTransitExp(e)}
                  onOpenCheckout={(e) => setCheckoutExp(e)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Practical Info (Istanbulkart & MuzeKart) */}
        {activeTab === 'practical' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold font-serif text-zinc-900">{t.practicalTitle}</h2>
              <p className="text-xs text-zinc-500">İstanbul seyahatinizi kolaylaştıracak resmi bilet, kart ve acil bilgiler.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Istanbulkart Official Card */}
              <div className="bg-white rounded-3xl p-5 border border-red-200/80 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold text-xl">
                    💳
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">{t.istanbulkartTitle}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{t.istanbulkartDesc}</p>
                </div>

                <a
                  href="https://www.istanbulkart.istanbul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition"
                >
                  <span>{t.istanbulkartLink}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* MuzeKart Official Card */}
              <div className="bg-white rounded-3xl p-5 border border-amber-200/80 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xl">
                    🏛️
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">{t.muzekartTitle}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{t.muzekartDesc}</p>
                </div>

                <a
                  href="https://muze.gov.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition"
                >
                  <span>{t.muzekartLink}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Emergency & Useful Contacts */}
            <div className="bg-white rounded-3xl p-5 border border-amber-200/60 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-zinc-900">{t.emergencyTitle}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/50">
                  <span className="text-zinc-500 block text-[10px]">Acil Çağrı Merkezi</span>
                  <strong className="text-red-600 text-sm font-mono">112</strong>
                </div>
                <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/50">
                  <span className="text-zinc-500 block text-[10px]">Turizm Polisi</span>
                  <strong className="text-blue-600 text-sm font-mono">+90 212 527 45 03</strong>
                </div>
                <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/50">
                  <span className="text-zinc-500 block text-[10px]">İBB Beyaz Masa</span>
                  <strong className="text-zinc-800 text-sm font-mono">153</strong>
                </div>
                <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/50">
                  <span className="text-zinc-500 block text-[10px]">Resepsiyon Dahili</span>
                  <strong className="text-amber-800 text-sm font-mono">{currentHotel.receptionExt}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: My Requests Tracking */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-zinc-900">{t.liveRequests}</h2>
              <p className="text-xs text-zinc-500">Odanızdan iletilen taleplerin anlık durumu.</p>
            </div>

            {requests.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center text-zinc-400 border border-amber-200/60 space-y-2">
                <Bell className="w-8 h-8 mx-auto text-amber-400 opacity-50" />
                <p className="text-xs">{t.noRequests}</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-sm flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs text-zinc-900">{req.serviceTitle}</strong>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                          Oda {req.roomNumber}
                        </span>
                      </div>
                      {req.notes && <p className="text-[11px] text-zinc-500">{req.notes}</p>}
                      <span className="text-[9px] text-zinc-400 font-mono">
                        {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        req.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : req.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}>
                        {t.requestStatus[req.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* AI Concierge Chat Drawer */}
      <AiChatDrawer
        hotel={currentHotel}
        roomNumber={activeRoomNumber}
        lang={lang}
        isOpen={isAiOpen || activeTab === 'ai'}
        onClose={() => {
          setIsAiOpen(false);
          if (activeTab === 'ai') setActiveTab('services');
        }}
      />

      {/* Transit Calculation Modal */}
      {transitExp && (
        <TransitModal
          experience={transitExp}
          hotel={currentHotel}
          lang={lang}
          onClose={() => setTransitExp(null)}
        />
      )}

      {/* Virtual POS Checkout Modal */}
      {checkoutExp && (
        <VirtualPosModal
          experience={checkoutExp}
          hotel={currentHotel}
          roomNumber={activeRoomNumber}
          lang={lang}
          onClose={() => setCheckoutExp(null)}
        />
      )}

      {/* Bottom PWA Tab Bar */}
      <GuestTabBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'ai') {
            setIsAiOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        lang={lang}
        requestCount={requests.filter(r => r.status === 'pending').length}
      />

      {/* Hotel & Room Switcher Modal for Testing */}
      {showHotelPicker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-sm font-bold text-zinc-900">43 Otel ve Oda Seçimi (QR Simülasyonu)</h3>
              <button onClick={() => setShowHotelPicker(false)} className="font-bold text-zinc-400">✕</button>
            </div>

            <div className="space-y-2">
              {hotels.map((h) => (
                <div key={h.id} className="p-3 rounded-xl border border-amber-100 hover:border-amber-400 bg-amber-50/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-zinc-900 block">{h.name}</strong>
                      <span className="text-[10px] text-zinc-500">{h.district} • {h.type}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {h.rooms.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => handleHotelChange(h.id, r.number)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition ${
                          activeHotelId === h.id && activeRoomNumber === r.number
                            ? 'bg-amber-500 text-white'
                            : 'bg-white border border-amber-200 text-zinc-700 hover:bg-amber-100'
                        }`}
                      >
                        Oda {r.number} ({r.type})
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
