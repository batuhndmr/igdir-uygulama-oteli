"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeInUp, slideInFromLeft, slideInFromRight } from "@/lib/animations";
import { GraduationCap, Users, Award, Bed, Calendar } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
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
            Hakkımızda
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInFromLeft}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Türkiye Odalar ve Borsalar Birliği Turizm Mesleki ve Teknik Anadolu Lisesi
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Bünyemizde açılan uygulama otelimiz, 30 odalı (26 standart oda, 4 süit) ve
              60 yatak kapasiteli modern tesislerimizle öğrencilere iş hayatı öncesi deneyim
              sunmaktadır. Modern bina ve imkânları ile müşterilerin hizmetine hazırlanan ve
              ilimizde tek olan uygulama otelimiz, dışarıdan müşteri kabul etmekte olup, aynı
              zamanda turizm sektöründe çalışacak öğrencilerin yetiştirilmesinde katkı sunmaktadır.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Okulumuz Konaklama ve Seyahat hizmetleri ve Yiyecek ve İçecek hizmetleri alan
              öğretmen ve öğrencileri ve güler yüzlü personellerin özverili çalışmaları ile
              konforlu ve huzurlu bir aile ortamı oluşturulmaktadır. Her yıl okulumuz 10. ve
              11. sınıf öğrencilerin Antalya, Muğla, Aydın illerindeki beş (5) yıldızlı otellerde
              beş (5) ay süresince İşletmelerde Mesleki Eğitim / Staj yapmaları otelimize
              yenilikçi uygulamaları katmaları kaçınılmazdır.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Otelimizde toplantı odaları, konferans salonu, spor salonu, özgün kafe ve menü ile
              eşsiz Ağrı Dağı manzarası eşliğinde şehir gürültüsünden uzak misafirlerine nezih
              ortamda konaklama, kahvaltı, öğlen ve akşam yemek hizmeti sunmaktadır.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-3">
                  <Bed className="h-8 w-8" />
                </div>
                <h4 className="font-semibold text-gray-900">30 Oda</h4>
                <p className="text-sm text-gray-600">60 Yatak</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-3">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h4 className="font-semibold text-gray-900">Eğitim Odaklı</h4>
                <p className="text-sm text-gray-600">Pratik deneyim</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-3">
                  <Users className="h-8 w-8" />
                </div>
                <h4 className="font-semibold text-gray-900">Özverili Ekip</h4>
                <p className="text-sm text-gray-600">Güler yüzlü personel</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-3">
                  <Calendar className="h-8 w-8" />
                </div>
                <h4 className="font-semibold text-gray-900">15 Aralık 2025</h4>
                <p className="text-sm text-gray-600">Açılış Tarihi</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInFromRight}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              {/* Arka plan görseli */}
              <Image
                src="/assets/images/görsel-19.png"
                alt="Uygulama Oteli"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

              {/* İçerik */}
             {/*  <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <div className="w-24 h-24 border-4 border-white/30 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm bg-white/10">
                    <GraduationCap className="h-12 w-12 text-white/90" />
                  </div>
                  <p className="text-lg font-semibold drop-shadow-lg">Uygulama Oteli</p>
                  <p className="text-sm mt-2 drop-shadow-md">30 Oda • 60 Yatak</p>
                </div>
              </div> */}

              {/* Hover efekti */}
              {/* <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
