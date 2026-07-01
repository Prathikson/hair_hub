"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2, Clock, Calendar as CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { 
  format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval,
  isSameDay, isSameMonth, startOfWeek, endOfWeek, isToday, addDays 
} from "date-fns";
import { useAvailability } from "@/hooks/useAvailability";
import type { BookingFormData } from "@/types";

interface Props {
  data: Partial<BookingFormData>;
  updateData: (d: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function StepDateTime({ data, updateData, onNext, onBack }: Props) {
  const [viewDate, setViewDate] = useState(new Date());
  
  // Safe extraction of selectedDate
  const selectedDate = data.date || null;

  const { slots, loading } = useAvailability(data.barberId ?? null, selectedDate);
  
  const minDate = useMemo(() => addDays(new Date(), 1), []);

  const calDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate));
    const end = endOfWeek(endOfMonth(viewDate));
    return eachDayOfInterval({ start, end });
  }, [viewDate]);

  // FIX: This prevents the infinite re-render loop
  const selectDate = useCallback((day: Date) => {
    // Only update if the day is actually different from the current state
    if (data.date && isSameDay(day, data.date)) return;
    
    updateData({ 
      date: day, // Pass the Date object directly to satisfy TypeScript
      timeSlot: undefined 
    });
  }, [data.date, updateData]);

  const canContinue = !!selectedDate && !!data.timeSlot;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-3">
          Pick a <span className="font-serif italic lowercase font-normal tracking-normal text-[#58ae3a]">time.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
          Mon–Sat. Sundays we recharge the craft.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* CALENDAR */}
        <div className="bg-white border border-black/5 rounded-[40px] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <button onClick={() => setViewDate((d) => addMonths(d, -1))} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="font-black uppercase tracking-widest text-sm">
              {format(viewDate, "MMMM yyyy")}
            </span>
            <button onClick={() => setViewDate((d) => addMonths(d, 1))} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-black uppercase tracking-widest text-black/20 py-2">
                {d}
              </div>
            ))}
            {calDays.map((day, i) => {
              const isExternal = !isSameMonth(day, viewDate);
              const isPast = day < minDate;
              const isSunday = day.getDay() === 0;
              const isDisabled = isExternal || isPast || isSunday;
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const currentToday = isToday(day);

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => !isDisabled && selectDate(day)}
                  disabled={isDisabled}
                  className={`
                    aspect-square flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300
                    ${isSelected ? "bg-black text-white scale-110 shadow-lg" : ""}
                    ${!isSelected && !isDisabled ? "hover:bg-black/5 text-black" : ""}
                    ${isDisabled ? "text-black/10 cursor-not-allowed" : ""}
                    ${currentToday && !isSelected ? "text-[#58ae3a] border border-[#58ae3a]/30" : ""}
                  `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
          
          <div className="mt-6 flex gap-4 items-center justify-center">
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#58ae3a]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Today</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-black/10" />
                <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Unavailable</span>
             </div>
          </div>
        </div>

        {/* SLOTS */}
        <div className={`rounded-[40px] p-8 transition-all duration-500 min-h-[400px] flex flex-col ${
          selectedDate ? "bg-black text-white" : "bg-[#f8f8f8] border border-black/5"
        }`}>
          {!selectedDate ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-20">
              <CalendarIcon size={48} strokeWidth={1} />
              <p className="text-xs font-black uppercase tracking-[0.3em]">Select a date to <br /> view availability</p>
            </div>
          ) : loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <Loader2 size={32} className="animate-spin text-[#58ae3a]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Checking schedule...</span>
            </div>
          ) : slots.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/40">No slots available <br /> for this date.</p>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-center gap-3 mb-8">
                <Clock size={16} className="text-[#58ae3a]" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em]">
                  {format(selectedDate, "EEEE, MMM d")}
                </h3>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {slots.map((slot) => {
                  const isSlotSelected = data.timeSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => slot.available && updateData({ timeSlot: slot.time })}
                      className={`
                        py-4 rounded-2xl text-xs font-black transition-all duration-300 border
                        ${!slot.available ? "opacity-10 cursor-not-allowed border-white/5" : ""}
                        ${isSlotSelected ? "bg-[#58ae3a] border-[#58ae3a] text-white shadow-lg scale-[1.05]" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}
                      `}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-black/5">
        <button type="button" onClick={onBack} className="group flex items-center gap-3 bg-black/5 border border-black/10 p-1.5 rounded-full transition-all hover:bg-black/10">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:-translate-x-1">
            <ArrowLeft size={18} strokeWidth={3} className="text-black" />
          </div>
          <span className="pr-6 text-[11px] font-black uppercase tracking-widest text-black/60">Back</span>
        </button>

        <button 
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className={`group flex items-center bg-black/5 border border-black/10 p-1.5 rounded-full transition-all ${
            canContinue ? "opacity-100 hover:bg-black/10" : "opacity-30 cursor-not-allowed"
          }`}
        >
          <span className="px-8 text-[11px] font-black uppercase tracking-widest text-black/60">Continue</span>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            canContinue ? "bg-[#58ae3a] text-white group-hover:scale-105" : "bg-black/20 text-white"
          }`}>
            <ArrowRight size={18} strokeWidth={3} />
          </div>
        </button>
      </div>
    </div>
  );
}