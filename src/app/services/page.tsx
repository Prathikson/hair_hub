import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES, BARBERS } from "@/data/services";
import ServicesGrid from "./ServicesGrid";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Premium haircuts, beard trims, hot towel shaves, color and treatments. View our full service menu and pricing.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#f8f8f8] min-h-screen font-sans">
      
      {/* HERO HEADER */}
      <header className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="relative z-10">
          <span className="block text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-black/30">
            Services & Pricing
          </span>
          
          {/* Gigantic Title - using Tailwind arbitrary values for exact styling */}
          <h1 className="leading-[0.85] tracking-[-0.04em] text-[12vw] md:text-[8vw] lg:text-[7vw] font-black uppercase mb-10">
            The full <br /> 
            <span className="font-serif italic font-normal lowercase tracking-normal">menu.</span>
          </h1>
          
          <div className="max-w-md">
            <p className="text-lg md:text-xl text-black/50 font-medium leading-relaxed">
              Every service is delivered with precision and care. No upsells, no surprises — just exceptional results and transparent pricing.
            </p>
          </div>
        </div>

      </header>

      {/* SERVICES GRID (Client Component called within this Server Component) */}
      <ServicesGrid services={SERVICES} />

      {/* TEAM / BARBERS STRIP */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white border-t border-black/5">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
              Meet the team <br />
              <span className="font-serif italic font-normal lowercase tracking-normal text-[#58ae3a]">
                behind the craft
              </span>
            </h2>
            <p className="text-black/40 font-bold uppercase tracking-widest text-xs">
              {BARBERS.length} talented artists ready to serve you
            </p>
          </div>

          <div className="flex-shrink-0">
            {/* The Capsule CTA converted to Tailwind */}
            <Link href="/booking" className="inline-flex items-center bg-black/5 border border-black/10 p-2 rounded-full transition-all duration-300 hover:bg-black/[0.07] group">
              <span className="px-8 text-[13px] font-black uppercase tracking-[0.2em] opacity-40 hidden md:block">
                Ready for a change?
              </span>
              
              {/* The Gigantic Green Button converted to Tailwind */}
              <span className="bg-[#58ae3a] text-white py-[18px] px-[48px] rounded-full font-black text-base uppercase tracking-[0.05em] flex items-center gap-3 shadow-lg shadow-[#58ae3a]/20 transition-all duration-300 group-hover:bg-[#4d9a32] group-hover:scale-[1.02]">
                Book Appointment <ArrowRight size={20} strokeWidth={3} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER SPACING */}
      <div className="h-20 bg-white" />
    </div>
  );
}