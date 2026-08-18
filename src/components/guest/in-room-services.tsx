"use client";

import { Language, Hotel, ModuleAdminSettingsMap, InRoomServiceItem } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { XeniosStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { getModuleConfig, deriveStatus, formatFieldValue, resolvePricing } from '@/lib/service-modules';
import { ServiceRequestForm } from './service-request-form';
import { Sparkles, Clock, Send, CheckCircle2 } from 'lucide-react';

interface InRoomServicesProps {
  hotel: Hotel;
  roomNumber: string;
  lang: Language;
}

export function InRoomServices({ hotel, roomNumber, lang }: InRoomServicesProps) {
  const t = getT(lang);
  const [services, setServices] = useState<InRoomServiceItem[]>(() => XeniosStore.getInRoomServices());
  const [selectedService, setSelectedService] = useState<InRoomServiceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moduleSettings, setModuleSettings] = useState<ModuleAdminSettingsMap>(() => XeniosStore.getModuleSettings());

  // Custom Service Form State
  const [customOption, setCustomOption] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [customTime, setCustomTime] = useState('Hemen (En Kısa Sürede)');
  const [customCount, setCustomCount] = useState(1);

  useEffect(() => {
    const refresh = () => {
      setServices(XeniosStore.getInRoomServices());
      setModuleSettings(XeniosStore.getModuleSettings());
    };
    refresh();
    window.addEventListener('xenios_in_room_services_updated', refresh);
    window.addEventListener('xenios_module_settings_updated', refresh);
    return () => {
      window.removeEventListener('xenios_in_room_services_updated', refresh);
      window.removeEventListener('xenios_module_settings_updated', refresh);
    };
  }, []);

  const handleStandardRequestSubmit = (details: Record<string, any>) => {
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
        serviceTitle: selectedService.label,
        notes: notesSummary,
        status: config ? deriveStatus(config, firstStage) : 'pending',
        details,
        department: config?.department || selectedService.department || 'Housekeeping',
        stage: firstStage,
        priority: isUrgent ? 'acil' : 'standart'
      });

      toast.success(`Oda ${roomNumber} için "${selectedService.label}" talebiniz ${selectedService.department || 'kat hizmetleri'} ekibine iletildi.`, {
        description: "En kısa sürede odanıza yönlendirilecektir."
      });

      setIsSubmitting(false);
      setSelectedService(null);
    }, 400);
  };

  const handleCustomRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const notesArr: string[] = [];
      if (customOption) notesArr.push(`Seçim: ${customOption}`);
      if (customCount > 1) notesArr.push(`Adet: ${customCount}`);
      if (customTime) notesArr.push(`Zaman: ${customTime}`);
      if (customNote) notesArr.push(`Not: ${customNote}`);

      const summary = notesArr.join(' · ') || 'Standart talep';

      XeniosStore.addRequest({
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomNumber: roomNumber,
        serviceKey: selectedService.key || selectedService.id,
        serviceTitle: selectedService.label,
        notes: summary,
        status: 'pending',
        details: {
          option: customOption,
          count: customCount,
          time: customTime,
          note: customNote,
          price: selectedService.price ?? 0
        },
        department: selectedService.department || 'Resepsiyon & Kat Hizmetleri',
        stage: 'Beklemede',
        priority: 'standart'
      });

      toast.success(`Oda ${roomNumber} için "${selectedService.label}" talebiniz iletildi.`, {
        description: "İlgili departman en kısa sürede odanıza yönlendirecektir."
      });

      setIsSubmitting(false);
      setSelectedService(null);
      setCustomOption('');
      setCustomNote('');
      setCustomCount(1);
    }, 400);
  };

  const visibleServices = services.filter((item) => !item.hidden);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold font-serif text-zinc-900">{t.servicesTitle}</h2>
        <p className="text-xs text-zinc-500">{t.servicesSubtitle}</p>
      </div>

      {/* Grid of In-Room Services (Mobile 2 cols, Desktop 4 cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {visibleServices.map((item) => {
          const isEnabled = item.enabled ?? true;
          return (
            <button
              key={item.id || item.key}
              onClick={() => {
                if (!isEnabled) {
                  toast.error(`"${item.label}" hizmeti şu anda kullanım dışı.`, { description: 'Lütfen resepsiyonu arayın veya daha sonra tekrar deneyin.' });
                  return;
                }
                setSelectedService(item);
                if (item.options && item.options.length > 0) {
                  setCustomOption(item.options[0]);
                }
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
              {item.isCustom && isEnabled && (
                <span className="absolute top-2 right-2 text-[8px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 font-bold border border-amber-300">
                  Özel
                </span>
              )}
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#fbf8f1] p-2 flex items-center justify-center group-hover:scale-105 transition-transform border border-amber-100/60 shadow-inner overflow-hidden">
                <img
                  src={item.icon}
                  alt={item.label}
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
                <div className="w-12 h-12 rounded-2xl bg-amber-50 p-1.5 border border-amber-200 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={selectedService.icon}
                    alt={selectedService.label}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">{selectedService.label}</h3>
                  <p className="text-xs text-zinc-500">{hotel.name} - Oda {roomNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-zinc-400 hover:text-zinc-700 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {(() => {
              const config = getModuleConfig(selectedService.key);
              if (config) {
                const settings = moduleSettings[selectedService.key];
                return (
                  <ServiceRequestForm
                    config={config}
                    onSubmit={handleStandardRequestSubmit}
                    onCancel={() => setSelectedService(null)}
                    isSubmitting={isSubmitting}
                    pricing={resolvePricing(config, settings?.pricing)}
                    fieldOptionOverrides={settings?.fieldOptions}
                  />
                );
              }

              // Generic Dynamic Form for Custom In-Room Services
              return (
                <form onSubmit={handleCustomRequestSubmit} className="space-y-4 text-xs">
                  {selectedService.desc && (
                    <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/60 text-zinc-700 text-xs">
                      {selectedService.desc}
                    </div>
                  )}

                  {/* Options Selection */}
                  {selectedService.options && selectedService.options.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-800">Seçenek / Tercih</label>
                      <select
                        value={customOption}
                        onChange={(e) => setCustomOption(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 font-medium"
                      >
                        {selectedService.options.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Count / Quantity */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-800">Miktar / Adet</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setCustomCount(num)}
                          className={`flex-1 py-2 rounded-xl font-bold transition text-xs cursor-pointer border ${
                            customCount === num
                              ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                              : 'bg-zinc-50 hover:bg-amber-50 border-zinc-200 text-zinc-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Preference */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Teslimat / Uygulama Zamanı
                    </label>
                    <select
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 font-medium"
                    >
                      <option value="Hemen (En Kısa Sürede)">Hemen (En Kısa Sürede)</option>
                      <option value="30 Dakika İçinde">30 Dakika İçinde</option>
                      <option value="1 Saat Sonra">1 Saat Sonra</option>
                      <option value="Akşam Saatlerinde">Akşam Saatlerinde</option>
                      <option value="Yarın Sabah">Yarın Sabah</option>
                    </select>
                  </div>

                  {/* Special Note */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-800">Özel Not / Açıklama</label>
                    <textarea
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="Eklemek istediğiniz özel detay veya istekler..."
                      rows={3}
                      className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900"
                    />
                  </div>

                  {/* Price display if set */}
                  {selectedService.price ? (
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                      <span className="text-xs text-emerald-900 font-bold">Hizmet Bedeli:</span>
                      <strong className="text-sm font-mono font-bold text-emerald-900">
                        {selectedService.price * customCount} {selectedService.currency || '₺'}
                      </strong>
                    </div>
                  ) : null}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition cursor-pointer"
                    >
                      Vazgeç
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-amber-500/25 transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        'Gönderiliyor...'
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Talebi İlet
                        </>
                      )}
                    </button>
                  </div>
                </form>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
