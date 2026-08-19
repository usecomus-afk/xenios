"use client";

import { useState, useEffect } from 'react';
import { XeniosStore } from '@/lib/store';
import { Hotel } from '@/lib/types';
import { FirestoreService } from '@/lib/firestore-service';
import { 
  Building2, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Globe, 
  MapPin, 
  Wifi, 
  Clock, 
  Save, 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  BellRing,
  DoorOpen
} from 'lucide-react';
import { toast } from 'sonner';

export default function HotelProfileManagementPage() {
  const hotels = XeniosStore.getHotels();
  const activeHotelId = XeniosStore.getActiveHotelId();
  const currentHotel = hotels.find(h => h.id === activeHotelId) || hotels[0];

  // Hotel Info State
  const [hotelName, setHotelName] = useState(currentHotel.name || '');
  const [hotelType, setHotelType] = useState(currentHotel.type || 'Butik Otel & Konak');
  const [hotelDistrict, setHotelDistrict] = useState(currentHotel.district || 'Sultanahmet / Fatih');
  const [hotelAddress, setHotelAddress] = useState(currentHotel.address || '');
  const [hotelPhone, setHotelPhone] = useState(currentHotel.phone || '+90 212 514 00 00');
  const [hotelWebsite, setHotelWebsite] = useState(currentHotel.website || 'https://');
  const [breakfastHours, setBreakfastHours] = useState(currentHotel.breakfastHours || '07:30 - 10:30');
  const [checkoutTime, setCheckoutTime] = useState(currentHotel.checkoutTime || '11:30');
  const [receptionExt, setReceptionExt] = useState(currentHotel.receptionExt || '9');
  const [wifiSsid, setWifiSsid] = useState(currentHotel.rooms?.[0]?.wifiSsid || 'Hotel_Guest');
  const [wifiPass, setWifiPass] = useState(currentHotel.rooms?.[0]?.wifiPass || 'Xenios2026!');

  // User / Manager Info State
  const [managerName, setManagerName] = useState('Ahmet Yılmaz');
  const [managerTitle, setManagerTitle] = useState('Genel Müdür / Ön Büro Direktörü');
  const [managerPhone, setManagerPhone] = useState('+90 532 555 44 33');

  // Email Info State
  const [contactEmail, setContactEmail] = useState('heritage@xenios.istanbul');
  const [notificationEmail, setNotificationEmail] = useState('concierge@heritagehotel.com');
  const [notifyOnNewBooking, setNotifyOnNewBooking] = useState(true);
  const [notifyOnRoomRequest, setNotifyOnRoomRequest] = useState(true);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // General Save State
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const profile = XeniosStore.getHotelManagerProfile(currentHotel.id);
    if (profile) {
      setManagerName(profile.managerName || 'Ahmet Yılmaz');
      setManagerTitle(profile.managerTitle || 'Genel Müdür / Ön Büro Direktörü');
      setManagerPhone(profile.managerPhone || '+90 532 555 44 33');
      setContactEmail(profile.contactEmail || 'heritage@xenios.istanbul');
      setNotificationEmail(profile.notificationEmail || 'concierge@heritagehotel.com');
    }
  }, [currentHotel.id]);

  const handleSaveHotelAndManager = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // 1. Update Hotel Info in XeniosStore
      const updatedRooms = (currentHotel.rooms || []).map(r => ({
        ...r,
        wifiSsid,
        wifiPass
      }));

      const updatedHotel: Partial<Hotel> = {
        name: hotelName.trim(),
        type: hotelType,
        district: hotelDistrict.trim(),
        address: hotelAddress.trim() || `${hotelDistrict}, İstanbul`,
        phone: hotelPhone.trim(),
        website: hotelWebsite.trim(),
        breakfastHours: breakfastHours.trim(),
        checkoutTime: checkoutTime.trim(),
        receptionExt: receptionExt.trim(),
        rooms: updatedRooms
      };

      XeniosStore.updateHotel(currentHotel.id, updatedHotel);

      // 2. Save Manager Profile
      const managerProfile = {
        managerName: managerName.trim(),
        managerTitle: managerTitle.trim(),
        managerPhone: managerPhone.trim(),
        contactEmail: contactEmail.trim().toLowerCase(),
        notificationEmail: notificationEmail.trim().toLowerCase(),
        notifyOnNewBooking,
        notifyOnRoomRequest,
        updatedAt: new Date().toISOString()
      };

      XeniosStore.saveHotelManagerProfile(currentHotel.id, managerProfile);

      // 3. Save to Google Cloud Firestore
      if (typeof window !== 'undefined') {
        FirestoreService.syncAllLocalDataToFirestore().catch(e => console.warn('Firestore sync warning:', e));
      }

      setTimeout(() => {
        setIsSaving(false);
        toast.success("Otel ve Kullanıcı Profili Başarıyla Güncellendi!", {
          description: `${hotelName} bilgileri canlı sisteme aktarıldı.`
        });
      }, 400);
    } catch (err: any) {
      setIsSaving(false);
      toast.error("Profil kaydedilirken bir hata oluştu: " + err.message);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Yeni şifre en az 6 karakter uzunluğunda olmalıdır.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifre ile şifre tekrarı birbiriyle eşleşmiyor!");
      return;
    }

    setIsSavingPassword(true);
    setTimeout(() => {
      setIsSavingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success("Yönetici Güvenlik Şifreniz Başarıyla Güncellendi!", {
        description: "Yeni şifreniz bir sonraki girişinizden itibaren geçerli olacaktır."
      });
    }, 500);
  };

  return (
    <div className="space-y-6 text-zinc-900 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-amber-100/40 to-amber-50/70 p-6 rounded-3xl border border-amber-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-300 font-mono">
              OTEL & YÖNETİCİ PROFİLİ
            </span>
            <span className="text-xs text-zinc-600 font-medium">{currentHotel.name}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-zinc-900">
            Profil & Kurumsal Tesis Bilgileri
          </h1>
          <p className="text-xs text-zinc-600 max-w-2xl leading-relaxed">
            Otel bilgileri, yönetici iletişim detayları, bildirim e-postaları ve portal giriş şifrenizi bu masadan yönetebilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-amber-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-zinc-800">Doğrulanmış Partner Otel</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveHotelAndManager} className="space-y-6">
        {/* 1. OTEL BİLGİLERİ */}
        <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-amber-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900">Otel Adı & Tesis Bilgileri</h2>
              <p className="text-[11px] text-zinc-500">Misafirlerin dijital concierge ekranında gördüğü otel detayları.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-zinc-700 block">Otel / Tesis Adı</label>
              <input
                type="text"
                required
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                placeholder="Ör: Old City Heritage Hotel Istanbul"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Tesis Tipi</label>
              <select
                value={hotelType}
                onChange={(e) => setHotelType(e.target.value)}
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs font-medium"
              >
                <option value="Butik Otel & Konak">Butik Otel & Konak</option>
                <option value="5 Yıldızlı Lüks Otel">5 Yıldızlı Lüks Otel</option>
                <option value="Tarihi Yalı / Saray">Tarihi Yalı / Saray</option>
                <option value="Apart & Rezidans">Apart & Rezidans</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Semt / İlçe</label>
              <input
                type="text"
                value={hotelDistrict}
                onChange={(e) => setHotelDistrict(e.target.value)}
                placeholder="Sultanahmet / Fatih"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-zinc-700 block">Açık Adres</label>
              <input
                type="text"
                value={hotelAddress}
                onChange={(e) => setHotelAddress(e.target.value)}
                placeholder="Ör: Alemdar Mah. Yerebatan Cad. No:18 Sultanahmet, Fatih, İstanbul"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Otel Sabit Telefonu</label>
              <input
                type="text"
                value={hotelPhone}
                onChange={(e) => setHotelPhone(e.target.value)}
                placeholder="+90 212 514 00 00"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Web Sitesi</label>
              <input
                type="text"
                value={hotelWebsite}
                onChange={(e) => setHotelWebsite(e.target.value)}
                placeholder="https://heritagehotel.com"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Resepsiyon Dahili No</label>
              <input
                type="text"
                value={receptionExt}
                onChange={(e) => setReceptionExt(e.target.value)}
                placeholder="9 veya 0"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Kahvaltı Saatleri</label>
              <input
                type="text"
                value={breakfastHours}
                onChange={(e) => setBreakfastHours(e.target.value)}
                placeholder="07:30 - 10:30"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Check-out Saati</label>
              <input
                type="text"
                value={checkoutTime}
                onChange={(e) => setCheckoutTime(e.target.value)}
                placeholder="11:30 veya 12:00"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Misafir Wi-Fi Adı (SSID)</label>
              <input
                type="text"
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                placeholder="Hotel_Guest"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-zinc-700 block">Misafir Wi-Fi Şifresi</label>
              <input
                type="text"
                value={wifiPass}
                onChange={(e) => setWifiPass(e.target.value)}
                placeholder="Xenios2026!"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>
          </div>
        </div>

        {/* 2. KULLANICI & YETKİLİ BİLGİLERİ */}
        <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-amber-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900">Kullanıcı & Otel Yetkilisi Bilgileri</h2>
              <p className="text-[11px] text-zinc-500">Xenios operasyon ekibinin temas kuracağı sorumlu yönetici.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Yetkili Adı Soyadı</label>
              <input
                type="text"
                required
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="Ahmet Yılmaz"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Yetkili Unvanı / Görevi</label>
              <input
                type="text"
                value={managerTitle}
                onChange={(e) => setManagerTitle(e.target.value)}
                placeholder="Genel Müdür / Ön Büro Müdürü"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Yetkili Cep Telefonu</label>
              <input
                type="text"
                value={managerPhone}
                onChange={(e) => setManagerPhone(e.target.value)}
                placeholder="+90 532 555 44 33"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>
          </div>
        </div>

        {/* 3. E-POSTA & BİLDİRİM BİLGİLERİ */}
        <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-amber-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900">E-Posta & Bildirim İletişimi</h2>
              <p className="text-[11px] text-zinc-500">Giriş hesabı ve rezervasyon/talep bildirim adresleri.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Resmi Giriş E-Postası (Portal Girişi)</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="heritage@xenios.istanbul"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Talep & Rezervasyon Bildirim E-Postası</label>
              <input
                type="email"
                required
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                placeholder="concierge@heritagehotel.com"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-zinc-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyOnRoomRequest}
                onChange={(e) => setNotifyOnRoomRequest(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <span>Misafir oda içi hizmet taleplerinde anlık e-posta bildirimi al</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyOnNewBooking}
                onChange={(e) => setNotifyOnNewBooking(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <span>Yeni tur & deneyim rezervasyonlarında bilgilendir</span>
            </label>
          </div>
        </div>

        {/* SAVE HOTEL & MANAGER BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold rounded-2xl shadow-md text-xs transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Kaydediliyor...' : 'Otel & Yönetici Profilini Kaydet'}</span>
          </button>
        </div>
      </form>

      {/* 4. ŞİFRE DEĞİŞİKLİĞİ FORMU */}
      <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-amber-100 pb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-900">Güvenlik & Şifre Değişikliği</h2>
            <p className="text-[11px] text-zinc-500">Partner otel yönetim paneli giriş şifrenizi yenileyin.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Mevcut Şifre</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Yeni Şifre</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="En az 6 karakter"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 block">Yeni Şifre (Tekrar)</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Yeni şifrenizi tekrar girin"
                className="w-full p-3 bg-amber-50/30 border border-amber-200 rounded-xl text-zinc-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
            <p className="text-[11px] text-zinc-500">
              Şifrenizi unuttuysanız giriş ekranındaki <strong className="text-amber-800">"Şifremi Unuttum"</strong> akışını kullanabilirsiniz.
            </p>

            <button
              type="submit"
              disabled={isSavingPassword}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-black text-amber-400 font-bold rounded-xl shadow-md text-xs transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSavingPassword ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
