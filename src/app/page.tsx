import type { Metadata } from "next";
import HeroSection         from "@/components/sections/HeroSection";
import ServicesSection     from "@/components/sections/ServicesSection";
import WhyUsSection        from "@/components/sections/WhyUsSection";
import BarbersSection      from "@/components/sections/BarbersSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection          from "@/components/sections/FAQSection";
import CTASection          from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Harry's Hair Hub | Premium Barbershop Edmonton",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <BarbersSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
