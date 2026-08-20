"use client";

import { useState, useEffect, useRef } from 'react';

export function AppIntroSplash() {
  // Start with true so mobile paints the black splash screen on the very first frame with 0 flicker
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if on desktop or if already viewed in this session
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    const hasSeen = typeof window !== 'undefined' && sessionStorage.getItem('xenios_has_seen_intro_mobile_v2');

    if (isDesktop || hasSeen) {
      setIsVisible(false);
      return;
    }

    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Intro video autoplay waiting for user interaction:", err);
        });
      }
    }
  }, []);

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('xenios_has_seen_intro_mobile_v2', '1');
    }
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleDismiss}
      className={`hidden max-md:flex fixed inset-0 z-[999999] w-screen h-[100dvh] bg-black flex-col items-center justify-center transition-all duration-500 ease-in-out select-none cursor-pointer ${
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
        className="w-full h-full object-cover"
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
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/50 z-20">
        <div className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

