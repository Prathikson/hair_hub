# Harry's Hair Hub 💈

**Edmonton's Premier Barbershop — Full-Stack Booking Website**

A complete, production-ready Next.js 16 website with custom booking system, Google Calendar integration, WebGL animations, and a luxury French Vanilla × Noir Marble design.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + Custom CSS |
| Animations | GSAP 3 + ScrollTrigger |
| 3D / WebGL | Three.js + @react-three/fiber |
| Icons | Lucide React |
| Calendar | Google Calendar API v3 |
| Fonts | Cormorant Garamond + DM Sans |

---

## 🎨 Design System

**Color Palette — French Vanilla × Noir Marble**
- Vanilla 50: `#FDFAF3` / Vanilla 100: `#F9F3E0`
- Gold: `#C9A84C` / Gold Light: `#DFC06A` / Gold Dark: `#B8922E`
- Noir 900: `#0A0A0B` / Noir 800: `#111114` / Noir 700: `#1A1A1F`

**Visual Language:** Neumorphism (soft shadows, extruded surfaces) + Liquid Glass (backdrop blur, translucent panels) combined.

**Typography:** Cormorant Garamond (display) + DM Sans (body) — fluid scaling with `clamp()`.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```

Fill in your Google Calendar credentials (see below).

### 3. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📅 Google Calendar Setup

The booking system optionally syncs appointments to Google Calendar.

### Steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → **Enable "Google Calendar API"**
3. Create **OAuth 2.0 credentials** (type: Desktop App)
4. Download the credentials JSON
5. Run the token helper:

```bash
GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=yyy node scripts/get-google-token.js
```

6. Paste the printed `GOOGLE_REFRESH_TOKEN` into `.env.local`

> **Note:** Google Calendar sync is non-fatal — bookings work fine without it. The calendar feature simply adds events to your calendar when enabled.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── booking/          # POST (create) + GET (list) bookings
│   │   │   └── [id]/         # GET + DELETE individual booking
│   │   └── calendar/
│   │       └── availability/ # GET available time slots
│   ├── booking/              # Booking page
│   ├── gallery/              # Gallery page
│   ├── services/             # Services & pricing page
│   ├── layout.tsx            # Root layout (fonts, nav, footer)
│   ├── page.tsx              # Home page
│   ├── not-found.tsx         # 404 page
│   └── error.tsx             # Error boundary
├── components/
│   ├── animations/           # Reusable animation wrappers
│   ├── booking/              # Booking wizard (5 steps)
│   │   ├── BookingWizard.tsx
│   │   ├── StepServiceSelect.tsx
│   │   ├── StepBarberSelect.tsx
│   │   ├── StepDateTime.tsx
│   │   ├── StepClientDetails.tsx
│   │   ├── StepConfirm.tsx
│   │   └── BookingSuccess.tsx
│   ├── sections/             # Homepage sections
│   │   ├── HeroSection.tsx   (WebGL canvas + GSAP)
│   │   ├── ServicesSection.tsx
│   │   ├── BarbersSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── WhyUsSection.tsx
│   │   └── CTASection.tsx
│   ├── three/
│   │   └── HeroCanvas.tsx    # WebGL: marble shader + gold orbs + ring
│   └── ui/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── data/
│   └── services.ts           # Services, barbers, testimonials data
├── hooks/
│   ├── useBooking.ts         # Booking state machine
│   ├── useAvailability.ts    # Time slot fetching
│   └── useGsap.ts            # Reusable GSAP animation hooks
├── lib/
│   ├── utils.ts              # Utilities: cn(), formatPrice(), etc.
│   ├── bookings.ts           # In-memory booking store
│   └── google-calendar.ts    # Google Calendar API client
└── types/
    └── index.ts              # All TypeScript types
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/booking` | Create a new booking |
| `GET`  | `/api/booking` | List all bookings |
| `GET`  | `/api/booking/[id]` | Get booking by ID |
| `DELETE` | `/api/booking/[id]` | Cancel a booking |
| `GET`  | `/api/calendar/availability?date=YYYY-MM-DD&barberId=xxx` | Get available slots |

---

## 🏗 Production Deployment

For production, replace the in-memory booking store in `src/lib/bookings.ts` with a real database (Supabase, PlanetScale, etc.).

```bash
npm run build
npm start
```

---

## ✨ Features

- **5-step booking wizard** with form validation
- **Live availability** checking per barber per date
- **Google Calendar** sync (creates events with client details)
- **WebGL background** — GPU-rendered marble shader + floating gold orbs
- **GSAP animations** — scroll-triggered, spring-physics reveals
- **Neumorphism + Liquid Glass** — combined design language throughout
- **Fully responsive** — mobile-first, tested down to 320px
- **TypeScript** — strict mode, zero `any` types
- **SEO-ready** — metadata, OpenGraph, canonical URLs

---

*Built with ❤️ for Harry's Hair Hub, Edmonton AB.*
