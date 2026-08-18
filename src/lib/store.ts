import { Hotel, Room, ServiceRequest, Booking, GuestProfile, Language, Complaint, ComplaintStatus, XeniosUser, Experience, ModuleAdminSettings, ModuleAdminSettingsMap, PropertyListing, InvestmentLead } from './types';
import rawHotels from '@/data/hotels.json';
import rawExperiences from '@/data/experiences.json';
import rawProperties from '@/data/properties.json';

const hotelsData: Hotel[] = rawHotels as Hotel[];

const STORAGE_KEYS = {
  CURRENT_HOTEL: 'xenios_hotel_id',
  CURRENT_ROOM: 'xenios_room_id',
  LANG: 'xenios_lang',
  REQUESTS: 'xenios_live_requests',
  BOOKINGS: 'xenios_bookings',
  PROFILE: 'xenios_guest_profile',
  COMPLAINTS: 'xenios_tourist_complaints',
  CURRENT_USER: 'xenios_auth_user',
  MODULE_SETTINGS: 'xenios_module_settings',
  PROPERTIES: 'xenios_custom_properties',
  INVESTMENT_LEADS: 'xenios_investment_leads'
};

const DEFAULT_MODULE_SETTING: ModuleAdminSettings = { enabled: true, hidden: false };

function safeGet(key: string, defaultVal: string = ''): string {
  if (typeof window === 'undefined') return defaultVal;
  try {
    return localStorage.getItem(key) || defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function safeSet(key: string, val: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, val);
  } catch (e) {}
}

