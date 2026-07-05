"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Clock, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/data/services";
import { formatPrice, formatDuration } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(".service-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = SERVICES.filter((s) => s.popular).slice(0, 4);

  return (
    <section 
      ref={sectionRef} 
      // Changed h-screen to min-h-screen for mobile flexibility
      // Adjusted padding for better mobile/desktop balance
      className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between py-16 px-6 md:py-24 md:px-12 lg:px-20"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        .capsule-cta {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 4px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
        }

        .btn-green {
          background-color: #58ae3a;
          color: #000;
          padding: 8px 20px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 11px;
          text-transform: uppercase;
        }

        .glass-card {
          background: rgba(20, 20, 20, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: #58ae3a;
          transform: translateY(-8px);
        }

        .category-tag {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #58ae3a;
          background: rgba(88, 174, 58, 0.1);
          padding: 4px 10px;
          border-radius: 20px;
        }
      `}</style>

      {/* TOP: HEADLINE ROW */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 lg:mb-0">
        <div className="max-w-4xl">
          <h2 className="reveal-text leading-[1.1] md:leading-[0.9] tracking-tighter">
            <span className="serif-italic text-5xl md:text-[5vw] lg:text-[6vw] block">What are you in</span>
            <span className="font-black text-5xl md:text-[5vw] lg:text-[6vw] block uppercase italic">the mood for?</span>
          </h2>
        </div>

        <div className="reveal-text">
          <Link href="/services" className="capsule-cta shadow-xl group">
            <span className="px-4 md:px-6 text-[10px] md:text-[12px] font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
              Explore All
            </span>
            <span className="btn-green flex items-center gap-2">
              Services <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* CENTER: CARDS GRID */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full my-12"
      >
        {featured.map((s) => (
          <Link key={s.id} href={`/booking?service=${s.id}`} className="service-card group">
            <div className="glass-card p-6 md:p-8 h-full rounded-[2rem] flex flex-col justify-between min-h-[320px] lg:h-[45vh]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="category-tag">{s.category}</span>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#58ae3a] group-hover:text-black transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <h3 className="serif-italic text-2xl md:text-3xl font-light mb-3 group-hover:text-[#58ae3a] transition-colors leading-tight">
                  {s.name}
                </h3>
                <p className="text-xs md:text-sm opacity-50 font-medium leading-relaxed line-clamp-3 md:line-clamp-4">
                  {s.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                  <Clock size={12} />
                  {formatDuration(s.duration)}
                </div>
                <span className="text-xl md:text-2xl font-black italic tracking-tighter text-[#58ae3a]">
                   {formatPrice(s.price)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* BOTTOM: CATEGORY BAR */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mt-auto pt-6 border-t border-white/5">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {["Haircuts", "Beard", "Color", "Combos"].map((cat) => (
            <div 
              key={cat}
              className="reveal-text flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:border-[#58ae3a]/50 transition-colors cursor-pointer group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#58ae3a] shadow-[0_0_8px_#58ae3a]" />
              <span className="text-[10px] font-black uppercase tracking-[0.15em] opacity-60 group-hover:opacity-100">
                {cat}
              </span>
            </div>
          ))}
        </div>
        
        <div className="reveal-text flex items-center gap-4 bg-[#121a12] px-6 py-2.5 rounded-full border border-[#58ae3a]/20">
           <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#58ae3a" stroke="none" />)}
           </div>
           <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Top Rated Craftsmen</span>
        </div>
      </div>
    </section>
  );
}