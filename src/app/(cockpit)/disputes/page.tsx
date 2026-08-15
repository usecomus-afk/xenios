"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { Complaint, ComplaintStatus } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Mail, 
  Clock, 
  Send, 
  Building2, 
  User, 
  CreditCard,
  ExternalLink,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

export default function CockpitComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filter, setFilter] = useState<'all' | ComplaintStatus>('all');
  const [selectedComp, setSelectedComp] = useState<Complaint | null>(null);
  const [responseNote, setResponseNote] = useState('');

  const refreshData = () => {
    setComplaints(XeniosStore.getComplaints());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('xenios_complaints_updated', refreshData);
    return () => window.removeEventListener('xenios_complaints_updated', refreshData);
  }, []);

  const handleSendEmail = (comp: Complaint) => {
    XeniosStore.updateComplaintStatus(
      comp.id, 
      'contacted_business', 
      'İşletmeye 30 günlük resmi uzlaşma ve fark iadesi talep yazısı e-posta ile iletildi.'
    );
    toast.success(`${comp.businessName} işletmesine resmi hakem inceleme yazısı gönderildi.`);
    refreshData();
  };

  const handleResolveRefund = (comp: Complaint) => {
    XeniosStore.updateComplaintStatus(
      comp.id, 
      'resolved_refunded', 
      'İşletme hatayı kabul etti ve fark tutarını misafirin hesabına iade etti. Dosya uzlaşmayla kapatıldı.',
      false
    );
    toast.success("Mağduriyet telafi edildi ve dosya başarıyla kapatıldı.");
    refreshData();
  };

  const handlePublishBlacklist = (comp: Complaint) => {
    XeniosStore.updateComplaintStatus(
      comp.id, 
      'published_blacklisted', 
      '30 gün boyunca iyi niyet gösterilmedi veya telafi reddedildi. İşletme Xenios Uyarı Panosu\'nda yayınlandı.',
      true
    );
    toast.error("İşletme kamuya açık Uyarı Panosu'na eklendi.");
    refreshData();
  };

  const filtered = complaints.filter(c => filter === 'all' || c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <span>Misafir Hakları & Hakem Masası</span>
          </h1>
          <p className="text-xs text-zinc-400">
            Turistlerin bildirdiği fahiş fiyat, aldatmaca ve mağduriyetlerin arabuluculuk ve şeffaflık yönetimi
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5 bg-[#171a22] p-1 rounded-xl border border-[#2c313d] text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filter === 'all' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Tümü ({complaints.length})
          </button>
          <button
            onClick={() => setFilter('under_review')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filter === 'under_review' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Yeni / İncelemede
          </button>
          <button
            onClick={() => setFilter('contacted_business')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filter === 'contacted_business' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Yazı Gönderildi (30 Gün)
          </button>
          <button
            onClick={() => setFilter('resolved_refunded')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filter === 'resolved_refunded' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            İade Edildi / Çözüldü
          </button>
          <button
            onClick={() => setFilter('published_blacklisted')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              filter === 'published_blacklisted' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Uyarı Panosunda (Kara Liste)
          </button>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="space-y-4">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] hover:border-amber-500/40 transition space-y-3 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2c313d] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-400 font-bold bg-[#12141a] px-2 py-0.5 rounded border border-[#2c313d]">
                    {comp.trackingCode}
                  </span>
                  <strong className="text-sm text-white">{comp.businessName}</strong>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold">
                    {comp.businessCategory}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 mt-0.5 block">{comp.location} • Olay Tarihi: {comp.incidentDate}</span>
              </div>

              {/* Status Badge */}
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  comp.status === 'resolved_refunded'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : comp.status === 'contacted_business'
                      ? 'bg-blue-500/20 text-blue-400 animate-pulse'
                      : comp.status === 'published_blacklisted'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {comp.status === 'resolved_refunded'
                    ? '✓ İade Yapıldı / Uzlaşıldı'
                    : comp.status === 'contacted_business'
                      ? `⏳ İşletme Yanıtı Bekleniyor (${comp.daysPending}/30 Gün)`
                      : comp.status === 'published_blacklisted'
                        ? '⚠️ Uyarı Panosunda Yayınlandı'
                        : 'Yeni / İncelemede'}
                </span>
              </div>
            </div>

            {/* Dispute Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#12141a] p-3 rounded-2xl border border-[#2c313d] space-y-1">
                <strong className="text-zinc-400 text-[10px] uppercase block">Misafir & Konaklama</strong>
                <p className="text-zinc-200 font-bold">{comp.guestName}</p>
                <p className="text-zinc-400 text-[11px]">{comp.hotelName} (Oda {comp.roomNumber})</p>
                <p className="text-zinc-400 text-[11px] font-mono">{comp.guestPhone} • {comp.guestEmail}</p>
                {comp.refundIbanOrCard && (
                  <p className="text-amber-400/80 text-[10px] font-mono mt-1 truncate">
                    İade Hesabı: {comp.refundIbanOrCard}
                  </p>
                )}
              </div>

              <div className="bg-[#12141a] p-3 rounded-2xl border border-[#2c313d] space-y-1">
                <strong className="text-zinc-400 text-[10px] uppercase block">Mali Uyuşmazlık & Fark</strong>
                <div className="flex justify-between text-zinc-300">
                  <span>Tahsil Edilen:</span>
                  <strong className="font-mono text-white">{formatPrice(comp.amountPaid, comp.currency)}</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Makul Piyasa:</span>
                  <span className="font-mono">{formatPrice(comp.amountExpected, comp.currency)}</span>
                </div>
                <div className="flex justify-between text-amber-400 border-t border-[#2c313d] pt-1">
                  <span>Talep Edilen İade:</span>
                  <strong className="font-mono font-bold text-red-400">+{formatPrice(comp.discrepancyAmount, comp.currency)}</strong>
                </div>
              </div>

              <div className="bg-[#12141a] p-3 rounded-2xl border border-[#2c313d] space-y-1">
                <strong className="text-zinc-400 text-[10px] uppercase block">Olay Açıklaması & Not</strong>
                <p className="text-zinc-300 line-clamp-3 leading-relaxed text-[11px]">{comp.description}</p>
              </div>
            </div>

            {/* Arbitration Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2c313d]">
              <div className="text-[11px] text-zinc-500">
                {comp.businessResponse ? (
                  <span>Son İşlem: <strong className="text-zinc-300">{comp.businessResponse}</strong></span>
                ) : (
                  <span>İşletme E-posta: <strong className="text-zinc-300 font-mono">{comp.businessEmail || 'Kayıtlarda yok'}</strong></span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {comp.status === 'under_review' && (
                  <button
                    onClick={() => handleSendEmail(comp)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>İşletmeye Resmi Yazı Gönder</span>
                  </button>
                )}

                {comp.status !== 'resolved_refunded' && (
                  <button
                    onClick={() => handleResolveRefund(comp)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>İadeyi Onayla & Dosyayı Kapat</span>
                  </button>
                )}

                {comp.status !== 'published_blacklisted' && (
                  <button
                    onClick={() => handlePublishBlacklist(comp)}
                    className="px-3.5 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 rounded-xl font-bold flex items-center gap-1.5 transition"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Uyarı Panosunda Yayınla (Kara Liste)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
