import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, profile, hotelName, hotelDistrict, language } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return smart structured fallback when API key is not configured
      return NextResponse.json({
        reply: `Merhaba! ${hotelName} (${hotelDistrict}) misafirimiz olarak size yardımcı olmaktan mutluluk duyarım. "${message}" sorunuz için İstanbul'un en özel mekanlarını ve rotalarını sizin için seçebilirim. Boğaz turu, tarihi yarımada müzeleri veya nefis bir Türk kahvaltısı için öneri ister misiniz?`,
        recommendations: [
          { title: "Bosphorus Dinner Cruise & Shows", category: "Boğaz & Tekne", location: "Kabataş" },
          { title: "Tarihi Cağaloğlu Hamamı", category: "Geleneksel", location: "Sultanahmet" }
        ]
      });
    }

    // Call official Gemini API
    const systemPrompt = `Sen "comusAI" adında, İstanbul'daki seçkin oteller için çalışan lüks bir dijital concierge ve kişisel şehir rehberisin.
Misafirin konakladığı otel: ${hotelName}, Semt: ${hotelDistrict}.
Misafirin Seyahat Tarzı: ${profile?.travelStyle || 'Genel'}.
İlgi Alanları: ${(profile?.interests || []).join(', ')}.
Beslenme Tercihleri/Alerjiler: ${(profile?.dietaryRestrictions || []).join(', ')}.
Bütçe Tercihi: ${profile?.budgetLevel || 'Lüks'}.
Yanıt Dili: ${language || 'tr'}.

Kurallar:
1. Samimi, son derece nazik, kibar ve elit bir Türkçe (veya seçilen dilde) konuş.
2. Otelin konumunu (${hotelDistrict}) dikkate alarak gerçekçi mesafe ve ulaşım ipuçları ver.
3. Kısa, nokta atışı ve çok faydalı önerilerde bulun.
4. Çıktıyı Türkçe / seçilen dilde doğal bir sohbet metni olarak döndür.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nMisafirin Sorusu: ${message}` }] }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Size bu konuda yardımcı olmaktan mutluluk duyarım.";

    return NextResponse.json({
      reply: candidateText,
      recommendations: [
        { title: "Özel İstanbul Kültür & Tarih Turu", category: "Tarihi Rota", location: hotelDistrict }
      ]
    });
  } catch (error: any) {
    console.error('AI chat endpoint error:', error);
    return NextResponse.json({
      reply: "Şu anda asistan bağlantısı sağlanırken bir gecikme oluştu. Ancak resepsiyonumuz ve concierge ekibimiz 7/24 hizmetinizdedir.",
      recommendations: []
    });
  }
}
