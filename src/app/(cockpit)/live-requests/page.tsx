"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { ServiceRequest } from '@/lib/types';
import { BellRing, CheckCircle2, Clock, Filter, RefreshCw, Sparkles, Building2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LiveRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  const refreshData = () => {
    setRequests(XeniosStore.getRequests());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('xenios_requests_updated', refreshData);
    return () => window.removeEventListener('xenios_requests_updated', refreshData);
  }, []);

  const handleStatusChange = (id: string, status: ServiceRequest['status']) => {
    XeniosStore.updateRequestStatus(id, status);
    toast.success("Talep durumu güncellendi.");
    refreshData();
  };

  const filtered = requests.filter(r => filter === 'all' || r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-white">Canlı Oda Talepleri Yönetim Masası</h1>
          <p className="text-xs text-zinc-400">Misafirlerin QR kod ile odalarından ilettiği tüm canlı istekler</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-[#171a22] p-1 rounded-xl border border-[#2c313d]">
          {(['all', 'pending', 'in_progress', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === f
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {f === 'all' ? 'Tümü' : f === 'pending' ? 'Bekleyen' : f === 'in_progress' ? 'İşlemde' : 'Tamamlanan'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#171a22] rounded-3xl p-12 text-center text-zinc-500 border border-[#2c313d] space-y-2">
          <BellRing className="w-8 h-8 mx-auto text-amber-500 opacity-40" />
          <p className="text-xs">Bu filtreye uygun aktif talep bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-2xl bg-[#171a22] border border-[#2c313d] hover:border-amber-500/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs">
                    Oda {req.roomNumber}
                  </span>
                  <strong className="text-sm text-white">{req.serviceTitle}</strong>
                </div>

                <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{req.hotelName}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="font-mono">{new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {req.notes && (
                  <div className="bg-[#12141a] p-2.5 rounded-xl border border-[#2c313d] text-zinc-300 text-[11px]">
                    <strong className="text-amber-400/80 block text-[10px]">Misafir Notu:</strong>
                    {req.notes}
                  </div>
                )}
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {req.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange(req.id, 'in_progress')}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition"
                  >
                    İşleme Al
                  </button>
                )}
                {req.status !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange(req.id, 'completed')}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tamamlandı</span>
                  </button>
                )}
                {req.status === 'completed' && (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold">
                    ✓ Çözümlendi
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
