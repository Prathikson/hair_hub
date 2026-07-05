"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Scissors, ShieldCheck, Zap, MessageSquare, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Typography
      gsap.from(".reveal-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Background Parallax
      gsap.to(parallaxRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pillars = [
    { icon: <Scissors className="w-5 h-5 md:w-6 md:h-6" />, title: "Precision", desc: "Craft projects, never rushed." },
    { icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />, title: "Premium", desc: "Professional-grade products." },
    { icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />, title: "No Friction", desc: "Online booking, zero waiting." },
    { icon: <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />, title: "Consultation", desc: "We listen first, cut second." },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-white text-black flex flex-col justify-between py-20 px-6 md:py-32 md:px-12 lg:px-24 overflow-hidden"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        .capsule-cta {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 5px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .btn-green {
          background-color: #58ae3a;
          color: #fff;
          padding: 10px 24px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 11px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .pillar-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
          transition: all 0.4s ease;
        }

        .pillar-card:hover {
          border-color: #58ae3a;
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -15px rgba(88, 174, 58, 0.15);
        }

        .dot-pattern {
          background-image: radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>

      {/* BACKGROUND TEXTURE & PARALLAX IMAGE */}
      <div className="absolute inset-0 z-0 dot-pattern" />
      <div 
        ref={parallaxRef}
        className="absolute top-0 right-0 w-full lg:w-[55%] h-full opacity-10 lg:opacity-20 z-0 pointer-events-none"
      >
        <Image 
          src="/hero.jpg" 
          alt="Barber Background"
          fill
          className="object-cover grayscale"
        />
        {/* Changed gradient to white to blend with the background */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-white via-white/90 to-transparent" />
      </div>

      {/* TOP: TITLE AREA */}
      <div className="relative z-10 w-full max-w-6xl mt-8">
        <span className="reveal-text block text-[#58ae3a] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 md:mb-6">
          Why Sharp & Co.
        </span>
        <h2 className="reveal-text leading-[1.05] md:leading-[0.9] tracking-tighter">
          <span className="serif-italic text-5xl md:text-7xl lg:text-[7.5vw] block text-[#58ae3a]">We don&apos;t just cut hair.</span>
          <span className="font-black text-5xl md:text-7xl lg:text-[7.5vw] block uppercase italic">We craft it with care.</span>
        </h2>
        
        <p className="reveal-text mt-8 max-w-xl text-base md:text-lg lg:text-xl font-medium opacity-50 leading-relaxed">
          From the first consultation to the finishing touch — every service is built around your face, your style, and your life.
        </p>
      </div>

      {/* CENTER: CAPSULE CTA */}
      <div className="relative z-10 reveal-text my-16 md:my-20">
        <Link href="/booking" className="capsule-cta group bg-white shadow-sm">
          <span className="pl-5 pr-1 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.1em] opacity-40 group-hover:opacity-100 transition-opacity">Ready to Refine?</span>
          <span className="btn-green flex items-center gap-3 group-hover:bg-[#4d9a32]">
            Book Now <ArrowRight size={16} />
          </span>
        </Link>
      </div>

      {/* BOTTOM: PILLAR WIDGETS GRID */}
      <div className="relative z-10 pillar-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mb-8">
        {pillars.map((p, i) => (
          <div 
            key={i} 
            className="pillar-widget pillar-card p-6 md:p-8 rounded-[2rem] flex items-center lg:items-start lg:flex-col gap-5 group"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-black text-[#58ae3a] flex items-center justify-center group-hover:bg-[#58ae3a] group-hover:text-white transition-all duration-300">
              {p.icon}
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-2">
                {p.title}
              </h4>
              <p className="text-[12px] md:text-sm opacity-50 font-medium leading-snug">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}