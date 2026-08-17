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

    const handleExpUpdate = () => setExperiences(XeniosStore.getExperiences());
    const handleHotelUpdate = () => setHotels(XeniosStore.getHotels());

    window.addEventListener('xenios_experiences_updated', handleExpUpdate);
    window.addEventListener('xenios_hotels_updated', handleHotelUpdate);

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
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 text-zinc-100">
      
      {/* Pilot Master Header */}
      <div className="bg-gradient-to-r from-zinc-950 via-[#181a20] to-zinc-900 rounded-3xl p-6 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-full flex items-center gap-1 shadow-md shadow-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilot & Kurucu Yönetim Merkezi</span>
            </span>
            <span className="text-xs text-amber-400/80 font-mono">
              Yetkili: anilaslan@usecomus.com
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Xenios İstanbul Operasyon Masası
          </h1>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Tüm gerçek işletme ilanlarını düzenleyin, anlık fiyat değiştirin, yeni anlaşmalı oteller tanımlayın ve misafir kullanım ile comusAI istatistiklerini takip edin.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setIsNewExpModalOpen(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-2xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni İlan Ekle</span>
          </button>

          <button
            onClick={() => setIsNewHotelModalOpen(true)}
            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-bold text-xs rounded-2xl border border-amber-500/30 shadow-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            <span>Yeni Otel Tanımla</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800">
        {[
          { id: 'experiences', label: 'İşletme İlanları & Fiyatlar', icon: Compass, count: experiences.length },
          { id: 'hotels', label: 'Anlaşmalı Oteller', icon: Building2, count: hotels.length },
          { id: 'inroom-analytics', label: 'Oda Hizmetleri Kullanımı', icon: TrendingUp, count: '%94.8' },
          { id: 'ai-analytics', label: 'comusAI Rehber Analitiği', icon: Bot, count: '842 Sohbet' },
          { id: 'finance', label: 'Sanal POS & Finans', icon: DollarSign, count: '184.2K ₺' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                isActive
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-sm'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:bg-zinc-800/80 hover:text-zinc-200'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                isActive ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900/80 p-4 rounded-3xl border border-zinc-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchExp}
                onChange={(e) => setSearchExp(e.target.value)}
                placeholder="İlan adı, acente veya konum ara..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:border-amber-500 text-zinc-200"
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
                      : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
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
                className="bg-zinc-900/90 rounded-3xl p-4 border border-zinc-800 hover:border-amber-500/50 transition space-y-3 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30">
                      {exp.category}
                    </span>
                    <strong className="text-sm font-mono text-emerald-400 font-bold">
                      {exp.price} {exp.currency}
                    </strong>
                  </div>

                  <h3 className="text-sm font-bold text-white font-serif line-clamp-2">
                    {exp.title}
                  </h3>

                  <div className="space-y-1 text-xs text-zinc-400 pt-1">
                    <p className="flex items-center gap-1.5 text-zinc-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <strong className="text-zinc-200 truncate">{exp.provider}</strong>
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <Phone className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span>{exp.phone || '+90 532 000 00 00'}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px]">
                      <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span className="truncate">{exp.location}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setEditingExp(exp)}
                    className="flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-xs rounded-xl border border-amber-500/30 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Düzenle & Fiyat</span>
                  </button>

                  <button
                    onClick={() => handleDeleteExp(exp.id, exp.title)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CONTRACTED PARTNER HOTELS CRUD */}
      {activeTab === 'hotels' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-zinc-900/80 p-4 rounded-3xl border border-zinc-800">
            <div>
              <h2 className="text-sm font-bold text-white">Sözleşmeli Partner Oteller</h2>
              <p className="text-xs text-zinc-400">Tek tek anlaşma yapılan aktif tesisler ve oda envanterleri.</p>
            </div>
            <button
              onClick={() => setIsNewHotelModalOpen(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Otel Ekle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800 hover:border-amber-500/40 transition space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 uppercase">
                      {hotel.type}
                    </span>
                    <h3 className="text-base font-bold font-serif text-white mt-1">{hotel.name}</h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{hotel.address}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-amber-400 block">
                      {hotel.rooms.length} Aktif Oda
                    </span>
                    <span className="text-[10px] text-zinc-500">QR Kodları Üretildi</span>
                  </div>
                </div>

                {/* Wi-Fi & Schedule details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-0.5">
                    <span className="text-[10px] text-zinc-500 block">Wi-Fi Ağı & Şifre</span>
                    <strong className="text-zinc-200 block truncate font-mono text-[11px]">{hotel.rooms[0]?.wifiSsid || 'Hotel_Guest'}</strong>
                    <code className="text-amber-400 text-[10px]">{hotel.rooms[0]?.wifiPass || 'Xenios2026!'}</code>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-0.5">
                    <span className="text-[10px] text-zinc-500 block">Kahvaltı Saatleri</span>
                    <strong className="text-zinc-200 block text-xs">{hotel.breakfastHours}</strong>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-0.5">
                    <span className="text-[10px] text-zinc-500 block">Çıkış Saati / Ext</span>
                    <strong className="text-zinc-200 block text-xs">{hotel.checkoutTime} (Ext: {hotel.receptionExt})</strong>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-2">
                  <a
                    href={`/stay/${hotel.id}/${hotel.rooms[0]?.number || '101'}`}
                    target="_blank"
                    className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Misafir Görünümünü Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleDeleteHotel(hotel.id, hotel.name)}
                    className="text-xs text-red-400 hover:text-red-300 font-bold cursor-pointer"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: IN-ROOM SERVICE USAGE ANALYTICS */}
      {activeTab === 'inroom-analytics' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Toplam Misafir Etkileşimi</span>
              <strong className="text-2xl font-mono text-amber-400 font-bold block">1,428</strong>
              <span className="text-[10px] text-emerald-400">↑ %18 Bu Hafta</span>
            </div>

            <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Günlük Ortalama İstek</span>
              <strong className="text-2xl font-mono text-white font-bold block">46 Talep</strong>
              <span className="text-[10px] text-zinc-400">Pik saatler: 08:30 & 21:00</span>
            </div>

            <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Ortalama Teslim Süresi</span>
              <strong className="text-2xl font-mono text-emerald-400 font-bold block">8.4 Dk</strong>
              <span className="text-[10px] text-zinc-400">Hedef: &lt; 15 Dk</span>
            </div>

            <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Misafir Memnuniyet Oranı</span>
              <strong className="text-2xl font-mono text-amber-400 font-bold block">%98.6</strong>
              <span className="text-[10px] text-emerald-400">5 Üzerinden 4.93</span>
            </div>
          </div>

          {/* Service breakdown list */}
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-white">En Çok Kullanılan Otel İçi Hizmetler</h3>
            
            <div className="space-y-3 text-xs">
              {[
                { name: 'Temiz Havlu Talebi', count: 394, pct: 27.6, color: 'bg-amber-500' },
                { name: 'Oda Temizliği (Housekeeping)', count: 342, pct: 23.9, color: 'bg-blue-500' },
                { name: 'Ekstra Yastık & Pike', count: 228, pct: 16.0, color: 'bg-emerald-500' },
                { name: 'Sarı Taksi & VIP Transfer', count: 198, pct: 13.9, color: 'bg-orange-500' },
                { name: 'Geç Çıkış / Resepsiyon Hattı', count: 154, pct: 10.8, color: 'bg-purple-500' },
                { name: 'Minibar & Su Talebi', count: 112, pct: 7.8, color: 'bg-pink-500' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="font-bold">{item.name}</span>
                    <span className="font-mono text-zinc-400">{item.count} İstek (%{item.pct})</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMUS AI GUIDE ANALYTICS */}
      {activeTab === 'ai-analytics' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Toplam AI Sohbet Oturumu</span>
              <strong className="text-3xl font-mono text-amber-400 font-bold block">842</strong>
              <span className="text-[10px] text-zinc-400">Turistler 6 dilde aktif soruyor</span>
            </div>

            <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Ortalama AI Yanıt Hızı</span>
              <strong className="text-3xl font-mono text-emerald-400 font-bold block">1.1 Sn</strong>
              <span className="text-[10px] text-zinc-400">Gemini 2.5 Flash Hızlı API</span>
            </div>

            <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Turist AI Memnuniyeti</span>
              <strong className="text-3xl font-mono text-amber-400 font-bold block">%98.4</strong>
              <span className="text-[10px] text-emerald-400">Pozitif geri bildirim</span>
            </div>
          </div>

          {/* Most asked topics */}
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Turistlerin comusAI'ya En Çok Sorduğu Konular</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>1. Boğaz Turları & Akşam Yemeği</span>
                  <span className="font-mono">%34</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Turistler iskele kalkış saatlerini, yemekli tekneleri ve özel yat kiralama fiyatlarını sormaktadır.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>2. Döviz Bürosu & Güvenli Para Bozdurma</span>
                  <span className="font-mono">%21</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Kapalıçarşı ve Sultanahmet'te komisyonsuz en iyi döviz bürolarının konumları talep ediliyor.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>3. Müzeler, Ayasofya & Yürüyüş Rotaları</span>
                  <span className="font-mono">%19</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  MüzeKart geçerliliği, namaz saatlerindeki ziyaret kısıtlamaları ve sıra beklemeden giriş yolları.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>4. Taksi Güvenliği & Dolandırıcılık Kalkanı</span>
                  <span className="font-mono">%15</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Havalimanı ve Kadıköy dönüşlerinde ortalama taksimetre rayiç fiyatları ve plaka sorgulamaları.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FINANCE & POS HUB */}
      {activeTab === 'finance' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Toplam Sanal POS Hacmi</span>
              <strong className="text-3xl font-mono text-emerald-400 font-bold block">184,200 ₺</strong>
              <span className="text-[10px] text-zinc-400">256-Bit SSL 3D Secure</span>
            </div>

            <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Platform Komisyonu (%15)</span>
              <strong className="text-3xl font-mono text-amber-400 font-bold block">27,630 ₺</strong>
              <span className="text-[10px] text-emerald-400">Xenios Net Kazancı</span>
            </div>

            <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Acentelere Aktarılan</span>
              <strong className="text-3xl font-mono text-white font-bold block">156,570 ₺</strong>
              <span className="text-[10px] text-zinc-400">Otomatik Hakediş Dağıtımı</span>
            </div>
          </div>
        </div>
      )}

      {/* EDIT EXPERIENCE MODAL */}
      {editingExp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-zinc-900 rounded-3xl max-w-2xl w-full p-6 border border-amber-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-zinc-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold font-serif text-white">İlan & Fiyat Düzenleme Masası</h2>
              </div>
              <button
                onClick={() => setEditingExp(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">İlan Başlığı</label>
                  <input
                    type="text"
                    required
                    value={editingExp.title}
                    onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Kategori</label>
                  <input
                    type="text"
                    value={editingExp.category}
                    onChange={(e) => setEditingExp({ ...editingExp, category: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">İşletme / Acente Adı</label>
                  <input
                    type="text"
                    required
                    value={editingExp.provider}
                    onChange={(e) => setEditingExp({ ...editingExp, provider: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">İşletme Telefonu</label>
                  <input
                    type="text"
                    value={editingExp.phone}
                    onChange={(e) => setEditingExp({ ...editingExp, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Fiyat & Para Birimi</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      value={editingExp.price}
                      onChange={(e) => setEditingExp({ ...editingExp, price: Number(e.target.value) })}
                      className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-emerald-400 font-bold font-mono"
                    />
                    <select
                      value={editingExp.currency}
                      onChange={(e) => setEditingExp({ ...editingExp, currency: e.target.value })}
                      className="w-20 px-2 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white font-bold"
                    >
                      <option value="₺">₺ (TL)</option>
                      <option value="€">€ (EUR)</option>
                      <option value="$">$ (USD)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Süre</label>
                  <input
                    type="text"
                    value={editingExp.duration}
                    onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Buluşma Noktası / Konum</label>
                  <input
                    type="text"
                    value={editingExp.location}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Açıklama / Rehber Notu</label>
                  <textarea
                    rows={3}
                    value={editingExp.agentNote}
                    onChange={(e) => setEditingExp({ ...editingExp, agentNote: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-zinc-200"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Değişiklikleri Canlıya Al</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW EXPERIENCE MODAL */}
      {isNewExpModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-zinc-900 rounded-3xl max-w-2xl w-full p-6 border border-amber-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-zinc-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold font-serif text-white">Yeni Gerçek İşletme İlanı Ekle</h2>
              </div>
              <button
                onClick={() => setIsNewExpModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateExp} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">İlan Başlığı</label>
                  <input
                    type="text"
                    required
                    value={newExp.title}
                    onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                    placeholder="Örn: Tarihi Yarımada Özel Rehberli VIP Tur"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Kategori</label>
                  <select
                    value={newExp.category}
                    onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white font-bold"
                  >
                    <option value="Boğaz Turları & Yat">Boğaz Turları & Yat</option>
                    <option value="Fotoğraf & Kostüm">Fotoğraf & Kostüm</option>
                    <option value="Türk Hamamı & SPA">Türk Hamamı & SPA</option>
                    <option value="Tarih & Müzeler">Tarih & Müzeler</option>
                    <option value="Gastronomi & Gurme">Gastronomi & Gurme</option>
                    <option value="Özel VIP Transfer">Özel VIP Transfer</option>
                    <option value="Kültürel Miras">Kültürel Miras</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">İşletme / Acente Adı</label>
                  <input
                    type="text"
                    required
                    value={newExp.provider}
                    onChange={(e) => setNewExp({ ...newExp, provider: e.target.value })}
                    placeholder="Örn: Bosphorus Cruise Travel (TÜRSAB 14230)"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">İşletme Telefonu</label>
                  <input
                    type="text"
                    value={newExp.phone}
                    onChange={(e) => setNewExp({ ...newExp, phone: e.target.value })}
                    placeholder="+90 532 123 45 67"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Fiyat & Para Birimi</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      value={newExp.price}
                      onChange={(e) => setNewExp({ ...newExp, price: Number(e.target.value) })}
                      className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-emerald-400 font-bold font-mono"
                    />
                    <select
                      value={newExp.currency}
                      onChange={(e) => setNewExp({ ...newExp, currency: e.target.value })}
                      className="w-20 px-2 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-white font-bold"
                    >
                      <option value="₺">₺ (TL)</option>
                      <option value="€">€ (EUR)</option>
                      <option value="$">$ (USD)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Süre</label>
                  <input
                    type="text"
                    value={newExp.duration}
                    onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
                    placeholder="2.5 Saat"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Buluşma Noktası / Konum</label>
                  <input
                    type="text"
                    value={newExp.location}
                    onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                    placeholder="Eminönü İskelesi, Fatih"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Açıklama / Rehber Notu</label>
                  <textarea
                    rows={3}
                    value={newExp.agentNote}
                    onChange={(e) => setNewExp({ ...newExp, agentNote: e.target.value })}
                    placeholder="İlan detayları, misafir ayrıcalıkları ve rezervasyon bilgileri..."
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-zinc-200"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewExpModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Kataloğa Ekle & Canlıya Al</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW HOTEL MODAL */}
      {isNewHotelModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-zinc-900 rounded-3xl max-w-xl w-full p-6 border border-amber-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-zinc-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold font-serif text-white">Yeni Anlaşmalı Otel Tanımla</h2>
              </div>
              <button
                onClick={() => setIsNewHotelModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateHotel} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Otel Adı</label>
                  <input
                    type="text"
                    required
                    value={newHotelName}
                    onChange={(e) => setNewHotelName(e.target.value)}
                    placeholder="Örn: Sultanahmet Palace Boutique Hotel"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Bölge / Semt</label>
                  <input
                    type="text"
                    value={newHotelDistrict}
                    onChange={(e) => setNewHotelDistrict(e.target.value)}
                    placeholder="Sultanahmet / Fatih"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Tesis Türü</label>
                  <input
                    type="text"
                    value={newHotelType}
                    onChange={(e) => setNewHotelType(e.target.value)}
                    placeholder="Butik Otel & Konak"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Adres</label>
                  <input
                    type="text"
                    value={newHotelAddress}
                    onChange={(e) => setNewHotelAddress(e.target.value)}
                    placeholder="Divanyolu Cad. No:14 Sultanahmet, İstanbul"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Toplam Oda Sayısı</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    required
                    value={newHotelRoomCount}
                    onChange={(e) => setNewHotelRoomCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-amber-400 font-bold font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Resepsiyon Dahili No</label>
                  <input
                    type="text"
                    value={newHotelReceptionExt}
                    onChange={(e) => setNewHotelReceptionExt(e.target.value)}
                    placeholder="9"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Wi-Fi Ağı (SSID)</label>
                  <input
                    type="text"
                    value={newHotelWifiSsid}
                    onChange={(e) => setNewHotelWifiSsid(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Wi-Fi Şifresi</label>
                  <input
                    type="text"
                    value={newHotelWifiPass}
                    onChange={(e) => setNewHotelWifiPass(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Kahvaltı Saatleri</label>
                  <input
                    type="text"
                    value={newHotelBreakfast}
                    onChange={(e) => setNewHotelBreakfast(e.target.value)}
                    placeholder="07:30 - 10:30"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-300 block mb-1">Çıkış Saati</label>
                  <input
                    type="text"
                    value={newHotelCheckout}
                    onChange={(e) => setNewHotelCheckout(e.target.value)}
                    placeholder="11:30"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl focus:border-amber-500 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewHotelModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Oteli ve Odaları Tanımla</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
