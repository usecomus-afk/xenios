"use client";

import { useState, useEffect, useRef } from 'react';

export function AppIntroSplash() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isDesktop = window.innerWidth >= 768;
    const hasSeen = 
      sessionStorage.getItem('xenios_seen_intro_v7') || 
      localStorage.getItem('xenios_seen_intro_v7');

    if (isDesktop || hasSeen) {
      return;
    }

    // Show splash on first mobile visit
    setIsVisible(true);

    // Auto-dismiss safety timer (guarantees the user is NEVER stuck on video)
    const safetyTimer = setTimeout(() => {
      handleDismiss();
    }, 2800);

    return () => clearTimeout(safetyTimer);
  }, []);

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('xenios_seen_intro_v7', '1');
        localStorage.setItem('xenios_seen_intro_v7', '1');
      } catch (e) {}
    }
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 350);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleDismiss}
      onTouchStart={handleDismiss}
      className={`md:hidden fixed inset-0 z-[999999] w-screen h-[100dvh] bg-black flex flex-col items-center justify-center transition-all duration-300 ease-out select-none cursor-pointer ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 100% Fullscreen Mobile Video */}
      <video
        ref={videoRef}
        src="/xenios1618.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        webkit-playsinline="true"
        onEnded={handleDismiss}
        onError={handleDismiss}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Bottom Subtle Brand Watermark */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center text-center px-4 pb-safe pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-300/90 font-mono font-bold drop-shadow-md">
          XENIOS ISTANBUL
        </span>
        <span className="text-[9px] text-white/70 font-serif italic drop-shadow-sm mt-0.5">
          Digital Guest Directory & Concierge
        </span>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/50 z-20 pointer-events-none">
        <div className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
