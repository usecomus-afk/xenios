/**
 * Xenios Aesthetic & Beauty Category, 2-Way CRM Sync & Lead Inquiry Data Types
 */

export type CrmProviderType = 'GENERIC_REST' | 'ICAL_FEED' | 'NATIVE_XENIOS' | 'SALESFORCE_HEALTH';

export interface AestheticClinic {
  id: string;
  name: string;
  slug: string;
  location_district: string; // Örn: "Abdi İpekçi Cad., Nişantaşı / Şişli"
  email_official: string;    // Formların iletileceği resmi klinik maili
  phone_whatsapp: string;    // WhatsApp/SMS bildirim numarası
  website: string;
  rating_score: number;
  reviews_count: string;
  price_level: '$$' | '$$$' | '$$$$';
  crm_config: {
    provider: CrmProviderType;
    api_endpoint?: string;
    api_key?: string;
    ical_url?: string;
    slot_buffer_minutes: number; // Varsayılan: 15
  };
  is_active: boolean;
  created_at: string;
}

export interface AestheticService {
  id: string;
  clinic_id: string;
  title: string;
  category_type: 'MEDICAL_AESTHETICS' | 'SKIN_CARE' | 'HAIR_TRANSPLANT' | 'PLASTIC_SURGERY' | 'DENTAL' | 'WELLNESS';
  description: string;
  duration_minutes: number;
  price_amount: number;
  currency: 'USD' | 'EUR' | 'TRY';
  highlights: string[];
  image_url: string;
  is_active: boolean;
}

export interface AvailableTimeSlot {
  id: string;
  start_time: string; // HH:mm
  end_time: string;   // HH:mm
  is_available: boolean;
  price?: number;
  currency?: string;
}

// 1. Randevu Modeli
export interface AppointmentBooking {
  id: string;
  clinic_id: string;
  service_id: string;
  guest_id?: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  hotel_id?: string;
  room_number?: string;
  appointment_date: string; // YYYY-MM-DD
  start_time: string;       // HH:mm
  end_time: string;         // HH:mm
  crm_sync_status: 'SYNCED' | 'FAILED' | 'PENDING';
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
  created_at: string;
}

// 2. Bilgi İstek (Lead) Modeli
export interface AestheticInquiryLead {
  id: string;
  clinic_id: string;
  service_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  preferred_contact_method: 'WHATSAPP' | 'EMAIL' | 'PHONE';
  message: string;
  hotel_id?: string;
  room_number?: string;
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'CLOSED';
  created_at: string;
}

export interface AestheticInquiryPayload {
  clinic_id: string;
  service_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  preferred_contact_method: 'WHATSAPP' | 'EMAIL' | 'PHONE';
  message?: string;
  hotel_id?: string;
  room_number?: string;
}
