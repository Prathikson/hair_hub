/* ============================================================
   HARRY'S HAIR HUB — TYPE DEFINITIONS
   ============================================================ */

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;    // CAD
  category: ServiceCategory;
  popular?: boolean;
  icon?: string;
}

export type ServiceCategory =
  | 'haircut'
  | 'beard'
  | 'color'
  | 'treatment'
  | 'combo';

export interface Barber {
  id: string;
  name: string;
  title: string;
  bio: string;
  experience: number; // years
  specialties: string[];
  image: string;
  rating: number;
  reviewCount: number;
  available: boolean;
}

export interface TimeSlot {
  time: string;      // "09:00"
  available: boolean;
  bookingId?: string;
}

export interface BookingFormData {
  serviceId: string;
  barberId: string;
  date: Date;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  barberId: string;
  date: Date;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  status: BookingStatus;
  createdAt: Date;
  googleEventId?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface BookingStep {
  id: number;
  label: string;
  description: string;
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  text: string;
  service?: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CalendarEvent {
  summary: string;
  description: string;
  start: { dateTime: string; timeZone: string };
  end:   { dateTime: string; timeZone: string };
  attendees: { email: string; displayName?: string }[];
}

export interface AvailabilityResponse {
  date: string;
  slots: TimeSlot[];
}
