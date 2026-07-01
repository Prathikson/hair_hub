"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Animation
      gsap.from(".reveal-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Subtle Parallax on the image inside the left card
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

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-white text-white flex flex-col justify-center p-6 md:p-12 lg:px-24"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        /* Styling for the Right Card Color (matching the reference brownish-grey) */
        .card-solid {
          background-color: #8b8378; /* Muted clay/brown from image */
          border-radius: 2.5rem;
        }

        .img-card {
          border-radius: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        /* Simplified Pill Button from reference image */
        .btn-simple {
          background: rgba(0, 0, 0, 0.4);
          color: white;
          padding: 10px 24px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .btn-simple:hover {
          background: rgba(0, 0, 0, 0.6);
        }

        .display-text {
          line-height: 0.95;
          letter-spacing: -0.04em;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[85vh] lg:h-[80vh]">
        
        {/* LEFT: GIGANTIC IMAGE CARD (Reference Style) */}
        <div className="reveal-card lg:col-span-7 img-card relative h-full group">
          <div ref={parallaxRef} className="absolute -top-[10%] left-0 w-full h-[120%]">
            <Image
              src="/hero.jpg" // Using your local public image
              alt="Barber Shop Interior"
              fill
              className="object-cover brightness-75 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Text Overlay at Bottom Left */}
          <div className="absolute bottom-12 left-12 z-10 max-w-md">
            <h2 className="display-text text-white text-5xl md:text-7xl lg:text-[5.5vw] font-medium">
              More than <br />
              <span className="serif-italic">5 branches</span> <br />
              in London
            </h2>
          </div>
        </div>

        {/* RIGHT: SOLID DESCRIPTION CARD (Reference Style) */}
        <div className="reveal-card lg:col-span-5 card-solid p-10 md:p-16 flex flex-col justify-between h-full">
          <div>
            <p className="text-white/90 text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-sm">
              Across the city, our passionate team of master barbers cares for your look with personalized service and proven expertise. For a sharp, clean, and confident finish, trust our professionals. Find your nearest chair today!
            </p>
          </div>

          <div className="mt-12 lg:mt-0">
            <Link href="/locations" className="btn-simple inline-flex items-center gap-2">
              Find a branch <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>

      {/* Background decoration to fill the bottom margin gap */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white z-20 pointer-events-none" />
    </section>
  );
}