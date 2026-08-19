"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, X, Share, PlusSquare, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if already running in standalone (PWA or Native App)
    const isRunningStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(isRunningStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Check if user dismissed prompt recently (e.g. within 2 days)
    const dismissedAt = localStorage.getItem('xenios_pwa_prompt_dismissed');
    const now = Date.now();
    const isDismissedRecently = dismissedAt && (now - parseInt(dismissedAt, 10)) < 2 * 24 * 60 * 60 * 1000;

    if (isRunningStandalone || isDismissedRecently) {
      return;
    }

    // Android / Chrome: Capture beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt banner after a brief delay for smooth UX
      setTimeout(() => setShowPrompt(true), 2500);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If iOS Safari and not standalone, show prompt after delay
    if (isIosDevice && !isRunningStandalone) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3500);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) {
      // Fallback for browsers that don't emit event
      setShowIosGuide(true);
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.warn('Install prompt error:', err);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIosGuide(false);
    localStorage.setItem('xenios_pwa_prompt_dismissed', Date.now().toString());
  };

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <>
      {/* Sleek Floating Install Card for Guest Screen */}
      <aside aria-label="Xenios Mobil Uygulama Yükleme Bildirimi" className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-amber-300 z-40 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-start gap-3.5">
          {/* App Icon */}
          <div className="w-12 h-12 rounded-2xl bg-amber-500 p-0.5 shrink-0 shadow-md overflow-hidden flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Xenios Istanbul"
              width={48}
              height={48}
              unoptimized
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-zinc-900 leading-tight">Xenios İstanbul</h4>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold uppercase">App</span>
            </div>
            <p className="text-xs text-zinc-600 mt-0.5 leading-snug">
              Daha hızlı erişim, oda servisleri ve anlık bildirimler için telefonunuza yükleyin.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition transform active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Uygulamayı İndir</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-800 transition cursor-pointer"
              >
                Daha Sonra
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* iOS Step-by-Step Installation Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-amber-200 space-y-4 animate-in zoom-in-95 text-zinc-900 relative">
            <button
              onClick={() => setShowIosGuide(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 mx-auto p-1 shadow-md flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Xenios"
                  width={56}
                  height={56}
                  unoptimized
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h3 className="text-base font-bold font-serif text-zinc-900">iPhone / iPad'e Yükleyin</h3>
              <p className="text-xs text-zinc-600">
                Xenios uygulamasını App Store'a gerek kalmadan ana ekranınıza ekleyin:
              </p>
            </div>

            <div className="space-y-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div className="flex items-center gap-1.5 text-zinc-800">
                  <span>Safari alt çubuğundaki</span>
                  <span className="p-1 bg-white rounded-md border border-amber-300 shadow-2xs font-bold inline-flex items-center gap-1 text-[11px]">
                    <Share className="w-3.5 h-3.5 text-amber-700" /> Paylaş
                  </span>
                  <span>butonuna dokunun.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div className="flex items-center gap-1.5 text-zinc-800">
                  <span>Menüyü kaydırıp</span>
                  <span className="p-1 bg-white rounded-md border border-amber-300 shadow-2xs font-bold inline-flex items-center gap-1 text-[11px]">
                    <PlusSquare className="w-3.5 h-3.5 text-amber-700" /> Ana Ekrana Ekle
                  </span>
                  <span>seçeneğini seçin.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div className="text-zinc-800 font-medium">
                  Sağ üstteki <strong>"Ekle"</strong> butonuna basın. Xenios ana ekranınızda bir native uygulama gibi açılacaktır!
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowIosGuide(false);
                setShowPrompt(false);
                localStorage.setItem('xenios_pwa_prompt_dismissed', Date.now().toString());
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-2xl shadow-md transition cursor-pointer"
            >
              Anladım, Kapat
            </button>
          </div>
        </div>
      )}
    </>
  );
}
