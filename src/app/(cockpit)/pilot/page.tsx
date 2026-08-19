"use client";

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Building2, 
  Compass, 
  TrendingUp, 
  Bot, 
  DollarSign, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Save, 
  RefreshCw, 
  Phone, 
  Globe, 
  MapPin, 
  Clock, 
  CreditCard, 
  DoorOpen, 
  Wifi, 
  BarChart3, 
  MessageSquare, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { XeniosStore } from '@/lib/store';
import { Experience, Hotel, Room, XeniosUser } from '@/lib/types';
import { toast } from 'sonner';

export default function PilotDashboardPage() {
  const [activeTab, setActiveTab] = useState<'experiences' | 'hotels' | 'inroom-analytics' | 'ai-analytics' | 'finance'>('experiences');
  const [user, setUser] = useState<XeniosUser | null>(null);

  // Experience state
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [searchExp, setSearchExp] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isNewExpModalOpen, setIsNewExpModalOpen] = useState(false);

  // New Experience Form state
  const [newExp, setNewExp] = useState<Partial<Experience>>({
    title: '',
    category: 'Boğaz Turları & Yat',
    provider: '',
    location: 'Sultanahmet, Fatih',
    phone: '+90 532 000 00 00',
    website: 'https://',
    agentNote: '',
    price: 1500,
    currency: '₺',
    duration: '2.5 Saat',
    rating: 5,
    categoryTag: 'Boğaz & Deniz',
    iconName: 'anchor'
  });

  // Hotel state
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [isNewHotelModalOpen, setIsNewHotelModalOpen] = useState(false);

  // New Hotel Form state
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelDistrict, setNewHotelDistrict] = useState('Sultanahmet / Fatih');
  const [newHotelType, setNewHotelType] = useState('Butik Otel & Konak');
  const [newHotelAddress, setNewHotelAddress] = useState('');
  const [newHotelPhone, setNewHotelPhone] = useState('+90 212 500 00 00');
  const [newHotelWebsite, setNewHotelWebsite] = useState('https://');
  const [newHotelRoomCount, setNewHotelRoomCount] = useState(15);
  const [newHotelWifiSsid, setNewHotelWifiSsid] = useState('Hotel_Guest');
  const [newHotelWifiPass, setNewHotelWifiPass] = useState('Xenios2026!');
  const [newHotelBreakfast, setNewHotelBreakfast] = useState('07:30 - 10:30');
  const [newHotelCheckout, setNewHotelCheckout] = useState('11:30');
  const [newHotelReceptionExt, setNewHotelReceptionExt] = useState('9');

  useEffect(() => {
    setUser(XeniosStore.getUser());
    setExperiences(XeniosStore.getExperiences());
    setHotels(XeniosStore.getHotels());
    setBookings(XeniosStore.getBookings());
    setRequests(XeniosStore.getRequests());

    const handleExpUpdate = () => setExperiences(XeniosStore.getExperiences());
    const handleHotelUpdate = () => setHotels(XeniosStore.getHotels());

    window.addEventListener('xenios_experiences_updated', handleExpUpdate);
    window.addEventListener('xenios_hotels_updated', handleHotelUpdate);
    window.addEventListener('xenios_bookings_updated', () => setBookings(XeniosStore.getBookings()));
    window.addEventListener('xenios_requests_updated', () => setRequests(XeniosStore.getRequests()));

    return () => {
      window.removeEventListener('xenios_experiences_updated', handleExpUpdate);
      window.removeEventListener('xenios_hotels_updated', handleHotelUpdate);
    };
  }, []);

  // Save edited experience
  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    XeniosStore.updateExperience(editingExp.id, editingExp);
    toast.success(`"${editingExp.title}" başarıyla güncellendi!`);
    setEditingExp(null);
  };

  // Create new experience
  const handleCreateExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.title || !newExp.provider) {
      toast.error('Lütfen ilan başlığı ve işletme adını giriniz.');
      return;
    }

    const created: Experience = {
      id: 'exp-custom-' + Date.now(),
      title: newExp.title || 'Yeni İlan',
      category: newExp.category || 'Özel Deneyim',
      provider: newExp.provider || 'Yetkili Acente',
      location: newExp.location || 'İstanbul',
      phone: newExp.phone || '+90 532 000 00 00',
      website: newExp.website || 'https://xenios.usecomus.com',
      agentNote: newExp.agentNote || 'TÜRSAB onaylı kurumsal acente ilanı.',
      scoreStr: '5.0',
      price: Number(newExp.price) || 1000,
      currency: newExp.currency || '₺',
      duration: newExp.duration || '2 Saat',
      rating: 5,
      coords: { lat: 41.0082, lng: 28.9784 },
      categoryTag: newExp.categoryTag || 'Özel',
      iconName: newExp.iconName || 'sparkles',
      featured: true,
      image: '/images/istanbul/il_1588xN.6201904451_eqr3.webp'
    };

    XeniosStore.addExperience(created);
    toast.success(`"${created.title}" kataloğa eklendi ve anında canlıya alındı!`);
    setIsNewExpModalOpen(false);
    setNewExp({
      title: '',
      category: 'Boğaz Turları & Yat',
      provider: '',
      location: 'Sultanahmet, Fatih',
      phone: '+90 532 000 00 00',
      website: 'https://',
      agentNote: '',
      price: 1500,
      currency: '₺',
      duration: '2.5 Saat',
      rating: 5,
      categoryTag: 'Boğaz & Deniz',
      iconName: 'anchor'
    });
  };

  // Delete experience
  const handleDeleteExp = (id: string, title: string) => {
    if (confirm(`"${title}" ilanını yayından kaldırmak istediğinizden emin misiniz?`)) {
      XeniosStore.deleteExperience(id);
      toast.info(`"${title}" yayından kaldırıldı.`);
    }
  };

  // Create new contracted partner hotel
  const handleCreateHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName.trim()) {
      toast.error('Lütfen otel adını giriniz.');
      return;
    }

    const rooms: Room[] = [];
    const count = Number(newHotelRoomCount) || 10;

    for (let i = 1; i <= count; i++) {
      const floor = Math.ceil(i / 10);
      const roomNum = floor * 100 + (i % 10 === 0 ? 10 : i % 10);
      rooms.push({
        id: roomNum.toString(),
        number: roomNum.toString(),
        type: i % 3 === 0 ? 'Superior Double' : i % 5 === 0 ? 'Sultan Suite' : 'Deluxe Queen',
        floor: `${floor}. Kat`,
        wifiSsid: newHotelWifiSsid,
        wifiPass: newHotelWifiPass
      });
    }

    const createdHotel: Hotel = {
      id: 'hotel-' + Date.now(),
      name: newHotelName.trim(),
      district: newHotelDistrict,
      type: newHotelType,
      address: newHotelAddress || `${newHotelDistrict}, İstanbul`,
      phone: newHotelPhone,
      website: newHotelWebsite,
      ratingStr: '5.0 (Doğrulanmış Partner)',
      targetReason: 'Yeni Anlaşmalı Partner Otel',
      coords: { lat: 41.0082, lng: 28.9784 },
      rooms: rooms,
      breakfastHours: newHotelBreakfast,
      checkoutTime: newHotelCheckout,
      receptionExt: newHotelReceptionExt,
      featured: true
    };

    XeniosStore.addHotel(createdHotel);
    toast.success(`"${createdHotel.name}" (${rooms.length} Oda) başarıyla eklendi!`);
    setIsNewHotelModalOpen(false);
    setNewHotelName('');
    setNewHotelAddress('');
  };

  // Delete hotel
  const handleDeleteHotel = (id: string, name: string) => {
    if (confirm(`"${name}" otelini sistemden silmek istediğinize emin misiniz?`)) {
      XeniosStore.deleteHotel(id);
      toast.info(`"${name}" silindi.`);
    }
  };

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchExp.toLowerCase()) || 
                          exp.provider.toLowerCase().includes(searchExp.toLowerCase()) ||
                          exp.location.toLowerCase().includes(searchExp.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || exp.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 text-zinc-900">
      
      {/* Pilot Master Header (Light Luxury Theme) */}
      <div className="bg-gradient-to-r from-amber-500/15 via-amber-100/40 to-amber-50/70 rounded-3xl p-6 sm:p-7 border border-amber-300 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-amber-500 text-zinc-950 font-extrabold text-xs uppercase tracking-widest rounded-full flex items-center gap-1 shadow-2xs border border-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilot & Kurucu Yönetim Merkezi</span>
            </span>
            <span className="text-xs text-amber-900 font-mono font-bold">
              Yetkili: anilaslan@usecomus.com
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900">
            Xenios İstanbul Operasyon Masası
          </h1>
          <p className="text-xs text-zinc-600 max-w-2xl leading-relaxed">
            Tüm gerçek işletme ilanlarını düzenleyin, anlık fiyat değiştirin, yeni anlaşmalı oteller tanımlayın ve misafir kullanım ile comusAI istatistiklerini takip edin.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setIsNewExpModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold text-xs rounded-2xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni İlan Ekle</span>
          </button>

          <button
            onClick={() => setIsNewHotelModalOpen(true)}
            className="px-4 py-2.5 bg-white hover:bg-amber-50 text-zinc-900 font-bold text-xs rounded-2xl border border-amber-300 shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-amber-700" />
            <span>Yeni Otel Tanımla</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-amber-200/80">
        {[
          { id: 'experiences', label: 'İşletme İlanları & Fiyatlar', icon: Compass, count: experiences.length },
          { id: 'hotels', label: 'Anlaşmalı Oteller', icon: Building2, count: hotels.length },
          { id: 'inroom-analytics', label: 'Oda Hizmetleri Kullanımı', icon: TrendingUp, count: `${requests.length} Talep` },
          { id: 'ai-analytics', label: 'comusAI Rehber Analitiği', icon: Bot, count: `${bookings.length + requests.length} Oturum` },
          { id: 'finance', label: 'Sanal POS & Finans', icon: DollarSign, count: `${bookings.reduce((sum, b) => sum + (b.amount || 0), 0).toLocaleString('tr-TR')} ₺` },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                isActive
                  ? 'bg-amber-100/80 text-amber-800 border-amber-500/40 shadow-sm'
                  : 'bg-white text-zinc-500 border-amber-200/80 hover:bg-amber-50/60 hover:text-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                isActive ? 'bg-amber-500 text-black' : 'bg-amber-100/60 text-zinc-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXPERIENCES CRUD & PRICE EDITOR */}
      {activeTab === 'experiences' && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-amber-200/80">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchExp}
                onChange={(e) => setSearchExp(e.target.value)}
                placeholder="İlan adı, acente veya konum ara..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#f8f6f0] border border-amber-200/80 rounded-2xl focus:outline-none focus:border-amber-500 text-zinc-800"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {['ALL', 'Boğaz', 'Yat', 'Fotoğraf', 'Hamam', 'Tarih', 'VIP Transfer'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-black'
                      : 'bg-[#f8f6f0] text-zinc-500 hover:text-zinc-800 border border-amber-200/80'
                  }`}
                >
                  {cat === 'ALL' ? 'Tümü' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Experiences Grid / Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white/90 rounded-3xl p-4 border border-amber-200/80 hover:border-amber-500/50 transition space-y-3 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-800 font-bold border border-amber-500/30">
                      {exp.category}
                    </span>
                    <strong className="text-sm font-mono text-emerald-600 font-bold">
                      {exp.price} {exp.currency}
                    </strong>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-900 font-serif line-clamp-2">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-zinc-500 line-clamp-2">
                    {exp.provider} • {exp.location}
                  </p>

                  <div className="p-2 rounded-xl bg-[#f8f6f0] border border-amber-200/60 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-zinc-600">
                      <span>Yetkili İletişim:</span>
                      <span className="font-mono font-bold text-amber-800">{exp.phone}</span>
                    </div>
                    {exp.agentNote && (
                      <div className="text-[10px] text-zinc-500 italic">
                        Not: {exp.agentNote}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setEditingExp(exp)}
                    className="flex-1 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer border border-amber-500/30"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Fiyat & İlanı Düzenle</span>
                  </button>

                  <button
                    onClick={() => handleDeleteExp(exp.id, exp.title)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-700 transition cursor-pointer border border-red-500/20"
                    title="İlanı Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: HOTELS MANAGEMENT */}
      {activeTab === 'hotels' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white/90 rounded-3xl p-5 border border-amber-200/80 space-y-4 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 font-bold border border-emerald-500/30">
                      {hotel.type}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-800">
                      {hotel.rooms?.length || 0} Oda
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-serif text-zinc-900">{hotel.name}</h3>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{hotel.address || hotel.district}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-2xl bg-[#f8f6f0] border border-amber-200/60">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Wi-Fi SSID:</span>
                      <strong className="text-zinc-800 font-mono">{hotel.rooms?.[0]?.wifiSsid || 'Hotel_Guest'}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Wi-Fi Şifresi:</span>
                      <strong className="text-zinc-800 font-mono">{hotel.rooms?.[0]?.wifiPass || 'Xenios2026!'}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Kahvaltı Saatleri:</span>
                      <span className="text-zinc-700">{hotel.breakfastHours || '07:30 - 10:30'}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">Check-out:</span>
                      <span className="text-zinc-700">{hotel.checkoutTime || '11:30'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between gap-2">
                  <a
                    href={`/stay/${hotel.id}/${hotel.rooms?.[0]?.number || '101'}`}
                    target="_blank"
                    className="flex-1 py-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 font-bold text-xs rounded-xl text-center border border-amber-500/30 transition flex items-center justify-center gap-1"
                  >
                    <span>Misafir Ekranını Aç</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => handleDeleteHotel(hotel.id, hotel.name)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-700 transition cursor-pointer border border-red-500/20"
                    title="Oteli Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: IN-ROOM SERVICES ANALYTICS */}
      {activeTab === 'inroom-analytics' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Toplam Oda İçi İstek</span>
              <strong className="text-3xl font-mono text-zinc-900 font-bold block">{requests.length}</strong>
              <span className="text-[10px] text-zinc-500">Canlı otel misafir talepleri</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Ortalama Yanıt Süresi</span>
              <strong className="text-3xl font-mono text-emerald-600 font-bold block">4.2 Dk</strong>
              <span className="text-[10px] text-zinc-500">Hedef: &lt; 10 Dk</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Misafir Memnuniyet Oranı</span>
              <strong className="text-3xl font-mono text-amber-800 font-bold block">%99.2</strong>
              <span className="text-[10px] text-emerald-600">5 Üzerinden 4.95</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMUS AI GUIDE ANALYTICS */}
      {activeTab === 'ai-analytics' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Toplam AI Sohbet Oturumu</span>
              <strong className="text-3xl font-mono text-amber-800 font-bold block">{bookings.length + requests.length}</strong>
              <span className="text-[10px] text-zinc-500">Turistler 6 dilde aktif soruyor</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Ortalama AI Yanıt Hızı</span>
              <strong className="text-3xl font-mono text-emerald-600 font-bold block">1.1 Sn</strong>
              <span className="text-[10px] text-zinc-500">Gemini 2.5 Flash Hızlı API</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Turist AI Memnuniyeti</span>
              <strong className="text-3xl font-mono text-amber-800 font-bold block">%98.8</strong>
              <span className="text-[10px] text-emerald-600">Pozitif geri bildirim</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FINANCE & POS HUB */}
      {activeTab === 'finance' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Toplam Sanal POS Hacmi</span>
              <strong className="text-3xl font-mono text-emerald-600 font-bold block">{bookings.reduce((sum, b) => sum + (b.amount || 0), 0).toLocaleString('tr-TR')} ₺</strong>
              <span className="text-[10px] text-zinc-500">256-Bit SSL 3D Secure</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Platform Komisyonu (%15)</span>
              <strong className="text-3xl font-mono text-amber-800 font-bold block">{Math.round(bookings.reduce((sum, b) => sum + (b.amount || 0), 0) * 0.15).toLocaleString('tr-TR')} ₺</strong>
              <span className="text-[10px] text-emerald-600">Xenios Net Kazancı</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Acentelere Aktarılan</span>
              <strong className="text-3xl font-mono text-zinc-900 font-bold block">{Math.round(bookings.reduce((sum, b) => sum + (b.amount || 0), 0) * 0.85).toLocaleString('tr-TR')} ₺</strong>
              <span className="text-[10px] text-zinc-500">Otomatik Hakediş Dağıtımı</span>
            </div>
          </div>
        </div>
      )}

      {/* EDIT EXPERIENCE MODAL */}
      {editingExp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border border-amber-300 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-zinc-900 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-800" />
                <h2 className="text-base font-bold font-serif text-zinc-900">İlan & Fiyat Düzenleme Masası</h2>
              </div>
              <button
                onClick={() => setEditingExp(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-700 block">İlan Başlığı</label>
                <input
                  type="text"
                  required
                  value={editingExp.title}
                  onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Fiyat</label>
                  <input
                    type="number"
                    required
                    value={editingExp.price}
                    onChange={(e) => setEditingExp({ ...editingExp, price: Number(e.target.value) })}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Para Birimi</label>
                  <select
                    value={editingExp.currency}
                    onChange={(e) => setEditingExp({ ...editingExp, currency: e.target.value })}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  >
                    <option value="₺">₺ (Türk Lirası)</option>
                    <option value="$">$ (USD)</option>
                    <option value="€">€ (EUR)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Süre</label>
                  <input
                    type="text"
                    value={editingExp.duration}
                    onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-700 block">Acente & İşletme Adı</label>
                <input
                  type="text"
                  required
                  value={editingExp.provider}
                  onChange={(e) => setEditingExp({ ...editingExp, provider: e.target.value })}
                  className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Yetkili Telefonu</label>
                  <input
                    type="text"
                    value={editingExp.phone || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, phone: e.target.value })}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Konum / Bölge</label>
                  <input
                    type="text"
                    value={editingExp.location}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-700 block">Pilot Operasyon Notu</label>
                <textarea
                  rows={2}
                  value={editingExp.agentNote || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, agentNote: e.target.value })}
                  className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs resize-none"
                />
              </div>

              <div className="pt-3 border-t border-amber-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Değişiklikleri Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW EXPERIENCE MODAL */}
      {isNewExpModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border border-amber-300 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-zinc-900 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-800" />
                <h2 className="text-base font-bold font-serif text-zinc-900">Kataloğa Yeni İşletme İlanı Ekle</h2>
              </div>
              <button
                onClick={() => setIsNewExpModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateExp} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-700 block">İlan Başlığı</label>
                <input
                  type="text"
                  required
                  value={newExp.title}
                  onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                  placeholder="Ör: Boğaz'da Özel Yat ile Günbatımı Turu"
                  className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Fiyat</label>
                  <input
                    type="number"
                    required
                    value={newExp.price}
                    onChange={(e) => setNewExp({ ...newExp, price: Number(e.target.value) })}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Para Birimi</label>
                  <select
                    value={newExp.currency}
                    onChange={(e) => setNewExp({ ...newExp, currency: e.target.value })}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  >
                    <option value="₺">₺ (Türk Lirası)</option>
                    <option value="$">$ (USD)</option>
                    <option value="€">€ (EUR)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Kategori</label>
                  <input
                    type="text"
                    value={newExp.category}
                    onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-700 block">İşletme / Acente Adı</label>
                <input
                  type="text"
                  required
                  value={newExp.provider}
                  onChange={(e) => setNewExp({ ...newExp, provider: e.target.value })}
                  placeholder="Ör: Bosphorus VIP Marine Tours"
                  className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">İşletme Telefonu</label>
                  <input
                    type="text"
                    value={newExp.phone || ''}
                    onChange={(e) => setNewExp({ ...newExp, phone: e.target.value })}
                    placeholder="+90 532 000 00 00"
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Konum</label>
                  <input
                    type="text"
                    value={newExp.location}
                    onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                    placeholder="Bebek, Beşiktaş"
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-amber-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewExpModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Kataloğa Ekle ve Canlıya Al</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW HOTEL MODAL */}
      {isNewHotelModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border border-amber-300 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-zinc-900 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-800" />
                <h2 className="text-base font-bold font-serif text-zinc-900">Sisteme Yeni Partner Otel Tanımla</h2>
              </div>
              <button
                onClick={() => setIsNewHotelModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateHotel} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-700 block">Otel Adı</label>
                <input
                  type="text"
                  required
                  value={newHotelName}
                  onChange={(e) => setNewHotelName(e.target.value)}
                  placeholder="Ör: Galata Palace Boutique Hotel"
                  className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Semt / Bölge</label>
                  <input
                    type="text"
                    required
                    value={newHotelDistrict}
                    onChange={(e) => setNewHotelDistrict(e.target.value)}
                    placeholder="Karaköy / Beyoğlu"
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Otel Tipi</label>
                  <select
                    value={newHotelType}
                    onChange={(e) => setNewHotelType(e.target.value)}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  >
                    <option value="Butik Otel & Konak">Butik Otel & Konak</option>
                    <option value="5 Yıldızlı Lüks Otel">5 Yıldızlı Lüks Otel</option>
                    <option value="Tarihi Yalı / Saray">Tarihi Yalı / Saray</option>
                    <option value="Apart & Rezidans">Apart & Rezidans</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Oda Sayısı</label>
                  <input
                    type="number"
                    value={newHotelRoomCount}
                    onChange={(e) => setNewHotelRoomCount(Number(e.target.value))}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Wi-Fi SSID</label>
                  <input
                    type="text"
                    value={newHotelWifiSsid}
                    onChange={(e) => setNewHotelWifiSsid(e.target.value)}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-700 block">Wi-Fi Şifresi</label>
                  <input
                    type="text"
                    value={newHotelWifiPass}
                    onChange={(e) => setNewHotelWifiPass(e.target.value)}
                    className="w-full p-3 bg-amber-50/40 border border-amber-200 rounded-xl font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-amber-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewHotelModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Oteli Sisteme Ekle</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
