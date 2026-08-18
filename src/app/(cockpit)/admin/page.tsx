"use client";

import { useState, useEffect, useMemo } from 'react';
import { XeniosStore } from '@/lib/store';
import { ADMIN_ACCESS_CODE } from '@/lib/admin-auth';
import { Experience, Booking, XeniosUser, BookingStatus } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Lock, LogOut, ShieldCheck, KeyRound, Mail, Plus, Search, Edit3, Trash2, Save, X,
  Power, EyeOff, CreditCard, CheckCircle2, ExternalLink, Package, Ticket
} from 'lucide-react';

type NewExpDraft = {
  title: string; category: string; provider: string; location: string; phone: string;
  website: string; agentNote: string; price: number; currency: string; duration: string; image?: string;
};

const EMPTY_DRAFT: NewExpDraft = {
  title: '', category: 'Boğaz Turları & Yat', provider: '', location: 'Sultanahmet, Fatih',
  phone: '+90 532 000 00 00', website: 'https://', agentNote: '', price: 1500, currency: '₺',
  duration: '2.5 Saat', image: '/images/istanbul/il_1588xN.6201904451_eqr3.webp'
};

const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  payment_success: 'Ödeme Alındı',
  provider_pending: 'Sağlayıcı Onayı Bekliyor',
  confirmed: 'Onaylandı',
  cancelled: 'İptal Edildi'
};

