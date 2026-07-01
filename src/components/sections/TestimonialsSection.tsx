"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/services";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const perPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Page Transition Animation
  useEffect(() => {
    if (!trackRef.current) return;
    gsap.fromTo(Array.from(trackRef.current.children),
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
    );
  }, [page]);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-black text-white flex flex-col justify-between p-8 md:p-16 lg:px-24 lg:pt-20 lg:pb-32"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        /* Hero Style Capsule Nav */
        .capsule-nav {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .nav-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.05);
        }

        .nav-arrow:hover:not(:disabled) {
          background: #58ae3a;
          color: #000;
        }

        /* Glass Widget Card */
        .glass-review {
          background: rgba(15, 15, 15, 0.6);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2.5rem;
          transition: all 0.4s ease;
        }

        .glass-review:hover {
          border-color: #58ae3a;
          transform: translateY(-5px);
        }

        /* Summary Widget Styles */
        .summary-widget {
          background: rgba(15, 25, 15, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
        }
      `}</style>

      {/* TOP: GIGANTIC TITLE & NAV */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-8">
        <div className="reveal-text">
          <span className="block text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-30">Our Community</span>
          <h2 className="leading-[0.9] tracking-tighter">
            <span className="serif-italic text-[10vw] md:text-[6vw] block">Real stories,</span>
            <span className="font-black text-[10vw] md:text-[6vw] block uppercase italic">the sharp choice.</span>
          </h2>
        </div>

        <div className="reveal-text">
          <div className="capsule-nav shadow-xl">
             <button onClick={prev} disabled={page === 0} className="nav-arrow disabled:opacity-20">
                <ChevronLeft size={20} />
             </button>
             <div className="px-4 text-[11px] font-black opacity-40 uppercase tracking-widest">
                {page + 1} / {totalPages}
             </div>
             <button onClick={next} disabled={page >= totalPages - 1} className="nav-arrow disabled:opacity-20">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* CENTER: GIGANTIC REVIEW GRID */}
      <div 
        ref={trackRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full my-auto"
      >
        {visible.map((t) => (
          <div key={t.id} className="glass-review p-10 flex flex-col justify-between aspect-square lg:aspect-auto lg:h-[42vh]">
            <div>
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-white/5 border border-white/10">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest leading-none">{t.author}</p>
                    <p className="text-[10px] opacity-40 mt-1 uppercase font-bold">{t.date}</p>
                  </div>
                </div>
                <Quote size={24} className="text-[#58ae3a] opacity-40" />
              </div>

              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill={i < t.rating ? "#58ae3a" : "none"} stroke={i < t.rating ? "none" : "rgba(255,255,255,0.2)"} />
                ))}
              </div>

              <p className="text-lg md:text-xl font-medium leading-relaxed opacity-80 italic">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>

            {t.service && (
              <div className="mt-8 pt-6 border-t border-white/5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#58ae3a] bg-[#58ae3a]/10 px-4 py-2 rounded-full">
                  {t.service}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BOTTOM: FLOATING GOOGLE WIDGET (Like the "Bug" Widget) */}
      <div className="w-full flex justify-center lg:justify-end">
        <div className="reveal-text summary-widget p-4 pr-8 flex items-center gap-6 shadow-2xl">
           <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
             <GoogleGSVG />
           </div>
           <div>
              <div className="flex items-center gap-3 mb-1">
                 <span className="serif-italic text-3xl font-black">4.9</span>
                 <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#58ae3a" stroke="none" />)}
                 </div>
              </div>
              <p className="text-[10px] uppercase font-black tracking-widest opacity-50">
                Verified by Google — 312 reviews
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}

// SVG Components kept consistent
function GoogleGSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.706C3.784 10.166 3.682 9.59 3.682 9s.102-1.166.282-1.706V4.962H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.038l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.583c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 7.294C4.672 5.167 6.656 3.583 9 3.583z" fill="#EA4335"/>
    </svg>
  );
}