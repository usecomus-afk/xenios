"use client";

import { useState, useEffect, useRef } from 'react';

export function AppIntroSplash() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Determine if user is on mobile (width < 768px or touch device)
    const checkMobile = () => {
      const isMobileScreen = window.innerWidth < 768;
      const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
      return isMobileScreen || (isTouch && window.innerWidth < 1024);
    };

    if (checkMobile()) {
      setIsMobile(true);
      const hasSeenIntro = sessionStorage.getItem('xenios_has_seen_intro_mobile_v1');
      if (!hasSeenIntro) {
        setIsVisible(true);
        sessionStorage.setItem('xenios_has_seen_intro_mobile_v1', '1');
      }
    }
  }, []);

  useEffect(() => {
    if (isVisible && isMobile && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Intro video auto-play prevented or waiting for interaction:", error);
        });
      }
    }
  }, [isVisible, isMobile]);

  const handleDismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  // Only render on mobile devices
  if (!isMobile || !isVisible) return null;

  return (
    <div
      onClick={handleDismiss}
      className={`md:hidden fixed inset-0 z-[99999] w-screen h-[100dvh] bg-black flex flex-col items-center justify-center transition-all duration-500 ease-in-out select-none cursor-pointer ${
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
