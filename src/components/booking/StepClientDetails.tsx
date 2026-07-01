"use client";

import { useState } from "react";
import { User, Mail, Phone, MessageSquare, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import type { BookingFormData } from "@/types";

interface Props {
  data: Partial<BookingFormData>;
  updateData: (d: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepClientDetails({ data, updateData, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.clientName?.trim()) e.clientName = "Name is required";
    if (!data.clientEmail?.trim()) e.clientEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.clientEmail)) e.clientEmail = "Enter a valid email";
    if (!data.clientPhone?.trim()) e.clientPhone = "Phone is required";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-3">
          Your <span className="font-serif italic lowercase font-normal tracking-normal text-[#58ae3a]">details.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
          We&apos;ll send your confirmation and reminder here.
        </p>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field 
          label="Full Name" 
          icon={<User size={16} />} 
          value={data.clientName ?? ""} 
          onChange={(v) => updateData({ clientName: v })} 
          error={errors.clientName} 
          placeholder="Harry Styles" 
        />
        
        <Field 
          label="Email Address" 
          icon={<Mail size={16} />} 
          value={data.clientEmail ?? ""} 
          onChange={(v) => updateData({ clientEmail: v })} 
          error={errors.clientEmail} 
          placeholder="you@example.com" 
          type="email" 
        />
        
        <Field 
          label="Phone Number" 
          icon={<Phone size={16} />} 
          value={data.clientPhone ?? ""} 
          onChange={(v) => updateData({ clientPhone: v })} 
          error={errors.clientPhone} 
          placeholder="+1 (780) 555-0100" 
          type="tel" 
        />

        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/30 mb-3 ml-2">
            <MessageSquare size={14} /> Notes (Optional)
          </label>
          <textarea 
            rows={3} 
            placeholder="Any specific requests or preferences..."
            value={data.notes ?? ""} 
            onChange={(e) => updateData({ notes: e.target.value })}
            className="w-full bg-[#f8f8f8] border border-black/5 rounded-[24px] p-6 text-sm font-bold placeholder:text-black/20 focus:outline-none focus:border-[#58ae3a] focus:bg-white transition-all resize-none"
          />
        </div>
      </div>

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-black/5">
        <button 
          type="button"
          onClick={onBack}
          className="group flex items-center gap-3 bg-black/5 border border-black/10 p-1.5 rounded-full transition-all hover:bg-black/10"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:-translate-x-1">
            <ArrowLeft size={18} strokeWidth={3} className="text-black" />
          </div>
          <span className="pr-6 text-[11px] font-black uppercase tracking-widest text-black/60">
            Back
          </span>
        </button>

        <button 
          type="button"
          onClick={() => validate() && onNext()}
          className="group flex items-center bg-black/5 border border-black/10 p-1.5 rounded-full transition-all hover:bg-black/10"
        >
          <span className="px-8 text-[11px] font-black uppercase tracking-widest text-black/60">
            Continue
          </span>
          <div className="w-10 h-10 rounded-full bg-[#58ae3a] text-white flex items-center justify-center transition-all group-hover:scale-105">
            <ArrowRight size={18} strokeWidth={3} />
          </div>
        </button>
      </div>
    </div>
  );
}

function Field({ label, icon, value, onChange, error, placeholder, type = "text" }: {
  label: string; icon: React.ReactNode; value: string;
  onChange: (v: string) => void; error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/30 mb-3 ml-2">
        {icon}{label}
      </label>
      <div className="relative">
        <input 
          type={type} 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder={placeholder}
          className={`
            w-full bg-[#f8f8f8] border rounded-full px-6 py-4 text-sm font-bold placeholder:text-black/20 transition-all focus:outline-none focus:bg-white
            ${error ? "border-red-200 bg-red-50" : "border-black/5 focus:border-[#58ae3a]"}
          `}
        />
        {error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-red-500">
            <AlertCircle size={14} />
            <span className="text-[10px] font-black uppercase tracking-tight">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}