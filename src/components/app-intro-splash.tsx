"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function AppIntroSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDismiss = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 450);
  }, []);

  useEffect(() => {
    // 1. Force muted & playsinline for mobile browsers / iOS Safari
    if (videoRef.current) {
      try {
        videoRef.current.muted = true;
        videoRef.current.defaultMuted = true;
        videoRef.current.playbackRate = 1.65; // 5s video accelerates to complete gracefully within 3s
        const promise = videoRef.current.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay fallback
          });
        }
      } catch {
        // Fallback
      }
    }

    // 2. Strict 3000ms timer
    const timer = setTimeout(() => {
      handleDismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [handleDismiss]);

  if (!isVisible) return null;

  return (
    <div
      onClick={handleDismiss}
      onTouchStart={handleDismiss}
      className={`fixed inset-0 z-[999999] w-screen h-[100dvh] bg-black flex flex-col items-center justify-center transition-all duration-400 ease-out select-none cursor-pointer overflow-hidden ${
        isFadingOut
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* 100% Fullscreen Video with multiple fallback sources */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        className="w-full h-full object-cover pointer-events-none"
      >
        <source src="/xenios1618.mp4" type="video/mp4" />
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Bottom Subtle Brand Watermark */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center text-center px-4 pb-safe pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-300/90 font-mono font-bold drop-shadow-md">
          XENIOS ISTANBUL
        </span>
        <span className="text-[9px] text-white/70 font-serif italic drop-shadow-sm mt-0.5">
          Digital Guest Directory & Concierge
        </span>
      </div>

      {/* Bottom 3-Second Loading Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50 z-20 pointer-events-none overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"
          style={{
            animation: "progressFill 3s linear forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
