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

    // Kişisel/sağlık verisi (KVKK kapsamında özel nitelikli veri) yalnızca misafir açık rıza
    // verdiyse (kvkkConsent === true) modele iletilir; onay yoksa yalnızca genel tercihler kullanılır.
    const hasConsent = !!profile?.kvkkConsent;

    const personalizationBlock = hasConsent
      ? `Misafirin Seyahat Tarzı: ${profile?.travelStyle || 'Genel'}.
İlgi Alanları: ${(profile?.interests || []).join(', ') || 'Belirtilmedi'}.
Bütçe Tercihi: ${profile?.budgetLevel || 'Lüks'}.
Gezi Temposu: ${profile?.tourPace || 'Belirtilmedi'}.
Sağlık Notları: ${profile?.healthNotes || 'Belirtilmedi'}.
Alerjiler: ${(profile?.allergies || []).join(', ') || 'Belirtilmedi'}.
Beslenme Tercihleri: ${(profile?.dietaryRestrictions || []).join(', ') || 'Belirtilmedi'}.
Gastronomi Tercihleri: ${(profile?.gastronomyPreferences || []).join(', ') || 'Belirtilmedi'}.
Alışveriş İlgi Alanları: ${(profile?.shoppingInterests || []).join(', ') || 'Belirtilmedi'}.
Şehir Gezisi Tercihleri: ${(profile?.cityTourInterests || []).join(', ') || 'Belirtilmedi'}.
İş Seyahati İhtiyaçları: ${(profile?.businessNeeds || []).join(', ') || 'Belirtilmedi'}.
Ek Notlar: ${profile?.notes || 'Yok'}.`
      : `Misafir henüz kişisel rehberlik anketini doldurmadı ve KVKK onayı vermedi; bu nedenle sağlık, alerji veya kişisel
tercih verisi paylaşılmadı. Yalnızca genel, herkese uygun İstanbul önerileri sun ve dilerse "Beni Tanı" anketini
doldurarak daha kişisel öneriler alabileceğini nazikçe hatırlat.`;

    // Call official Gemini API
    const systemPrompt = `Sen "comusAI" adında, İstanbul'daki seçkin oteller için çalışan lüks bir dijital concierge ve kişisel şehir rehberisin.
Misafirin konakladığı otel: ${hotelName}, Semt: ${hotelDistrict}.
${personalizationBlock}
Yanıt Dili: ${language || 'tr'}.

Kurallar:
1. Samimi, son derece nazik, kibar ve elit bir Türkçe (veya seçilen dilde) konuş.
2. Otelin konumunu (${hotelDistrict}) dikkate alarak gerçekçi mesafe ve ulaşım ipuçları ver.
3. Kısa, nokta atışı ve çok faydalı önerilerde bulun.
4. Sağlık notları veya alerjiler paylaşılmışsa (ör. deniz ürünü alerjisi, hareket kısıtlılığı), önerilerinde bunlara
   uygun rota ve mekanlar seç; asla göz ardı etme.
5. Çıktıyı Türkçe / seçilen dilde doğal bir sohbet metni olarak döndür.`;

    const modelList = ['gemini-flash-latest', 'gemini-2.5-flash-lite', 'gemini-3.5-flash'];
    let candidateText = '';

    for (const model of modelList) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${systemPrompt}\n\nMisafirin Sorusu: ${message}` }] }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (candidateText) break;
        }
      } catch (e) {
        console.warn(`Model ${model} attempt failed:`, e);
      }
    }

    if (!candidateText) {
      candidateText = `Merhaba! ${hotelName} (${hotelDistrict}) misafirimiz olarak size yardımcı olmaktan mutluluk duyarım. "${message}" talebiniz için İstanbul'un seçkin noktalarını, gurme mekanlarını ve Boğaz rotalarını concierge masamızla koordineli olarak sizin için organize edebiliriz.`;
    }

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
