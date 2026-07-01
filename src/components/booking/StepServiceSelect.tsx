"use client";

import { Clock, Star, ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { formatPrice, formatDuration } from "@/lib/utils";
import type { BookingFormData } from "@/types";

interface Props {
  data: Partial<BookingFormData>;
  updateData: (d: Partial<BookingFormData>) => void;
  onNext: () => void;
}

const CATEGORIES = [
  { id: "haircut", label: "Haircuts" },
  { id: "beard", label: "Beard" },
  { id: "color", label: "Color" },
  { id: "treatment", label: "Treatments" },
  { id: "combo", label: "Combos" },
] as const;

export default function StepServiceSelect({ data, updateData, onNext }: Props) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-3">
          Choose your <span className="font-serif italic lowercase font-normal tracking-normal text-[#58ae3a]">service.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
          Select the craft you&apos;d like to experience today.
        </p>
      </div>

      {CATEGORIES.map((cat) => {
        const items = SERVICES.filter((s) => s.category === cat.id);
        if (!items.length) return null;
        return (
          <div key={cat.id} className="mb-10">
            {/* Category Label */}
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">
                {cat.label}
              </h3>
              <div className="h-px flex-1 bg-black/5" />
            </div>

            {/* Grid of Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((s) => {
                const isSelected = data.serviceId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => updateData({ serviceId: s.id })}
                    className={`relative p-6 rounded-[32px] text-left transition-all duration-500 border-2 flex flex-col group ${
                      isSelected
                        ? "border-black bg-black text-white shadow-xl scale-[1.02]"
                        : "border-black/5 bg-[#f8f8f8] text-black hover:border-black/10"
                    }`}
                  >
                    {/* Popular Badge */}
                    {s.popular && (
                      <div className="flex items-center gap-1.5 mb-4">
                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                          isSelected ? "bg-[#58ae3a] text-white" : "bg-black text-white"
                        }`}>
                          <Star size={10} fill="currentColor" /> Popular Choice
                        </div>
                      </div>
                    )}

                    {/* Title & Description */}
                    <div className="mb-6 flex-grow">
                      <h4 className="text-lg font-black uppercase tracking-tight leading-none mb-2">
                        {s.name}
                      </h4>
                      <p className={`text-xs font-medium leading-relaxed ${isSelected ? "text-white/40" : "text-black/40"}`}>
                        {s.description}
                      </p>
                    </div>

                    {/* Price & Time Footer */}
                    <div className={`flex justify-between items-center pt-4 border-t ${isSelected ? "border-white/10" : "border-black/5"}`}>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className={isSelected ? "text-[#58ae3a]" : "text-black/20"} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-white/40" : "text-black/40"}`}>
                          {formatDuration(s.duration)}
                        </span>
                      </div>
                      <span className={`text-xl font-black ${isSelected ? "text-[#58ae3a]" : "text-black"}`}>
                        {formatPrice(s.price)}
                      </span>
                    </div>

                    {/* Selection Indicator */}
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
          </div>
        );
      })}

      {/* NAVIGATION FOOTER */}
      <div className="flex justify-end items-center mt-12 pt-8 border-t border-black/5">
        <button
          onClick={onNext}
          disabled={!data.serviceId}
          className={`group flex items-center bg-black/5 border border-black/10 p-1.5 rounded-full transition-all ${
            data.serviceId ? "opacity-100 hover:bg-black/10" : "opacity-30 cursor-not-allowed"
          }`}
        >
          <span className="px-8 text-[11px] font-black uppercase tracking-widest text-black/60">
            Continue
          </span>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              data.serviceId
                ? "bg-[#58ae3a] text-white group-hover:scale-105"
                : "bg-black/20 text-white"
            }`}
          >
            <ArrowRight size={18} strokeWidth={3} />
          </div>
        </button>
      </div>
    </div>
  );
}