export const XeniosStore = {
  // User Authentication
  getUser(): XeniosUser | null {
    try {
      const stored = safeGet(STORAGE_KEYS.CURRENT_USER);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  },

  setUser(user: XeniosUser | null) {
    if (user) {
      safeSet(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('xenios_auth_updated'));
    }
  },

  logout() {
    this.setUser(null);
  },

  getHotels(): Hotel[] {
    try {
      const stored = safeGet('xenios_custom_hotels');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return hotelsData;
  },

  saveHotels(hotels: Hotel[]) {
    safeSet('xenios_custom_hotels', JSON.stringify(hotels));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('xenios_hotels_updated'));
    }
  },

  addHotel(hotel: Hotel) {
    const list = this.getHotels();
    list.push(hotel);
    this.saveHotels(list);
  },

  updateHotel(id: string, updated: Partial<Hotel>) {
    const list = this.getHotels().map(h => h.id === id ? { ...h, ...updated } : h);
    this.saveHotels(list);
  },

  deleteHotel(id: string) {
    const list = this.getHotels().filter(h => h.id !== id);
    this.saveHotels(list);
  },

  getHotelById(id: string): Hotel | undefined {
    return this.getHotels().find(h => h.id === id) || this.getHotels()[0];
  },

  getExperiences(): Experience[] {
    try {
      const stored = safeGet('xenios_custom_experiences');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return rawExperiences as Experience[];
  },

  saveExperiences(exps: Experience[]) {
    safeSet('xenios_custom_experiences', JSON.stringify(exps));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('xenios_experiences_updated'));
    }
  },

  updateExperience(id: string, updated: Partial<Experience>) {
    const list = this.getExperiences().map(e => e.id === id ? { ...e, ...updated } : e);
    this.saveExperiences(list);
  },

  addExperience(exp: Experience) {
    const list = this.getExperiences();
    list.unshift(exp);
    this.saveExperiences(list);
  },

  deleteExperience(id: string) {
    const list = this.getExperiences().filter(e => e.id !== id);
    this.saveExperiences(list);
  },

  getExperienceById(id: string) {
    return this.getExperiences().find((e: any) => e.id === id);
  },

  // Invest & Live in Istanbul — Emlak Vitrini
  getPropertyListings(): PropertyListing[] {
    try {
      const stored = safeGet(STORAGE_KEYS.PROPERTIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.id?.startsWith('invest-')) {
          return parsed;
        }
      }
    } catch (e) {}
    return rawProperties as PropertyListing[];
  },

  savePropertyListings(properties: PropertyListing[]) {
    safeSet(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('xenios_properties_updated'));
    }
  },

  addPropertyListing(property: PropertyListing) {
    const list = this.getPropertyListings();
    list.unshift(property);
    this.savePropertyListings(list);
  },

  updatePropertyListing(id: string, updated: Partial<PropertyListing>) {
    const list = this.getPropertyListings().map(p => p.id === id ? { ...p, ...updated } : p);
    this.savePropertyListings(list);
  },

  deletePropertyListing(id: string) {
    const list = this.getPropertyListings().filter(p => p.id !== id);
    this.savePropertyListings(list);
  },

  // Sessizce toplanan nitelikli veri: görüntülenen mülk tiplerinden basit persona tahmini
  trackPropertyView(property: PropertyListing) {
    const profile = this.getGuestProfile();
    const viewed = [...(profile.investPropertyTypesViewed ?? []), property.propertyType].slice(-20);
    const scores = { ...(profile.investPersonaScores ?? {}) };
    property.personas.forEach((p) => { scores[p] = (scores[p] ?? 0) + 1; });
    const personaGuess = (Object.entries(scores).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0]?.[0]) as GuestProfile['investPersonaGuess'];
    this.setGuestProfile({ ...profile, investPropertyTypesViewed: viewed, investPersonaScores: scores, investPersonaGuess: personaGuess });
  },

  getInvestmentLeads(): InvestmentLead[] {
    try {
      const stored = safeGet(STORAGE_KEYS.INVESTMENT_LEADS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  },

  addInvestmentLead(lead: Omit<InvestmentLead, 'id' | 'createdAt'>): InvestmentLead {
    const list = this.getInvestmentLeads();
    const newLead: InvestmentLead = { ...lead, id: 'lead-' + Date.now(), createdAt: new Date().toISOString() };
    list.unshift(newLead);
    try {
      safeSet(STORAGE_KEYS.INVESTMENT_LEADS, JSON.stringify(list));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('xenios_investment_leads_updated'));
    } catch (e) {}
    return newLead;
  },

  // Active Session
  getActiveHotelId(): string {
    return safeGet(STORAGE_KEYS.CURRENT_HOTEL, hotelsData[0]?.id || 'hotel-1');
  },

  setActiveHotelId(id: string) {
    safeSet(STORAGE_KEYS.CURRENT_HOTEL, id);
  },

  getActiveRoomId(): string {
    return safeGet(STORAGE_KEYS.CURRENT_ROOM, '101');
  },

  setActiveRoomId(roomNum: string) {
    safeSet(STORAGE_KEYS.CURRENT_ROOM, roomNum);
  },

  getLanguage(): Language {
    const l = safeGet(STORAGE_KEYS.LANG, 'tr');
    return (['tr', 'en', 'ar', 'ru', 'de', 'fr'].includes(l) ? l : 'tr') as Language;
  },

  setLanguage(lang: Language) {
    safeSet(STORAGE_KEYS.LANG, lang);
  },

  // In-Room Service Requests
  getRequests(): ServiceRequest[] {
    try {
      const stored = safeGet(STORAGE_KEYS.REQUESTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    // No demo/seed requests — the cockpit must only ever show real guest-submitted requests.
    return [];
  },

  addRequest(req: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt'>): ServiceRequest {
    const list = this.getRequests();
    const newReq: ServiceRequest = {
      ...req,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.unshift(newReq);
    try {
      safeSet(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('xenios_requests_updated'));
    } catch (e) {}
    return newReq;
  },

  updateRequestStatus(id: string, status: ServiceRequest['status']) {
    const list = this.getRequests();
    const item = list.find(r => r.id === id);
    if (item) {
      item.status = status;
      item.updatedAt = new Date().toISOString();
      try {
        safeSet(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('xenios_requests_updated'));
      } catch (e) {}
    }
  },

  updateRequestStage(id: string, stage: string, status: ServiceRequest['status']) {
    const list = this.getRequests();
    const item = list.find(r => r.id === id);
    if (item) {
      item.stage = stage;
      item.status = status;
      item.updatedAt = new Date().toISOString();
      try {
        safeSet(STORAGE_KEYS.REQUESTS, JSON.stringify(list));
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('xenios_requests_updated'));
      } catch (e) {}
    }
  },

  // Cockpit: Otel İçi Hizmet Modülleri Yönetimi (aktif/pasif, gizleme, fiyat, içerik)
  getModuleSettings(): ModuleAdminSettingsMap {
    try {
      const stored = safeGet(STORAGE_KEYS.MODULE_SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {};
  },

  getModuleSetting(key: string): ModuleAdminSettings {
    const all = this.getModuleSettings();
    return { ...DEFAULT_MODULE_SETTING, ...(all[key] ?? {}) };
  },

  setModuleSetting(key: string, settings: ModuleAdminSettings) {
    const all = this.getModuleSettings();
    all[key] = settings;
    try {
      safeSet(STORAGE_KEYS.MODULE_SETTINGS, JSON.stringify(all));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('xenios_module_settings_updated'));
    } catch (e) {}
  },

  // Bookings & Virtual POS
  getBookings(): Booking[] {
    try {
      const stored = safeGet(STORAGE_KEYS.BOOKINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  },

  addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'confirmationCode'>): Booking {
    const list = this.getBookings();
    const confirmationCode = 'XEN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newBooking: Booking = {
      ...booking,
      id: `book-${Date.now()}`,
      confirmationCode,
      createdAt: new Date().toISOString()
    };
    list.unshift(newBooking);
    try {
      safeSet(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('xenios_bookings_updated'));
    } catch (e) {}
    return newBooking;
  },

  updateBookingStatus(id: string, status: Booking['status']) {
    const list = this.getBookings();
    const item = list.find(b => b.id === id);
    if (item) {
      item.status = status;
      try {
        safeSet(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('xenios_bookings_updated'));
      } catch (e) {}
    }
  },

  // Guest AI Profile
  getGuestProfile(): GuestProfile {
    try {
      const stored = safeGet(STORAGE_KEYS.PROFILE);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      travelStyle: 'couple',
      budgetLevel: 'luxury',
      interests: ['Boğaz Turları', 'Tarih', 'Gastronomi', 'Hamam'],
      dietaryRestrictions: ['Helal', 'Deniz Ürünleri'],
      kvkkConsent: false
    };
  },

  setGuestProfile(profile: GuestProfile) {
    try {
      safeSet(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {}
  },

  // KVKK: misafirin dilediği zaman tüm kişisel/sağlık verilerini ve onayını silme hakkı
  clearGuestProfile() {
    const cleared: GuestProfile = { kvkkConsent: false };
    try {
      safeSet(STORAGE_KEYS.PROFILE, JSON.stringify(cleared));
    } catch (e) {}
    return cleared;
  },

  getAiIntroDismissed(): boolean {
    return safeGet('xenios_ai_intro_dismissed') === '1';
  },

  setAiIntroDismissed(v: boolean) {
    safeSet('xenios_ai_intro_dismissed', v ? '1' : '0');
  },

  // Tourist Complaints & Fraud Dispute Desk
  getComplaints(): Complaint[] {
    try {
      const stored = safeGet(STORAGE_KEYS.COMPLAINTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    const seed: Complaint[] = [
      {
        id: 'comp-1',
        trackingCode: 'XEN-HAK-9042',
        businessName: 'Bosphorus Pearl Seafood & Grill',
        businessCategory: 'Restoran / Kafe',
        location: 'Karaköy / Galata',
        incidentDate: '2026-08-10',
        amountPaid: 4800,
        amountExpected: 1600,
        currency: 'TRY',
        discrepancyAmount: 3200,
        guestName: 'Marc & Sophie Laurent',
        guestEmail: 'sophie.laurent@paris.fr',
        guestPhone: '+33 6 12 34 56 78',
        hotelName: 'Hotel Sultanahmet',
        roomNumber: '204',
        description: 'Menüde yer almayan balık mezeleri ve kuver için fahiş hesap yansıtıldı. İtiraz ettiğimizde agresif tavır sergilendi.',
        status: 'contacted_business',
        businessEmail: 'info@bosphoruspearl.com.tr',
        daysPending: 5,
        isPublicAlert: false,
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'comp-2',
        trackingCode: 'XEN-HAK-8114',
        businessName: 'Sultan Carpet & Antique Gallery',
        businessCategory: 'Alışveriş / Halı & Deri',
        location: 'Kapalıçarşı / Nuruosmaniye',
        incidentDate: '2026-07-12',
        amountPaid: 1400,
        amountExpected: 250,
        currency: 'EUR',
        discrepancyAmount: 1150,
        guestName: 'Hans & Erika Weber',
        guestEmail: 'h.weber@berlin.de',
        guestPhone: '+49 170 987 65 43',
        hotelName: 'Erba Hotel Sultanahmet',
        roomNumber: '101',
        description: 'Makine halısı orijinal 1920 Kök Boya Hereke İpek Halısı diye 1.400 Euroya satıldı. Bilirkişi raporuyla sahte olduğu kanıtlandı. İşletmeye 30 gün boyunca iletilen resmi yazılara hiçbir cevap verilmedi ve iyi niyet gösterilmedi.',
        status: 'published_blacklisted',
        businessEmail: 'sultancarpet@gmail.com',
        businessResponse: '30 gün içinde yanıt verilmedi veya telafi reddedildi.',
        daysPending: 34,
        isPublicAlert: true,
        createdAt: new Date(Date.now() - 34 * 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'comp-3',
        trackingCode: 'XEN-HAK-7201',
        businessName: 'Sarı Taksi (34 TAA 192)',
        businessCategory: 'Taksi / Ulaşım',
        location: 'Havalimanı - Sultanahmet Hattı',
        incidentDate: '2026-08-02',
        amountPaid: 1850,
        amountExpected: 950,
        currency: 'TRY',
        discrepancyAmount: 900,
        guestName: 'Dmitry Ivanov',
        guestEmail: 'dmitry.iv@mail.ru',
        guestPhone: '+7 916 555 33 22',
        hotelName: 'Hotel Sultanahmet',
        roomNumber: '301',
        description: 'Taksimetre açılmadı ve köprü geçişi bahanesiyle 1.850 TL tahsil edildi. Platformumuz taksi durağı ve oda resepsiyonuyla temasa geçti; durak yönetimi hatayı kabul etti ve 900 TL farkı misafirin hesabına iade etti.',
        status: 'resolved_refunded',
        businessEmail: 'taksiduragi@istanbul.com',
        businessResponse: 'Durak başkanı hatayı kabul etti, 900 TL nakit fark otel resepsiyonu aracılığıyla misafire ödendi.',
        daysPending: 2,
        isPublicAlert: false,
        createdAt: new Date(Date.now() - 13 * 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    try {
      safeSet(STORAGE_KEYS.COMPLAINTS, JSON.stringify(seed));
    } catch (e) {}
    return seed;
  },

  addComplaint(complaint: Omit<Complaint, 'id' | 'trackingCode' | 'daysPending' | 'isPublicAlert' | 'createdAt' | 'updatedAt'>): Complaint {
    const list = this.getComplaints();
    const trackingCode = 'XEN-HAK-' + Math.floor(1000 + Math.random() * 9000);
    const newComp: Complaint = {
      ...complaint,
      id: `comp-${Date.now()}`,
      trackingCode,
      daysPending: 0,
      isPublicAlert: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.unshift(newComp);
    try {
      safeSet(STORAGE_KEYS.COMPLAINTS, JSON.stringify(list));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('xenios_complaints_updated'));
    } catch (e) {}
    return newComp;
  },

  updateComplaintStatus(id: string, status: ComplaintStatus, responseNote?: string, isPublicAlert?: boolean) {
    const list = this.getComplaints();
    const item = list.find(c => c.id === id);
    if (item) {
      item.status = status;
      if (responseNote !== undefined) item.businessResponse = responseNote;
      if (isPublicAlert !== undefined) item.isPublicAlert = isPublicAlert;
      if (status === 'published_blacklisted') item.isPublicAlert = true;
      item.updatedAt = new Date().toISOString();
      try {
        safeSet(STORAGE_KEYS.COMPLAINTS, JSON.stringify(list));
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('xenios_complaints_updated'));
      } catch (e) {}
    }
  }
};
