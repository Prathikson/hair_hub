"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Check, CalendarCheck, ArrowRight, Home, RefreshCw } from "lucide-react";
import { SERVICES, BARBERS } from "@/data/services";
import { formatPrice, formatDateDisplay } from "@/lib/utils";
import type { BookingFormData } from "@/types";

interface Props {
  bookingId: string | null;
  data: Partial<BookingFormData>;
  onReset: () => void;
}

export default function BookingSuccess({ bookingId, data, onReset }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const service = SERVICES.find((s) => s.id === data.serviceId);
  const barber = BARBERS.find((b) => b.id === data.barberId);

  useEffect(() => {
    if (!boxRef.current) return;
    
    // Satisfying "Pop" entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".success-content",
        { opacity: 0, scale: 0.9, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "back.out(1.7)", 
          stagger: 0.1 
        }
      );
      
      gsap.from(".success-icon", {
        scale: 0,
        rotation: -45,
        duration: 0.6,
        delay: 0.2,
        ease: "back.out(2)"
      });
    }, boxRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={boxRef} className="text-center py-10 max-w-xl mx-auto">
      
      {/* SUCCESS ICON */}
      <div className="success-icon mb-10 relative inline-block">
        <div className="w-24 h-24 rounded-full bg-[#58ae3a] flex items-center justify-center shadow-2xl shadow-[#58ae3a]/40">
          <Check size={48} strokeWidth={4} className="text-white" />
        </div>
        {/* Decorative Ring */}
        <div className="absolute inset-[-10px] border-2 border-dashed border-[#58ae3a]/20 rounded-full animate-[spin_10s_linear_infinite]" />
      </div>

      {/* GIGANTIC HEADER */}
      <div className="success-content mb-6">
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
          You&apos;re all <br />
          <span className="font-serif italic lowercase font-normal tracking-normal text-[#58ae3a]">set.</span>
        </h2>
        <p className="text-sm font-medium text-black/40 leading-relaxed max-w-xs mx-auto">
          Your chair is ready. We&apos;ve sent a confirmation to <span className="text-black font-bold">{data.clientEmail}</span>.
        </p>
      </div>

      {/* SUMMARY RECEIPT CARD */}
      <div className="success-content bg-white border border-black/5 rounded-[40px] p-8 md:p-10 shadow-xl shadow-black/5 text-left mb-10 relative overflow-hidden">
        {/* Subtle Backdrop Pattern */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none uppercase font-black text-6xl">
          Paid
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#58ae3a]/10 flex items-center justify-center text-[#58ae3a]">
            <CalendarCheck size={16} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
            Booking ID: #{bookingId}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {service && <SummaryItem label="Service" value={service.name} />}
          {barber && <SummaryItem label="Barber" value={barber.name} />}
          {data.date && (
            <SummaryItem 
              label="Appointment" 
              value={`${formatDateDisplay(new Date(data.date))} @ ${data.timeSlot}`} 
              fullWidth 
            />
          )}
        </div>

        {/* PRICE FOOTER */}
        <div className="mt-8 pt-8 border-t border-black/5 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30">Total Value</p>
            <p className="text-xs font-medium text-black/40 italic">Payment due in-shop</p>
          </div>
          <span className="text-3xl font-black tracking-tighter text-[#58ae3a]">
            {service ? formatPrice(service.price) : "$0.00"}
          </span>
        </div>
      </div>

      <p className="success-content text-[10px] font-bold uppercase tracking-tight text-black/30 mb-10">
        Please arrive 5 minutes early. Welcome to the hub.
      </p>

      {/* ACTION BUTTONS */}
      <div className="success-content flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/" className="group flex items-center bg-black border border-black p-1.5 rounded-full transition-all hover:scale-[1.05]">
          <span className="px-8 text-[11px] font-black uppercase tracking-widest text-white/50">
            Home
          </span>
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
            <Home size={18} strokeWidth={2.5} />
          </div>
        </Link>

        <button 
          onClick={onReset}
          className="group flex items-center bg-black/5 border border-black/10 p-1.5 rounded-full transition-all hover:bg-black/10"
        >
          <span className="px-8 text-[11px] font-black uppercase tracking-widest text-black/40">
            Book Another
          </span>
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:rotate-180 duration-500">
            <RefreshCw size={18} strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, fullWidth }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <div className={`${fullWidth ? "col-span-2" : "col-span-1"} space-y-1`}>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/20">{label}</p>
      <p className="text-sm font-bold tracking-tight text-black uppercase leading-tight">{value}</p>
    </div>
  );
}