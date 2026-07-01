"use client";

import  { useState } from "react";
import Link from "next/link";
import { Clock, Star, ArrowUpRight, LayoutGrid, List } from "lucide-react";
import type { Service } from "@/types";
import { formatPrice, formatDuration } from "@/lib/utils";

// Reference Colors from the Image
const CARD_COLORS = [
  "bg-[#F2D600] text-black", // Yellow
  "bg-[#2D4A31] text-white", // Dark Green
  "bg-[#98D8F4] text-black", // Light Blue
  "bg-[#1A1A1A] text-white", // Charcoal
  "bg-[#58AE3A] text-white", // Vibrant Green
];

type ViewMode = "pinterest" | "bento" | "table";

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [view, setView] = useState<ViewMode>("bento");

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 mb-4 block">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[0.9] uppercase mb-6">
            A Sharp Look starts with <br /> the right service.
          </h2>
        </div>

        {/* VIEW SWITCHER */}
        <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200">
          <button
            onClick={() => setView("pinterest")}
            className={`p-3 rounded-full transition-all ${view === "pinterest" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
          >
            <Star size={18} />
          </button>
          <button
            onClick={() => setView("bento")}
            className={`p-3 rounded-full transition-all ${view === "bento" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-3 rounded-full transition-all ${view === "table" ? "bg-white shadow-sm text-black" : "text-gray-400"}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* GRID RENDERER */}
      {view === "pinterest" && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {services.map((s, i) => (
            <PinterestCard key={s.id} service={s} index={i} />
          ))}
        </div>
      )}

      {view === "bento" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          {services.map((s, i) => (
            <BentoCard key={s.id} service={s} index={i} />
          ))}
        </div>
      )}

      {view === "table" && (
        <div className="flex flex-col border-t border-black/10">
          {services.map((s) => (
            <TableRow key={s.id} service={s} />
          ))}
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               PINTEREST VIEW                               */
/* -------------------------------------------------------------------------- */
function PinterestCard({ service, index }: { service: Service; index: number }) {
  const colorClass = CARD_COLORS[index % CARD_COLORS.length];
  return (
    <div className={`${colorClass} break-inside-avoid rounded-[40px] p-10 flex flex-col items-center text-center relative group overflow-hidden transition-transform duration-500 hover:scale-[1.02]`}>
      <Tag label={service.category} />
      
      <div className="my-12">
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.8]">
          THE <br /> {service.name}
        </h3>
      </div>

      <div className="flex gap-2 mt-auto">
        <span className="px-4 py-1.5 rounded-full border border-current/20 text-[10px] font-bold uppercase tracking-widest">
          {formatDuration(service.duration)}
        </span>
        <span className="px-4 py-1.5 rounded-full border border-current/20 text-[10px] font-bold uppercase tracking-widest">
          {formatPrice(service.price)}
        </span>
      </div>

      <Link href={`/booking?service=${service.id}`} className="absolute inset-0 z-10 opacity-0" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 BENTO VIEW                                 */
/* -------------------------------------------------------------------------- */
function BentoCard({ service, index }: { service: Service; index: number }) {
  const colorClass = CARD_COLORS[index % CARD_COLORS.length];
  // Make every 3rd or 4th item larger for Bento effect
  const isLarge = index % 3 === 0;

  return (
    <div className={`
      ${colorClass} rounded-[40px] p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group
      ${isLarge ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"}
    `}>
      <Tag label={service.category} />
      
      <h3 className={`${isLarge ? "text-5xl lg:text-7xl" : "text-3xl"} font-black uppercase tracking-tighter leading-[0.8] transition-transform duration-500 group-hover:scale-110`}>
        {service.name}
      </h3>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <span className="px-3 py-1 rounded-full bg-black/5 text-[9px] font-bold uppercase">{formatPrice(service.price)}</span>
        {service.popular && <span className="px-3 py-1 rounded-full bg-white text-black text-[9px] font-bold uppercase">Popular</span>}
      </div>

      <Link href={`/booking?service=${service.id}`} className="absolute inset-0 z-10" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 TABLE VIEW                                 */
/* -------------------------------------------------------------------------- */
function TableRow({ service }: { service: Service }) {
  return (
    <Link 
      href={`/booking?service=${service.id}`}
      className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 border-bottom border-black/10 hover:bg-gray-50 px-4 transition-colors"
    >
      <div className="flex items-center gap-8">
        <span className="text-xs font-bold opacity-30 uppercase tracking-widest w-12">{service.category.substring(0,3)}</span>
        <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform">
          {service.name}
        </h3>
      </div>
      
      <div className="flex items-center gap-12 mt-4 md:mt-0">
        <span className="text-sm font-medium opacity-50">{formatDuration(service.duration)}</span>
        <span className="text-2xl font-bold">{formatPrice(service.price)}</span>
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#58ae3a] transition-colors">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </Link>
  );
}

/* Helper Component for the "Weed/Spring" floating pills */
function Tag({ label }: { label: string }) {
  return (
    <div className="mb-6">
      <span className="px-5 py-1.5 rounded-full border border-current/20 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
        {label}
      </span>
    </div>
  );
}