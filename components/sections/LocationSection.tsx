"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { fadeInUp, slideInFromLeft, slideInFromRight } from "@/lib/animations";
import { contactInfo } from "@/lib/constants";
import { MapPin, ExternalLink } from "lucide-react";

export function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="location"
      ref={ref}
      className="py-24 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Konum
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Iğdır&apos;ın merkezinde, ulaşımı kolay bir konumda yer alıyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInFromLeft}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Adres Bilgileri
              </h3>
              <div className="flex items-start space-x-3 mb-4">
                <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                <p className="text-gray-600 text-lg">{contactInfo.address}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ulaşım
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Şehir merkezine {contactInfo.cityCenterDistance} mesafede</li>
                <li>• Havaalanına {contactInfo.airportDistance} mesafede</li>
                <li>• Toplu taşıma araçları ile kolay ulaşım</li>
                <li>• Açık ve kapalı otopark imkanı</li>
              </ul>
            </div>

            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a
                href={contactInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                Haritada Aç
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInFromRight}
            className="relative"
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Iğdır Uygulama Oteli Konum"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
