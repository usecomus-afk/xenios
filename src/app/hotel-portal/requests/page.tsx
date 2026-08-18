"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { ServiceRequest } from '@/lib/types';
import {
  BellRing,
  CheckCircle2,
  Clock,
  Filter,
  Check,
  Building2,
  Search,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

export default function HotelLiveRequestsPage() {
  const hotels = XeniosStore.getHotels();
  const activeHotelId = XeniosStore.getActiveHotelId();
  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const refresh = () => {
    setRequests(XeniosStore.getRequests().filter(r => r.hotelId === currentHotel.id || !r.hotelId));
  };

  useEffect(() => {
    refresh();
    window.addEventListener('xenios_requests_updated', refresh);
    return () => window.removeEventListener('xenios_requests_updated', refresh);
  }, [currentHotel.id]);

  const handleUpdateStatus = (id: string, status: ServiceRequest['status']) => {
    XeniosStore.updateRequestStatus(id, status);
    toast.success('Talep durumu güncellendi.');
    refresh();
  };

  const handleSimulateRequest = () => {
    const services = [
      { key: 'breakfast', title: 'Odaya Sıcak Kahvaltı', dept: 'Room Service (Mutfak KDS)', note: '2 Kişilik Türk Kahvaltısı · Saat: 09:00' },
      { key: 'towels', title: 'Ekstra Banyo Havlusu', dept: 'Housekeeping', note: '2 Adet Büyük Banyo Havlusu Talebi' },
      { key: 'cleaning', title: 'Oda Temizliği & Havalandırma', dept: 'Housekeeping', note: 'Acil temizlik rica edildi' },
      { key: 'taxi', title: 'Kapıya Sarı Taksi', dept: 'Concierge / Bellboy', note: 'İstanbul Havalimanı transferi için' }
    ];
    const pick = services[Math.floor(Math.random() * services.length)];
    const randomRoom = currentHotel.rooms[Math.floor(Math.random() * currentHotel.rooms.length)]?.number || '204';

    XeniosStore.addRequest({
      hotelId: currentHotel.id,
      hotelName: currentHotel.name,
      roomNumber: randomRoom,
      serviceKey: pick.key,
      serviceTitle: pick.title,
      notes: pick.note,
      status: 'pending',
      department: pick.dept,
      priority: Math.random() > 0.6 ? 'acil' : 'standart',
      stage: 'Beklemede'
    });

    toast.info(`Simülasyon: Oda ${randomRoom} için yeni talep geldi!`);
    refresh();
  };

  const filtered = requests.filter((r) => {
    const matchesDept = filterDept === 'all' || (r.department && r.department.toLowerCase().includes(filterDept.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesSearch = !search ||
      r.roomNumber.includes(search) ||
      r.serviceTitle.toLowerCase().includes(search.toLowerCase()) ||
      (r.notes && r.notes.toLowerCase().includes(search.toLowerCase()));
    return matchesDept && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 text-zinc-100 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2c313d] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{currentHotel.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
            Canlı Oda Talepleri & Kat Hizmetleri Masası
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Misafir odalarından gelen QR taleplerini departman bazında anlık takip edin ve çözün.
          </p>
        </div>

        <button
          onClick={handleSimulateRequest}
          className="px-4 py-2.5 bg-[#171a22] hover:bg-[#202430] text-amber-400 border border-amber-500/30 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ Örnek Canlı Talep Gönder</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#171a22] p-3.5 rounded-2xl border border-[#2c313d]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Oda no, hizmet adı veya not ara..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#0f1116] border border-[#2c313d] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="text-xs bg-[#0f1116] border border-[#2c313d] text-zinc-300 rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="all">Tüm Departmanlar</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Mutfak">Room Service / Mutfak</option>
            <option value="Resepsiyon">Resepsiyon</option>
            <option value="Teknik">Teknik Servis</option>
            <option value="Concierge">Concierge & Taksi</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-[#0f1116] border border-[#2c313d] text-zinc-300 rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="pending">Bekleyenler</option>
            <option value="in_progress">İşlemdekiler</option>
            <option value="completed">Tamamlananlar</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-[#171a22] rounded-3xl border border-[#2c313d] text-zinc-400 space-y-2">
            <BellRing className="w-8 h-8 mx-auto text-amber-500/50" />
            <p className="text-xs font-semibold">Şu anda bekleyen veya filtrelere uyan talep bulunmuyor.</p>
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              className={`p-4 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                req.status === 'completed'
                  ? 'bg-[#171a22]/50 border-zinc-800 opacity-70'
                  : req.priority === 'acil'
                  ? 'bg-red-500/[0.04] border-red-500/40 shadow-xs'
                  : 'bg-[#171a22] border-[#2c313d] hover:border-[#3e4453]'
              }`}
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-400 font-mono font-bold text-xs border border-amber-500/30">
                    Oda {req.roomNumber}
                  </span>
                  <strong className="text-sm font-bold text-white">{req.serviceTitle}</strong>
                  {req.priority === 'acil' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> ACİL
                    </span>
                  )}
                  {req.department && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0f1116] border border-[#2c313d] text-zinc-400 font-semibold">
                      {req.department}
                    </span>
                  )}
                </div>

                {req.notes && (
                  <p className="text-xs text-zinc-300 leading-relaxed pl-1">
                    {req.notes}
                  </p>
                )}

                <div className="text-[10px] text-zinc-500 flex items-center gap-2 pl-1">
                  <span>Talep Zamanı: {new Date(req.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {req.status === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(req.id, 'in_progress')}
                    className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    İşleme Al
                  </button>
                )}

                {req.status !== 'completed' && (
                  <button
                    onClick={() => handleUpdateStatus(req.id, 'completed')}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Çözüldü</span>
                  </button>
                )}

                {req.status === 'completed' && (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold text-xs border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tamamlandı</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
