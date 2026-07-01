import type { Metadata } from "next";
import { Suspense } from "react";
import BookingWizard from "@/components/booking/BookingWizard";
import { MapPin, Phone, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book your haircut, beard trim or grooming service online. Fast, easy, confirmed instantly.",
};

// Premium Tailwind Spinner
function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
      <div className="w-12 h-12 border-4 border-black/5 border-t-[#58ae3a] rounded-full animate-spin" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">Preparing the chair...</span>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen pt-20">
      
      {/* HERO HEADER */}
      <header className="relative pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="relative z-10">
          <span className="block text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-black/30">
            Reservations
          </span>
          <h1 className="leading-[0.85] tracking-[-0.04em] text-[12vw] md:text-[8vw] lg:text-[7vw] font-black uppercase mb-10">
            Reserve your <br /> 
            <span className="font-serif italic font-normal lowercase tracking-normal">chair.</span>
          </h1>
          <p className="text-lg md:text-xl text-black/50 font-medium leading-relaxed max-w-sm">
            Confirm your appointment in under 2 minutes. We'll handle the rest.
          </p>
        </div>

        {/* Background Decor */}
        <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <h1 className="text-[40vw] font-black leading-none uppercase">CHAIR</h1>
        </div>
      </header>

      {/* MAIN BOOKING SECTION */}
      <div className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* WIZARD CONTAINER (LEFT) */}
          <div className="lg:col-span-8 bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-black/5 border border-black/5">
            <Suspense fallback={<Spinner />}>
              <BookingWizard />
            </Suspense>
          </div>

          {/* SIDEBAR (RIGHT) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            
            {/* VISIT CARD */}
            <div className="bg-[#1a1a1a] text-white p-8 rounded-[40px] space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Visit the Studio</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-[#58ae3a] flex-shrink-0" size={18} />
                  <p className="text-sm font-bold leading-tight">124 Whyte Ave NW<br />Edmonton, AB T6G 1E1</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-[#58ae3a] flex-shrink-0" size={18} />
                  <p className="text-sm font-bold leading-tight">+1 (780) 555-0192</p>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-[#58ae3a] flex-shrink-0" size={18} />
                  <p className="text-sm font-bold leading-tight">
                    Mon–Fri: 9 AM – 7 PM<br />
                    Sat: 9 AM – 5 PM<br />
                    Sun: <span className="text-[#58ae3a]">Closed</span>
                  </p>
                </div>
              </div>
            </div>

            {/* POLICY CARD */}
            <div className="bg-[#58ae3a]/5 border border-[#58ae3a]/20 p-8 rounded-[40px]">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-[#58ae3a]" size={20} />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#58ae3a]">Policy</h4>
              </div>
              <p className="text-sm text-black/60 font-medium leading-relaxed">
                Please provide <span className="text-black font-bold">24 hours notice</span> to cancel or reschedule. This ensures our barbers' time remains fair for all clients.
              </p>
            </div>

            {/* WHAT TO EXPECT CARD */}
            <div className="bg-white border border-black/5 p-8 rounded-[40px]">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20 mb-6">What to expect</h4>
              <ul className="space-y-4">
                {["Arrive 5 min early", "Consultation included", "Premium Kevin Murphy products", "Pay in-shop on the day"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#58ae3a]" />
                    <span className="text-xs font-bold uppercase tracking-tight text-black/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* QUICK LINK */}
            <Link 
              href="/services" 
              className="group flex items-center justify-between bg-black text-white p-2 rounded-full transition-transform hover:scale-[1.02]"
            >
              <span className="pl-6 text-[10px] font-black uppercase tracking-widest text-white/50">Service Menu</span>
              <div className="w-10 h-10 rounded-full bg-[#58ae3a] flex items-center justify-center transition-colors group-hover:bg-[#4d9a32]">
                <ArrowRight size={18} strokeWidth={3} />
              </div>
            </Link>

          </aside>
        </div>
      </div>

      {/* FOOTER SPACING */}
      <div className="h-20 bg-white" />
    </div>
  );
}