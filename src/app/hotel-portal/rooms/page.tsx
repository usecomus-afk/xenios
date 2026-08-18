"use client";

import { useState } from 'react';
import { XeniosStore } from '@/lib/store';
import { DoorOpen, QrCode, Search, CheckCircle2, AlertCircle, Sparkles, User, Key } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type RoomStatus = 'occupied' | 'clean' | 'cleaning' | 'reserved' | 'maintenance';

export default function HotelRoomsPage() {
  const hotels = XeniosStore.getHotels();
  const activeHotelId = XeniosStore.getActiveHotelId();
  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  // Room Status Simulation State
  const [roomStates, setRoomStates] = useState<Record<string, { status: RoomStatus; guest?: string; checkout?: string }>>(() => {
    const map: Record<string, { status: RoomStatus; guest?: string; checkout?: string }> = {};
    currentHotel.rooms.forEach((r, idx) => {
      if (idx % 3 === 0) map[r.number] = { status: 'occupied', guest: 'John Miller', checkout: '12:00' };
      else if (idx % 5 === 0) map[r.number] = { status: 'cleaning' };
      else if (idx % 7 === 0) map[r.number] = { status: 'reserved', guest: 'Elena Rostova', checkout: 'Giriş: 14:00' };
      else map[r.number] = { status: 'clean' };
    });
    return map;
  });

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const updateStatus = (roomNum: string, nextStatus: RoomStatus) => {
    setRoomStates(prev => ({
      ...prev,
      [roomNum]: { ...prev[roomNum], status: nextStatus }
    }));
    toast.success(`Oda ${roomNum} durumu güncellendi.`);
  };

  const filteredRooms = currentHotel.rooms.filter(r => {
    const state = roomStates[r.number]?.status || 'clean';
    const matchesStatus = selectedStatus === 'all' || state === selectedStatus;
    const matchesSearch = !search || r.number.includes(search) || (roomStates[r.number]?.guest?.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const counts = {
    total: currentHotel.rooms.length,
    occupied: Object.values(roomStates).filter(s => s.status === 'occupied').length,
    clean: Object.values(roomStates).filter(s => s.status === 'clean').length,
    cleaning: Object.values(roomStates).filter(s => s.status === 'cleaning').length,
    reserved: Object.values(roomStates).filter(s => s.status === 'reserved').length,
  };

  return (
    <div className="space-y-6 text-zinc-100 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2c313d] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{currentHotel.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
            Oda Durumları & Envanter Masası
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Tüm odaların anlık doluluk, temizlik ve rezervasyon durumlarını canlı yönetin.
          </p>
        </div>

        <Link
          href="/hotel-portal/qr-generator"
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-2xl text-xs flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <QrCode className="w-4 h-4" />
          <span>Toplu QR Kodları Yazdır</span>
        </Link>
      </div>

      {/* KPI Status Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30">
          <span className="text-[10px] text-red-400 font-bold uppercase block">Dolu Odalar</span>
          <div className="text-xl font-bold text-red-300 mt-1 font-mono">{counts.occupied} Oda</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 font-bold uppercase block">Boş & Temiz</span>
          <div className="text-xl font-bold text-emerald-300 mt-1 font-mono">{counts.clean} Oda</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <span className="text-[10px] text-amber-400 font-bold uppercase block">Temizleniyor / Kirli</span>
          <div className="text-xl font-bold text-amber-300 mt-1 font-mono">{counts.cleaning} Oda</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30">
          <span className="text-[10px] text-blue-400 font-bold uppercase block">Rezerve</span>
          <div className="text-xl font-bold text-blue-300 mt-1 font-mono">{counts.reserved} Oda</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#171a22] p-3 rounded-2xl border border-[#2c313d]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Oda no veya misafir adı ara..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#0f1116] border border-[#2c313d] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'occupied', 'clean', 'cleaning', 'reserved'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                selectedStatus === st
                  ? 'bg-amber-500 border-amber-500 text-black shadow-xs'
                  : 'bg-[#0f1116] border-[#2c313d] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {st === 'all' ? 'Tümü' : st === 'occupied' ? 'Dolu' : st === 'clean' ? 'Boş' : st === 'cleaning' ? 'Temizlikte' : 'Rezerve'}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Room Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredRooms.map((room) => {
          const state = roomStates[room.number] || { status: 'clean' };
          return (
            <div
              key={room.number}
              className={`p-3.5 rounded-2xl border flex flex-col justify-between gap-2 transition ${
                state.status === 'occupied'
                  ? 'bg-red-500/[0.06] border-red-500/40'
                  : state.status === 'clean'
                  ? 'bg-emerald-500/[0.06] border-emerald-500/40'
                  : state.status === 'cleaning'
                  ? 'bg-amber-500/[0.06] border-amber-500/40'
                  : 'bg-blue-500/[0.06] border-blue-500/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-base font-bold font-mono text-white block">
                    {room.number}
                  </span>
                  <span className="text-[10px] text-zinc-400">{room.type}</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                  state.status === 'occupied'
                    ? 'bg-red-500/20 text-red-400'
                    : state.status === 'clean'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : state.status === 'cleaning'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {state.status === 'occupied' ? 'Dolu' : state.status === 'clean' ? 'Boş' : state.status === 'cleaning' ? 'Kirli' : 'Rezerve'}
                </span>
              </div>

              {state.guest && (
                <div className="text-[10px] text-zinc-300 bg-[#0f1116]/80 p-1.5 rounded-lg">
                  <div className="truncate font-semibold">{state.guest}</div>
                  <div className="text-zinc-500 text-[9px]">{state.checkout}</div>
                </div>
              )}

              {/* Status Switch Dropdown */}
              <div className="pt-1.5 border-t border-[#2c313d]/60 flex items-center justify-between">
                <select
                  value={state.status}
                  onChange={(e) => updateStatus(room.number, e.target.value as RoomStatus)}
                  className="text-[10px] bg-[#0f1116] border border-[#2c313d] rounded-lg px-1.5 py-1 text-zinc-300 focus:outline-none cursor-pointer"
                >
                  <option value="occupied">Dolu</option>
                  <option value="clean">Boş/Temiz</option>
                  <option value="cleaning">Temizlikte</option>
                  <option value="reserved">Rezerve</option>
                </select>

                <Link
                  href={`/qr-generator?hotelId=${currentHotel.id}&room=${room.number}`}
                  className="p-1 text-zinc-400 hover:text-amber-400"
                  title="Oda QR"
                >
                  <QrCode className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
