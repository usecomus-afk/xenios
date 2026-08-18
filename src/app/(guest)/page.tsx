"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { Hotel, Experience, ServiceRequest, Language } from '@/lib/types';
import { getT, detectBrowserLanguage } from '@/lib/i18n';
import { HotelHeader } from '@/components/guest/hotel-header';
import { InRoomServices } from '@/components/guest/in-room-services';
import { ExperienceCard } from '@/components/guest/experience-card';
import { ExperienceDetailModal } from '@/components/guest/experience-detail-modal';
import { GuestTabBar } from '@/components/guest/guest-tab-bar';
import { TransitModal } from '@/components/guest/transit-modal';
import { VirtualPosModal } from '@/components/guest/virtual-pos-modal';
import { AiChatDrawer } from '@/components/guest/ai-chat-drawer';
import { AuthModal } from '@/components/auth-modal';
import { FairShoppingPolicy } from '@/components/guest/fair-shopping-policy';
import { InvestInIstanbul } from '@/components/guest/invest-in-istanbul';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Sparkles, 
  ExternalLink, 
  Bell, 
  X, 
  Compass, 
  Ship, 
  Landmark, 
  Utensils, 
  Camera, 
  Trees, 
  Bath, 
  ShoppingBag, 
  Palette, 
  Scroll, 
  Car,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function GuestPage() {
  const hotels = XeniosStore.getHotels();
  const allExperiences = XeniosStore.getExperiences() as Experience[];

  const [activeHotelId, setActiveHotelId] = useState(XeniosStore.getActiveHotelId());
  const [activeRoomNumber, setActiveRoomNumber] = useState(XeniosStore.getActiveRoomId());
  const [lang, setLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<'services' | 'experiences' | 'categories' | 'ai' | 'practical' | 'invest'>('services');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [selectedDetailExp, setSelectedDetailExp] = useState<Experience | null>(null);
  const [transitExp, setTransitExp] = useState<Experience | null>(null);
  const [checkoutExp, setCheckoutExp] = useState<Experience | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [showRequestsModal, setShowRequestsModal] = useState(false);

  useEffect(() => {
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

  // Category Catalog Grid Items with Custom Canva PNG Icons
  const categoryShowcase = [
    { key: 'Önerdiğimiz Restoranlar', iconPath: '/icons/categories/onerdigimiz-restoranlar.png', count: 20, desc: 'Michelin yıldızlı şefler, tarihi lezzetler & Boğaz manzaralı teraslar' },
    { key: 'Boğaz Turları & Yat', iconPath: '/icons/categories/bogaz-yatturlari.png', count: 7, desc: 'Akşam yemekli turlar, özel yat kiralama & Adalar rotaları' },
    { key: 'Tarih & Müzeler', iconPath: '/icons/categories/tarih-muzeler.png', count: 8, desc: 'Ayasofya, Topkapı Sarayı, Yerebatan & Arkeoloji Müzeleri' },
    { key: 'Gastronomi & Gurme', iconPath: '/icons/categories/gastronomi-gurme.png', count: 6, desc: 'Sokak lezzetleri, Türk kahvesi atölyesi & Boğaz meyhaneleri' },
    { key: 'Fotoğraf & Kostüm', iconPath: '/icons/categories/fotograf-kostum.png', count: 5, desc: 'Uçuşan elbise çekimi & otantik Osmanlı kaftan çekimleri' },
    { key: 'Macera & Doğa', iconPath: '/icons/categories/macera-doga.png', count: 4, desc: 'Orman içi zipline, ip parkuru & kano safarileri' },
    { key: 'Türk Hamamı & Spa', iconPath: '/icons/categories/turk-hamami-spa.png', count: 4, desc: 'Tarihi Kılıç Ali Paşa, Hürrem Sultan & VIP köpük masajı' },
    { key: 'Alışveriş & Çarşılar', iconPath: '/icons/categories/alisveris-carsilar.png', count: 4, desc: 'Kapalıçarşı, Mısır Çarşısı & el dokuma halı rehberi' },
    { key: 'Sanat & Semazen', iconPath: '/icons/categories/sanat-semazen.png', count: 4, desc: 'Mevlevi Sema ayini, ebru & mozaik lamba yapımı' },
    { key: 'Kültürel Miras', iconPath: '/icons/categories/kulturel-miras.png', count: 5, desc: 'Fener-Balat, Musevi Sinagogları & Süryani mirası' },
    { key: 'Özel VIP Transfer', iconPath: '/icons/categories/ozel-vip-transfer.png', count: 5, desc: 'Havalimanı karşılama, şoförlü lüks Mercedes Vito' }
  ];

  // Filter experiences (admin-suspended listings never reach the guest catalog)
  const filteredExperiences = allExperiences.filter(e => {
    if (e.status === 'suspended') return false;
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

  const activePendingRequests = requests.filter(r => r.status !== 'completed');

  return (
    <div className="min-h-screen bg-[#f8f6f0] pb-28 text-zinc-900">
      {/* Hotel Header & Credentials */}
      <HotelHeader
        hotel={currentHotel}
        roomNumber={activeRoomNumber}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeRequestsCount={activePendingRequests.length}
        onOpenRequests={() => setShowRequestsModal(true)}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 mt-4 space-y-6">
        
        {/* TAB 1: In-Room Services (Otel İçi Hizmetler) */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <InRoomServices
              hotel={currentHotel}
              roomNumber={activeRoomNumber}
              lang={lang}
            />

            {/* Curated Istanbul Experiences Banner (Kataloğu Keşfet Modülü) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-300/80 shadow-md hover:shadow-lg transition space-y-4 relative overflow-hidden bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30">
              
              {/* Decorative subtle ambient light */}
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 p-2 flex items-center justify-center shrink-0 border border-red-200 shadow-xs hidden sm:flex">
                    <Image 
                      src="/icons/katalogu-kesfet.png" 
                      alt="Kataloğu Keşfet" 
                      width={44} 
                      height={44} 
                      className="object-contain" 
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-[10px] bg-amber-500 text-white font-extrabold uppercase tracking-widest shadow-xs">
                        İstanbul Deneyimleri Kataloğu
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-serif text-zinc-900 leading-snug">
                      Boğaz Turları, Seçkin Restoranlar, Hamamlar & VIP Deneyimler
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed max-w-xl font-medium">
                      İstanbul'un 72 seçkin ve doğrulanmış işletme ve restoran ilanını inceleyin; otelinizden ayrılmadan güvenle yerinizi ayırtın.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => setActiveTab('experiences')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md shadow-amber-500/25 transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Image 
                      src="/icons/katalogu-kesfet.png" 
                      alt="Katalog" 
                      width={20} 
                      height={20} 
                      className="object-contain brightness-0 invert" 
                    />
                    <span>Kataloğu Keşfet (72 İlan) →</span>
                  </button>
                </div>
              </div>
            </div>

            
          </div>
        )}

        {/* TAB 2: Experiences & Tours Grid (Tüm İlanlar) */}
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
                    className={`text-[11px] px-3.5 py-1.5 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-white font-bold shadow-sm'
                        : 'bg-white text-zinc-600 hover:bg-amber-50 border border-amber-200/60'
                    }`}
                  >
                    {cat === 'all' ? t.allCategories : cat.replace(/^[0-9]+\.\s*/, '')}
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
                  onSelect={(e) => setSelectedDetailExp(e)}
                  onOpenTransit={(e) => setTransitExp(e)}
                  onOpenCheckout={(e) => setCheckoutExp(e)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Categories Showcase (Hizmetler & Kategoriler Vitrini) */}
        {activeTab === 'categories' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold font-serif text-zinc-900">Hizmet & Deneyim Kategorileri</h2>
              <p className="text-xs text-zinc-500">İstanbul'daki 72 lisanslı deneyim, restoran ve concierge hizmetini tematik kategorilerle keşfedin.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {categoryShowcase.map((cat, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      const searchToken = cat.key.toLowerCase().replace(/[^a-z0-9ğüşıöç]/g, ' ');
                      const matched = categories.find(c => {
                        const cLower = c.toLowerCase();
                        if (cLower === cat.key.toLowerCase()) return true;
                        if (cLower.includes(cat.key.toLowerCase())) return true;
                        const tokens = searchToken.split(' ').filter(Boolean);
                        return tokens.some(t => t.length > 3 && cLower.includes(t));
                      }) || 'all';
                      setSelectedCategory(matched);
                      setActiveTab('experiences');
                    }}
                    className="p-4 rounded-3xl bg-white border border-amber-200/70 hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50/70 border border-amber-200/60 p-1 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
                        <img 
                          src={cat.iconPath} 
                          alt={cat.key} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                          {cat.key}
                        </h3>
                        <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                          {cat.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 text-xs font-bold text-amber-600">
                      <span className="px-2 py-0.5 bg-amber-50 rounded-full border border-amber-200 text-[11px]">
                        {cat.count} İlan
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: Practical Info & Ombudsman (Rehber & Haklar) */}
        {activeTab === 'practical' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-serif text-zinc-900">{t.practicalTitle}</h2>
              <p className="text-xs text-zinc-500">İstanbul seyahatinizi kolaylaştıracak resmi bilet, kart, güvenlik kalkanı ve acil bilgiler.</p>
            </div>

            {/* Xenios Fair Shopping Policy & Misafir Kalkanı Component */}
            <FairShoppingPolicy />
          </div>
        )}

        {/* TAB 5: Invest & Live in Istanbul */}
        {activeTab === 'invest' && (
          <InvestInIstanbul hotel={currentHotel} roomNumber={activeRoomNumber} />
        )}
      </main>

      {/* Experience Detail Modal */}
      {selectedDetailExp && (
        <ExperienceDetailModal
          experience={selectedDetailExp}
          hotel={currentHotel}
          lang={lang}
          onClose={() => setSelectedDetailExp(null)}
          onOpenTransit={(exp) => setTransitExp(exp)}
          onOpenCheckout={(exp) => setCheckoutExp(exp)}
        />
      )}

      {/* In-Room Requests Modal (Triggered from Top Hotel Card) */}
      {showRequestsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 max-h-[85vh] overflow-y-auto space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Oda Taleplerim & İstek Durumu</h3>
                  <p className="text-[11px] text-zinc-500">{currentHotel.name} - Oda {activeRoomNumber}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowRequestsModal(false)} 
                className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {requests.length === 0 ? (
              <div className="py-8 text-center text-zinc-400 space-y-2">
                <Bell className="w-8 h-8 mx-auto text-amber-400 opacity-50" />
                <p className="text-xs">{t.noRequests}</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-[#fbf8f1] p-3.5 rounded-2xl border border-amber-200/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <strong className="text-zinc-900 block">{req.serviceTitle}</strong>
                      {req.notes && <p className="text-[11px] text-zinc-600">{req.notes}</p>}
                      <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      req.status === 'completed' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : req.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}>
                      {t.requestStatus[req.status]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal (Login / Register / Hotel Cockpit Entry) */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

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
      />
    </div>
  );
}
