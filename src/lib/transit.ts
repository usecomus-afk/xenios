import { TransitCalculation } from './types';

// Haversine formula to compute distance in KM
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.max(0.8, Number(d.toFixed(1)));
}

export function calculateTransitOptions(
  originCoords: { lat: number; lng: number },
  destinationCoords: { lat: number; lng: number },
  originDistrict: string,
  destLocation: string
): TransitCalculation {
  const distKm = calculateDistanceKm(
    originCoords.lat,
    originCoords.lng,
    destinationCoords.lat,
    destinationCoords.lng
  );

  // Taxi calculation (Istanbul Taxi tariff simulation: Opening 35 TL, ~25 TL/km, min fare ~135 TL)
  const taxiCost = Math.round(Math.max(150, 45 + distKm * 28));
  const taxiDuration = Math.round(Math.max(8, distKm * 3.8));

  // VIP Transfer calculation
  const vipCost = Math.round(Math.max(35, 25 + distKm * 2.5));
  const vipDuration = Math.round(Math.max(10, distKm * 3.2));

  // Public transit lines logic for Istanbul
  let lineName = "T1 Kabataş - Bağcılar Tramvayı";
  let steps = [
    `Otelden en yakın durağa 4 dk yürüyün.`,
    `T1 Tramvayına binin (${Math.ceil(distKm * 1.5)} durak).`,
    `İndikten sonra hedefinize 3 dk yürüyüş mesafesinde.`
  ];

  if (destLocation.toLowerCase().includes('kadıköy') || destLocation.toLowerCase().includes('üsküdar')) {
    lineName = "Şehir Hatları Tarihi Vapur";
    steps = [
      `Eminönü veya Karaköy İskelesi'ne gidin.`,
      `Boğaz manzaralı Tarihi Vapura binin (15 dk keyifli yolculuk).`,
      `İskeleden 5 dk yürüyerek mekana ulaşın.`
    ];
  } else if (destLocation.toLowerCase().includes('taksim') || destLocation.toLowerCase().includes('şişli')) {
    lineName = "M2 Yenikapı - Hacıosman Metrosu / F1 Füniküler";
    steps = [
      `En yakın M2 metro veya T1 Tramvay durağına geçin.`,
      `M2 Metrosu ile direkt Taksim istasyonunda inin.`,
      `Çıkıştan 4 dk yürüyüş mesafesi.`
    ];
  }

  const transitDuration = Math.round(Math.max(12, distKm * 4.5 + 8));
  const transitCost = 30; // ~30 TL Istanbulkart standard fare

  return {
    distanceKm: distKm,
    taxi: {
      durationMin: taxiDuration,
      costTl: taxiCost,
      desc: `Trafik durumuna göre yaklaşık ${taxiDuration} dk. Sarı taksi doğrudan otel kapısına çağrılabilir.`
    },
    vipTransfer: {
      durationMin: vipDuration,
      costEur: vipCost,
      desc: `Mercedes Vito / VIP araç ile özel şoförlü, klimalı ve konforlu kapıdan kapıya transfer.`
    },
    publicTransit: {
      durationMin: transitDuration,
      costTl: transitCost,
      lineName: lineName,
      routeSteps: steps
    }
  };
}
