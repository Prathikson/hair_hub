"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ArrowRight, Menu, X, MapPin } from "lucide-react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Our Work" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const isHomePage = pathname === "/";
  // The header itself becomes solid white when scrolled, menu open, or not on home.
  const isSolid = isOpen || scrolled || !isHomePage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    gsap.fromTo(
      ".nav-container",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.2 }
    );
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isSolid
          ? "bg-white py-4 shadow-sm border-b border-black/5"
          : "bg-transparent py-8"
      }`}
    >
      <div className="nav-container px-6 md:px-12 lg:px-20 flex items-center justify-between relative z-[150]">
        
        {/* LOGO */}
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 no-underline group pointer-events-auto"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isSolid ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <span className="font-black text-xs tracking-tighter">HHH</span>
          </div>
          <span className={`text-xl tracking-tighter uppercase font-black transition-colors duration-500 ${isSolid ? 'text-black' : 'text-white'}`}>
            Harry&apos;s <span className="font-serif italic lowercase font-normal tracking-normal">hub</span>
          </span>
        </Link>

        {/* DESKTOP NAV - Enhanced for "Gigantic" look */}
        <nav className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] font-black uppercase tracking-[0.4em] transition-all duration-300 hover:text-[#58ae3a] ${
                isSolid ? "text-black" : "text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          
          <Link href="/booking" className={`group flex items-center border p-1 rounded-full transition-all duration-300 ${
            isSolid ? 'bg-black/5 border-black/10' : 'bg-white/10 border-white/20'
          }`}>
            <span className={`px-6 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isSolid ? 'text-black/40' : 'text-white/60'}`}>
              Book
            </span>
            <span className="bg-[#58ae3a] text-white py-3 px-8 rounded-full font-black text-[12px] uppercase tracking-widest flex items-center gap-2 transition-all duration-300 group-hover:bg-[#4d9a32] group-hover:scale-105">
              Appointment <ArrowRight size={16} strokeWidth={3} />
            </span>
          </Link>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden p-2 flex items-center justify-center transition-transform active:scale-90 pointer-events-auto cursor-pointer relative z-[200]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={32} className="text-black" />
          ) : (
            <Menu size={32} className={isSolid ? "text-black" : "text-white"} />
          )}
        </button>
      </div>

      {/* MOBILE DRAWER - Solid Background, Gigantic Text */}
      <div 
        className={`fixed inset-0 bg-white z-[130] flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.85, 0, 0.15, 1)] md:hidden ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        {/* Full White background cover to ensure no page content shows */}
        <div className="absolute inset-0 bg-white" />

        <div className="relative h-full flex flex-col justify-between px-8 pt-40 pb-12 z-10">
          
          {/* GIGANTIC MOBILE LINKS */}
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className={`text-6xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.85] transition-all duration-700 transform ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
              >
                {l.label === "Our Work" ? (
                  <>Our Work</>
                ) : l.label}
              </Link>
            ))}
          </nav>

          <div className={`transition-all duration-700 delay-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* BIG MOBILE CTA */}
            <Link 
              href="/booking" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full bg-[#58ae3a] text-white p-8 rounded-[2.5rem] mb-10 shadow-xl shadow-[#58ae3a]/20"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-1">Secure your spot</span>
                <span className="text-3xl font-black uppercase tracking-tighter leading-none">Book Now</span>
              </div>
              <div className="w-14 h-14 rounded-full bg-white text-[#58ae3a] flex items-center justify-center">
                <ArrowRight size={28} strokeWidth={3} />
              </div>
            </Link>

            <div className="flex justify-between items-end border-t border-black/10 pt-8 text-black">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Location</span>
                <p className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                   <MapPin size={16} className="text-[#58ae3a]" /> London, UK
                </p>
              </div>
              
              <Link href="https://instagram.com" className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform">
                 <InstagramIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Background Text for Mobile Menu */}
        <div className="absolute bottom-1/4 -right-10 opacity-[0.03] pointer-events-none">
          <h2 className="text-[40vw] font-black rotate-90">HHH</h2>
        </div>
      </div>
    </header>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}