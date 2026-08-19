"use client";

import { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function AppIntroSplash() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if splash was already shown in this session
    const hasSeenIntro = sessionStorage.getItem('xenios_has_seen_intro_v1');
    if (!hasSeenIntro) {
      setIsVisible(true);
      sessionStorage.setItem('xenios_has_seen_intro_v1', '1');
    }
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Intro video auto-play prevented or waiting for interaction:", error);
        });
      }
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#0c0a09] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-amber-950/20 pointer-events-none" />

      {/* Top Bar with Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleDismiss}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/15 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition shadow-lg cursor-pointer active:scale-95"
        >
          <span>Geç</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Video Presentation */}
      <div className="relative z-10 max-w-2xl w-full px-4 flex flex-col items-center justify-center">
        <div className="relative w-full aspect-video max-h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src="/xenios1618.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleDismiss}
            onError={handleDismiss}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Brand Subtext */}
        <div className="mt-6 flex flex-col items-center text-center space-y-1.5 animate-in fade-in duration-1000">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-amber-400/90 font-bold font-mono">
              XENIOS ISTANBUL
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-serif italic">
            Digital Guest Directory & Personalized City Concierge
          </p>
        </div>
      </div>

      {/* Subtle Bottom Loading Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900">
        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 animate-[pulse_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
