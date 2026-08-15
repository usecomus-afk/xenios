"use client";

import { Language, Hotel, ServiceRequest } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { XeniosStore } from '@/lib/store';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { Send } from 'lucide-react';

interface InRoomServicesProps {
  hotel: Hotel;
  roomNumber: string;
  lang: Language;
}

export function InRoomServices({ hotel, roomNumber, lang }: InRoomServicesProps) {
  const t = getT(lang);
  const [selectedService, setSelectedService] = useState<{ key: string; title: string; iconSrc: string } | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 16 In-Room Services with custom illustrated PNG icons matching the PDF design
  const serviceItems = [
    { key: 'breakfast', label: t.services.breakfast, icon: '/icons/menu/breakfast.png', desc: "Odaya sıcak kahvaltı servisi" },
    { key: 'dnd', label: t.services.dnd, icon: '/icons/menu/dnd.png', desc: "Rahatsız edilmek istemiyorum" },
    { key: 'cleaning', label: t.services.cleaning, icon: '/icons/menu/cleaning.png', desc: "Oda temizliği ve havalandırma" },
    { key: 'towels', label: t.services.towels, icon: '/icons/menu/towels.png', desc: "Banyo & el havluları değişimi" },
    { key: 'linens', label: t.services.linens, icon: '/icons/menu/linens.png', desc: "Çarşaf ve nevresim takımı" },
    { key: 'pillows', label: t.services.pillows, icon: '/icons/menu/pillows.png', desc: "Ortopedik / ekstra yastık" },
    { key: 'toiletries', label: t.services.toiletries, icon: '/icons/menu/toiletries.png', desc: "Şampuan, duş jeli, sabun" },
    { key: 'hygiene', label: t.services.hygiene, icon: '/icons/menu/hygiene.png', desc: "Diş & tıraş seti, terlik" },
    { key: 'roomservice', label: t.services.roomservice, icon: '/icons/menu/roomservice.png', desc: "Yiyecek & içecek menüsü" },
    { key: 'minibar', label: t.services.minibar, icon: '/icons/menu/minibar.png', desc: "Mini bar dolumu ve su" },
    { key: 'safe', label: t.services.safe, icon: '/icons/menu/safe.png', desc: "Kasa kullanımı & güvenlik" },
    { key: 'technical', label: t.services.technical, icon: '/icons/menu/technical.png', desc: "Klima, TV, priz ve aydınlatma" },
    { key: 'laundry', label: t.services.laundry, icon: '/icons/menu/laundry.png', desc: "Kuru temizleme ve ütü" },
    { key: 'lateCheckout', label: t.services.lateCheckout, icon: '/icons/menu/lateCheckout.png', desc: "Saat 14:00'e kadar geç çıkış" },
    { key: 'extendStay', label: t.services.extendStay, icon: '/icons/menu/extendStay.png', desc: "Konaklama süresini uzat" },
    { key: 'taxi', label: t.services.taxi, icon: '/icons/menu/taksi.png', desc: "Otel kapısına sarı taksi" }
  ];

  const handleRequestSubmit = () => {
    if (!selectedService) return;
    setIsSubmitting(true);

    setTimeout(() => {
      XeniosStore.addRequest({
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomNumber: roomNumber,
        serviceKey: selectedService.key,
        serviceTitle: selectedService.title,
        notes: notes,
        status: 'pending'
      });

      toast.success(`Oda ${roomNumber} için "${selectedService.title}" talebiniz kat hizmetleri ve resepsiyona iletildi.`, {
        description: "En kısa sürede odanıza yönlendirilecektir."
      });

      setIsSubmitting(false);
      setSelectedService(null);
      setNotes('');
    }, 400);
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold font-serif text-zinc-900">{t.servicesTitle}</h2>
        <p className="text-xs text-zinc-500">{t.servicesSubtitle}</p>
      </div>

      {/* Grid of 16 Services (Mobile 2 cols, Desktop 4 cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {serviceItems.map((item) => {
          return (
            <button
              key={item.key}
              onClick={() => setSelectedService({ key: item.key, title: item.label, iconSrc: item.icon })}
              className="xenios-tile rounded-3xl p-4 flex flex-col items-center text-center justify-between gap-2.5 min-h-[125px] group cursor-pointer border border-amber-200/70 hover:border-amber-400/90 transition-all shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50/70 p-1.5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={52}
                  height={52}
                  className="object-contain w-full h-full drop-shadow-sm"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-800 leading-snug block">
                  {item.label}
                </span>
                <span className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                  {item.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal for In-Room Request Confirmation */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 p-1.5 border border-amber-200 flex items-center justify-center">
                  <Image
                    src={selectedService.iconSrc}
                    alt={selectedService.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">{selectedService.title}</h3>
                  <p className="text-xs text-zinc-500">{hotel.name} - Oda {roomNumber}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="text-zinc-400 hover:text-zinc-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-700 block">
                Özel İstek / Notunuz (İsteğe Bağlı):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Örn: 2 adet ekstra havlu lütfen veya saat 10:00'da"
                className="w-full h-24 text-xs rounded-xl border border-amber-200 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500/40 bg-amber-50/30"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleRequestSubmit}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/30 flex items-center justify-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Gönderiliyor..." : "Talebi İlet"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
