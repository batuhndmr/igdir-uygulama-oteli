"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  useEffect(() => {
    // Sayfa yüklendiğinde smooth scroll ile en başa dön
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <ServicesSection />
      <GallerySection />
      <FeaturesSection />
      {/* <TestimonialsSection /> */}
      <LocationSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
      <CookieBanner />
    </main>
  );
}
