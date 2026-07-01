"use client";

import { Loader2, CalendarCheck, Clock, User, Scissors, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { SERVICES, BARBERS } from "@/data/services";
import { formatPrice, formatDuration, formatDateDisplay } from "@/lib/utils";
import type { BookingFormData } from "@/types";

interface Props {
  data: Partial<BookingFormData>;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export default function StepConfirm({ data, onBack, onSubmit, isSubmitting }: Props) {
  const service = SERVICES.find((s) => s.id === data.serviceId);
  const barber = BARBERS.find((b) => b.id === data.barberId);
  
  if (!service || !barber) return null;

  const rows = [
    { icon: <Scissors size={14} />, label: "Service", value: service.name },
    { icon: <User size={14} />, label: "Barber", value: barber.name },
    { icon: <CalendarCheck size={14} />, label: "Date", value: data.date ? formatDateDisplay(new Date(data.date)) : "" },
    { icon: <Clock size={14} />, label: "Time", value: data.timeSlot ?? "" },
    { icon: <Clock size={14} />, label: "Duration", value: formatDuration(service.duration) },
    { icon: <User size={14} />, label: "Client", value: data.clientName ?? "" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-3">
          Review & <span className="font-serif italic lowercase font-normal tracking-normal text-[#58ae3a]">confirm.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
          Everything look right? Let&apos;s lock in your chair.
        </p>
      </div>

      {/* SUMMARY BENTO CARD */}
      <div className="bg-[#1a1a1a] text-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-black/20 mb-8 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 mb-10">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#58ae3a] flex-shrink-0">
                {r.icon}
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">{r.label}</p>
                <p className="text-sm font-bold tracking-tight">{r.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL PRICE SECTION */}
        <div className="border-t border-white/10 pt-8 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#58ae3a]">Payment Details</p>
            <p className="text-xs font-medium text-white/40">Total due in-shop</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black tracking-tighter text-white">
              {formatPrice(service.price)}
            </span>
          </div>
        </div>
      </div>

      {/* POLICY NOTE */}
      <div className="flex items-center gap-3 px-6 py-4 bg-black/5 rounded-3xl mb-12">
        <ShieldCheck size={16} className="text-black/20" />
        <p className="text-[10px] font-bold uppercase tracking-tight text-black/40 leading-relaxed">
          Payment collected in-shop. Please provide 24h notice for cancellations.
        </p>
      </div>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between items-center pt-8 border-t border-black/5">
        <button 
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="group flex items-center gap-3 bg-black/5 border border-black/10 p-1.5 rounded-full transition-all hover:bg-black/10 disabled:opacity-30"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:-translate-x-1 shadow-sm">
            <ArrowLeft size={18} strokeWidth={3} className="text-black" />
          </div>
          <span className="pr-6 text-[11px] font-black uppercase tracking-widest text-black/60">
            Edit
          </span>
        </button>

        <button 
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`group flex items-center bg-black/5 border border-black/10 p-1.5 rounded-full transition-all ${
            isSubmitting ? "opacity-70 cursor-wait" : "hover:bg-black/10"
          }`}
        >
          <span className="px-10 text-[11px] font-black uppercase tracking-widest text-black/60">
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </span>
          <div className={`w-10 h-10 rounded-full bg-[#58ae3a] text-white flex items-center justify-center transition-all ${
            !isSubmitting && "group-hover:scale-105"
          }`}>
            {isSubmitting ? (
              <Loader2 size={18} strokeWidth={3} className="animate-spin" />
            ) : (
              <ArrowRight size={18} strokeWidth={3} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}