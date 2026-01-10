"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { roomFacilities } from "@/lib/constants";
import {
  Bed,
  Utensils,
  Coffee,
  Users,
  GraduationCap,
  Sparkles,
  Car,
  Wifi,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Bed,
  Utensils,
  Coffee,
  Users,
  GraduationCap,
  Sparkles,
  Car,
  Wifi,
};

export function RoomsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="rooms"
      ref={ref}
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Odalar & Tesisler
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modern ve konforlu tesislerimizle size en iyi konaklama deneyimini
            sunuyoruz.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {roomFacilities.map((facility) => {
            const Icon = iconMap[facility.icon] || Bed;
            return (
              <motion.div key={facility.id} variants={staggerItem}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{facility.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {facility.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
