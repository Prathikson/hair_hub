"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Plus } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  { q: "Do I need to book in advance?", a: "We strongly recommend booking online to secure your preferred time. Walk-ins are welcome but subject to availability." },
  { q: "How long does a haircut take?", a: "Standard cuts take 30–45 minutes. Combo services (cut + beard) are 75 minutes. We never rush perfection." },
  { q: "What products do you use?", a: "We use only professional-grade products — Kevin Murphy and Layrite — selected for quality and skin safety." },
  { q: "Can I request a specific barber?", a: "Absolutely. During booking, you can choose your preferred barber. We always honour your selection." },
  { q: "What is your cancellation policy?", a: "We ask for at least 24 hours notice to cancel. This keeps our artists' schedules fair for everyone." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-faq", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-[#f8f8f8] text-black flex flex-col justify-center p-8 md:p-16 lg:px-24"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        /* UPDATED: Larger Capsule Wrapper */
        .capsule-cta {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 8px; /* Increased from 5px */
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .capsule-cta:hover {
          background: rgba(0, 0, 0, 0.05);
          border-color: rgba(0, 0, 0, 0.15);
        }

        /* UPDATED: Gigantic Button Style */
        .btn-green-gigantic {
          background-color: #58ae3a;
          color: #fff;
          padding: 18px 48px; /* Massive padding */
          border-radius: 999px;
          font-weight: 900;
          font-size: 16px; /* Larger font */
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 10px 20px -5px rgba(88, 174, 58, 0.3);
        }

        .faq-border {
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .icon-wrapper {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.03);
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .is-open .icon-wrapper {
          background: #000;
          color: #fff;
          transform: rotate(135deg);
        }

        .display-text {
          line-height: 0.9;
          letter-spacing: -0.04em;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start h-full max-h-[80vh]">
        
        {/* LEFT: GIGANTIC TITLE */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full py-4">
          <div className="reveal-faq">
            <span className="block text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-30">Our Advice</span>
            <h2 className="display-text text-[10vw] md:text-[6vw] lg:text-[5vw] font-black italic uppercase">
              Got <br /> <span className="serif-italic font-normal lowercase tracking-normal">questions?</span>
            </h2>
            <p className="mt-8 max-w-xs text-base opacity-50 font-medium leading-relaxed">
              Everything you need to know about our craft, booking, and policy.
            </p>
          </div>

          {/* UPDATED: Gigantic CTA Section */}
          <div className="reveal-faq mt-12">
            <Link href="/booking" className="capsule-cta group">
              <span className="px-8 text-[13px] font-black uppercase tracking-[0.2em] opacity-40">
                Still unsure?
              </span>
              <span className="btn-green-gigantic flex items-center gap-3 group-hover:bg-[#4d9a32] transition-all duration-300 group-hover:scale-[1.02]">
                Contact Us <ArrowRight size={20} strokeWidth={3} />
              </span>
            </Link>
          </div>
        </div>

        {/* RIGHT: ACCORDION LIST */}
        <div ref={contentRef} className="lg:col-span-7 h-full flex flex-col justify-center">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`reveal-faq faq-border group cursor-pointer py-6 md:py-8 ${isOpen ? 'is-open' : ''}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="flex justify-between items-center gap-8">
                  <h3 className={`text-lg md:text-2xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#58ae3a]' : 'text-black'}`}>
                    {faq.q}
                  </h3>
                  <div className="icon-wrapper flex-shrink-0">
                    <Plus size={20} strokeWidth={3} />
                  </div>
                </div>

                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-base md:text-lg text-black/50 font-medium max-w-xl leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute top-1/2 -left-10 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[30vw] font-black">FAQ</h1>
      </div>
    </section>
  );
}