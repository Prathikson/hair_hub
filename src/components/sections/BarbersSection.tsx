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

  

  const posterColors = ["#fcee0a", "#2d4a3e", "#8ecae6", "#1a1a1a"];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-white text-black flex flex-col justify-between p-8 md:p-16 lg:px-24 lg:pt-20 lg:pb-32"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        .capsule-cta {
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 6px;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
        }

        .btn-green {
          background-color: #58ae3a;
          color: #fff;
          padding: 12px 28px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 13px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        /* Centered Gigantic Poster Text */
        .poster-headline {
          font-weight: 900;
          line-height: 0.8;
          letter-spacing: -0.06em;
          text-transform: uppercase;
          text-align: center;
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          z-index: 1;
        }

        /* Pill styling from reference */
        .poster-pill {
          border: 1px solid rgba(0,0,0,0.15);
          padding: 5px 16px;
          border-radius: 30px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .barber-poster {
          border-radius: 2.2rem;
          position: relative;
          overflow: hidden;
          height: 100%;
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .barber-poster:hover {
          transform: scale(1.02);
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.3);
        }
      `}</style>

      {/* TOP HEADER - Added margin-bottom */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16">
        <div className="reveal-header">
          <span className="block text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-30">Our Advice & Team</span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight max-w-xl">
            Precision starts with the right artist. <br />
            <span className="serif-italic font-normal">Find your perfect match.</span>
          </h2>
        </div>

        <div className="reveal-header mt-8 lg:mt-0">
          <Link href="/team" className="capsule-cta group">
            <span className="px-8 text-[11px] font-bold uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity">Expert Advice</span>
            <span className="btn-green flex items-center gap-2 group-hover:bg-[#4d9a32]">
              All Barbers <ArrowRight size={15} />
            </span>
          </Link>
        </div>
      </div>

      {/* POSTER GRID - flex-1 ensures it fills space between header and bottom padding */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 min-h-0"
      >
        {BARBERS.slice(0, 4).map((b, i) => (
          <div 
            key={b.id} 
            className="barber-poster group flex flex-col items-center justify-between p-10 cursor-pointer shadow-lg"
            style={{ backgroundColor: posterColors[i % posterColors.length] }}
          >
            {/* Top Badge (Role) */}
            <div className="z-20">
               <span className="poster-pill" style={{ 
                 borderColor: i === 3 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                 color: i === 3 ? '#fff' : '#000'
               }}>
                 {b.title.split(' ')[0]}
               </span>
            </div>

            {/* GIGANTIC NAME (CENTER) */}
            <h3 className={`poster-headline text-[5.5rem] lg:text-[6.5vw] ${i === 3 ? 'text-white' : 'text-black'}`}>
               THE <br /> {b.name.split(' ')[0]}
            </h3>

            {/* CUTOUT IMAGE (Z-INDEX OVER TEXT) */}
            <div className="cutout-img absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4">
              <div className="relative w-full h-[85%] transition-transform duration-700 group-hover:scale-110">
                <Image 
                  src={`https://images.unsplash.com/photo-1621605815844-830f605330aa?q=80&w=400`} 
                  alt={b.name}
                  fill
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.25))" }}
                />
              </div>
            </div>

            {/* Bottom Badges (Specialties) */}
            <div className="z-20 flex flex-wrap justify-center gap-2">
              {b.specialties.slice(0, 2).map((s) => (
                <span key={s} className="poster-pill" style={{ 
                  backgroundColor: i === 3 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  borderColor: i === 3 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                  color: i === 3 ? '#fff' : '#000'
                 }}>
                  {s}
                </span>
              ))}
            </div>

            {/* Rating Hover Overlay */}
            <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center z-30 p-10 text-center text-white">
                <div className="bg-[#58ae3a] p-3 rounded-2xl mb-6">
                  <Star size={28} fill="#fff" stroke="none" />
                </div>
                <p className="text-3xl font-black italic tracking-tighter mb-2">{b.rating} / 5.0</p>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-8">{b.experience} Years Crafting</p>
                <Link href={`/booking?barber=${b.id}`} className="bg-white text-black px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#58ae3a] hover:text-white transition-colors">
                   Book Session
                </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}