"use client";

import { Hotel, Language, GuestProfile } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { XeniosStore } from '@/lib/store';
import { askGeminiConcierge, ChatMessage } from '@/lib/gemini';
import { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, User, X, SlidersHorizontal, Heart, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface AiChatDrawerProps {
  hotel: Hotel;
  roomNumber: string;
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export function AiChatDrawer({ hotel, roomNumber, lang, isOpen, onClose }: AiChatDrawerProps) {
  const t = getT(lang);
  const [profile, setProfile] = useState<GuestProfile>(XeniosStore.getGuestProfile());
  const [showPreferences, setShowPreferences] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Merhaba! Ben **comusAI**, ${hotel.name} (Oda ${roomNumber}) için kişisel İstanbul rehberinizim. Gün batımı tekne turları, Tarihi Yarımada'nın gizli lezzetleri, müze sıralarını atlama veya size özel rotalar hakkında dilediğinizi sorabilirsiniz.`,
      time: 'Şimdi',
      recommendations: [
        { title: "Boğazda Gün Batımı & Akşam Yemeği Cruise", category: "Boğaz & Tekne", location: "Kabataş" },
        { title: "Tarihi Cağaloğlu Hamamı Masaj Deneyimi", category: "Kültür", location: "Sultanahmet" }
      ]
    }
  ]);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');

    const newMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);

    const assistantMsg = await askGeminiConcierge(userMsg, profile, hotel.name, hotel.district, lang);
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const quickQuestions = [
    "Sultanahmet'te 3 saatim var, ne yapmalıyım?",
    "En iyi manzaralı Boğaz kahvaltısı nerede?",
    "Tarihi Türk hamamı önerir misin?",
    "İstanbulkart'ı nereden alabilirim?"
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[85vh] shadow-2xl border border-amber-200 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-amber-500/15 via-amber-100/30 to-amber-500/10 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 p-1 border border-amber-300/60 flex items-center justify-center shadow-sm">
              <Image src="/icons/menu/aiGuide.png" alt="comusAI" width={38} height={38} className="object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold font-serif text-zinc-900">comusAI Concierge</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Google Gemini</span>
              </div>
              <p className="text-[11px] text-zinc-500">{hotel.name} • Oda {roomNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="p-2 rounded-xl bg-white border border-amber-200 text-zinc-700 hover:bg-amber-50 transition text-xs font-semibold flex items-center gap-1"
              title="Misafir Tercihleri & Hafıza"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Tercihlerim</span>
            </button>
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-800 font-bold">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preferences Memory Drawer */}
        {showPreferences && (
          <div className="bg-amber-50/80 p-4 border-b border-amber-200 text-xs space-y-2 animate-in slide-in-from-top-2">
            <h4 className="font-bold text-amber-950 flex items-center gap-1">
              <span>🧠</span>
              <span>Kişisel Concierge Hafızası</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <label className="text-zinc-500 block">Seyahat Tarzı:</label>
                <select
                  value={profile.travelStyle}
                  onChange={(e: any) => {
                    const p = { ...profile, travelStyle: e.target.value };
                    setProfile(p);
                    XeniosStore.setGuestProfile(p);
                  }}
                  className="w-full bg-white border border-amber-200 rounded-lg p-1.5"
                >
                  <option value="solo">Yalnız Gezgin</option>
                  <option value="couple">Çift / Romantik</option>
                  <option value="family">Aile (Çocuklu)</option>
                  <option value="business">İş Seyahati</option>
                </select>
              </div>
              <div>
                <label className="text-zinc-500 block">Bütçe Seviyesi:</label>
                <select
                  value={profile.budgetLevel}
                  onChange={(e: any) => {
                    const p = { ...profile, budgetLevel: e.target.value };
                    setProfile(p);
                    XeniosStore.setGuestProfile(p);
                  }}
                  className="w-full bg-white border border-amber-200 rounded-lg p-1.5"
                >
                  <option value="economy">Ekonomik & Pratik</option>
                  <option value="moderate">Dengeli / Standart</option>
                  <option value="luxury">Lüks & VIP</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user' ? 'bg-zinc-800 text-white' : 'bg-amber-500 text-white shadow-sm'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-zinc-900 text-white rounded-tr-none'
                  : 'bg-white text-zinc-800 border border-amber-200/70 shadow-sm rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>

                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-amber-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Önerilen Deneyimler:</span>
                    {msg.recommendations.map((rec, rIdx) => (
                      <div key={rIdx} className="bg-amber-50/70 p-2 rounded-xl border border-amber-200 flex items-center justify-between text-[11px]">
                        <div>
                          <strong className="text-zinc-900 block">{rec.title}</strong>
                          <span className="text-zinc-500 text-[10px]">{rec.location}</span>
                        </div>
                        <span className="text-amber-800 font-bold text-[10px]">İncele →</span>
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[9px] opacity-60 block text-right font-mono">{msg.time}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-2xl w-fit animate-pulse border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Gemini comusAI sizin için yanıt hazırlıyor...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-amber-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(q);
              }}
              className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 shrink-0 font-medium transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-amber-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.aiPlaceholder}
            className="flex-1 text-xs p-2.5 rounded-xl border border-amber-200 bg-amber-50/30 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-xl shadow-md transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
