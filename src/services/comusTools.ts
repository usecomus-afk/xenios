import { FunctionDeclaration, Type } from '@google/genai';

// 1. İlgilenilmeyen Konuyu Kilitleme Aracı (Anti-Nagging)
export const addNegativePreferenceTool: FunctionDeclaration = {
  name: 'add_negative_preference',
  description: 'Misafir bir teklifi veya kategoriyi istemediğini, ilgilenmediğini belirttiğinde o konuyu karalisteye ekler.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      topic_or_category: {
        type: Type.STRING,
        description: 'Reddedilen kategori veya konu (Örn: GAYRIMENKUL_YATIRIM, PUB_CRAWL, SAC_EKIMI)',
      },
      reason: {
        type: Type.STRING,
        description: 'Misafirin belirttiği gerekçe (isteğe bağlı)',
      },
    },
    required: ['topic_or_category'],
  },
};

// 2. Otomatik Randevu & Rezervasyon Oluşturma Aracı
export const createBookingActionTool: FunctionDeclaration = {
  name: 'create_booking_action',
  description: 'Misafir onay verdiğinde onun adına anında randevu veya rezervasyon oluşturur.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      listing_id: { type: Type.STRING, description: 'İlan veya Klinik ID' },
      service_title: { type: Type.STRING, description: 'Hizmet veya Tur Adı' },
      preferred_date: { type: Type.STRING, description: 'Tarih (YYYY-MM-DD)' },
      preferred_time: { type: Type.STRING, description: 'Saat (HH:mm)' },
      booking_type: { 
        type: Type.STRING, 
        enum: ['AESTHETIC_APPOINTMENT', 'EXPERIENCE_TICKET', 'RESTAURANT_RESERVATION', 'VIP_TRANSFER'] 
      },
    },
    required: ['listing_id', 'service_title', 'preferred_date', 'preferred_time', 'booking_type'],
  },
};

// 3. Canlı Ajanda ve Ulaşım Rotası Oluşturucu
export const generateWeeklyItineraryTool: FunctionDeclaration = {
  name: 'generate_weekly_itinerary',
  description: 'Misafirin konakladığı otel, randevuları ve İstanbul canlı trafik durumuna göre kişisel seyahat ajandası üretir.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      guest_id: { type: Type.STRING },
      include_traffic_advisory: { type: Type.BOOLEAN },
    },
    required: ['guest_id'],
  },
};

export const comusAiFunctionTools = [
  addNegativePreferenceTool,
  createBookingActionTool,
  generateWeeklyItineraryTool,
];
