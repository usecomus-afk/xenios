import { NextResponse } from 'next/server';
import {
  getInstantKnowledgeAnswer,
  buildCacheKey,
  getCachedResponse,
  setCachedResponse
} from '@/lib/ai-cache-engine';

export async function POST(req: Request) {
  try {
    const { message, profile, hotelName = 'Otel', hotelDistrict = 'İstanbul', language = 'tr' } = await req.json();

    // 1. TIER 1: 0-Token Instant Local Knowledge Engine (WiFi, Breakfast, Checkout, Transit, Ombudsman)
    const instantAnswer = getInstantKnowledgeAnswer(message, hotelName, hotelDistrict, language);
    if (instantAnswer) {
      return NextResponse.json({
        reply: instantAnswer.reply,
        recommendations: instantAnswer.recommendations,
        source: 'instant_knowledge',
        tokensSaved: true
      });
    }

    // 2. TIER 2: Intelligent In-Memory / Semantic Cache for identical / repeated questions
    const hasConsent = !!profile?.kvkkConsent;
    const profileSummary = hasConsent
      ? `${profile?.travelStyle || ''}_${(profile?.interests || []).join(',')}_${(profile?.allergies || []).join(',')}`
      : 'none';

    const cacheKey = buildCacheKey(message, hotelName, hotelDistrict, language, profileSummary);
    const cached = getCachedResponse(cacheKey);
    if (cached) {
      return NextResponse.json({
        reply: cached.reply,
        recommendations: cached.recommendations,
        source: 'cache_hit',
        tokensSaved: true
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: `Merhaba! ${hotelName} (${hotelDistrict}) misafirimiz olarak size yardımcı olmaktan mutluluk duyarım. "${message}" sorunuz için İstanbul'un en özel mekanlarını ve rotalarını sizin için seçebilirim. Boğaz turu, tarihi yarımada müzeleri veya nefis bir Türk kahvaltısı için öneri ister misiniz?`,
        recommendations: [
          { title: "Bosphorus Dinner Cruise & Shows", category: "Boğaz & Tekne", location: "Kabataş" },
          { title: "Tarihi Cağaloğlu Hamamı", category: "Geleneksel", location: "Sultanahmet" }
        ],
        source: 'local_fallback'
      });
    }

    // Kişisel/sağlık verisi (KVKK kapsamında özel nitelikli veri) yalnızca misafir açık rıza verdiyse modele iletilir
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
      : `Misafir henüz kişisel rehberlik anketini doldurmadı; bu nedenle genel, herkese uygun İstanbul önerileri sun.`;

    // Compact token-optimized system prompt
    const systemPrompt = `Sen "comus" adında, İstanbul'daki seçkin oteller için çalışan lüks bir dijital concierge ve kişisel şehir rehberisin. Gün batımı tekne turları, Tarihi Yarımada'nın gizli lezzetleri, İstanbul’da gayrimenkul yatırımı ve misafire özel rotalar konusunda uzmansın.
Misafirin konakladığı otel: ${hotelName}, Semt: ${hotelDistrict}.
${personalizationBlock}
Yanıt Dili: ${language || 'tr'}.

Kurallar:
1. Samimi, son derece nazik, kibar ve elit bir Türkçe (veya seçilen dilde) konuş.
2. Otelin konumunu (${hotelDistrict}) dikkate alarak gerçekçi mesafe ve ulaşım ipuçları ver.
3. Kısa, nokta atışı ve çok faydalı önerilerde bulun (maksimum 3-4 cümle).
4. Sağlık/alerji notları varsa bunlara uygun mekanlar öner.`;

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
            ],
            generationConfig: {
              maxOutputTokens: 400,
              temperature: 0.6
            }
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

    const defaultRecommendations = [
      { title: "Özel İstanbul Kültür & Tarih Turu", category: "Tarihi Rota", location: hotelDistrict }
    ];

    // 3. TIER 3: Save to Cache to prevent duplicate tokens on repeat questions
    setCachedResponse(cacheKey, candidateText, defaultRecommendations);

    return NextResponse.json({
      reply: candidateText,
      recommendations: defaultRecommendations,
      source: 'gemini_live'
    });
  } catch (error: any) {
    console.error('AI chat endpoint error:', error);
    return NextResponse.json({
      reply: "Şu anda asistan bağlantısı sağlanırken bir gecikme oluştu. Ancak resepsiyonumuz ve concierge ekibimiz 7/24 hizmetinizdedir.",
      recommendations: [],
      source: 'error_fallback'
    });
  }
}
