import { GuestProfile } from './types';
import { UserPreferences, AiActionItem } from '@/types/comusAi';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  actions?: AiActionItem[];
  recommendations?: Array<{
    title: string;
    category: string;
    location: string;
    action?: string;
  }>;
  negative_locked_categories?: string[];
}

export async function askGeminiConcierge(
  userQuery: string,
  guestProfile: GuestProfile,
  hotelName: string,
  hotelDistrict: string,
  lang: string = 'tr',
  roomNumber: string = '304',
  userPreferences?: Partial<UserPreferences>
): Promise<ChatMessage> {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Call server-side Gemini 2.5 Flash / Comus AI API route
  try {
    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userQuery,
        user_preferences: userPreferences,
        hotelName,
        hotelDistrict,
        roomNumber,
        language: lang
      })
    });

    if (res.ok) {
      const data = await res.json();
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        time: now,
        actions: data.actions,
        recommendations: data.recommendations,
        negative_locked_categories: data.negative_locked_categories
      };
    }
  } catch (err) {
    console.error('Gemini API fetch error:', err);
  }

  // Fallback intelligent concierge responses
  const q = userQuery.toLowerCase();
  let reply = "";
  let recs: any[] = [];
  let actions: AiActionItem[] = [];

  const guestName = userPreferences?.first_name || 'Alex';

  if (q.includes('akşam') || q.includes('yoruldum') || q.includes('rahatlatıcı')) {
    reply = `İyi akşamlar ${guestName} Bey! Otelinizde (${hotelName}, Oda ${roomNumber}) umarım keyifli bir gün geçirmişsinizdir.\n\nProfilinizdeki 'Aesthetic & Wellness' tercihlerinize ve az önce incelediğiniz Cağaloğlu Hamamı ile Quartz Clinique ilanlarına istinaden size iki harika önerim var:\n\n1. 🧖‍♂️ Tarihi Cağaloğlu Hamamı - Otelinize 5 dk yürüme mesafesinde geleneksel Kese & Köpük masajı.\n2. 🪞 Nişantaşı Quartz Clinique - Cildinizi neme doyuracak 45 dakikalık Ekspres Hydrafacial Bakımı.\n\nİsterseniz sizin adınıza yarın saat 11:00 veya 15:30 için anında randevu oluşturabilirim. Hangisini tercih edersiniz?`;
    actions = [
      {
        id: 'act_hamam',
        type: 'BOOK_APPOINTMENT',
        label: '🧖‍♂️ Cağaloğlu Hamamı (Yarın 15:30)',
        payload: {
          listing_id: 'exp-1',
          service_title: 'Tarihi Cağaloğlu Hamamı & Masaj',
          preferred_date: '2026-08-24',
          preferred_time: '15:30',
          booking_type: 'EXPERIENCE_TICKET'
        }
      },
      {
        id: 'act_quartz',
        type: 'BOOK_APPOINTMENT',
        label: '🪞 Quartz Clinique Hydrafacial (Yarın 11:00)',
        payload: {
          listing_id: 'exp-aesthetic-1',
          service_title: 'Nişantaşı Glow & Hydrafacial',
          preferred_date: '2026-08-24',
          preferred_time: '11:00',
          booking_type: 'AESTHETIC_APPOINTMENT'
        }
      }
    ];
  } else {
    reply = `Merhaba ${guestName} Bey! ${hotelName} (${hotelDistrict}) misafirimiz olarak size yardımcı olmaktan mutluluk duyarım. İstanbul'da seçkin restoranlar, Boğaz turları, Nişantaşı medikal estetik klinikleri ve size özel rotalar için dilediğinizi sorabilirsiniz. İsterseniz sizin adınıza hemen rezervasyon veya randevu oluşturabilirim.`;
    recs = [
      { title: "Bosphorus Dinner Cruise & Shows", category: "Boğaz & Tekne", location: "Kabataş" },
      { title: "Quartz Clinique – Nişantaşı Glow", category: "Medikal Estetik", location: "Nişantaşı" }
    ];
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: reply,
    time: now,
    actions,
    recommendations: recs
  };
}
