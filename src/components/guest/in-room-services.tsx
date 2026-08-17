"use client";

import { Language, Hotel, ModuleAdminSettingsMap } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { XeniosStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { getModuleConfig, deriveStatus, formatFieldValue, resolvePricing } from '@/lib/service-modules';
import { ServiceRequestForm } from './service-request-form';

interface InRoomServicesProps {
  hotel: Hotel;
  roomNumber: string;
  lang: Language;
}

export function InRoomServices({ hotel, roomNumber, lang }: InRoomServicesProps) {
  const t = getT(lang);
  const [selectedService, setSelectedService] = useState<{ key: string; title: string; iconSrc: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moduleSettings, setModuleSettings] = useState<ModuleAdminSettingsMap>(() => XeniosStore.getModuleSettings());

  useEffect(() => {
    const refresh = () => setModuleSettings(XeniosStore.getModuleSettings());
    window.addEventListener('xenios_module_settings_updated', refresh);
    return () => window.removeEventListener('xenios_module_settings_updated', refresh);
  }, []);

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

  const handleRequestSubmit = (details: Record<string, any>) => {
    if (!selectedService) return;
    const config = getModuleConfig(selectedService.key);
    setIsSubmitting(true);

    setTimeout(() => {
      const firstStage = config?.stages[0]?.id ?? 'pending';
      const isUrgent = config?.urgentIf?.(details) ?? false;
      const summaryFields = config?.fields.filter((f) => f.type !== 'display') ?? [];
      const notesSummary = summaryFields
        .map((f) => `${f.label}: ${formatFieldValue(f, details[f.key])}`)
        .join(' · ');

      XeniosStore.addRequest({
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomNumber: roomNumber,
        serviceKey: selectedService.key,
        serviceTitle: selectedService.title,
        notes: notesSummary,
        status: config ? deriveStatus(config, firstStage) : 'pending',
        details,
        department: config?.department,
        stage: firstStage,
        priority: isUrgent ? 'acil' : 'standart'
      });

      toast.success(`Oda ${roomNumber} için "${selectedService.title}" talebiniz kat hizmetleri ve resepsiyona iletildi.`, {
        description: "En kısa sürede odanıza yönlendirilecektir."
      });

      setIsSubmitting(false);
      setSelectedService(null);
    }, 400);
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold font-serif text-zinc-900">{t.servicesTitle}</h2>
        <p className="text-xs text-zinc-500">{t.servicesSubtitle}</p>
      </div>

      {/* Grid of In-Room Services (Mobile 2 cols, Desktop 4 cols) — cockpit-hidden modules are filtered out */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {serviceItems
          .filter((item) => !(moduleSettings[item.key]?.hidden))
          .map((item) => {
            const isEnabled = moduleSettings[item.key]?.enabled ?? true;
            return (
              <button
                key={item.key}
                onClick={() => {
                  if (!isEnabled) {
                    toast.error(`"${item.label}" hizmeti şu anda kullanım dışı.`, { description: 'Lütfen resepsiyonu arayın veya daha sonra tekrar deneyin.' });
                    return;
                  }
                  setSelectedService({ key: item.key, title: item.label, iconSrc: item.icon });
                }}
                className={`xenios-tile rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center justify-between gap-3 min-h-[145px] group border transition-all shadow-sm bg-white relative ${
                  isEnabled
                    ? 'cursor-pointer border-amber-200/70 hover:border-amber-400/90 hover:shadow-md'
                    : 'cursor-not-allowed border-zinc-200 opacity-50 grayscale'
                }`}
              >
                {!isEnabled && (
                  <span className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-white font-bold">
                    Kullanım Dışı
                  </span>
                )}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#fbf8f1] p-2 flex items-center justify-center group-hover:scale-105 transition-transform border border-amber-100/60 shadow-inner">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={76}
                    height={76}
                    className="object-contain w-full h-full drop-shadow-sm"
                  />
                </div>
                <div className="w-full">
                  <span className="text-xs sm:text-sm font-bold text-zinc-800 leading-tight block">
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
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in zoom-in-95 space-y-4 max-h-[88vh] overflow-y-auto">
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

            {(() => {
              const config = getModuleConfig(selectedService.key);
              if (!config) return null;
              const settings = moduleSettings[selectedService.key];
              return (
                <ServiceRequestForm
                  config={config}
                  onSubmit={handleRequestSubmit}
                  onCancel={() => setSelectedService(null)}
                  isSubmitting={isSubmitting}
                  pricing={resolvePricing(config, settings?.pricing)}
                  fieldOptionOverrides={settings?.fieldOptions}
                />
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
