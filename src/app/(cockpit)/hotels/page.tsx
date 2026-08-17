"use client";

import { useState } from 'react';
import { XeniosStore } from '@/lib/store';
import { Hotel } from '@/lib/types';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Globe, 
  Star, 
  QrCode, 
  Search,
  ExternalLink
} from 'lucide-react';

export default function HotelsPage() {
  const hotels = XeniosStore.getHotels();
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const districts = ['all', ...Array.from(new Set(hotels.map(h => h.district)))];

  const filtered = hotels.filter(h => {
    const matchesDistrict = selectedDistrict === 'all' || h.district === selectedDistrict;
    const matchesSearch = !search || 
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.address.toLowerCase().includes(search.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-white">Anlaşmalı Oteller & Tesis Yönetimi</h1>
          <p className="text-xs text-zinc-400">Xenios Sözleşmeli Partner Otel Envanteri ve Oda Yönetimi</p>
        </div>

        <Link
          href="/qr-generator"
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs flex items-center gap-1.5"
        >
          <QrCode className="w-4 h-4" />
          <span>Toplu QR Kod Yazdır</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Otel adı veya adres ara..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#171a22] rounded-xl border border-[#2c313d] text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="px-3 py-2.5 text-xs bg-[#171a22] border border-[#2c313d] rounded-xl text-zinc-300"
        >
          {districts.map((d) => (
            <option key={d} value={d}>
              {d === 'all' ? 'Tüm Semtler / Bölgeler' : d}
            </option>
          ))}
        </select>
      </div>

      {/* Hotel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((hotel) => (
          <div
            key={hotel.id}
            className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] hover:border-amber-500/40 transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold">
                    {hotel.type}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1 leading-snug">{hotel.name}</h3>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold bg-[#12141a] px-2 py-1 rounded-lg border border-[#2c313d]">
                  ★ {hotel.ratingStr.split(' ')[0]}
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{hotel.address}</span>
              </p>

              <div className="bg-[#12141a] p-2.5 rounded-xl border border-[#2c313d] text-[11px] text-zinc-300 space-y-1">
                <strong className="text-amber-400/80 text-[10px] block">ComusHost V2 Hedef Notu:</strong>
                <p className="text-zinc-400 line-clamp-2">{hotel.targetReason}</p>
              </div>

              <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1">
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3 text-zinc-500" />
                  {hotel.phone}
                </span>
                {hotel.website && (
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>Web</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Room QR generator action */}
            <div className="pt-3 border-t border-[#2c313d] flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">{hotel.rooms.length} Tanımlı Oda</span>
              <Link
                href={`/qr-generator?hotelId=${hotel.id}`}
                className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 transition"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Oda QR'ları</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
