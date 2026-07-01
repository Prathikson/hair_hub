"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Book Online" },
];

// Custom Instagram Icon SVG
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Custom Facebook Icon SVG
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none select-none translate-x-1/4 -translate-y-1/4">
        <h1 className="text-[30vw] font-black leading-none uppercase text-white">HHH</h1>
      </div>

      <div className="px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* TOP SECTION: GIGANTIC CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
          <div className="max-w-3xl">
            <span className="block text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-white/30">
              Get Started
            </span>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              Ready for a <br />
              <span className="font-serif italic lowercase font-normal tracking-normal text-[#58ae3a]">sharp</span> look?
            </h2>
          </div>
          
          <div className="flex-shrink-0 pb-4">
            <Link href="/booking" className="inline-flex items-center bg-white/5 border border-white/10 p-2 rounded-full transition-all duration-300 hover:bg-white/10 group">
              <span className="px-8 text-[13px] font-black uppercase tracking-[0.2em] text-white/40 hidden md:block">
                Secure your slot
              </span>
              <span className="bg-[#58ae3a] text-white py-5 px-10 rounded-full font-black text-base uppercase tracking-[0.05em] flex items-center gap-3 shadow-xl shadow-[#58ae3a]/20 transition-all duration-300 group-hover:bg-[#4d9a32] group-hover:scale-[1.05]">
                Book Appointment <ArrowRight size={20} strokeWidth={3} />
              </span>
            </Link>
          </div>
        </div>

        {/* MIDDLE SECTION: GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* BRAND */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                <span className="font-black text-xs tracking-tighter">HHH</span>
              </div>
              <span className="text-xl tracking-tighter uppercase font-black">
                Harry&apos;s <span className="font-serif italic lowercase font-normal tracking-normal">hub</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-medium">
              Premium barbering rooted in craft. Edmonton&apos;s destination for the discerning gentleman who values perfection.
            </p>
            <div className="flex gap-4">
              <SocialIcon href="#"><InstagramIcon /></SocialIcon>
              <SocialIcon href="#"><FacebookIcon /></SocialIcon>
            </div>
          </div>

          {/* NAVIGATE */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Navigate</h4>
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-lg font-bold uppercase tracking-tight text-white/60 hover:text-[#58ae3a] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Find Us</h4>
            <div className="space-y-6">
              <ContactInfo icon={<MapPin size={16} />} title="Address">
                124 Whyte Ave NW, Edmonton, AB
              </ContactInfo>
              <ContactInfo icon={<Phone size={16} />} title="Call Us">
                +1 (780) 555-0192
              </ContactInfo>
              <ContactInfo icon={<Mail size={16} />} title="Email">
                hello@harryshairhub.ca
              </ContactInfo>
            </div>
          </div>

          {/* HOURS */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Opening Hours</h4>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40 text-xs font-bold uppercase">Mon—Fri</span>
                <span className="text-sm font-bold">9:00 — 19:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40 text-xs font-bold uppercase">Saturday</span>
                <span className="text-sm font-bold">9:00 — 17:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40 text-xs font-bold uppercase">Sunday</span>
                <span className="text-sm font-bold text-[#58ae3a]">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} Harry&apos;s Hair Hub. Crafting Confidence.
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] font-black uppercase tracking-widest">
            <span>Edmonton · AB</span>
            <span>Est. 2010</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all duration-300">
      {children}
    </a>
  );
}

function ContactInfo({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-[#58ae3a]">{icon}</div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">{title}</p>
        <p className="text-sm font-bold leading-tight">{children}</p>
      </div>
    </div>
  );
}