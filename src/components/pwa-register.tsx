"use client";

import { useEffect } from 'react';
import { PwaNotificationManager } from '@/lib/pwa-notifications';

export function PwaRegister() {
  useEffect(() => {
    // Register Service Worker for PWA
    PwaNotificationManager.registerServiceWorker();
  }, []);

  return null;
}
