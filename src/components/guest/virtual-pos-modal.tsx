"use client";

import { NotificationService } from "@/lib/notification-service";
import { FirestoreService } from "@/lib/firestore-service";

import { Experience, Hotel, Language, Booking } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { formatPrice, generateCalendarUrl } from '@/lib/utils';
import { XeniosStore } from '@/lib/store';
import { useState } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { CreditCard, Lock, ShieldCheck, CheckCircle2, Calendar, Phone, Mail, User } from 'lucide-react';

interface VirtualPosModalProps {
  experience: Experience;
  hotel: Hotel;
  roomNumber: string;
  lang: Language;
  onClose: () => void;
}

export function VirtualPosModal({ experience, hotel, roomNumber, lang, onClose }: VirtualPosModalProps) {
  const t = getT(lang);
  const [guestName, setGuestName] = useState('Alex Mercer');
  const [guestPhone, setGuestPhone] = useState('+90 532 555 44 33');
  const [guestEmail, setGuestEmail] = useState('alex.mercer@gmail.com');
  const [guestCount, setGuestCount] = useState(2);
  const [bookingDate, setBookingDate] = useState('2026-08-16');
  const [bookingTime, setBookingTime] = useState('19:30');

  const [cardNumber, setCardNumber] = useState('4543 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('09/28');
  const [cardCvv, setCardCvv] = useState('734');

  const [isProcessing, setIsProcessing] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  const totalAmount = experience.price * guestCount;

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const booking = XeniosStore.addBooking({
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomNumber: roomNumber,
        experienceId: experience.id,
        experienceTitle: experience.title,
        providerName: experience.provider,
        providerPhone: experience.phone,
        guestName,
        guestPhone,
        guestEmail,
        guestCount,
        bookingDate,
        bookingTime,
        amount: totalAmount,
        currency: experience.currency,
        status: 'payment_success',
        calendarLink: generateCalendarUrl(
          experience.title,
          `${experience.provider} - ${experience.agentNote}\nOtel: ${hotel.name} (Oda ${roomNumber})`,
          experience.location,
          bookingDate,
          bookingTime
        )
      });

      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      FirestoreService.addBooking(booking);
      NotificationService.notifyBookingCreated(booking);
      setCreatedBooking(booking);
      setIsProcessing(false);
      toast.success(t.posSuccess);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 max-h-[92vh] overflow-y-auto space-y-4 animate-in zoom-in-95">
        
        {createdBooking ? (
          /* Success Screen */
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Kod: {createdBooking.confirmationCode}
              </span>
              <h3 className="text-lg font-bold font-serif text-zinc-900 mt-2">{t.posSuccess}</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                {createdBooking.experienceTitle} için {createdBooking.guestCount} kişilik rezervasyonunuz oluşturuldu.
              </p>
            </div>

            {/* Provider SMS Notice Box */}
            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900 text-left space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <span>📱</span>
                <span>İlan Sahibine Onay Linki İletildi</span>
              </div>
              <p className="text-[11px] text-zinc-600">
                <strong>{createdBooking.providerName}</strong> yetkilisine SMS ve e-posta bildirimi gönderildi. Onay durumu canlı olarak takip ediliyor.
              </p>
              <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500">Sağlayıcı Onay Linki (Simülasyon):</span>
                <a 
                  href={`/confirm-booking/${createdBooking.id}`} 
                  target="_blank" 
                  className="font-bold text-amber-800 underline"
                >
                  Onay Ekranını Aç →
                </a>
              </div>
            </div>

            {/* Google Calendar Sync Action */}
            <div className="pt-2 space-y-2">
              <a
                href={createdBooking.calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.addToCalendar}</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-2xl text-xs font-bold transition"
              >
                Tamamla ve Kapat
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <>
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-serif text-zinc-900">{t.posTitle}</h3>
                  <p className="text-[11px] text-zinc-500">3D Secure 256-Bit SSL Korumalı</p>
                </div>
              </div>
              <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 font-bold p-1">✕</button>
            </div>

            {/* Order Summary */}
            <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60 flex items-center justify-between text-xs">
              <div>
                <strong className="text-zinc-900 block">{experience.title}</strong>
                <span className="text-zinc-500">{experience.provider} • Oda {roomNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono text-zinc-900">{formatPrice(totalAmount, experience.currency)}</span>
                <span className="text-[10px] text-zinc-400 block">{guestCount} Kişi</span>
              </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-800">Misafir & İletişim Bilgileri</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500">Ad Soyad</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-amber-200 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500">Telefon (SMS İçin)</label>
                  <input
                    type="text"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-amber-200 bg-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500">Tarih</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-amber-200 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-zinc-500">Kişi Sayısı</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                    className="w-full text-xs p-2 rounded-xl border border-amber-200 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} Kişi</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Credit Card Input Form */}
            <div className="space-y-2 pt-2 border-t border-amber-100">
              <h4 className="text-xs font-bold text-zinc-800">Kart Bilgileri</h4>
              <div className="space-y-2">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Kart Numarası"
                  className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white font-mono"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="AA/YY"
                    className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white font-mono"
                  />
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="CVV"
                    className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-bold shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? "3D Güvenlik Doğrulanıyor..." : `${formatPrice(totalAmount, experience.currency)} ${t.posPayButton}`}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
