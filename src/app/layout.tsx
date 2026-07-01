import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: {
    default: "Harry's Hair Hub | Premium Barbershop Edmonton",
    template: "%s | Harry's Hair Hub",
  },
  description:
    "Edmonton's premier barbershop. Precision cuts, hot towel shaves, and luxury grooming experiences. Book your appointment online.",
  keywords: ["barbershop", "Edmonton", "haircut", "beard", "barber", "grooming", "luxury"],
  openGraph: {
    title: "Harry's Hair Hub | Premium Barbershop Edmonton",
    description: "Where craft meets character. Edmonton's destination for elevated barbering.",
    type: "website",
    locale: "en_CA",
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F3E0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded via link for better network flexibility */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
