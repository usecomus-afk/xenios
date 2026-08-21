import { GuestProfile } from './types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  recommendations?: Array<{
    title: string;
    category: string;
    location: string;
    action?: string;
  }>;
}

export async function askGeminiConcierge(
  userQuery: string,
  guestProfile: GuestProfile,
  hotelName: string,
  hotelDistrict: string,
  lang: string = 'tr'
): Promise<ChatMessage> {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Call server-side Gemini API route
  try {
    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userQuery,
        profile: guestProfile,
        hotelName,
        hotelDistrict,
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
        recommendations: data.recommendations
      };
    }
  } catch (err) {
    console.error('Gemini API fetch error:', err);
  }

  // Fallback intelligent concierge responses
  const q = userQuery.toLowerCase();
  let reply = "";
  let recs: any[] = [];

  if (q.includes('kahvaltı') || q.includes('breakfast') || q.includes('yemek') || q.includes('restoran')) {
    reply = `${hotelName} (${hotelDistrict}) konumunuza çok yakın harika önerilerim var! Tarihi Yarımada'da otantik Türk kahvaltısı için Tarihi Sultanahmet Köftecisi veya Galata Köprüsü altındaki deniz ürünleri mekanlarını kesinlikle denemelisiniz. Özel gastronomi ve sokak lezzetleri turumuza da katılabilirsiniz!`;
    recs = [
      { title: "Karaköy & Kadıköy Sokak Lezzetleri Turu", category: "Gastronomi", location: "Karaköy / Kadıköy" },
      { title: "Boğaz Manzaralı Akşam Yemeği Cruise", category: "Boğaz & Tekne", location: "Kabataş İskelesi" }
    ];
  } else if (q.includes('hamam') || q.includes('spa') || q.includes('masaj')) {
    reply = `Günün yorgunluğunu atmak için Sultanahmet'teki tarihi Cağaloğlu Hamamı veya Kılıç Ali Paşa Hamamı eşsiz bir deneyimdir. Xenios üzerinden tek tıkla VIP hamam paketi ayırtabilirsiniz.`;
    recs = [
      { title: "Tarihi Cağaloğlu Hamamı Masaj & Kese Deneyimi", category: "Geleneksel & Kültür", location: "Sultanahmet" }
    ];
  } else if (q.includes('boğaz') || q.includes('tekne') || q.includes('bosphorus') || q.includes('boat')) {
    reply = `İstanbul Boğazı gün batımında büyüleyicidir! Akşam semazen ve folklor gösterili yemekli Boğaz turumuz veya özel saatlik yat kiralama seçeneklerimiz misafirlerimiz arasında en popüler olanlardır.`;
    recs = [
      { title: "Bosphorus Dinner Cruise & Shows (Mega Lüfer)", category: "Boğaz & Tekne", location: "Kabataş" },
  } else if (q.includes('yatırım') || q.includes('invest') || q.includes('gayrimenkul') || q.includes('property') || q.includes('vatandaşlık') || q.includes('citizenship')) {
    reply = `İstanbul gayrimenkul ve turizm yatırımları için dünya çapında büyük fırsatlar sunuyor. Beşiktaş, Boğaz hattı ve Tarihi Yarımada'daki seçkin rezidans ve yalı projelerimizi inceleyebilir veya Türkiye Vatandaşlığına uygun portföyler için yatırım danışmanlarımızla görüşebilirsiniz.`;
    recs = [
      { title: "Bosphorus View Prime Residence (Vatandaşlığa Uygun)", category: "Yatırım & Rezidans", location: "Beşiktaş" },
      { title: "Karaköy Loft & Art Boutique Suites", category: "Yatırım & Mülk", location: "Karaköy" }
    ];
  } else {
    reply = `Harika bir soru! ${hotelName} misafirimiz olarak İstanbul seyahatinizi unutulmaz kılmak için buradayım. ${guestProfile.travelStyle === 'family' ? 'Ailenizle keyif alacağınız ' : ''}müzeler, Boğaz turları, gizli tarihi sokaklar ve en lezzetli mekanlar için size özel rotalar hazırlayabilirim. Ne tür bir aktivite arzu edersiniz?`;
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: reply,
    time: now,
    recommendations: recs
  };
}
