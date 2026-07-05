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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-faq", {
        y: 40,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
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
      // Changed h-screen to min-h-screen for mobile content expansion
      className="relative w-full min-h-screen bg-[#f8f8f8] text-black flex flex-col py-20 px-6 md:py-32 md:px-12 lg:px-24 overflow-hidden"
    >
      <style jsx>{`
        .serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        .capsule-cta {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 6px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .btn-green-gigantic {
          background-color: #58ae3a;
          color: #fff;
          padding: 14px 28px; /* Responsive padding */
          border-radius: 999px;
          font-weight: 900;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 10px 20px -5px rgba(88, 174, 58, 0.3);
          white-space: nowrap;
        }

        @media (min-width: 768px) {
          .btn-green-gigantic {
            padding: 18px 48px;
            font-size: 16px;
          }
          .capsule-cta { padding: 8px; gap: 12px; }
        }

        .faq-border {
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .icon-wrapper {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.03);
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        @media (min-width: 768px) {
          .icon-wrapper { width: 44px; height: 44px; }
        }

        .is-open .icon-wrapper {
          background: #000;
          color: #fff;
          transform: rotate(135deg);
        }

        .display-text {
          line-height: 0.85;
          letter-spacing: -0.04em;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* LEFT: TITLE & CTA */}
        <div className="lg:col-span-5 flex flex-col justify-between lg:sticky lg:top-32">
          <div className="reveal-faq">
            <span className="block text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 text-[#58ae3a]">
              Common Inquiries
            </span>
            <h2 className="display-text text-6xl md:text-8xl lg:text-[6vw] font-black italic uppercase">
              Got <br /> 
              <span className="serif-italic font-normal lowercase tracking-normal text-[#58ae3a]">
                questions?
              </span>
            </h2>
            <p className="mt-6 md:mt-8 max-w-sm text-base md:text-lg opacity-50 font-medium leading-relaxed">
              Everything you need to know about our craft, booking, and policy.
            </p>
          </div>

          <div className="reveal-faq mt-10 md:mt-16">
            <Link href="/booking" className="capsule-cta group">
              <span className="pl-5 pr-1 text-[11px] md:text-[13px] font-black uppercase tracking-[0.15em] opacity-40">
                Still unsure?
              </span>
              <span className="btn-green-gigantic flex items-center gap-3 group-hover:bg-[#4d9a32] transition-all duration-300 group-hover:scale-[1.02]">
                Contact Us <ArrowRight size={18} strokeWidth={3} />
              </span>
            </Link>
          </div>
        </div>

        {/* RIGHT: ACCORDION LIST */}
        <div className="lg:col-span-7 mt-12 lg:mt-0">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`reveal-faq faq-border group cursor-pointer py-6 md:py-10 transition-colors ${isOpen ? 'is-open' : ''}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="flex justify-between items-center gap-6">
                  <h3 className={`text-xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#58ae3a]' : 'text-black'}`}>
                    {faq.q}
                  </h3>
                  <div className="icon-wrapper flex-shrink-0">
                    <Plus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                  </div>
                </div>

                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[300px] opacity-100 mt-6 md:mt-8' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-base md:text-xl text-black/60 font-medium max-w-2xl leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Accent - Adjusted for better mobile positioning */}
      <div className="absolute top-1/2 -right-10 lg:-left-10 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0">
        <h1 className="text-[40vw] lg:text-[30vw] font-black">FAQ</h1>
      </div>
    </section>
  );
}