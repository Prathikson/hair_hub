"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Scissors, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // INTENSE PARALLAX: Image is 30% larger than screen.
      // As you scroll, it moves significantly to create depth.
      gsap.to(parallaxRef.current, {
        y: "12%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2, // Adds a premium 'weighted' feel to the movement
        },
      });

      // CONTENT ENTRANCE
      gsap.from(".reveal", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-end"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        /* The Vertdure-style capsule button */
        .capsule-cta {
          background: rgba(15, 15, 15, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 6px;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-main {
          background-color: var(--vertdure-green);
          color: #000;
          padding: 14px 32px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: -0.02em;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .btn-main:hover {
          filter: brightness(1.1);
          transform: scale(1.03);
        }

        .btn-ghost {
          padding: 0 28px;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          opacity: 0.8;
          transition: opacity 0.2s;
        }

        .btn-ghost:hover { opacity: 1; }

        /* Widget Styles */
        .glass-widget {
          background: rgba(10, 22, 10, 0.85);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
      `}</style>

      {/* PARALLAX BG CONTAINER */}
      <div 
        ref={parallaxRef}
        className="absolute -top-[15%] left-0 w-full h-[130%] z-0"
      >
        <Image
          src="/Hero.jpg"
          alt="Luxury Barbering"
          fill
          priority
          className="object-cover brightness-[0.75] contrast-[1.05]"
          sizes="100vw"
        />
        {/* Soft Vignette to anchor the content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
      </div>

      {/* MAIN CONTENT - ADJUSTED MARGINS */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-16 md:pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          {/* LEFT: GIGANTIC TYPOGRAPHY */}
          <div className="lg:col-span-8 flex flex-col items-start space-y-12">
            <h1 className="reveal leading-[0.9] tracking-tighter text-white">
              <span className="serif-italic text-[13vw] md:text-[9vw] lg:text-[8vw] block -mb-2">
                Sharp, return
              </span>
              <span className="font-black text-[13vw] md:text-[9vw] lg:text-[8vw] block uppercase italic">
                the jealous barber.
              </span>
            </h1>

            <div className="reveal">
              <div className="capsule-cta shadow-2xl">
                <button className="btn-ghost">Build your style</button>
                <button className="btn-main">Book appointment</button>
              </div>
            </div>
          </div>

          {/* RIGHT: FLOATING WIDGETS */}
          <div className="lg:col-span-4 flex flex-col items-end space-y-6">
            
            {/* Offer Banner */}
            <div className="reveal flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 w-fit shadow-lg">
              <p className="text-white/90 text-xs font-bold tracking-tight">
                12,000 clients in London — Cuts from £35
              </p>
              <span className="bg-[#fcee0a] text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter italic">
                LIMITED!
              </span>
            </div>

            {/* Large Feature Widget */}
            <div className="reveal glass-widget p-5 rounded-[2.5rem] w-full max-w-sm flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black flex-shrink-0 border border-white/10 shadow-2xl">
                <Image 
                  src="/kids_cut.jpg" 
                  alt="Barber Feature" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-white leading-tight mb-2">
                  Struggling with beard shape? <br />
                  <span className="opacity-50 font-medium tracking-tight">Say Goodbye to Mess!</span>
                </p>
                <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#58ae3a" stroke="none" />)}
                </div>
              </div>
              <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5">
                <Scissors size={24} className="text-[#58ae3a]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;