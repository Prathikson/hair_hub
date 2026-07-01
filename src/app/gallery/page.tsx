"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Grid3X3, LayoutGrid } from "lucide-react";

type Category = "all" | "cuts" | "beards" | "color" | "studio";

const GALLERY_ITEMS = [
  { id: "g1", category: "cuts", label: "Classic Side Part", aspect: "aspect-[4/3]", bg: "bg-[#1a1a1f]" },
  { id: "g2", category: "beards", label: "Full Beard Sculpt", aspect: "aspect-[3/4]", bg: "bg-[#2D4A31]" },
  { id: "g3", category: "color", label: "Balayage Highlight", aspect: "aspect-[4/3]", bg: "bg-[#98D8F4]" },
  { id: "g4", category: "cuts", label: "Skin Fade", aspect: "aspect-[3/4]", bg: "bg-[#F2D600]" },
  { id: "g5", category: "studio", label: "The Chair", aspect: "aspect-[4/3]", bg: "bg-[#1A1A1A]" },
  { id: "g6", category: "beards", label: "Hot Towel Shave", aspect: "aspect-square", bg: "bg-[#58AE3A]" },
  { id: "g7", category: "cuts", label: "Textured Crop", aspect: "aspect-[4/3]", bg: "bg-[#2D4A31]" },
  { id: "g8", category: "color", label: "Rich Brunette Tone", aspect: "aspect-[3/4]", bg: "bg-[#1a1a1f]" },
  { id: "g9", category: "studio", label: "Reception Detail", aspect: "aspect-[4/3]", bg: "bg-[#98D8F4]" },
  { id: "g10", category: "cuts", label: "Pompadour", aspect: "aspect-[3/4]", bg: "bg-[#1A1A1A]" },
  { id: "g11", category: "beards", label: "Precise Line-up", aspect: "aspect-square", bg: "bg-[#F2D600]" },
  { id: "g12", category: "studio", label: "Station & Tools", aspect: "aspect-[4/3]", bg: "bg-[#58AE3A]" },
];

const TABS: { id: Category; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "cuts", label: "Cuts" },
  { id: "beards", label: "Beards" },
  { id: "color", label: "Color" },
  { id: "studio", label: "Studio" },
];

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("all");
  const [view, setView] = useState<"masonry" | "grid">("masonry");

  const filtered = active === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active);

  return (
    <div className="bg-[#f8f8f8] min-h-screen pt-20">
      {/* HERO HEADER */}
      <header className="relative pt-24 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="relative z-10">
          <span className="block text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-black/30">
            Our Portfolio
          </span>
          <h1 className="leading-[0.85] tracking-[-0.04em] text-[12vw] md:text-[8vw] lg:text-[7vw] font-black uppercase mb-10">
            The <span className="font-serif italic font-normal lowercase tracking-normal">work</span> <br /> 
            speaks.
          </h1>
          <p className="text-lg md:text-xl text-black/50 font-medium leading-relaxed max-w-sm">
            Every cut is a canvas. Browse recent work from our master barbers.
          </p>
        </div>

        {/* Background Decor */}
        <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <h1 className="text-[40vw] font-black leading-none uppercase">WORK</h1>
        </div>
      </header>

      {/* FILTER & VIEW BAR */}
      <div className="px-6 md:px-12 lg:px-20 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-wrap gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                active === tab.id 
                ? "bg-black text-white shadow-lg" 
                : "bg-black/5 text-black/40 hover:bg-black/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex bg-black/5 p-1 rounded-full border border-black/5">
          <button
            onClick={() => setView("masonry")}
            className={`p-3 rounded-full transition-all ${view === "masonry" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`p-3 rounded-full transition-all ${view === "grid" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
          >
            <Grid3X3 size={18} />
          </button>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="px-6 md:px-12 lg:px-20 pb-24">
        {view === "masonry" ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} gridMode />
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="mt-32 text-center pb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10">
            See something <span className="font-serif italic lowercase font-normal text-[#58ae3a]">you like?</span>
          </h2>
          <Link href="/booking" className="inline-flex items-center bg-black/5 border border-black/10 p-2 rounded-full transition-all duration-300 hover:bg-black/[0.07] group">
            <span className="px-8 text-[13px] font-black uppercase tracking-[0.2em] opacity-40 hidden md:block">
              Ready to evolve?
            </span>
            <span className="bg-[#58ae3a] text-white py-5 px-10 rounded-full font-black text-base uppercase tracking-[0.05em] flex items-center gap-3 shadow-xl shadow-[#58ae3a]/20 transition-all duration-300 group-hover:bg-[#4d9a32] group-hover:scale-[1.02]">
              Book Appointment <ArrowRight size={20} strokeWidth={3} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function GalleryCard({ item, gridMode }: { item: typeof GALLERY_ITEMS[0]; gridMode?: boolean }) {
  return (
    <div 
      className={`
        ${item.bg} 
        ${gridMode ? "aspect-square" : item.aspect} 
        relative rounded-[40px] overflow-hidden group cursor-pointer break-inside-avoid
      `}
    >
      {/* Floating Category Tag */}
      <div className="absolute top-6 left-6 z-20">
        <span className="px-4 py-1.5 rounded-full border border-white/20 bg-black/10 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white transition-transform group-hover:-translate-y-1">
          {item.category}
        </span>
      </div>

      {/* Top Right Arrow */}
      <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl">
          <ArrowUpRight size={20} strokeWidth={3} />
        </div>
      </div>

      {/* Decorative Dot Pattern (matches Vertdure reference) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id={`dots-${item.id}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#dots-${item.id})`} />
        </svg>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Bottom Label */}
      <div className="absolute bottom-8 left-8 right-8 z-20">
        <h3 className="text-white text-2xl font-black uppercase tracking-tighter leading-none translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {item.label}
        </h3>
      </div>
    </div>
  );
}