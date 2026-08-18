"use client";

import { useState } from 'react';
import { XeniosStore } from '@/lib/store';
import { Experience } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Compass, Search, Phone, Globe, Star, MapPin, Clock } from 'lucide-react';

export default function ExperiencesCockpitPage() {
  const experiences = XeniosStore.getExperiences() as Experience[];
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const categories = ['all', ...Array.from(new Set(experiences.map(e => e.category)))];

  const filtered = experiences.filter(e => {
    const matchesCat = selectedCat === 'all' || e.category === selectedCat;
    const matchesSearch = !search || 
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.provider.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold font-serif text-zinc-900">Gerçek İşletme & Deneyim Kataloğu</h1>
        <p className="text-xs text-zinc-500">13 Kategoride TÜRSAB Lisanslı Doğrulanmış Acenteler, Boğaz Turları, Hamamlar & Rehberler</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="İlan, sağlayıcı veya bölge ara..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white rounded-xl border border-amber-200/80 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-3 py-2.5 text-xs bg-white border border-amber-200/80 rounded-xl text-zinc-700 max-w-xs"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'Tüm Kategoriler' : c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-amber-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700">
            <thead className="bg-white text-zinc-500 border-b border-amber-200/80 uppercase text-[10px]">
              <tr>
                <th className="p-4">Kategori & İlan</th>
                <th className="p-4">İşletme / Sağlayıcı</th>
                <th className="p-4">Konum</th>
                <th className="p-4">İletişim</th>
                <th className="p-4">Fiyat / Süre</th>
                <th className="p-4">Puan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c313d]">
              {filtered.map((exp) => (
                <tr key={exp.id} className="hover:bg-white/5 transition">
                  <td className="p-4">
                    <span className="text-[10px] text-amber-400 font-bold block">{exp.category}</span>
                    <strong className="text-zinc-900 text-xs">{exp.title}</strong>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{exp.agentNote}</p>
                  </td>
                  <td className="p-4 font-semibold text-zinc-800">{exp.provider}</td>
                  <td className="p-4 text-zinc-500">{exp.location}</td>
                  <td className="p-4 font-mono text-[11px] text-zinc-700">{exp.phone}</td>
                  <td className="p-4 font-mono font-bold text-amber-400">
                    {formatPrice(exp.price, exp.currency)} <span className="text-[10px] font-normal text-zinc-500">({exp.duration})</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px]">
                      ★ {exp.scoreStr}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
