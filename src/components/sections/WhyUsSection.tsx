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
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Stagger Widgets
      gsap.from(".pillar-widget", {
        x: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pillar-grid",
          start: "top 90%",
        },
      });

      // Background Parallax
      gsap.to(parallaxRef.current, {
        yPercent: 10,
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
    { icon: <Scissors size={20} />, title: "Precision", desc: "Craft projects, never rushed." },
    { icon: <ShieldCheck size={20} />, title: "Premium", desc: "Professional-grade products." },
    { icon: <Zap size={20} />, title: "No Friction", desc: "Online booking, zero waiting." },
    { icon: <MessageSquare size={20} />, title: "Consultation", desc: "We listen first, cut second." },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-black text-white flex flex-col justify-between p-8 md:p-16 lg:px-24 lg:py-20"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        /* Hero Style Capsule Button */
        .capsule-cta {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
        }

        .btn-green {
          background-color: #58ae3a;
          color: #000;
          padding: 12px 32px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 13px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        /* Floating Pillar Widget */
        .glass-widget {
          background: rgba(15, 25, 15, 0.9);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s ease;
        }

        .glass-widget:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: #58ae3a;
        }

        .dot-pattern {
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>

      {/* BACKGROUND TEXTURE & PARALLAX IMAGE */}
      <div className="absolute inset-0 z-0 dot-pattern" />
      <div 
        ref={parallaxRef}
        className="absolute top-0 right-0 w-[60%] h-full opacity-30 z-0 pointer-events-none"
      >
        <Image 
          src="/hero.jpg" // Reusing the high-quality image from Hero
          alt="Barber Shop"
          fill
          className="object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* TOP: GIGANTIC TITLE */}
      <div className="relative z-10 w-full max-w-6xl">
        <span className="reveal-text block text-[#58ae3a] text-xs font-black uppercase tracking-[0.4em] mb-6">
          Why Sharp & Co.
        </span>
        <h2 className="reveal-text leading-[0.9] tracking-tighter">
          <span className="serif-italic text-[10vw] md:text-[7.5vw] block">We don&apos;t just cut hair.</span>
          <span className="font-black text-[10vw] md:text-[7.5vw] block uppercase italic">We craft it with care.</span>
        </h2>
        
        <p className="reveal-text mt-8 max-w-xl text-lg md:text-xl font-light opacity-60 leading-relaxed">
          From the first consultation to the finishing touch — every service is built around your face, your style, and your life.
        </p>
      </div>

      {/* CENTER: GIGANTIC CAPSULE CTA */}
      <div className="relative z-10 reveal-text my-12">
        <Link href="/booking" className="capsule-cta shadow-2xl group">
          <span className="px-8 text-[13px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Ready to Refine?</span>
          <span className="btn-green flex items-center gap-3">
            Book a Session <ArrowRight size={16} />
          </span>
        </Link>
      </div>

      {/* BOTTOM: PILLAR WIDGETS GRID (Same style as floating widgets) */}
      <div className="relative z-10 pillar-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {pillars.map((p, i) => (
          <div 
            key={i} 
            className="pillar-widget glass-widget p-6 rounded-[2rem] flex items-center gap-5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center text-[#58ae3a] border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
              {p.icon}
            </div>
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-1">
                {p.title}
              </h4>
              <p className="text-xs opacity-50 font-medium leading-snug">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Corner Decorative Element */}
      <div className="absolute bottom-10 right-10 hidden md:block opacity-20">
         <div className="w-16 h-16 border-r border-b border-[#58ae3a] rounded-br-3xl" />
      </div>

    </section>
  );
}