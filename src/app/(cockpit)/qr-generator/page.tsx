"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { XeniosStore } from '@/lib/store';
import { Hotel } from '@/lib/types';
import QRCode from 'qrcode';
import { QrCode, Printer, Download, Sparkles, Building2 } from 'lucide-react';

function QrGeneratorContent() {
  const hotels = XeniosStore.getHotels();
  const searchParams = useSearchParams();
  const initialHotelId = searchParams.get('hotelId') || hotels[0].id;

  const [selectedHotelId, setSelectedHotelId] = useState(initialHotelId);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('101');
  const [qrDataUrl, setQrDataUrl] = useState('');

  const currentHotel = hotels.find(h => h.id === selectedHotelId) || hotels[0];

  useEffect(() => {
    // Generate QR Code URL
    const url = `http://localhost:3000/stay/${selectedHotelId}/${selectedRoomNumber}`;
    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1e2129',
        light: '#ffffff'
      }
    }).then(setQrDataUrl);
  }, [selectedHotelId, selectedRoomNumber]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-zinc-900">Odaya Özel Dinamik QR Kod Üretici</h1>
          <p className="text-xs text-zinc-500">
            Misafir odalarına yerleştirilecek QR etiketler. Okutulduğunda şifresiz doğrudan odaya özel PWA açılır.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20"
        >
          <Printer className="w-4 h-4" />
          <span>Yazdır / PDF Olarak Kaydet</span>
        </button>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white rounded-3xl border border-amber-200/80">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-500">Otel Seçin:</label>
          <select
            value={selectedHotelId}
            onChange={(e) => {
              setSelectedHotelId(e.target.value);
              const h = hotels.find(item => item.id === e.target.value);
              if (h && h.rooms.length > 0) setSelectedRoomNumber(h.rooms[0].number);
            }}
            className="w-full p-2.5 text-xs bg-white border border-amber-200/80 rounded-xl text-zinc-900"
          >
            {hotels.map(h => (
              <option key={h.id} value={h.id}>{h.name} ({h.district})</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-500">Oda Numarası:</label>
          <select
            value={selectedRoomNumber}
            onChange={(e) => setSelectedRoomNumber(e.target.value)}
            className="w-full p-2.5 text-xs bg-white border border-amber-200/80 rounded-xl text-zinc-900"
          >
            {currentHotel.rooms.map(r => (
              <option key={r.id} value={r.number}>
                Oda {r.number} - {r.type} ({r.floor})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Printable Room QR Card Preview */}
      <div className="max-w-md mx-auto bg-[#f8f6f0] text-zinc-900 rounded-3xl p-8 shadow-2xl border-4 border-amber-500/40 text-center space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] tracking-[0.2em] font-serif font-bold uppercase text-amber-800">
            XENIOS ISTANBUL
          </span>
          <h2 className="text-xl font-bold font-serif text-zinc-900">{currentHotel.name}</h2>
          <div className="inline-block px-4 py-1 rounded-full bg-amber-500 text-zinc-900 font-bold text-sm shadow-sm">
            ODA {selectedRoomNumber}
          </div>
        </div>

        {/* QR Code Canvas/Image */}
        {qrDataUrl && (
          <div className="bg-white p-4 rounded-2xl shadow-inner border border-amber-200 inline-block mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="Room QR" className="w-56 h-56 mx-auto" />
          </div>
        )}

        <div className="space-y-1 text-xs text-zinc-600">
          <p className="font-bold text-zinc-800">Kameranızla QR Kodu Okutun</p>
          <p className="text-[11px] text-zinc-500">
            Otel içi hizmetler, Wi-Fi şifresi, Boğaz turları ve comusAI kişisel rehberinize anında erişin.
          </p>
        </div>

        <div className="pt-2 border-t border-amber-200/80 text-[10px] text-amber-900 font-medium">
          Wi-Fi: {currentHotel.rooms.find(r => r.number === selectedRoomNumber)?.wifiPass || 'Xenios2026!'}
        </div>
      </div>
    </div>
  );
}

export default function QrGeneratorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500">Yükleniyor...</div>}>
      <QrGeneratorContent />
    </Suspense>
  );
}
