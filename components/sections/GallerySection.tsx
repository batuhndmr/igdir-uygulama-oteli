"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Tüm görselleri dinamik olarak oluştur
const generateGalleryItems = () => {
  const items: Array<{ id: string; src: string }> = [];
  // İlk olarak otel-giris.png'yi ekle
  items.push({
    id: "otel-giris",
    src: "/assets/images/otel-giris.png",
  });
  // Sonra diğer görselleri ekle
  for (let i = 1; i <= 24; i++) {
    items.push({
      id: `görsel-${i}`,
      src: `/assets/images/görsel-${i}.png`,
    });
  }
  return items;
};

const allGalleryItems = generateGalleryItems();
const INITIAL_DISPLAY_COUNT = 6; // İlk gösterilecek görsel sayısı

// Başlangıç görselleri - oteli anlatan görseller
const getInitialDisplayItems = () => {
  const initialItems: Array<{ id: string; src: string }> = [];
  
  // İlk görsel olarak otel-giris.png'yi ekle (allGalleryItems'ın ilk elemanı)
  initialItems.push(allGalleryItems[0]);
  
  // Sonra tercih edilen görselleri ekle
  // Not: allGalleryItems'da otel-giris ilk sırada olduğu için, görsel-23 = index 23 (0-based değil, 1-based görsel numarası)
  // allGalleryItems yapısı: [otel-giris, görsel-1, görsel-2, ..., görsel-24]
  // Yani görsel-23 = allGalleryItems[23] (çünkü görsel-1 = index 1)
  const preferredIndices = [23, 19, 14, 6, 5]; // görsel-23, görsel-19, görsel-14, görsel-6, görsel-5
  preferredIndices.forEach((görselNumarası) => {
    // görsel-23 = allGalleryItems[23] (otel-giris index 0, görsel-1 index 1, ... görsel-23 index 23)
    const itemIndex = görselNumarası; // allGalleryItems'da görsel numarası = index
    if (itemIndex < allGalleryItems.length) {
      const item = allGalleryItems[itemIndex];
      if (item && !initialItems.find(i => i.id === item.id)) {
        initialItems.push(item);
      }
    }
  });
  
  // Eğer 6 görsel olmadıysa, kalanları sırayla ekle
  let currentIndex = 1; // 0 = otel-giris, 1'den başla
  while (initialItems.length < INITIAL_DISPLAY_COUNT && currentIndex < allGalleryItems.length) {
    const item = allGalleryItems[currentIndex];
    if (!initialItems.find(i => i.id === item.id)) {
      initialItems.push(item);
    }
    currentIndex++;
  }
  
  return initialItems.slice(0, INITIAL_DISPLAY_COUNT);
};

// Web görünümü için asimetrik aspect ratio'lar
const getAspectClass = (index: number) => {
  // Mobilde hepsi square
  // Web'de asimetrik dağılım
  const aspects = [
    "col-span-1 lg:col-span-2 aspect-square lg:aspect-[2/1]", // 1. görsel - wide
    "col-span-1 aspect-square", // 2. görsel - square
    "col-span-1 lg:col-span-1 lg:row-span-2 aspect-square lg:aspect-[1/2]", // 3. görsel - tall
    "col-span-1 aspect-square", // 4. görsel - square
    "col-span-1 lg:col-span-2 aspect-square lg:aspect-[2/1]", // 5. görsel - wide
    "col-span-1 aspect-square", // 6. görsel - square
  ];
  return aspects[index] || "col-span-1 aspect-square";
};

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayedItems = getInitialDisplayItems();
  const remainingCount = allGalleryItems.length - INITIAL_DISPLAY_COUNT;
  
  // Displayed items'ın allGalleryItems içindeki gerçek indekslerini bul
  const getDisplayedItemIndex = (displayedItem: typeof displayedItems[0]) => {
    return allGalleryItems.findIndex(item => item.id === displayedItem.id);
  };

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allGalleryItems.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allGalleryItems.length) % allGalleryItems.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const openLightbox = (displayedIndex: number) => {
    // Displayed item'ın allGalleryItems içindeki gerçek indeksini bul
    const realIndex = getDisplayedItemIndex(displayedItems[displayedIndex]);
    if (realIndex !== -1) {
      setCurrentIndex(realIndex);
      setLightboxOpen(true);
    }
  };

  const openAllGallery = () => {
    // INITIAL_DISPLAY_COUNT'tan itibaren başla (7. görsel = index 6)
    setCurrentIndex(INITIAL_DISPLAY_COUNT);
    setLightboxOpen(true);
  };

  // Mobil için swipe desteği
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  return (
    <>
      <section
        id="gallery"
        ref={ref}
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Galeri
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tesislerimizden ve misafirlerimizden kareler.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-fr"
          >
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className={getAspectClass(index)}
              >
                <div
                  onClick={() => openLightbox(index)}
                  className="relative w-full h-full rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={item.src}
                    alt={`Galeri görseli ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 border-2 border-white/50 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* "+" Butonu - Tüm Galeriyi Aç (Görsel üzerinde overlay) */}
            <motion.div
              variants={staggerItem}
              className="col-span-1 aspect-square"
            >
              <button
                onClick={openAllGallery}
                className="relative w-full h-full rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Arka plan görseli - INITIAL_DISPLAY_COUNT'tan itibaren bir görsel */}
                {allGalleryItems[INITIAL_DISPLAY_COUNT] && (
                  <Image
                    src={allGalleryItems[INITIAL_DISPLAY_COUNT].src}
                    alt="Daha fazla görsel"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                )}
                
                {/* Şeffaf overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 group-hover:from-black/70 group-hover:via-black/50 group-hover:to-black/30 transition-all duration-300" />
                
                {/* İçerik */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                  {/* Plus Icon */}
                  <div className="mb-3 md:mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 group-hover:border-white/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      <Plus className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="text-center">
                    <p className="text-lg md:text-xl font-bold text-white mb-1 drop-shadow-lg">
                      +{remainingCount}
                    </p>
                    <p className="text-sm md:text-base text-white/90 font-medium drop-shadow-md">
                      Daha Fazla
                    </p>
                  </div>
                </div>

                {/* Hover efekti - parıltı */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
            />

            {/* Lightbox Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setLightboxOpen(false);
                }
              }}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 z-10"
                aria-label="Kapat"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </Button>

              {/* Previous Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:scale-110 hover:shadow-lg transition-all duration-200 z-10"
                aria-label="Önceki"
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </Button>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:scale-110 hover:shadow-lg transition-all duration-200 z-10"
                aria-label="Sonraki"
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </Button>

              {/* Image Container */}
              <div 
                className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={allGalleryItems[currentIndex].src}
                      alt={`Galeri görseli ${currentIndex + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm text-gray-700 shadow-lg">
                {currentIndex + 1} / {allGalleryItems.length}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
