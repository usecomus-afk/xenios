import { UserPreferences, BookedItineraryItem } from '@/types/comusAi';

export interface ItineraryRoutePlan {
  event_title: string;
  location: string;
  appointment_time: string;
  hotel_origin: string;
  traffic_level: 'LOW' | 'MODERATE' | 'HEAVY' | 'SEVERE';
  recommended_transport: {
    mode: 'VIP_TRANSFER' | 'METRO_MARMARAY' | 'FERRY' | 'TAXI' | 'WALKING';
    estimated_minutes: number;
    description: string;
  };
}

export interface DayItinerary {
  date: string;
  day_name: string;
  items: Array<{
    booking_id: string;
    title: string;
    category: string;
    location_name: string;
    district: string;
    start_time: string;
    end_time: string;
    route_plan: ItineraryRoutePlan;
  }>;
}

/**
 * Calculates a traffic-aware route and recommended transport method for a given appointment.
 */
export function calculateTrafficAwareRoute(
  hotelCoordinates: { lat: number; lng: number } = { lat: 41.0082, lng: 28.9784 },
  destinationCoordinates: { lat: number; lng: number } = { lat: 41.0485, lng: 28.9942 },
  appointmentTime: string = '11:00',
  destinationTitle: string = 'Quartz Clinique - Hydrafacial Seansı',
  locationName: string = 'Nişantaşı, Şişli',
  hotelName: string = 'Sultanahmet Hotel (Oda 304)'
): ItineraryRoutePlan {
  const parts = appointmentTime.split(':');
  const hour = parseInt(parts[0], 10) || 12;
  const isPeakHour = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20);

  // Calculate rough distance
  const dLat = Math.abs(hotelCoordinates.lat - destinationCoordinates.lat);
  const dLng = Math.abs(hotelCoordinates.lng - destinationCoordinates.lng);
  const isClose = dLat < 0.008 && dLng < 0.008; // Under ~800m

  if (isClose) {
    return {
      event_title: destinationTitle,
      location: locationName,
      appointment_time: appointmentTime,
      hotel_origin: hotelName,
      traffic_level: 'LOW',
      recommended_transport: {
        mode: 'WALKING',
        estimated_minutes: 6,
        description: `Otelinize sadece 400-600m mesafede. Tarihi sokaklarda 5-7 dakikalık keyifli bir yürüyüşle ulaşabilirsiniz.`,
      },
    };
  }

  // Peak Istanbul traffic hours (M2 / Marmaray recommendation)
  if (isPeakHour) {
    return {
      event_title: destinationTitle,
      location: locationName,
      appointment_time: appointmentTime,
      hotel_origin: hotelName,
      traffic_level: 'HEAVY',
      recommended_transport: {
        mode: 'METRO_MARMARAY',
        estimated_minutes: 22,
        description: `Trafik yoğunluğu yüksek (%82). Taksi yerine T1 Tramvay + M2 Yenikapı-Hacıosman metrosunu kullanmanızı öneririz. Süre: ~22 dk.`,
      },
    };
  }

  // Normal off-peak hours
  return {
    event_title: destinationTitle,
    location: locationName,
    appointment_time: appointmentTime,
    hotel_origin: hotelName,
    traffic_level: 'LOW',
    recommended_transport: {
      mode: 'VIP_TRANSFER',
      estimated_minutes: 18,
      description: `Trafik akıcı. Otelinizden özel VIP transfer veya taksi ile yaklaşık 18 dakikada mekana ulaşabilirsiniz.`,
    },
  };
}

/**
 * Generates full weekly dynamic itinerary grouped by days with route advice.
 */
export function generateGuestWeeklyItinerary(preferences: Partial<UserPreferences>): DayItinerary[] {
  const bookings = preferences.booked_itinerary || [];
  const hotelOrigin = `${preferences.hotel_info?.hotel_name || 'Otel'} (${preferences.hotel_info?.room_number || '304'})`;
  const hotelCoords = preferences.hotel_info?.location || { lat: 41.0082, lng: 28.9784 };

  const dayMap: Record<string, DayItinerary> = {};

  for (const b of bookings) {
    const d = b.date || new Date().toISOString().split('T')[0];
    if (!dayMap[d]) {
      const dateObj = new Date(d);
      const dayName = dateObj.toLocaleDateString('tr-TR', { weekday: 'long' });
      dayMap[d] = {
        date: d,
        day_name: dayName,
        items: []
      };
    }

    const routePlan = calculateTrafficAwareRoute(
      hotelCoords,
      b.location_coordinates,
      b.start_time,
      b.title,
      `${b.location_name}, ${b.district}`,
      hotelOrigin
    );

    dayMap[d].items.push({
      booking_id: b.booking_id,
      title: b.title,
      category: b.category,
      location_name: b.location_name,
      district: b.district,
      start_time: b.start_time,
      end_time: b.end_time,
      route_plan: routePlan
    });
  }

  return Object.values(dayMap).sort((a, b) => a.date.localeCompare(b.date));
}
