"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star } from "lucide-react";
import { BARBERS } from "@/data/services";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function BarbersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We use a context to ensure clean cleanup
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.from(".reveal-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // 2. Card Stagger (More robust selector)
      const cards = gsap.utils.toArray(".barber-poster");
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%", // Triggers earlier for better mobile experience
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const posterColors = ["#fcee0a", "#2d4a3e", "#8ecae6", "#1a1a1a"];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-white text-black flex flex-col py-20 px-6 md:px-12 lg:px-24"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        .capsule-cta {
          background: rgba(0, 0, 0, 0.04);
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
          padding: 10px 20px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 11px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .poster-headline {
          font-weight: 900;
          line-height: 0.75;
          letter-spacing: -0.06em;
          text-transform: uppercase;
          text-align: center;
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .poster-pill {
          border: 1px solid rgba(0,0,0,0.1);
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .barber-poster {
          border-radius: 2rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          min-height: 520px; /* High enough to show the "Poster" effect on mobile */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
        }

        @media (min-width: 1024px) {
          .barber-poster {
            height: 65vh;
            min-height: 600px;
          }
        }

        .barber-poster:hover {
          transform: translateY(-8px);
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16">
        <div className="reveal-header">
          <span className="block text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#58ae3a]">
            Our Master Barbers
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter max-w-2xl">
            Precision starts with the <br /> 
            <span className="serif-italic font-normal">right artist.</span>
          </h2>
        </div>

        <div className="reveal-header mt-10 lg:mt-0">
          <Link href="/team" className="capsule-cta group bg-gray-50">
            <span className="pl-5 pr-1 text-[11px] font-bold uppercase tracking-[0.1em] opacity-60">Meet the crew</span>
            <span className="btn-green flex items-center gap-2">
              All Barbers <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* GRID SECTION */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
      >
        {BARBERS.slice(0, 4).map((b, i) => (
          <div 
            key={b.id} 
            className="barber-poster group cursor-pointer"
            style={{ backgroundColor: posterColors[i % posterColors.length] }}
          >
            {/* Top Badge */}
            <div className="z-20 self-center">
               <span className="poster-pill bg-white/10 backdrop-blur-md" style={{ 
                 color: i === 3 ? '#fff' : '#000',
                 borderColor: i === 3 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
               }}>
                 {b.title.split(' ')[0]}
               </span>
            </div>

            {/* Poster Background Text */}
            <h3 className={`poster-headline text-8xl md:text-7xl lg:text-[6.5vw] ${i === 3 ? 'text-white' : 'text-black'} opacity-90`}>
               THE <br /> {b.name.split(' ')[0]}
            </h3>

            {/* Cutout Image */}
            <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
              <div className="relative w-full h-[85%] transition-transform duration-700 group-hover:scale-105 group-hover:translate-y-[-5px]">
                <Image 
                  src={`https://images.unsplash.com/photo-1621605815844-830f605330aa?q=80&w=400`} 
                  alt={b.name}
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* Specialties Pills */}
            <div className="z-20 flex flex-wrap justify-center gap-2 mt-auto">
              {b.specialties.slice(0, 2).map((s) => (
                <span key={s} className="poster-pill bg-white/20 backdrop-blur-sm" style={{ 
                  color: i === 3 ? '#fff' : '#000',
                  border: 'none'
                 }}>
                  {s}
                </span>
              ))}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center z-30 p-8 text-center text-white">
                <div className="bg-[#58ae3a] p-3 rounded-2xl mb-4">
                  <Star size={24} fill="#fff" stroke="none" />
                </div>
                <p className="text-3xl font-black italic tracking-tighter mb-1">{b.rating} / 5.0</p>
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-8">{b.experience} Years Exp.</p>
                <Link 
                  href={`/booking?barber=${b.id}`} 
                  className="bg-[#58ae3a] text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-transform active:scale-95"
                >
                   Book {b.name.split(' ')[0]}
                </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}