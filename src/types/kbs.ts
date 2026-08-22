/**
 * Xenios Guest Self Check-in, Document AI OCR & EGM KBS Data Types
 */

export interface KbsGuestRecord {
  id: string;
  hotel_id: string;
  hotel_name?: string;
  room_number: string;
  first_name: string;
  last_name: string;
  document_type: 'PASSPORT' | 'TCKN' | 'NATIONAL_ID';
  document_number: string;
  nationality: string;        // ISO 3166-1 alpha-3 (e.g. 'DEU', 'TUR', 'USA', 'GBR')
  birth_date: string;         // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  check_in_date: string;      // ISO String or YYYY-MM-DD
  check_out_date: string;     // ISO String or YYYY-MM-DD
  created_source: 'GUEST_PWA' | 'DASHBOARD_MANUAL';
  status: 'PENDING_REVIEW' | 'VERIFIED' | 'EXPORTED' | 'EXPIRED';
  document_image_url?: string;
  created_at: string;
}

export interface KbsModuleSettings {
  enable_guest_self_kbs: boolean;
  facility_code: string;      // EGM Tesis Kodu
  retention_days: number;     // Varsayılan: 30 gün
}

export interface DocumentAiParsedPassportDTO {
  first_name: string;
  last_name: string;
  document_number: string;
  document_type: 'PASSPORT' | 'TCKN' | 'NATIONAL_ID';
  nationality: string;
  birth_date: string;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  expiration_date?: string;
  confidence_score: number;
}
