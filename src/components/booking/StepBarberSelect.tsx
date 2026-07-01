"use client";

import { Star, Award, ArrowLeft, ArrowRight } from "lucide-react";
import { BARBERS } from "@/data/services";
import type { BookingFormData } from "@/types";

interface Props {
  data: Partial<BookingFormData>;
  updateData: (d: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepBarberSelect({ data, updateData, onNext, onBack }: Props) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-3">
          Pick your <span className="font-serif italic lowercase font-normal tracking-normal text-[#58ae3a]">stylist.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
          Each artist brings something unique to the craft.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BARBERS.map((b) => {
          const isSelected = data.barberId === b.id;
          return (
            <button
              key={b.id}
              onClick={() => updateData({ barberId: b.id })}
              className={`relative p-6 rounded-[32px] text-left transition-all duration-500 border-2 group ${
                isSelected 
                ? "border-black bg-black text-white shadow-xl scale-[1.02]" 
                : "border-black/5 bg-[#f8f8f8] text-black hover:border-black/20"
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                {/* Initial Circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-black transition-colors duration-500 ${
                  isSelected ? "bg-[#58ae3a] text-white" : "bg-black text-white"
                }`}>
                  {b.name.charAt(0)}
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <Star size={12} fill={isSelected ? "#58ae3a" : "#F5C518"} className="border-none" />
                  <span className={`text-[11px] font-black ${isSelected ? "text-white" : "text-black"}`}>
                    {b.rating}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1 mb-4">
                <h3 className="text-xl font-black uppercase tracking-tight leading-none">
                  {b.name}
                </h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? "text-[#58ae3a]" : "text-black/40"}`}>
                  {b.title}
                </p>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-6">
                {b.specialties.slice(0, 2).map((s) => (
                  <span 
                    key={s} 
                    className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                      isSelected ? "border-white/20 bg-white/5" : "border-black/10 bg-black/5 text-black/60"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Experience Footer */}
              <div className={`flex items-center gap-2 pt-4 border-t ${isSelected ? "border-white/10" : "border-black/5"}`}>
                <Award size={14} className={isSelected ? "text-[#58ae3a]" : "text-black/20"} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-white/40" : "text-black/20"}`}>
                  {b.experience} Years Master Experience
                </span>
              </div>

              {/* Selection Checkmark */}
              {isSelected && (
                <div className="absolute top-6 right-6">
                   <div className="w-6 h-6 bg-[#58ae3a] rounded-full flex items-center justify-center animate-in zoom-in">
                      <ArrowRight size={14} strokeWidth={4} />
                   </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <NavRow onBack={onBack} onNext={onNext} canNext={!!data.barberId} />
    </div>
  );
}

function NavRow({ onBack, onNext, canNext }: { onBack: () => void; onNext: () => void; canNext: boolean }) {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-black/5">
      {/* BACK BUTTON */}
      <button 
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

      {/* CONTINUE BUTTON */}
      <button 
        onClick={onNext}
        disabled={!canNext}
        className={`group flex items-center bg-black/5 border border-black/10 p-1.5 rounded-full transition-all ${
          canNext ? "opacity-100 hover:bg-black/10" : "opacity-30 cursor-not-allowed"
        }`}
      >
        <span className="px-8 text-[11px] font-black uppercase tracking-widest text-black/60">
          Continue
        </span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          canNext ? "bg-[#58ae3a] text-white group-hover:scale-105" : "bg-black/20 text-white"
        }`}>
          <ArrowRight size={18} strokeWidth={3} />
        </div>
      </button>
    </div>
  );
}