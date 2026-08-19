"use client";

import { Hotel, Language, GuestProfile } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { XeniosStore } from '@/lib/store';
import { askGeminiConcierge, ChatMessage } from '@/lib/gemini';
import { GuestPreferenceSurvey } from './guest-preference-survey';
import { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, User, X, SlidersHorizontal, ShieldCheck, UserCog } from 'lucide-react';
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
  const [showSurvey, setShowSurvey] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(true);
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

  useEffect(() => {
    if (isOpen) {
      setProfile(XeniosStore.getGuestProfile());
      setIntroDismissed(XeniosStore.getAiIntroDismissed());
      setShowSurvey(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const needsIntro = !profile.kvkkConsent && !introDismissed;

  const handleSaveProfile = (updated: GuestProfile) => {
    setProfile(updated);
    XeniosStore.setGuestProfile(updated);
    XeniosStore.setAiIntroDismissed(true);
    setIntroDismissed(true);
    setShowSurvey(false);
  };

  const handleClearProfile = () => {
    const cleared = XeniosStore.clearGuestProfile();
    setProfile(cleared);
    XeniosStore.setAiIntroDismissed(false);
    setIntroDismissed(false);
    setShowSurvey(false);
  };

  const handleSkipIntro = () => {
    XeniosStore.setAiIntroDismissed(true);
    setIntroDismissed(true);
  };

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
              </div>
              <p className="text-[11px] text-zinc-500">{hotel.name} • Oda {roomNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSurvey(true)}
              className={`px-3 py-1.5 rounded-xl border transition text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                profile.kvkkConsent
                  ? 'bg-white border-amber-300 text-zinc-800 hover:bg-amber-50'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400 text-zinc-950 hover:brightness-105'
              }`}
              title="Misafir Tercihleri & Kişisel Rehberlik Anketi"
            >
              {profile.kvkkConsent ? (
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              ) : (
                <UserCog className="w-3.5 h-3.5 text-zinc-950 shrink-0" />
              )}
              <span className="inline-block whitespace-nowrap font-bold">
                {profile.kvkkConsent ? 'Tercihlerim' : 'Beni Tanı'}
              </span>
            </button>

            <button 
              type="button"
              onClick={onClose} 
              className="w-8 h-8 rounded-full bg-white hover:bg-amber-50 border border-amber-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showSurvey ? (
          /* Full Personal Guidance Survey */
          <div className="flex-1 overflow-hidden p-4 flex flex-col">
            <GuestPreferenceSurvey
              initialProfile={profile}
              onSave={handleSaveProfile}
              onClear={handleClearProfile}
              onCancel={() => setShowSurvey(false)}
            />
          </div>
        ) : needsIntro ? (
          /* Intro Gate: explain why we need to know the guest before personalized guidance */
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center gap-4 bg-zinc-50/30">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-300/60 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-amber-600" />
            </div>
            <div className="max-w-sm space-y-1.5">
              <h3 className="text-sm font-bold text-zinc-900">Kişisel rehberlik hizmeti için sizi tanımaya ihtiyacımız var</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Sağlık ve alerji durumunuz, alışveriş ilgi alanlarınız, şehir gezisi ve gastronomi tercihleriniz gibi bilgileri
                ne kadar paylaşırsanız, comusAI size o kadar isabetli ve size özel öneriler sunabilir. Ne kadarını
                paylaşacağınız tamamen sizin kararınızdır ve bilgileriniz yalnızca KVKK onayınızla işlenir.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-sm pt-1">
              <button
                onClick={() => setShowSurvey(true)}
                className="w-full sm:flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/30 transition"
              >
                Tercihlerimi Belirle
              </button>
              <button
                onClick={handleSkipIntro}
                className="w-full sm:flex-1 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition"
              >
                Şimdilik Genel Sohbete Başla
              </button>
            </div>
          </div>
        ) : (
          <>
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
                  <span>comusAI sizin için yanıt hazırlıyor...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 bg-white border-t border-amber-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setShowSurvey(true)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 border border-amber-400 shrink-0 font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>Beni Tanı (Kişisel Öneriler)</span>
              </button>

              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(q);
                  }}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 shrink-0 font-medium transition cursor-pointer"
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
          </>
        )}
      </div>
    </div>
  );
}
