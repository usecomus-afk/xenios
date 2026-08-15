"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { Complaint, Language } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Scale, 
  Clock, 
  Send, 
  Search, 
  Building2, 
  MapPin, 
  CreditCard, 
  ArrowLeft,
  Mail,
  Phone,
  CheckCircle2,
  HelpCircle,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { BrandMark } from '@/components/brand-mark';

export default function GuestComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [activeTab, setActiveTab] = useState<'report' | 'advisory' | 'track'>('report');
  
  // Form States
  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState<Complaint['businessCategory']>('Restoran / Kafe');
  const [location, setLocation] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [amountExpected, setAmountExpected] = useState('');
  const [currency, setCurrency] = useState('TRY');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [refundIban, setRefundIban] = useState('');
  const [description, setDescription] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  // Tracking Search
  const [searchCode, setSearchCode] = useState('');
  const [trackedComplaint, setTrackedComplaint] = useState<Complaint | null>(null);

  const refreshData = () => {
    setComplaints(XeniosStore.getComplaints());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('xenios_complaints_updated', refreshData);
    return () => window.removeEventListener('xenios_complaints_updated', refreshData);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !amountPaid || !description) {
      toast.error("Lütfen zorunlu alanları doldurunuz.");
      return;
    }

    setIsSubmitting(true);

    const paid = parseFloat(amountPaid) || 0;
    const expected = parseFloat(amountExpected) || (paid * 0.4);
    const discrepancy = Math.max(0, paid - expected);

    setTimeout(() => {
      const newComp = XeniosStore.addComplaint({
        businessName,
        businessCategory,
        location: location || 'İstanbul',
        incidentDate: new Date().toISOString().split('T')[0],
        amountPaid: paid,
        amountExpected: expected,
        currency,
        discrepancyAmount: discrepancy,
        guestName: guestName || 'Misafir',
        guestEmail: guestEmail || 'misafir@guest.com',
        guestPhone: guestPhone || '+90 532 000 00 00',
        hotelName: XeniosStore.getHotelById(XeniosStore.getActiveHotelId())?.name || 'Hotel Sultanahmet',
        roomNumber: XeniosStore.getActiveRoomId(),
        description,
        businessEmail: businessEmail || undefined,
        refundIbanOrCard: refundIban || undefined,
        status: 'under_review'
      });

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setSubmittedCode(newComp.trackingCode);
      setIsSubmitting(false);
      toast.success("Şikayetiniz ve hakem inceleme talebiniz başarıyla alındı.");
    }, 600);
  };

  const handleTrackSearch = () => {
    if (!searchCode.trim()) return;
    const found = complaints.find(c => c.trackingCode.toLowerCase() === searchCode.trim().toLowerCase());
    if (found) {
      setTrackedComplaint(found);
    } else {
      toast.error("Belirtilen takip koduna ait kayıt bulunamadı.");
    }
  };

  const publicAlerts = complaints.filter(c => c.isPublicAlert || c.status === 'published_blacklisted');

  return (
    <div className="min-h-screen bg-[#f8f6f0] pb-24 text-zinc-900">
      {/* Header */}
      <header className="bg-white border-b border-amber-200/60 p-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-zinc-700 transition">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <BrandMark size={34} showText={true} />
          </div>

          <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-300/60 text-xs font-bold text-amber-900">
            <Scale className="w-3.5 h-3.5 text-amber-700" />
            <span>Misafir Hakları & Hakem Masası</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        
        {/* Mission Statement Hero Banner */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 text-white p-6 rounded-3xl shadow-xl border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-bold text-[10px] uppercase tracking-wider">
              Xenios Güvencesi
            </span>
            <span className="text-xs text-amber-400 font-serif">İstanbul'un Misafirleri Başımızın Tacıdır</span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold font-serif text-white leading-snug">
            Haksız Fiyat, Dolandırıcılık ve Mağduriyet Hakem Masası
          </h1>

          <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
            İstanbul'da karşılaştığınız şüpheli, fahiş fiyatlı veya aldatıcı alışverişleri platformumuza bildirin. 
            Xenios olarak işletmeyle resmi iletişime geçerek hatanın telafisini ve haksız tahsil edilen farkın 
            <strong> doğrudan hesabınıza iadesini</strong> talep ediyoruz. 
            İyi niyet göstermeyen ve 30 gün içinde telafi etmeyen işletmeleri sonraki misafirleri korumak için 
            <strong> Uyarı Panosu'nda</strong> paylaşıyoruz.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-amber-200/80 shadow-sm">
          <button
            onClick={() => { setActiveTab('report'); setSubmittedCode(null); }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'report' ? 'bg-amber-500 text-white shadow-sm' : 'text-zinc-600 hover:bg-amber-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Şikayet & İade Bildir</span>
          </button>

          <button
            onClick={() => setActiveTab('advisory')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'advisory' ? 'bg-amber-500 text-white shadow-sm' : 'text-zinc-600 hover:bg-amber-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>Uyarı Panosu ({publicAlerts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'track' ? 'bg-amber-500 text-white shadow-sm' : 'text-zinc-600 hover:bg-amber-50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Durum Sorgula</span>
          </button>
        </div>

        {/* Tab 1: File a Dispute / Complaint */}
        {activeTab === 'report' && (
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-sm space-y-5">
            {submittedCode ? (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                    Takip Kodu: {submittedCode}
                  </span>
                  <h3 className="text-lg font-bold font-serif text-zinc-900 mt-2">
                    Hakem Bildiriminiz Başarıyla Kaydedildi!
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    Xenios Hukuk ve Hakem heyetimiz ilgili işletmeyle resmi temas başlatacaktır. 
                    Süreç boyunca durumunuzu takip kodunuzla sorgulayabilirsiniz.
                  </p>
                </div>

                <div className="pt-3 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedCode(null);
                      setBusinessName('');
                      setAmountPaid('');
                      setDescription('');
                    }}
                    className="px-5 py-2.5 bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition"
                  >
                    Yeni Bildirim Oluştur
                  </button>
                  <button
                    onClick={() => setActiveTab('advisory')}
                    className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl transition"
                  >
                    Uyarı Panosunu İncele
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="border-b border-amber-100 pb-3">
                  <h2 className="text-base font-bold font-serif text-zinc-900">Mağduriyet Bildirim Formu</h2>
                  <p className="text-xs text-zinc-500">
                    Lütfen yaşadığınız olayı, ödediğiniz tutarı ve işletme bilgilerini mümkün olduğunca net giriniz.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 block">Şikayet Edilen İşletme / Taksici Adı *</label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Örn: Sultanahmet Balıkçısı / 34 TAA 00 Plakalı Taksi"
                      className="w-full p-2.5 bg-amber-50/30 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 block">Hizmet / İşletme Kategorisi *</label>
                    <select
                      value={businessCategory}
                      onChange={(e: any) => setBusinessCategory(e.target.value)}
                      className="w-full p-2.5 bg-amber-50/30 border border-amber-200 rounded-xl"
                    >
                      <option value="Restoran / Kafe">Restoran / Kafe / Bar</option>
                      <option value="Taksi / Ulaşım">Taksi / Transfer / Ulaşım</option>
                      <option value="Alışveriş / Halı & Deri">Alışveriş / Halı, Deri & Antika</option>
                      <option value="Tur & Acente">Tur & Seyahat Acentesi</option>
                      <option value="Gece Kulübü / Bar">Gece Kulübü / Eğlence Mekanı</option>
                      <option value="Döviz & Diğer">Döviz Bürosu & Diğer</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 block">Olayın Geçtiği Konum / Semt</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Örn: Kapalıçarşı Nuruosmaniye Kapısı"
                      className="w-full p-2.5 bg-amber-50/30 border border-amber-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 block">İşletme E-posta / İletişim (Varsa)</label>
                    <input
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="İşletmenin faturadaki e-postası veya telefonu"
                      className="w-full p-2.5 bg-amber-50/30 border border-amber-200 rounded-xl"
                    />
                  </div>
                </div>

                {/* Amount Section */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3">
                  <h3 className="font-bold text-amber-950 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-700" />
                    <span>Ödeme ve Haksız Kazanç Tutarı</span>
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] text-zinc-600 block">Sizden Alınan Tutar *</label>
                      <input
                        type="number"
                        required
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        placeholder="Örn: 4800"
                        className="w-full p-2 bg-white border border-amber-200 rounded-xl font-mono font-bold text-zinc-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-zinc-600 block">Piyasa / Makul Değer</label>
                      <input
                        type="number"
                        value={amountExpected}
                        onChange={(e) => setAmountExpected(e.target.value)}
                        placeholder="Örn: 1500"
                        className="w-full p-2 bg-white border border-amber-200 rounded-xl font-mono text-zinc-700"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-zinc-600 block">Para Birimi</label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full p-2 bg-white border border-amber-200 rounded-xl font-bold"
                      >
                        <option value="TRY">Türk Lirası (₺)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dolar ($)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description & Proof */}
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 block">Olayın Detaylı Açıklaması *</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ne zaman oldu? Menüde fiyat yazıyor muydu? Taksici taksimetreyi açtı mı? Ürün sahte mi çıktı? Lütfen tüm detayları anlatınız..."
                    className="w-full h-28 p-3 bg-amber-50/30 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                {/* Contact & Refund Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-amber-100">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 block">Adınız Soyadınız *</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Ad Soyad"
                      className="w-full p-2.5 bg-amber-50/30 border border-amber-200 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 block">Telefon / WhatsApp Numaranız *</label>
                    <input
                      type="text"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+90 ... veya uluslararası numaranız"
                      className="w-full p-2.5 bg-amber-50/30 border border-amber-200 rounded-xl font-mono"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-semibold text-zinc-700 block">
                      İade İçin IBAN / Kart / PayPal Bilgisi (Uzlaşıldığında iade aktarılacaktır)
                    </label>
                    <input
                      type="text"
                      value={refundIban}
                      onChange={(e) => setRefundIban(e.target.value)}
                      placeholder="TR00 0000 0000 ... veya Banka / Kart Sahibi Bilgisi"
                      className="w-full p-2.5 bg-amber-50/30 border border-amber-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "İnceleme Başlatılıyor..." : "Şikayeti ve İade Talebini Gönder"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Advisory Board (Dikkat Edilmesi Gereken İşletmeler) */}
        {activeTab === 'advisory' && (
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300/80 text-xs space-y-1 text-amber-950">
              <div className="flex items-center gap-2 font-bold text-sm text-red-700">
                <AlertTriangle className="w-4 h-4" />
                <span>Misafir Deneyim Uyarıları & Şeffaflık Panosu</span>
              </div>
              <p className="text-zinc-600 text-[11px]">
                Aşağıdaki işletmeler, misafirlerimize haksız veya fahiş fiyat uyguladığı belgelenmiş, 
                kendilerine iletilen resmi açıklama ve uzlaşma yazılarına 30 gün boyunca iyi niyetle cevap vermemiş 
                veya telafiyi reddetmiş işletmelerdir.
              </p>
            </div>

            <div className="space-y-3">
              {publicAlerts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 border border-red-200 shadow-sm space-y-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Uyarı: 30 Gün Cevapsız / İnatçı
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-100 text-red-800 font-bold">
                        {item.businessCategory}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">Tarih: {item.incidentDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900">{item.businessName}</h3>
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>{item.location}</span>
                    </p>
                  </div>

                  <div className="bg-red-50/50 p-3 rounded-2xl border border-red-100 text-xs text-zinc-700 space-y-1">
                    <strong className="text-red-900 block text-[11px]">Yaşanan Mağduriyet:</strong>
                    <p className="leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 text-xs">
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Alınan Fahiş Fark:</span>
                      <strong className="text-red-600 font-mono font-bold text-sm">
                        +{formatPrice(item.discrepancyAmount, item.currency)} Fazla Tahsilat
                      </strong>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 block">Hakem Süreci:</span>
                      <span className="text-xs font-bold text-red-700">İşletme Telafiyi Reddetti</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Track Existing Complaint */}
        {activeTab === 'track' && (
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-sm space-y-4">
            <div>
              <h2 className="text-base font-bold font-serif text-zinc-900">Şikayet ve İade Süreci Sorgulama</h2>
              <p className="text-xs text-zinc-500">Size verilen takip kodunu (Örn: XEN-HAK-9042) girerek canlı durumu öğrenin.</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Takip Kodu Girin (Örn: XEN-HAK-...)"
                className="flex-1 p-2.5 text-xs bg-amber-50/30 border border-amber-200 rounded-xl font-mono uppercase"
              />
              <button
                onClick={handleTrackSearch}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                Sorgula
              </button>
            </div>

            {trackedComplaint && (
              <div className="mt-4 p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3 animate-in fade-in text-xs">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <div>
                    <span className="text-[10px] text-amber-800 font-mono font-bold block">{trackedComplaint.trackingCode}</span>
                    <strong className="text-sm text-zinc-900">{trackedComplaint.businessName}</strong>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    trackedComplaint.status === 'resolved_refunded'
                      ? 'bg-emerald-100 text-emerald-800'
                      : trackedComplaint.status === 'contacted_business'
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : trackedComplaint.status === 'published_blacklisted'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                  }`}>
                    {trackedComplaint.status === 'resolved_refunded'
                      ? '✓ İade Yapıldı / Uzlaşıldı'
                      : trackedComplaint.status === 'contacted_business'
                        ? '⏳ İşletmeye Yazı İletildi (30 Günlük Süreç)'
                        : trackedComplaint.status === 'published_blacklisted'
                          ? '⚠️ Uyarı Panosuna Alındı'
                          : 'İncelemede'}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-zinc-600">
                    <strong>Talep Edilen İade Farkı:</strong> {formatPrice(trackedComplaint.discrepancyAmount, trackedComplaint.currency)}
                  </p>
                  {trackedComplaint.businessResponse && (
                    <p className="text-zinc-700 bg-white p-2.5 rounded-xl border border-amber-100">
                      <strong>Hakem Heyeti Notu / İşletme Cevabı:</strong> {trackedComplaint.businessResponse}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
