"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Scissors, Clock, ArrowRight, ArrowUpRight, Star } from "lucide-react";
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

      // Stagger Cards
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
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 5px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
        }

        .btn-green {
          background-color: #58ae3a;
          color: #000;
          padding: 10px 24px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 12px;
          text-transform: uppercase;
        }

        /* Premium Dark Card Style */
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
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #58ae3a;
          background: rgba(88, 174, 58, 0.1);
          padding: 4px 10px;
          border-radius: 20px;
        }
      `}</style>

      {/* TOP: GIGANTIC HEADLINE Row */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-8">
        <div>
          <h2 className="reveal-text leading-[0.9] tracking-tighter">
            <span className="serif-italic text-[10vw] md:text-[6vw] block">What are you in</span>
            <span className="font-black text-[10vw] md:text-[6vw] block uppercase italic">the mood for?</span>
          </h2>
        </div>

        <div className="reveal-text">
          <Link href="/services" className="capsule-cta shadow-xl group">
            <span className="px-6 text-[12px] font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">Explore All</span>
            <span className="btn-green flex items-center gap-2">
              Services <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* CENTER: GIGANTIC CARDS GRID */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full my-auto"
      >
        {featured.map((s) => (
          <Link key={s.id} href={`/booking?service=${s.id}`} className="service-card group">
            <div className="glass-card p-8 h-full rounded-[2.5rem] flex flex-col justify-between aspect-[4/5] lg:aspect-auto lg:h-[45vh]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="category-tag">{s.category}</span>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#58ae3a] group-hover:text-black transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <h3 className="serif-italic text-3xl font-light mb-3 group-hover:text-[#58ae3a] transition-colors leading-tight">
                  {s.name}
                </h3>
                <p className="text-sm opacity-50 font-medium leading-relaxed line-clamp-3">
                  {s.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[11px] font-bold opacity-40 uppercase tracking-widest">
                  <Clock size={12} />
                  {formatDuration(s.duration)}
                </div>
                <span className="text-2xl font-black italic tracking-tighter">
                   {formatPrice(s.price)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* BOTTOM: FLOATING CATEGORY BAR (The "Bug" Widget Style) */}
      <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
        {["Haircuts", "Beard & Shave", "Color", "Combos"].map((cat) => (
          <div 
            key={cat}
            className="reveal-text flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/5 hover:border-[#58ae3a]/50 transition-colors cursor-pointer group"
          >
            <div className="w-2 h-2 rounded-full bg-[#58ae3a] shadow-[0_0_10px_#58ae3a]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
              {cat}
            </span>
          </div>
        ))}
        
        {/* Rating Widget Style from Image 3 */}
        <div className="reveal-text ml-auto hidden lg:flex items-center gap-4 bg-[#121a12] px-6 py-2.5 rounded-full border border-[#58ae3a]/20">
           <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#58ae3a" stroke="none" />)}
           </div>
           <span className="text-[10px] font-bold uppercase tracking-tighter">Top Rated Craftsmen</span>
        </div>
      </div>
    </section>
  );
}