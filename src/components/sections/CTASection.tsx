"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Parallax effect on the image
      gsap.to(parallaxRef.current, {
        yPercent: 15,
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

  return (
    <section 
      ref={sectionRef} 
      // min-h-screen allows content to stack naturally on mobile
      className="relative w-full min-h-screen bg-white text-white flex flex-col py-16 px-6 md:py-24 md:px-12 lg:px-24 overflow-hidden"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        .card-solid {
          background-color: #1a1a1a; /* Sophisticated Charcoal */
          border-radius: 2.5rem;
        }

        .img-card {
          border-radius: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .btn-premium {
          background: #58ae3a;
          color: white;
          padding: 14px 32px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .btn-premium:hover {
          background: #4d9a32;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(88, 174, 58, 0.2);
        }

        .display-text {
          line-height: 0.9;
          letter-spacing: -0.04em;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:h-[75vh]">
        
        {/* LEFT: GIGANTIC IMAGE CARD */}
        <div className="reveal-card lg:col-span-7 img-card relative min-h-[450px] lg:h-full group">
          <div ref={parallaxRef} className="absolute -top-[20%] left-0 w-full h-[140%]">
            <Image
              src="/shop.jpg"
              alt="Barber Shop Interior"
              fill
              className="object-cover brightness-[0.65] transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Text Overlay */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
            <div className="flex items-center gap-3 mb-4 opacity-70">
              <MapPin size={16} className="text-[#58ae3a]" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">London Portfolio</span>
            </div>
            <h2 className="display-text text-white text-5xl md:text-7xl lg:text-[5vw] font-black italic uppercase">
              More than <br />
              <span className="serif-italic lowercase font-normal tracking-normal text-[#58ae3a]">5 branches</span> <br />
              across london
            </h2>
          </div>
        </div>

        {/* RIGHT: SOLID DESCRIPTION CARD */}
        <div className="reveal-card lg:col-span-5 card-solid p-10 md:p-16 flex flex-col justify-between min-h-[400px] lg:h-full shadow-2xl">
          <div>
            <div className="w-12 h-1 px-1 bg-[#58ae3a] mb-10" />
            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Visit the chair.</h3>
            <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed max-w-sm">
              Across the city, our passionate team of master barbers cares for your look with personalized service and proven expertise. 
              <br /><br />
              Find your nearest chair today and experience the gold standard of London grooming.
            </p>
          </div>

          <div className="mt-12">
            <Link href="/locations" className="btn-premium inline-flex items-center gap-3 group">
              Find a branch 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>

      {/* Decorative Brand Text (Optional/Subtle) */}
      <div className="mt-12 flex justify-between items-center opacity-20 hidden md:flex">
         <span className="text-[10px] font-black uppercase tracking-[0.5em]">Sharp & Co. Est 2024</span>
         <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-[#58ae3a]" />
         </div>
      </div>
    </section>
  );
}