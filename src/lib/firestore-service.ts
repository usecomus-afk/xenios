import { db, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit,
  Unsubscribe 
} from 'firebase/firestore';
import { Hotel, Experience, PropertyListing, Booking, Complaint, ServiceRequest } from './types';
import { XeniosStore } from './store';

// Collection Names
export const COLLECTIONS = {
  HOTELS: 'hotels',
  EXPERIENCES: 'experiences',
  PROPERTIES: 'properties',
  BOOKINGS: 'bookings',
  COMPLAINTS: 'complaints',
  REQUESTS: 'service_requests'
};

export const FirestoreService = {
  // 🛎️ LIVE ROOM REQUESTS WITH REALTIME FIRESTORE LISTENER
  subscribeToLiveRequests(
    hotelId: string | null,
    onUpdate: (requests: ServiceRequest[]) => void
  ): Unsubscribe {
    if (!db || !isFirebaseConfigured) {
      // Fallback: poll local store and return unbind
      const handler = () => onUpdate(XeniosStore.getRequests());
      window.addEventListener('xenios_requests_updated', handler);
      onUpdate(XeniosStore.getRequests());
      return () => window.removeEventListener('xenios_requests_updated', handler);
    }

    try {
      const colRef = collection(db, COLLECTIONS.REQUESTS);
      const q = hotelId
        ? query(colRef, where('hotelId', '==', hotelId), orderBy('createdAt', 'desc'))
        : query(colRef, orderBy('createdAt', 'desc'));

      return onSnapshot(q, (snapshot) => {
        const list: ServiceRequest[] = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...(d.data() as any) });
        });
        onUpdate(list);
      }, (err) => {
        console.error("Firestore onSnapshot error:", err);
        onUpdate(XeniosStore.getRequests());
      });
    } catch (e) {
      console.error("Firestore subscription failed, using local store:", e);
      onUpdate(XeniosStore.getRequests());
      return () => {};
    }
  },

  async addRequest(req: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<ServiceRequest> {
    const local = XeniosStore.addRequest(req);
    if (!db || !isFirebaseConfigured) return local;

    try {
      const colRef = collection(db, COLLECTIONS.REQUESTS);
      await setDoc(doc(colRef, local.id), {
        ...local,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Firestore save error:", e);
    }
    return local;
  },

  async updateRequestStatus(id: string, status: ServiceRequest['status']): Promise<void> {
    XeniosStore.updateRequestStatus(id, status);
    if (!db || !isFirebaseConfigured) return;

    try {
      const docRef = doc(db, COLLECTIONS.REQUESTS, id);
      await updateDoc(docRef, { status, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn("Firestore update error:", e);
    }
  },

  // 💳 BOOKINGS
  async addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'confirmationCode'>): Promise<Booking> {
    const local = XeniosStore.addBooking(booking);
    if (!db || !isFirebaseConfigured) return local;

    try {
      const colRef = collection(db, COLLECTIONS.BOOKINGS);
      await setDoc(doc(colRef, local.id), local);
    } catch (e) {
      console.warn("Firestore add booking error:", e);
    }
    return local;
  },

  // ⚖️ COMPLAINTS / DISPUTE DESK
  async addComplaint(complaint: any): Promise<Complaint> {
    const local = XeniosStore.addComplaint(complaint);
    if (!db || !isFirebaseConfigured) return local;

    try {
      const colRef = collection(db, COLLECTIONS.COMPLAINTS);
      await setDoc(doc(colRef, local.id), local);
    } catch (e) {
      console.warn("Firestore add complaint error:", e);
    }
    return local;
  },

  async updateComplaintStatus(id: string, status: Complaint['status'], responseNote?: string, isPublicAlert?: boolean) {
    XeniosStore.updateComplaintStatus(id, status, responseNote, isPublicAlert);
    if (!db || !isFirebaseConfigured) return;

    try {
      const docRef = doc(db, COLLECTIONS.COMPLAINTS, id);
      await updateDoc(docRef, {
        status,
        ...(responseNote !== undefined ? { businessResponse: responseNote } : {}),
        ...(isPublicAlert !== undefined ? { isPublicAlert } : {}),
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Firestore update complaint error:", e);
    }
  },

  // 🚀 SYNC ALL SEED DATA TO FIRESTORE (One-Click Migration)
  async syncAllLocalDataToFirestore(): Promise<{ success: boolean; message: string }> {
    if (!db || !isFirebaseConfigured) {
      return {
        success: false,
        message: "Firebase henüz yapılandırılmamış. Lütfen .env.local dosyasına Firebase proje anahtarlarınızı ekleyiniz."
      };
    }

    try {
      const hotels = XeniosStore.getHotels();
      const experiences = XeniosStore.getExperiences();
      const properties = XeniosStore.getPropertyListings();

      // Upload Hotels
      for (const h of hotels) {
        await setDoc(doc(db, COLLECTIONS.HOTELS, h.id), h);
      }

      // Upload Experiences
      for (const exp of experiences) {
        await setDoc(doc(db, COLLECTIONS.EXPERIENCES, exp.id), exp);
      }

      // Upload Properties
      for (const prop of properties) {
        await setDoc(doc(db, COLLECTIONS.PROPERTIES, prop.id), prop);
      }

      return {
        success: true,
        message: `Başarıyla aktarıldı: ${hotels.length} Otel, ${experiences.length} Deneyim/Restoran, ${properties.length} Yatırım Portföyü Cloud Firestore'a yazıldı.`
      };
    } catch (e: any) {
      return {
        success: false,
        message: "Firestore aktarım hatası: " + (e?.message || String(e))
      };
    }
  }
};
