"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useBooking } from "@/hooks/useBooking";
import { BOOKING_STEPS, BARBERS } from "@/data/services";
import { CheckCircle2, AlertCircle } from "lucide-react";
import StepServiceSelect from "./StepServiceSelect";
import StepBarberSelect  from "./StepBarberSelect";
import StepDateTime      from "./StepDateTime";
import StepClientDetails from "./StepClientDetails";
import StepConfirm       from "./StepConfirm";
import BookingSuccess    from "./BookingSuccess";

export default function BookingWizard() {
  const {
    step, data, isSubmitting, isSuccess, error, bookingId,
    updateData, nextStep, prevStep, submit, reset,
  } = useBooking();
  const params = useSearchParams();

  useEffect(() => {
    const barber  = params.get("barber");
    const service = params.get("service");
    if (barber && BARBERS.find((b) => b.id === barber)) updateData({ barberId: barber });
    if (service) updateData({ serviceId: service });
  }, [params, updateData]);

  if (isSuccess) {
    return <BookingSuccess bookingId={bookingId} data={data} onReset={reset} />;
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* ── STEP INDICATOR ── */}
      <div className="mb-12">
        <div className="flex items-center justify-between gap-2">
          {BOOKING_STEPS.map((s, i) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;
            
            return (
              <div key={s.id} className="flex-1 group">
                <div className="flex flex-col gap-3">
                  {/* The Line/Bar */}
                  <div className="relative h-[3px] w-full bg-black/5 overflow-hidden rounded-full">
                    <div 
                      className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                        isCompleted ? "translate-x-0 bg-[#58ae3a]" : isActive ? "-translate-x-1/2 bg-black" : "-translate-x-full"
                      }`} 
                    />
                  </div>
                  
                  {/* Label */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
                      isActive ? "text-black" : isCompleted ? "text-[#58ae3a]" : "text-black/20"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 size={12} strokeWidth={3} className="inline mr-1" />
                      ) : (
                        `0${s.id}`
                      )}
                      <span className="hidden sm:inline ml-1">{s.label}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── ERROR BANNER ── */}
      {error && (
        <div className="mb-8 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl animate-in shake duration-500">
          <AlertCircle size={18} />
          <p className="text-sm font-bold uppercase tracking-tight">{error}</p>
        </div>
      )}

      {/* ── STEP PANELS ── */}
      <div className="min-h-[400px]">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <StepServiceSelect data={data} updateData={updateData} onNext={nextStep} />
          </div>
        )}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <StepBarberSelect data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />
          </div>
        )}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <StepDateTime data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />
          </div>
        )}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <StepClientDetails data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />
          </div>
        )}
        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <StepConfirm data={data} onBack={prevStep} onSubmit={submit} isSubmitting={isSubmitting} />
          </div>
        )}
      </div>

      {/* ── WIZARD FOOTER DECOR ── */}
      <div className="mt-12 pt-8 border-t border-black/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#58ae3a] animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/20">
            Live Availability
          </span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/20">
          Step {step} of {BOOKING_STEPS.length}
        </span>
      </div>

    </div>
  );
}