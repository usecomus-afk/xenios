"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { XeniosStore } from '@/lib/store';
import { ServiceRequest, ModuleAdminSettings, ModuleAdminSettingsMap } from '@/lib/types';
import {
  SERVICE_MODULES,
  ServiceModuleConfig,
  ServiceField,
  resolvePricing,
  resolveFieldOptions,
  deriveRequestStatus,
  isToday
} from '@/lib/service-modules';
import { ChevronDown, Plus, X, RotateCcw, Save, ArrowUpRight, Power, EyeOff, Eye, LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_SETTING: ModuleAdminSettings = { enabled: true, hidden: false };

function ModuleRow({
  config,
  settings,
  requests,
  onSettingsChange
}: {
  config: ServiceModuleConfig;
  settings: ModuleAdminSettings;
  requests: ServiceRequest[];
  onSettingsChange: (next: ModuleAdminSettings) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [priceDraft, setPriceDraft] = useState<Record<string, number>>(() => resolvePricing(config, settings.pricing));

  useEffect(() => {
    setPriceDraft(resolvePricing(config, settings.pricing));
  }, [settings.pricing, config]);

  const contentFields = useMemo(
    () => config.fields.filter((f): f is ServiceField => f.type === 'select' || f.type === 'multiselect'),
    [config]
  );
  const [contentFieldKey, setContentFieldKey] = useState<string>(contentFields[0]?.key ?? '');
  const [newOptionText, setNewOptionText] = useState('');

  const currentField = contentFields.find((f) => f.key === contentFieldKey);
  const currentOptions = currentField ? resolveFieldOptions(currentField, settings.fieldOptions) : [];
  const isOverridden = !!currentField && !!settings.fieldOptions?.[currentField.key];

  const stats = useMemo(() => {
    const pending = requests.filter((r) => deriveRequestStatus(r) === 'pending').length;
    const today = requests.filter((r) => isToday(r.createdAt)).length;
    return { total: requests.length, pending, today };
  }, [requests]);

  const savePricing = () => {
    onSettingsChange({ ...settings, pricing: priceDraft });
    toast.success(`${config.title}: fiyatlar güncellendi.`);
  };

  const addOption = () => {
    const val = newOptionText.trim();
    if (!val || !currentField) return;
    if (currentOptions.includes(val)) {
      setNewOptionText('');
      return;
    }
    const next = [...currentOptions, val];
    onSettingsChange({ ...settings, fieldOptions: { ...(settings.fieldOptions ?? {}), [currentField.key]: next } });
    setNewOptionText('');
  };

  const removeOption = (opt: string) => {
    if (!currentField) return;
    const next = currentOptions.filter((o) => o !== opt);
    onSettingsChange({ ...settings, fieldOptions: { ...(settings.fieldOptions ?? {}), [currentField.key]: next } });
  };

  const resetOptions = () => {
    if (!currentField || !settings.fieldOptions) return;
    const rest = { ...settings.fieldOptions };
    delete rest[currentField.key];
    onSettingsChange({ ...settings, fieldOptions: rest });
    toast.success(`${currentField.label}: varsayılan içeriğe döndürüldü.`);
  };

  return (
    <div className={`rounded-2xl border transition ${settings.hidden ? 'border-red-500/30 bg-red-500/[0.03]' : !settings.enabled ? 'border-zinc-700 bg-[#171a22]/60' : 'border-[#2c313d] bg-[#171a22]'}`}>
      <div className="p-3.5 flex flex-col sm:flex-row sm:items-center gap-3">
        <button onClick={() => setExpanded((e) => !e)} className="flex items-center gap-3 flex-1 min-w-0 text-left">
          <div className={`w-11 h-11 rounded-xl bg-[#0f1116] border border-[#2c313d] p-1.5 flex items-center justify-center shrink-0 ${!settings.enabled || settings.hidden ? 'opacity-40 grayscale' : ''}`}>
            <Image src={config.icon} alt={config.title} width={32} height={32} className="object-contain" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <strong className="text-sm text-white truncate">{config.title}</strong>
              {settings.hidden && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold shrink-0">GİZLİ</span>}
              {!settings.enabled && !settings.hidden && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-600/40 text-zinc-400 font-bold shrink-0">PASİF</span>}
            </div>
            <p className="text-[11px] text-zinc-500 truncate">{config.department}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex items-center gap-4 text-[11px] text-zinc-400 shrink-0">
          <span>Bugün <strong className="text-white font-mono">{stats.today}</strong></span>
          <span>Bekleyen <strong className="text-amber-400 font-mono">{stats.pending}</strong></span>
          <span>Toplam <strong className="text-white font-mono">{stats.total}</strong></span>
          <Link
            href={`/live-requests?module=${config.key}`}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold"
          >
            Talepler <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSettingsChange({ ...settings, enabled: !settings.enabled })}
            title={settings.enabled ? 'Pasife al' : 'Aktif et'}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition ${
              settings.enabled ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' : 'bg-zinc-700/30 border-zinc-600 text-zinc-400'
            }`}
          >
            <Power className="w-3 h-3" />
            {settings.enabled ? 'Aktif' : 'Pasif'}
          </button>
          <button
            onClick={() => onSettingsChange({ ...settings, hidden: !settings.hidden })}
            title={settings.hidden ? 'Misafirde göster' : 'Misafirden gizle'}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition ${
              settings.hidden ? 'bg-red-500/15 border-red-500/40 text-red-400' : 'bg-[#0f1116] border-[#2c313d] text-zinc-400'
            }`}
          >
            {settings.hidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {settings.hidden ? 'Gizli' : 'Görünür'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-[#2c313d] p-4 space-y-5">
          {/* Pricing */}
          {config.pricingDefaults && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-zinc-300">Fiyatlandırma</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.keys(config.pricingDefaults).map((pKey) => (
                  <label key={pKey} className="flex items-center justify-between gap-2 bg-[#0f1116] border border-[#2c313d] rounded-xl px-3 py-2">
                    <span className="text-[11px] text-zinc-400 truncate">{pKey}</span>
                    <input
                      type="number"
                      value={priceDraft[pKey] ?? 0}
                      onChange={(e) => setPriceDraft((p) => ({ ...p, [pKey]: Number(e.target.value) }))}
                      className="w-24 text-right text-xs bg-transparent text-white font-mono focus:outline-none"
                    />
                  </label>
                ))}
              </div>
              <button
                onClick={savePricing}
                className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg text-[11px] font-bold transition"
              >
                <Save className="w-3.5 h-3.5" /> Fiyatları Kaydet
              </button>
            </div>
          )}

          {/* Content Management */}
          {contentFields.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-bold text-zinc-300">İçerik Yönetimi (Seçenek Ekle / Çıkar)</h4>
                <div className="flex items-center gap-2">
                  <select
                    value={contentFieldKey}
                    onChange={(e) => setContentFieldKey(e.target.value)}
                    className="bg-[#0f1116] border border-[#2c313d] text-zinc-300 text-[11px] rounded-lg px-2 py-1.5 focus:outline-none"
                  >
                    {contentFields.map((f) => (
                      <option key={f.key} value={f.key}>{f.label}</option>
                    ))}
                  </select>
                  {isOverridden && (
                    <button onClick={resetOptions} title="Varsayılana döndür" className="p-1.5 rounded-lg bg-[#0f1116] border border-[#2c313d] text-zinc-400 hover:text-amber-400">
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {currentOptions.map((opt) => (
                  <span key={opt} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0f1116] border border-[#2c313d] text-zinc-200 text-[11px]">
                    {opt}
                    <button onClick={() => removeOption(opt)} className="text-zinc-500 hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {currentOptions.length === 0 && <span className="text-[11px] text-zinc-600">Bu alanda seçenek yok.</span>}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newOptionText}
                  onChange={(e) => setNewOptionText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addOption()}
                  placeholder={`Yeni ${currentField?.label ?? 'seçenek'} ekle...`}
                  className="flex-1 text-xs bg-[#0f1116] border border-[#2c313d] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
                <button
                  onClick={addOption}
                  className="flex items-center gap-1 px-3 py-2 bg-[#0f1116] border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 rounded-lg text-[11px] font-bold transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Ekle
                </button>
              </div>
            </div>
          )}

          {!config.pricingDefaults && contentFields.length === 0 && (
            <p className="text-[11px] text-zinc-500">Bu modül için düzenlenebilir fiyat veya içerik alanı bulunmuyor.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function ModuleSettingsPage() {
  const [settingsMap, setSettingsMap] = useState<ModuleAdminSettingsMap>({});
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  const refresh = () => {
    setSettingsMap(XeniosStore.getModuleSettings());
    setRequests(XeniosStore.getRequests());
  };

  useEffect(() => {
    refresh();
    window.addEventListener('xenios_module_settings_updated', refresh);
    window.addEventListener('xenios_requests_updated', refresh);
    return () => {
      window.removeEventListener('xenios_module_settings_updated', refresh);
      window.removeEventListener('xenios_requests_updated', refresh);
    };
  }, []);

  const modules = Object.values(SERVICE_MODULES);

  const requestsByModule = useMemo(() => {
    const map: Record<string, ServiceRequest[]> = {};
    modules.forEach((m) => { map[m.key] = requests.filter((r) => r.serviceKey === m.key); });
    return map;
  }, [requests]);

  const summary = useMemo(() => {
    const hiddenCount = modules.filter((m) => (settingsMap[m.key] ?? DEFAULT_SETTING).hidden).length;
    const disabledCount = modules.filter((m) => !(settingsMap[m.key] ?? DEFAULT_SETTING).enabled).length;
    return { hiddenCount, disabledCount, total: modules.length };
  }, [settingsMap]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold font-serif text-white">Otel İçi Hizmet Modülleri Yönetimi</h1>
        <p className="text-xs text-zinc-400">Misafir PWA'daki 16 hizmet modülünü aktif/pasif edin, gizleyin, fiyatlarını ve içeriklerini düzenleyin — değişiklikler misafir uygulamasına anında yansır.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide flex items-center gap-1"><LayoutGrid className="w-3 h-3" /> Toplam Modül</span>
          <div className="text-xl font-bold text-white mt-1 font-mono">{summary.total}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Pasif Modül</span>
          <div className="text-xl font-bold text-zinc-300 mt-1 font-mono">{summary.disabledCount}</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#171a22] border border-[#2c313d]">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Gizli Modül</span>
          <div className="text-xl font-bold text-red-400 mt-1 font-mono">{summary.hiddenCount}</div>
        </div>
      </div>

      <div className="space-y-2.5">
        {modules.map((config) => (
          <ModuleRow
            key={config.key}
            config={config}
            settings={settingsMap[config.key] ?? DEFAULT_SETTING}
            requests={requestsByModule[config.key] ?? []}
            onSettingsChange={(next) => {
              XeniosStore.setModuleSetting(config.key, next);
              refresh();
            }}
          />
        ))}
      </div>
    </div>
  );
}
