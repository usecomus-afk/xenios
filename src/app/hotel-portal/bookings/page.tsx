"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HotelBookingsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/hotel-portal');
  }, [router]);

  return null;
}

