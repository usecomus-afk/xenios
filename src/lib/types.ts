export type Language = 'tr' | 'en' | 'ar' | 'ru' | 'de' | 'fr';

export interface Room {
  id: string;
  number: string;
  type: string;
  floor: string;
  wifiSsid: string;
  wifiPass: string;
}

export interface Hotel {
  id: string;
  name: string;
  district: string;
  type: string;
  address: string;
  phone: string;
  website: string;
  ratingStr: string;
  targetReason: string;
  coords: { lat: number; lng: number };
  rooms: Room[];
  breakfastHours: string;
  checkoutTime: string;
  receptionExt: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  category: string;
  provider: string;
  title: string;
  location: string;
  phone: string;
  website: string;
  agentNote: string;
  scoreStr: string;
  price: number;
  currency: string;
  duration: string;
  rating: number;
  coords: { lat: number; lng: number };
  categoryTag: string;
  iconName: string;
  featured?: boolean;
  image?: string;
}

export type ServiceStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface ServiceRequest {
  id: string;
  hotelId: string;
  hotelName: string;
  roomNumber: string;
  serviceKey: string;
  serviceTitle: string;
  notes?: string;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'payment_success' | 'provider_pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  roomNumber: string;
  experienceId: string;
  experienceTitle: string;
  providerName: string;
  providerPhone: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  guestCount: number;
  bookingDate: string;
  bookingTime: string;
  amount: number;
  currency: string;
  status: BookingStatus;
  createdAt: string;
  calendarLink?: string;
  confirmationCode: string;
}

export interface GuestProfile {
  name?: string;
  travelStyle?: 'solo' | 'couple' | 'family' | 'business';
  interests?: string[];
  dietaryRestrictions?: string[];
  budgetLevel?: 'economy' | 'moderate' | 'luxury';
  notes?: string;
}

export interface TransitCalculation {
  distanceKm: number;
  taxi: {
    durationMin: number;
    costTl: number;
    desc: string;
  };
  vipTransfer: {
    durationMin: number;
    costEur: number;
    desc: string;
  };
  publicTransit: {
    durationMin: number;
    costTl: number;
    routeSteps: string[];
    lineName: string;
  };
}

export type ComplaintStatus = 
  | 'under_review' 
  | 'contacted_business' 
  | 'resolved_refunded' 
  | 'published_blacklisted';

export interface Complaint {
  id: string;
  trackingCode: string;
  businessName: string;
  businessCategory: 'Taksi / Ulaşım' | 'Restoran / Kafe' | 'Alışveriş / Halı & Deri' | 'Tur & Acente' | 'Gece Kulübü / Bar' | 'Döviz & Diğer';
  location: string;
  incidentDate: string;
  amountPaid: number;
  amountExpected: number;
  currency: string;
  discrepancyAmount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  hotelName: string;
  roomNumber: string;
  description: string;
  receiptPhotoUrl?: string;
  refundIbanOrCard?: string;
  status: ComplaintStatus;
  businessEmail?: string;
  businessResponse?: string;
  daysPending: number;
  isPublicAlert: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface XeniosUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'guest' | 'hotel' | 'pilot';
  hotelCode?: string;
  hotelName?: string;
  provider: 'google' | 'email';
  phone?: string;
  createdAt: string;
}
