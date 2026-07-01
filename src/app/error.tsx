"use client";

import { useEffect } from "react";
import Link from "next/link"; // Added this
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-black flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
        <h1 className="text-[50vw] font-black leading-none">ERROR</h1>
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        {/* TOP BADGE */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-black/5 bg-black/5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <AlertTriangle size={16} className="text-[#58ae3a]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
            System Alert
          </span>
        </div>

        {/* GIGANTIC HEADLINE */}
        <h1 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Something went <br />
          <span className="font-serif italic lowercase font-normal tracking-normal text-[#58ae3a]">sideways.</span>
        </h1>

        <p className="text-lg md:text-xl text-black/40 font-medium leading-relaxed max-w-md mx-auto mb-12 animate-in fade-in duration-1000 delay-300">
          An unexpected error occurred in the shop. Let&apos;s try to refresh the craft or head back home.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          
          {/* PRIMARY: RESET */}
          <button 
            onClick={reset}
            className="group flex items-center bg-black border border-black p-1.5 rounded-full transition-all hover:scale-[1.05]"
          >
            <span className="px-8 text-[11px] font-black uppercase tracking-widest text-white/50">
              Try Again
            </span>
            <div className="w-12 h-12 rounded-full bg-[#58ae3a] text-white flex items-center justify-center transition-transform group-hover:rotate-180 duration-700 shadow-lg shadow-[#58ae3a]/20">
              <RefreshCw size={20} strokeWidth={2.5} />
            </div>
          </button>

          {/* SECONDARY: HOME (Fixed with Link component) */}
          <Link 
            href="/" 
            className="group flex items-center bg-black/5 border border-black/10 p-1.5 rounded-full transition-all hover:bg-black/10"
          >
            <span className="px-8 text-[11px] font-black uppercase tracking-widest text-black/40">
              Back to Home
            </span>
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:-translate-x-1 shadow-sm">
              <Home size={20} strokeWidth={2.5} />
            </div>
          </Link>

        </div>
      </div>

      {/* FOOTER DECOR */}
      <div className="absolute bottom-10 right-10 hidden md:block opacity-10">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black">
          Harry&apos;s Hair Hub — Technical Service
        </p>
      </div>
    </div>
  );
}