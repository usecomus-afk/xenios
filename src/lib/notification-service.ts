import { Booking, InvestmentLead, Complaint, ServiceRequest, GuestProfile } from './types';
import { FirestoreService } from './firestore-service';

export const COMUS_HQ_EMAIL = 'hi@usecomus.com';

export interface DispatchPayload {
  type: 'booking_ticket' | 'restaurant_reservation' | 'investment_lead' | 'ai_concierge_query' | 'complaint_dispute' | 'room_service';
  recipient: string;
  title: string;
  hotelName: string;
  roomNumber: string;
  guestName: string;
  guestContact: string;
  details: Record<string, any>;
  timestamp: string;
}

export const NotificationService = {
  // 🎟️ Satın Alma & Deneyim Biletleri (Virtual POS)
  async notifyBookingCreated(booking: Booking): Promise<void> {
    const payload: DispatchPayload = {
      type: 'booking_ticket',
      recipient: COMUS_HQ_EMAIL,
      title: `Yeni Deneyim / Tur Satın Alımı: ${booking.experienceTitle}`,
      hotelName: booking.hotelName,
      roomNumber: booking.roomNumber,
      guestName: booking.guestName,
      guestContact: `${booking.guestPhone} | ${booking.guestEmail}`,
      details: {
        bookingId: booking.id,
        confirmationCode: booking.confirmationCode,
        experienceId: booking.experienceId,
        experienceTitle: booking.experienceTitle,
        providerName: booking.providerName,
        providerPhone: booking.providerPhone,
        guestCount: booking.guestCount,
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        amount: booking.amount,
        currency: booking.currency,
        status: booking.status,
        calendarLink: booking.calendarLink
      },
      timestamp: new Date().toISOString()
    };

    await this.dispatch(payload);
  },

  // 🍽️ Restoran Masa Rezervasyonları
  async notifyRestaurantReservation(booking: Booking, specialNotes?: string): Promise<void> {
    const payload: DispatchPayload = {
      type: 'restaurant_reservation',
      recipient: COMUS_HQ_EMAIL,
      title: `Yeni Restoran Masa Rezervasyonu: ${booking.experienceTitle}`,
      hotelName: booking.hotelName,
      roomNumber: booking.roomNumber,
      guestName: booking.guestName,
      guestContact: booking.guestPhone,
      details: {
        restaurantName: booking.experienceTitle,
        guestCount: booking.guestCount,
        date: booking.bookingDate,
        time: booking.bookingTime,
        specialNotes: specialNotes || 'Belirtilmedi',
        confirmationCode: booking.confirmationCode,
        hotel: booking.hotelName,
        room: booking.roomNumber
      },
      timestamp: new Date().toISOString()
    };

    await this.dispatch(payload);
  },

  // 🏢 Gayrimenkul Yatırım & VIP Keşif Randevuları
  async notifyInvestmentLead(lead: InvestmentLead, propertyDetails?: any): Promise<void> {
    const payload: DispatchPayload = {
      type: 'investment_lead',
      recipient: COMUS_HQ_EMAIL,
      title: `İstanbul Gayrimenkul VIP Keşif Turu & Yatırım Randevusu: ${lead.propertyTitle}`,
      hotelName: lead.hotelName,
      roomNumber: lead.roomNumber,
      guestName: lead.guestName,
      guestContact: lead.guestContact,
      details: {
        leadId: lead.id,
        propertyId: lead.propertyId,
        propertyTitle: lead.propertyTitle,
        note: lead.note,
        personaGuess: lead.personaGuess || 'Genel Yatırımcı',
        propertyPrice: propertyDetails?.priceUSD ? `$${propertyDetails.priceUSD.toLocaleString()}` : 'Belirtilmedi',
        agency: propertyDetails?.agency || 'Xenios Real Estate Partners'
      },
      timestamp: new Date().toISOString()
    };

    await this.dispatch(payload);
  },

  // 🤖 Comus AI Etkileşimi & Misafir İhtiyaç Özeti
  async notifyAiInteraction(params: {
    hotelName: string;
    roomNumber: string;
    guestMessage: string;
    aiReply: string;
    profile?: Partial<GuestProfile>;
    language?: string;
  }): Promise<void> {
    const payload: DispatchPayload = {
      type: 'ai_concierge_query',
      recipient: COMUS_HQ_EMAIL,
      title: `Comus AI Misafir İletişimi: ${params.hotelName} (Oda ${params.roomNumber})`,
      hotelName: params.hotelName,
      roomNumber: params.roomNumber,
      guestName: params.profile?.travelStyle ? `Misafir (${params.profile.travelStyle})` : 'Misafir',
      guestContact: 'Comus AI Oturumu',
      details: {
        guestMessage: params.guestMessage,
        aiReply: params.aiReply,
        interests: params.profile?.interests || [],
        budget: params.profile?.budgetLevel || 'Lüks',
        healthNotes: params.profile?.healthNotes || 'Yok',
        language: params.language || 'tr'
      },
      timestamp: new Date().toISOString()
    };

    await this.dispatch(payload);
  },

  // 📡 Merkezi Gönderim Motoru (API Dispatch & Firestore Log)
  async dispatch(payload: DispatchPayload): Promise<void> {
    try {
      // 1. Send to internal API endpoint
      if (typeof window !== 'undefined') {
        fetch('/api/dispatch-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.warn('Dispatch notification fetch error:', err));
      }

      // 2. Also save to live Firestore notification collection
      await FirestoreService.addNotificationLog({
        ...payload,
        status: 'delivered',
        deliveredTo: COMUS_HQ_EMAIL,
        createdAt: new Date().toISOString()
      });

      console.log(`[COMUS NOTIFICATION DISPATCHED] Type: ${payload.type} -> Recipient: ${COMUS_HQ_EMAIL}`);
    } catch (e) {
      console.warn('Dispatch notification error:', e);
    }
  }
};