function AdminLoginGate({ onLogin }: { onLogin: (user: XeniosUser) => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() !== ADMIN_ACCESS_CODE) {
      toast.error('Erişim kodu hatalı. Lütfen tekrar deneyin.');
      return;
    }
    const user: XeniosUser = {
      id: 'usr_admin_' + Date.now(),
      name: name.trim() || 'Xenios Yöneticisi',
      email: email.trim().toLowerCase() || 'admin@xenios.com',
      role: 'admin',
      provider: 'email',
      createdAt: new Date().toISOString()
    };
    XeniosStore.setUser(user);
    toast.success('Admin girişi başarılı.');
    onLogin(user);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-[#171a22] border border-[#2c313d] rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Lock className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="text-base font-bold font-serif text-white">İlan & Rezervasyon Yönetimi</h1>
          <p className="text-xs text-zinc-400">Bu bölüm sadece yetkili yöneticiler içindir. Devam etmek için erişim kodunuzu girin.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-zinc-400 block mb-1">Ad Soyad (Opsiyonel)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Yönetici adı"
              className="w-full px-3 py-2.5 text-xs bg-[#0f1116] border border-[#2c313d] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-zinc-400 block mb-1 flex items-center gap-1"><Mail className="w-3 h-3" /> E-Posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yonetici@xenios.com"
              className="w-full px-3 py-2.5 text-xs bg-[#0f1116] border border-[#2c313d] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-zinc-400 block mb-1 flex items-center gap-1"><KeyRound className="w-3 h-3" /> Yönetici Erişim Kodu</label>
            <input
              type="password"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="••••••••••"
              className="w-full px-3 py-2.5 text-xs bg-[#0f1116] border border-[#2c313d] rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-md shadow-amber-500/20 transition flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" /> Yönetici Girişi Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState<XeniosUser | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [tab, setTab] = useState<'listings' | 'bookings'>('listings');

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState<'all' | BookingStatus>('all');

  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [draft, setDraft] = useState<NewExpDraft>(EMPTY_DRAFT);

  const refresh = () => {
    setExperiences(XeniosStore.getExperiences());
    setBookings(XeniosStore.getBookings());
  };

  useEffect(() => {
    setUser(XeniosStore.getUser());
    setCheckedAuth(true);
    refresh();

    const onExp = () => setExperiences(XeniosStore.getExperiences());
    const onBook = () => setBookings(XeniosStore.getBookings());
    window.addEventListener('xenios_experiences_updated', onExp);
    window.addEventListener('xenios_bookings_updated', onBook);
    return () => {
      window.removeEventListener('xenios_experiences_updated', onExp);
      window.removeEventListener('xenios_bookings_updated', onBook);
    };
  }, []);

  const isAdmin = user?.role === 'admin';

  const stats = useMemo(() => {
    const active = experiences.filter((e) => e.status !== 'suspended').length;
    const suspended = experiences.length - active;
    const pendingBookings = bookings.filter((b) => b.status !== 'confirmed' && b.status !== 'cancelled').length;
    const totalVolume = bookings.filter((b) => b.status !== 'cancelled').reduce((sum, b) => sum + b.amount, 0);
    return { total: experiences.length, active, suspended, bookingsTotal: bookings.length, pendingBookings, totalVolume };
  }, [experiences, bookings]);

  const filteredExperiences = experiences.filter((e) =>
    !search ||
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.provider.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBookings = bookings.filter((b) => bookingFilter === 'all' || b.status === bookingFilter);

  const handleLogout = () => {
    XeniosStore.setUser(null);
    setUser(null);
    toast.info('Admin oturumu kapatıldı.');
  };

  const toggleStatus = (exp: Experience) => {
    const nextStatus = exp.status === 'suspended' ? 'active' : 'suspended';
    XeniosStore.updateExperience(exp.id, { status: nextStatus });
    toast.success(nextStatus === 'suspended' ? `"${exp.title}" askıya alındı — misafirlere gösterilmeyecek.` : `"${exp.title}" yeniden yayında.`);
    refresh();
  };

  const handleDelete = (exp: Experience) => {
    if (!confirm(`"${exp.title}" ilanını kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) return;
    XeniosStore.deleteExperience(exp.id);
    toast.info(`"${exp.title}" kalıcı olarak silindi.`);
    refresh();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    XeniosStore.updateExperience(editingExp.id, editingExp);
    toast.success(`"${editingExp.title}" güncellendi ve canlıya alındı.`);
    setEditingExp(null);
    refresh();
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.provider.trim()) {
      toast.error('Lütfen ilan başlığı ve işletme adını girin.');
      return;
    }
    const created: Experience = {
      id: 'exp-admin-' + Date.now(),
      title: draft.title.trim(),
      category: draft.category,
      provider: draft.provider.trim(),
      location: draft.location,
      phone: draft.phone,
      website: draft.website,
      agentNote: draft.agentNote || 'TÜRSAB onaylı kurumsal acente ilanı.',
      scoreStr: '5.0',
      price: Number(draft.price) || 0,
      currency: draft.currency,
      duration: draft.duration,
      rating: 5,
      coords: { lat: 41.0082, lng: 28.9784 },
      categoryTag: draft.category,
      iconName: 'sparkles',
      image: draft.image,
      status: 'active'
    };
    XeniosStore.addExperience(created);
    toast.success(`"${created.title}" kataloğa eklendi ve anında canlıya alındı.`);
    setIsNewOpen(false);
    setDraft(EMPTY_DRAFT);
    refresh();
  };

  const handleApproveBooking = (id: string) => {
    XeniosStore.updateBookingStatus(id, 'confirmed');
    toast.success('Rezervasyon onaylandı.');
    refresh();
  };

  if (!checkedAuth) return null;

  if (!isAdmin) {
    return <AdminLoginGate onLogin={(u) => setUser(u)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-serif text-white">İlan & Rezervasyon Yönetimi</h1>
          <p className="text-xs text-zinc-400">Yeni ilan girişi, düzenleme, fiyat değiştirme, askıya alma ve satın alma/rezervasyon takibi — hepsi tek ekrandan.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-zinc-400">{user?.name} ({user?.email})</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#171a22] border border-[#2c313d] text-zinc-300 hover:text-red-400 hover:border-red-500/40 rounded-xl text-xs font-bold transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Çıkış
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase">Toplam İlan</span>
          <div className="text-xl font-bold text-white mt-1 font-mono">{stats.total}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase">Aktif İlan</span>
          <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">{stats.active}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase">Askıda</span>
          <div className="text-xl font-bold text-red-400 mt-1 font-mono">{stats.suspended}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase">Toplam Rezervasyon</span>
          <div className="text-xl font-bold text-white mt-1 font-mono">{stats.bookingsTotal}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase">Bekleyen</span>
          <div className="text-xl font-bold text-amber-400 mt-1 font-mono">{stats.pendingBookings}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase">Toplam Hacim</span>
          <div className="text-xl font-bold text-amber-400 mt-1 font-mono">{stats.totalVolume.toLocaleString('tr-TR')} ₺</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 bg-[#171a22] p-1 rounded-xl border border-[#2c313d] w-fit">
        <button
          onClick={() => setTab('listings')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${tab === 'listings' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Ticket className="w-3.5 h-3.5" /> İlan Yönetimi
        </button>
        <button
          onClick={() => setTab('bookings')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${tab === 'bookings' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <Package className="w-3.5 h-3.5" /> Satın Almalar & Rezervasyonlar
        </button>
      </div>

      {tab === 'listings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="İlan, işletme veya konum ara..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#171a22] border border-[#2c313d] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
            <button
              onClick={() => setIsNewOpen(true)}
              className="w-full sm:w-auto shrink-0 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Yeni İlan Ekle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperiences.map((exp) => {
              const suspended = exp.status === 'suspended';
              return (
                <div
                  key={exp.id}
                  className={`rounded-3xl p-4 border space-y-3 flex flex-col justify-between transition ${
                    suspended ? 'bg-[#171a22]/50 border-red-500/30' : 'bg-[#171a22] border-[#2c313d] hover:border-amber-500/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30">
                        {exp.category}
                      </span>
                      {suspended ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold flex items-center gap-1">
                          <EyeOff className="w-3 h-3" /> ASKIDA
                        </span>
                      ) : (
                        <strong className="text-sm font-mono text-emerald-400 font-bold">{formatPrice(exp.price, exp.currency)}</strong>
                      )}
                    </div>

                    <h3 className={`text-sm font-bold font-serif line-clamp-2 ${suspended ? 'text-zinc-500' : 'text-white'}`}>{exp.title}</h3>
                    {suspended && <strong className="text-xs font-mono text-zinc-500">{formatPrice(exp.price, exp.currency)}</strong>}

                    <div className="space-y-1 text-xs text-zinc-400 pt-1">
                      <p className="text-zinc-300 truncate"><strong>{exp.provider}</strong></p>
                      <p className="truncate">{exp.location}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#2c313d] flex items-center gap-2">
                    <button
                      onClick={() => setEditingExp(exp)}
                      className="flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold text-xs rounded-xl border border-amber-500/30 transition flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Düzenle
                    </button>
                    <button
                      onClick={() => toggleStatus(exp)}
                      title={suspended ? 'Yeniden yayınla' : 'Askıya al'}
                      className={`p-2 rounded-xl border transition ${
                        suspended ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-zinc-700/20 hover:bg-zinc-700/30 text-zinc-300 border-zinc-600'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp)}
                      title="Kalıcı sil"
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
            {filteredExperiences.length === 0 && (
              <div className="col-span-full text-center text-zinc-500 text-xs py-12">Aramanızla eşleşen ilan bulunamadı.</div>
            )}
          </div>
        </div>
      )}

      {tab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 bg-[#171a22] p-1 rounded-xl border border-[#2c313d] overflow-x-auto w-fit">
            {(['all', 'payment_success', 'provider_pending', 'confirmed', 'cancelled'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setBookingFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  bookingFilter === f ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {f === 'all' ? 'Tümü' : BOOKING_STATUS_LABEL[f]}
              </button>
            ))}
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-[#171a22] rounded-3xl p-12 text-center text-zinc-500 border border-[#2c313d] space-y-2">
              <CreditCard className="w-8 h-8 mx-auto text-emerald-400 opacity-40" />
              <p className="text-xs">Bu filtreye uygun bir satın alma/rezervasyon kaydı yok.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-3xl bg-[#171a22] border border-[#2c313d] hover:border-amber-500/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">{b.confirmationCode}</span>
                      <strong className="text-sm text-white">{b.experienceTitle}</strong>
                      <span className={`px-2 py-0.5 rounded-lg font-bold text-[10px] ${
                        b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                        b.status === 'cancelled' ? 'bg-zinc-600/30 text-zinc-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {BOOKING_STATUS_LABEL[b.status]}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 space-y-0.5">
                      <p><strong>Misafir:</strong> {b.guestName} ({b.hotelName} - Oda {b.roomNumber}) • Tel: {b.guestPhone}</p>
                      <p><strong>Sağlayıcı:</strong> {b.providerName} (Tel: {b.providerPhone})</p>
                      <p><strong>Tarih:</strong> {b.bookingDate} {b.bookingTime} • {b.guestCount} Kişi • Tutar: <span className="text-amber-400 font-bold">{formatPrice(b.amount, b.currency)}</span></p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                    <a
                      href={`/confirm-booking/${b.id}`}
                      target="_blank"
                      className="px-3 py-2 bg-[#12141a] hover:bg-white/5 border border-[#2c313d] text-zinc-300 rounded-xl font-semibold flex items-center gap-1 transition"
                    >
                      <span>Onay Sayfası</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {b.status === 'confirmed' ? (
                      <span className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold">✓ Onaylandı</span>
                    ) : b.status !== 'cancelled' ? (
                      <button
                        onClick={() => handleApproveBooking(b.id)}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Onayla
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE MODAL */}
      {isNewOpen && (
        <ExperienceFormModal
          title="Yeni İlan Ekle"
          submitLabel="İlanı Yayınla"
          values={draft}
          onChange={(next) => setDraft(next)}
          onCancel={() => setIsNewOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {/* EDIT MODAL */}
      {editingExp && (
        <ExperienceFormModal
          title="İlan & Fiyat Düzenleme"
          submitLabel="Değişiklikleri Canlıya Al"
          values={editingExp}
          onChange={(next) => setEditingExp({ ...editingExp, ...next })}
          onCancel={() => setEditingExp(null)}
          onSubmit={handleSaveEdit}
        />
      )}
    </div>
  );
}

interface ExperienceFormModalProps<T extends NewExpDraft> {
  title: string;
  submitLabel: string;
  values: T;
  onChange: (next: T) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

function ExperienceFormModal<T extends NewExpDraft>({ title, submitLabel, values, onChange, onCancel, onSubmit }: ExperienceFormModalProps<T>) {
  const set = (patch: Partial<NewExpDraft>) => onChange({ ...values, ...patch });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#171a22] rounded-3xl max-w-2xl w-full p-6 border border-amber-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-zinc-100 animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#2c313d] pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold font-serif text-white">{title}</h2>
          </div>
          <button onClick={onCancel} className="w-8 h-8 rounded-full bg-[#0f1116] hover:bg-white/10 flex items-center justify-center text-zinc-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">İlan Başlığı</label>
              <input
                type="text" required value={values.title}
                onChange={(e) => set({ title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-white font-semibold"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">Kategori</label>
              <input
                type="text" value={values.category}
                onChange={(e) => set({ category: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">İşletme / Acente Adı</label>
              <input
                type="text" required value={values.provider}
                onChange={(e) => set({ provider: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">İşletme Telefonu</label>
              <input
                type="text" value={values.phone}
                onChange={(e) => set({ phone: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">Web Sitesi</label>
              <input
                type="text" value={values.website}
                onChange={(e) => set({ website: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">Fiyat & Para Birimi</label>
              <div className="flex gap-2">
                <input
                  type="number" required value={values.price}
                  onChange={(e) => set({ price: Number(e.target.value) })}
                  className="flex-1 px-3 py-2 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-emerald-400 font-bold font-mono"
                />
                <select
                  value={values.currency}
                  onChange={(e) => set({ currency: e.target.value })}
                  className="w-20 px-2 py-2 bg-[#0f1116] border border-[#2c313d] rounded-xl text-white font-bold"
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
                type="text" value={values.duration}
                onChange={(e) => set({ duration: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">Buluşma Noktası / Konum</label>
              <input
                type="text" value={values.location}
                onChange={(e) => set({ location: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">Görsel URL</label>
              <input
                type="text" value={values.image ?? ''}
                onChange={(e) => set({ image: e.target.value })}
                className="w-full px-3 py-2 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-white font-mono text-[11px]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-zinc-300 block mb-1">Açıklama / Rehber Notu</label>
              <textarea
                rows={3} value={values.agentNote}
                onChange={(e) => set({ agentNote: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0f1116] border border-[#2c313d] rounded-xl focus:border-amber-500 focus:outline-none text-zinc-200"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#2c313d] flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl bg-[#0f1116] hover:bg-white/5 text-zinc-300 font-bold">
              İptal
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20">
              <Save className="w-4 h-4" /> {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
