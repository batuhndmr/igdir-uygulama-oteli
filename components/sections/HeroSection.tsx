"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { heroVariants, heroItem } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden w-full"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/otel-giris.png"
          alt="Iğdır Uygulama Oteli"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={heroItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg px-2 sm:px-0"
          >
            Türkiye Odalar ve Borsalar Birliği
            <br />
            <span className="text-white">Turizm Mesleki ve Teknik Anadolu Lisesi</span>
            <br />
            <span className="text-white">Uygulama Oteli</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-lg md:text-xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow-md px-2 sm:px-0"
          >
            30 odalı, 60 yatak kapasiteli uygulama otelimiz ile öğrencilere iş hayatı öncesi
            deneyim sunuyoruz. Modern tesislerimiz ve özverili ekibimizle konforlu bir konaklama
            deneyimi sağlıyoruz.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => handleNavClick("#contact")}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-12 py-6 group w-full sm:w-auto"
            >
              İletişime Geçin
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => handleNavClick("#about")}
              size="lg"
              variant="outline"
              className="text-lg px-12 py-6 border border-white/60 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/80 w-full sm:w-auto"
            >
              Hakkımızda
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
