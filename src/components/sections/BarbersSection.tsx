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
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Soft pastel versions of your colors
  const posterColors = ["#fef9c3", "#dcfce7", "#e0f2fe", "#f3f4f6"];

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
          line-height: 0.8;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          z-index: 5;
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.5;
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
          border-radius: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          height: 70vh;
          min-height: 550px;
          background-color: #f8f8f8; /* Base color when not hovered */
        }

        .barber-poster:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        /* Ensure image fills the container */
        .barber-image-container {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .barber-image-container :global(img) {
          object-fit: cover;
          object-position: center top;
          transition: transform 0.7s ease;
        }

        .barber-poster:hover .barber-image-container :global(img) {
          transform: scale(1.05);
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
              Our Work <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* GRID SECTION - Changed to lg:grid-cols-3 for wider cards */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        {BARBERS.slice(0, 3).map((b, i) => (
          <div 
            key={b.id} 
            className="barber-poster group cursor-pointer"
          >
            {/* Poster Background Text */}
            <h3 className="poster-headline text-8xl md:text-9xl lg:text-[8vw] text-black">
               {b.name.split(' ')[0]}
            </h3>

            {/* FULL FILL IMAGE */}
            <div className="barber-image-container">
              <Image 
                src={b.image} 
                alt={b.name}
                fill
                priority
              />
            </div>

            {/* TOP INFO (Visible Always) */}
            <div className="relative z-10 p-8 flex justify-between items-start">
               <span className="poster-pill bg-white/80 backdrop-blur-md">
                 {b.title}
               </span>
               <div className="bg-white/80 backdrop-blur-md h-10 w-10 rounded-full flex items-center justify-center">
                  <Star size={14} fill="#58ae3a" stroke="none" />
               </div>
            </div>

            {/* BOTTOM INFO (Visible Always) */}
            <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col gap-1 transition-opacity duration-300 group-hover:opacity-0">
              <p className="text-2xl font-black text-white uppercase tracking-tighter">{b.name}</p>
              <div className="flex gap-2">
                {b.specialties.slice(0, 2).map(s => (
                   <span key={s} className="text-[9px] font-bold text-white uppercase opacity-60 tracking-widest">{s}</span>
                ))}
              </div>
            </div>

            {/* HOVER OVERLAY - Shows Pastel Color */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center z-30 p-10 text-center"
              style={{ backgroundColor: `${posterColors[i % posterColors.length]}ee` }} // 'ee' adds transparency to the pastel
            >
                <div className="bg-black p-4 rounded-3xl mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Star size={32} fill="#58ae3a" stroke="none" />
                </div>
                
                <h4 className="text-4xl font-black text-black mb-2 tracking-tighter transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {b.rating} Rating
                </h4>
                
                <p className="text-sm font-bold text-black/60 uppercase tracking-widest mb-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {b.experience} Years of Craft
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                  {b.specialties.map((s) => (
                    <span key={s} className="px-4 py-2 bg-black/5 border border-black/10 rounded-full text-[10px] font-black uppercase text-black">
                      {s}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/booking?barber=${b.id}`} 
                  className="bg-black text-white px-10 py-4 rounded-full text-[12px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200"
                >
                   Book Appointment
                </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}