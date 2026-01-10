"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { services } from "@/lib/constants";
import {
  Clock,
  Bell,
  Droplet,
  MapPin,
  Shield,
  Briefcase,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Clock,
  Bell,
  Droplet,
  MapPin,
  Shield,
  Briefcase,
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
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
            Hizmetlerimiz
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Misafirlerimizin konforu için sunduğumuz kapsamlı hizmetler.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Clock;
            return (
              <motion.div
                key={service.id}
                variants={staggerItem}
                className="group"
              >
                <div className="flex items-start space-x-4 p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
