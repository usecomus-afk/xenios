"use client";

import { Language } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { Home, Compass, Bell } from 'lucide-react';
import Image from 'next/image';

interface GuestTabBarProps {
  activeTab: 'services' | 'experiences' | 'ai' | 'practical' | 'requests';
  onTabChange: (tab: 'services' | 'experiences' | 'ai' | 'practical' | 'requests') => void;
  lang: Language;
  requestCount?: number;
}

export function GuestTabBar({ activeTab, onTabChange, lang, requestCount = 0 }: GuestTabBarProps) {
  const t = getT(lang);

  const tabs = [
    { id: 'services', label: t.tabs.services, iconType: 'lucide', icon: Home },
    { id: 'experiences', label: t.tabs.experiences, iconType: 'lucide', icon: Compass },
    { id: 'ai', label: t.tabs.aiGuide, iconType: 'image', imgSrc: '/icons/menu/aiGuide.png', highlight: true },
    { id: 'practical', label: t.tabs.practical, iconType: 'image', imgSrc: '/icons/menu/practical.png' },
    { id: 'requests', label: t.tabs.requests, iconType: 'lucide', icon: Bell, badge: requestCount }
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
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition relative ${
                isActive 
                  ? 'text-amber-700 font-bold' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition ${
                tab.highlight 
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-110' 
                  : isActive 
                    ? 'bg-amber-100 text-amber-800' 
                    : ''
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

              {tab.badge && tab.badge > 0 ? (
                <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
