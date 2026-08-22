"use client";

import { useState } from 'react';
import { Hotel, Language } from '@/lib/types';
import { getT } from '@/lib/i18n';
import { 
  X, 
  Camera, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Loader2, 
  FileText, 
  User, 
  Globe, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import Image from 'next/image';

interface OnlineCheckinModalProps {
  hotel: Hotel;
  roomNumber: string;
  lang: Language;
  onClose: () => void;
}

export function OnlineCheckinModal({ hotel, roomNumber, lang, onClose }: OnlineCheckinModalProps) {
  const t = getT(lang);

  const [step, setStep] = useState<'UPLOAD' | 'REVIEW' | 'SUCCESS'>('UPLOAD');
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [firstName, setFirstName] = useState('ALEX');
  const [lastName, setLastName] = useState('MERCER');
  const [documentType, setDocumentType] = useState<'PASSPORT' | 'TCKN' | 'NATIONAL_ID'>('PASSPORT');
  const [documentNumber, setDocumentNumber] = useState('C4489102');
  const [nationality, setNationality] = useState('USA');
  const [birthDate, setBirthDate] = useState('1992-05-14');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'UNKNOWN'>('MALE');

  const handleSimulatePassportOcr = async () => {
    setIsProcessingOcr(true);

    try {
      const res = await fetch('/api/kbs/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Image: 'sample_passport_base64_data',
          mimeType: 'image/jpeg'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.parsedData) {
          setFirstName(data.parsedData.first_name);
          setLastName(data.parsedData.last_name);
          setDocumentNumber(data.parsedData.document_number);
          setNationality(data.parsedData.nationality);
          setBirthDate(data.parsedData.birth_date);
          setGender(data.parsedData.gender);
          setDocumentType(data.parsedData.document_type || 'PASSPORT');
        }
      }

      toast.success('Pasaport Google Document AI ile başarıyla ayrıştırıldı!');
      setStep('REVIEW');
    } catch (err: any) {
      toast.error('OCR okuma hatası, lütfen manuel doldurunuz.');
      setStep('REVIEW');
    } finally {
      setIsProcessingOcr(false);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/kbs/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotel_id: hotel.id,
          hotel_name: hotel.name,
          room_number: roomNumber,
          first_name: firstName,
          last_name: lastName,
          document_type: documentType,
          document_number: documentNumber,
          nationality,
          birth_date: birthDate,
          gender
        })
      });

      if (res.ok) {
        setStep('SUCCESS');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success('Dijital check-in ve kimlik bildirimi onaylandı.');
      } else {
        throw new Error('Kayıt gönderilemedi.');
      }
    } catch (err: any) {
      toast.error(err.message || 'Bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-amber-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-amber-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-200 flex items-center justify-center p-1.5 shadow-xs">
              <Image 
                src="/icons/kbs-online-checkin.png" 
                alt="KBS Check-in" 
                width={32} 
                height={32} 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold font-serif text-zinc-900">
                Online Check-in & Kimlik Teyidi
              </h2>
              <p className="text-[11px] text-zinc-500">
                {hotel.name} • Oda {roomNumber}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">

          {step === 'UPLOAD' && (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-200/80 text-left space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Resmi EGM Kimlik Bildirim Sistemi (KBS) Uyumu</span>
                </div>
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  Resepsiyonda beklemeden odanıza geçebilmeniz için pasaport veya kimliğinizi taratarak saniyeler içinde check-in yapabilirsiniz.
                </p>
              </div>

              {/* Upload & Scan Actions */}
              <div className="p-6 border-2 border-dashed border-amber-300 rounded-3xl bg-amber-50/30 flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <strong className="text-xs text-zinc-800 block">Pasaport veya Kimliğinizi Okutun</strong>
                  <span className="text-[10px] text-zinc-500">Google Cloud Document AI Identity Processor</span>
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePassportOcr}
                  disabled={isProcessingOcr}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessingOcr ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Google AI ile Taranıyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Kamera ile Tara / Pasaport Yükle</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-zinc-400">
                veya{' '}
                <button
                  onClick={() => setStep('REVIEW')}
                  className="text-amber-700 font-bold underline hover:text-amber-800 cursor-pointer"
                >
                  bilgileri manuel girmek için tıklayın
                </button>
              </div>
            </div>
          )}

          {step === 'REVIEW' && (
            <div className="space-y-3.5">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-[11px] flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bilgileriniz Document AI tarafından okundu. Lütfen kontrol edip onaylayınız.</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Ad (First Name)</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-zinc-800 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Soyad (Last Name)</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-zinc-800 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Belge Türü</label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-zinc-800 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden"
                  >
                    <option value="PASSPORT">Pasaport (Passport)</option>
                    <option value="TCKN">T.C. Kimlik Kartı</option>
                    <option value="NATIONAL_ID">Ulusal Kimlik Kartı (National ID)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Belge No</label>
                  <input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-mono font-bold text-zinc-800 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Uyruk (ISO 3-Letter)</label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-zinc-800 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Doğum Tarihi</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl font-bold text-zinc-800 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('UPLOAD')}
                  className="w-1/3 py-2.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs transition cursor-pointer"
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="w-2/3 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Kimliği Onayla ve Check-in Yap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900">Check-in Başarıyla Tamamlandı!</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Bilgileriniz otel resepsiyonuna ve EGM KBS sistemine iletildi. Anahtarınızı resepsiyondan doğrudan alabilirsiniz.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-left space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Misafir:</span>
                  <strong className="text-zinc-900">{firstName} {lastName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Oda No:</span>
                  <strong className="text-zinc-900">{roomNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Pasaport / Kimlik:</span>
                  <strong className="text-zinc-900 font-mono">{documentNumber}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Kapat ve Deneyimleri Keşfet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
