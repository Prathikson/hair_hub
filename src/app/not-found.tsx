import Link from "next/link";
import { ArrowRight, Scissors, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
        <h1 className="text-[60vw] font-black leading-none">404</h1>
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        {/* TOP BADGE */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Scissors size={16} className="text-[#58ae3a]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
            Error Code: 404
          </span>
        </div>

        {/* GIGANTIC HEADLINE */}
        <h1 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          This page <br />
          got a <span className="font-serif italic lowercase font-normal tracking-normal text-[#58ae3a]">trim.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed max-w-md mx-auto mb-12 animate-in fade-in duration-1000 delay-300">
          Looks like the page you were looking for has been styled out of existence. Let&apos;s get you back to the hub.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          
          {/* PRIMARY: HOME */}
          <Link href="/" className="group flex items-center bg-white border border-white p-1.5 rounded-full transition-all hover:scale-[1.05]">
            <span className="px-8 text-[11px] font-black uppercase tracking-widest text-black/50">
              Back to Home
            </span>
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:-translate-x-1">
              <Home size={20} strokeWidth={2.5} />
            </div>
          </Link>

          {/* SECONDARY: BOOKING */}
          <Link href="/booking" className="group flex items-center bg-white/5 border border-white/10 p-1.5 rounded-full transition-all hover:bg-white/10">
            <span className="px-8 text-[11px] font-black uppercase tracking-widest text-white/50">
              Book Anyway
            </span>
            <div className="w-12 h-12 rounded-full bg-[#58ae3a] text-white flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-[#58ae3a]/20">
              <ArrowRight size={20} strokeWidth={3} />
            </div>
          </Link>

        </div>
      </div>

      {/* FOOTER DECOR */}
      <div className="absolute bottom-10 left-10 hidden md:block opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">
          Harry&apos;s Hair Hub — Edmonton
        </p>
      </div>
    </div>
  );
}