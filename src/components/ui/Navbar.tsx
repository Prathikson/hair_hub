"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Our Work" },
  { href: "/booking", label: "Book Now", cta: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.1 }
    );
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-black/5" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="px-6 md:px-12 lg:px-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3 no-underline">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${scrolled ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <span className="font-black text-xs tracking-tighter">HHH</span>
          </div>
          <span className={`text-xl tracking-tighter uppercase font-black transition-colors duration-500 ${scrolled ? 'text-black' : 'text-white'}`}>
            Harry&apos;s <span className="font-serif italic lowercase font-normal tracking-normal">hub</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((l) =>
            l.cta ? (
              <Link key={l.href} href={l.href} className="group flex items-center bg-black/5 border border-black/10 p-1.5 rounded-full transition-all duration-300 hover:bg-black/10">
                 <span className={`px-5 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${scrolled ? 'text-black/40' : 'text-white/60'}`}>
                  Secure Spot
                </span>
                <span className="bg-[#58ae3a] text-white py-2.5 px-6 rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all duration-300 group-hover:bg-[#4d9a32] group-hover:scale-[1.05]">
                  {l.label} <ArrowRight size={14} strokeWidth={3} />
                </span>
              </Link>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-50 ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden p-2 transition-colors"
          onClick={() => setOpen(!open)}
          style={{ color: scrolled ? "black" : "white" }}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 bg-[#f8f8f8] z-[99] flex flex-col justify-center px-10 transition-transform duration-700 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col gap-8">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-5xl font-black uppercase tracking-tighter leading-none flex items-center justify-between group text-black"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span>
                {l.label === "Book Now" ? (
                  <span className="text-[#58ae3a]">Book</span>
                ) : l.label}
              </span>
              <ArrowRight size={40} className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </nav>

        {/* Branding Decor in Mobile Menu */}
        <div className="absolute bottom-10 left-10 opacity-10">
          <h2 className="text-8xl font-black uppercase tracking-tighter leading-none">HHH</h2>
        </div>
      </div>
    </header>
  );
}