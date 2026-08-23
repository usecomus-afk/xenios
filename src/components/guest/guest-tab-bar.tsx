"use client";

import { Language } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { Home, Compass, LayoutGrid, Building2 } from 'lucide-react';
import Image from 'next/image';

interface GuestTabBarProps {
  activeTab: 'services' | 'experiences' | 'categories' | 'ai' | 'practical' | 'invest';
  onTabChange: (tab: 'services' | 'experiences' | 'categories' | 'ai' | 'practical' | 'invest') => void;
  lang: Language;
}

export function GuestTabBar({ activeTab, onTabChange, lang }: GuestTabBarProps) {
  const t = getT(lang);

  const tabs = [
    { id: 'services', label: t.tabs.services, iconType: 'lucide', icon: Home },
    { id: 'experiences', label: t.tabs.experiences, iconType: 'lucide', icon: Compass },
    { id: 'categories', label: t.tabs.categories, iconType: 'lucide', icon: LayoutGrid },
    { id: 'ai', label: t.tabs.aiGuide, iconType: 'image', imgSrc: '/icons/menu/aiGuide.png' },
    { id: 'practical', label: t.tabs.practical, iconType: 'image', imgSrc: '/icons/menu/practical.png' },
    { id: 'invest', label: t.tabs.invest, iconType: 'lucide', icon: Building2 }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-amber-200/80 px-2 py-1.5 safe-bottom z-40 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all relative cursor-pointer active:scale-90 ${
                isActive 
                  ? 'text-amber-800 font-bold' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className={`p-1.5 rounded-2xl transition-all ${
                isActive 
                  ? 'btn-3d text-amber-800 scale-105' 
                  : 'hover:bg-amber-50/80'
              }`}>
                {tab.iconType === 'image' && tab.imgSrc ? (
                  <div className="w-5 h-5 relative flex items-center justify-center">
                    <Image
                      src={tab.imgSrc}
                      alt={tab.label}
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  tab.icon && <tab.icon className="w-5 h-5" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
