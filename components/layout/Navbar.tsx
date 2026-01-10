"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, Globe, X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Ana Sayfa", href: "#hero" },
  { label: "Hakkımızda", href: "#about" },
  { label: "Odalar & Tesisler", href: "#rooms" },
  { label: "Hizmetler", href: "#services" },
  { label: "Galeri", href: "#gallery" },
  { label: "Özellikler", href: "#features" },
  // { label: "Yorumlar", href: "#testimonials" },
  { label: "Konum", href: "#location" },
  { label: "İletişim", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("TR");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileLanguageDropdownOpen, setIsMobileLanguageDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 80, right: 16 });
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLanguageButtonRef = useRef<HTMLButtonElement>(null);
  const mobileLanguageDropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown pozisyonunu hesapla
  useEffect(() => {
    const updatePosition = () => {
      if (languageButtonRef.current) {
        const rect = languageButtonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right,
        });
      }
    };

    if (isLanguageDropdownOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isLanguageDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const allSections = navItems.map((item) => item.href.substring(1));

      const current = allSections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(`#${current}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsDrawerOpen(false);
    setIsLanguageDropdownOpen(false);
    setIsMobileLanguageDropdownOpen(false);
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

  // Language dropdown için click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        languageButtonRef.current &&
        !languageDropdownRef.current.contains(event.target as Node) &&
        !languageButtonRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
      if (
        mobileLanguageDropdownRef.current &&
        mobileLanguageButtonRef.current &&
        !mobileLanguageDropdownRef.current.contains(event.target as Node) &&
        !mobileLanguageButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full overflow-x-hidden overflow-y-visible",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200/50"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full overflow-visible">
        <div className="flex h-20 items-center justify-between overflow-visible">
          {/* Logo */}
          <div className="shrink-0">
            <button
              onClick={() => handleNavClick("#hero")}
              className={cn(
                "text-2xl font-bold transition-colors cursor-pointer",
                isScrolled
                  ? "text-primary hover:text-primary/80"
                  : "text-white hover:text-white/80 drop-shadow-md"
              )}
            >
              Logo
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer",
                    "hover:scale-105 active:scale-95",
                    isScrolled
                      ? isActive
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:text-primary hover:bg-gray-100/60"
                      : isActive
                      ? "text-white bg-white/25 backdrop-blur-sm shadow-lg"
                      : "text-white/95 hover:text-white hover:bg-white/15 backdrop-blur-sm drop-shadow-md"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Side - Dark Mode & Language (Desktop) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2 shrink-0 ml-4 overflow-visible">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={cn(
                "transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer",
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100/60 hover:text-primary"
                  : "text-white/90 hover:bg-white/15 backdrop-blur-sm hover:text-white"
              )}
              aria-label="Dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Language Selector */}
            <div className="relative">
              <Button
                ref={languageButtonRef}
                variant="ghost"
                size="icon"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={cn(
                  "transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer",
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100/60 hover:text-primary"
                    : "text-white/90 hover:bg-white/15 backdrop-blur-sm hover:text-white"
                )}
                aria-label="Language"
              >
                <Globe className="h-5 w-5" />
              </Button>
              <AnimatePresence>
                {isLanguageDropdownOpen && (
                  <div
                    ref={languageDropdownRef}
                    className="fixed z-[100]"
                    style={{
                      top: `${dropdownPosition.top}px`,
                      right: `${dropdownPosition.right}px`,
                    }}
                  >
                    <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "rounded-xl shadow-xl overflow-hidden min-w-[160px]",
                      "border",
                      isScrolled
                        ? "bg-white border-gray-200"
                        : "bg-white/98 backdrop-blur-md border-white/30"
                    )}
                  >
                    <button
                      onClick={() => {
                        setLanguage("TR");
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm transition-all duration-300 cursor-pointer",
                        "flex items-center gap-2.5 hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent",
                        language === "TR"
                          ? "text-primary bg-primary/10 font-semibold"
                          : "text-gray-700 hover:text-primary font-medium"
                      )}
                    >
                      <span className="text-lg flex-shrink-0">🇹🇷</span>
                      <span className="flex-1">Türkçe</span>
                      {language === "TR" && (
                        <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" strokeWidth={3} />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("EN");
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm transition-all duration-300 cursor-pointer",
                        "flex items-center gap-2.5 hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent",
                        language === "EN"
                          ? "text-primary bg-primary/10 font-semibold"
                          : "text-gray-700 hover:text-primary font-medium"
                      )}
                    >
                      <span className="text-lg flex-shrink-0">🇬🇧</span>
                      <span className="flex-1">English</span>
                      {language === "EN" && (
                        <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" strokeWidth={3} />
                      )}
                    </button>
                  </motion.div>
                </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden shrink-0">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menü"
                  className={cn(
                    "transition-all duration-300 cursor-pointer",
                    isScrolled ? "" : "text-white hover:bg-white/10"
                  )}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full w-3/4 sm:max-w-sm">
                <DrawerHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <DrawerTitle className="text-xl font-bold text-primary">
                      Menü
                    </DrawerTitle>
                    <DrawerClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </DrawerClose>
                  </div>
                </DrawerHeader>
                <div className="flex flex-col p-4 space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href;
                    return (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={cn(
                          "block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer",
                          isActive
                            ? "text-primary bg-primary/10"
                            : "text-gray-700 hover:text-primary hover:bg-gray-100/50"
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                  <div className="pt-4 mt-4 border-t">
                    <div className="flex items-center justify-between gap-3">
                      {/* Koyu Mod - Kare Icon Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="h-12 w-12 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                        aria-label={isDarkMode ? "Açık Mod" : "Koyu Mod"}
                      >
                        {isDarkMode ? (
                          <Sun className="h-5 w-5 text-gray-700" />
                        ) : (
                          <Moon className="h-5 w-5 text-gray-700" />
                        )}
                      </Button>

                      {/* Dil Seçimi - Dropdown */}
                      <div className="relative flex-1">
                        <button
                          ref={mobileLanguageButtonRef}
                          onClick={() => setIsMobileLanguageDropdownOpen(!isMobileLanguageDropdownOpen)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg border border-gray-200 transition-all duration-200 cursor-pointer",
                            "hover:bg-gray-50",
                            isMobileLanguageDropdownOpen
                              ? "bg-gray-50 border-gray-300"
                              : "bg-white"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <Globe className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-700">
                              {language === "TR" ? "Türkçe" : "English"}
                            </span>
                          </div>
                          <motion.div
                            animate={{ rotate: isMobileLanguageDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isMobileLanguageDropdownOpen && (
                            <div
                              ref={mobileLanguageDropdownRef}
                              className="absolute top-full left-0 right-0 mt-2 z-10"
                            >
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                              >
                                <button
                                  onClick={() => {
                                    setLanguage("TR");
                                    setIsMobileLanguageDropdownOpen(false);
                                  }}
                                  className={cn(
                                    "w-full text-left px-4 py-2.5 text-sm transition-all duration-200 cursor-pointer",
                                    "flex items-center gap-2.5 hover:bg-gray-50",
                                    language === "TR"
                                      ? "text-primary bg-primary/5 font-semibold"
                                      : "text-gray-700 font-medium"
                                  )}
                                >
                                  <span className="text-lg flex-shrink-0">🇹🇷</span>
                                  <span className="flex-1">Türkçe</span>
                                  {language === "TR" && (
                                    <Check className="h-4 w-4 text-primary flex-shrink-0" strokeWidth={3} />
                                  )}
                                </button>
                                <button
                                  onClick={() => {
                                    setLanguage("EN");
                                    setIsMobileLanguageDropdownOpen(false);
                                  }}
                                  className={cn(
                                    "w-full text-left px-4 py-2.5 text-sm transition-all duration-200 cursor-pointer",
                                    "flex items-center gap-2.5 hover:bg-gray-50",
                                    language === "EN"
                                      ? "text-primary bg-primary/5 font-semibold"
                                      : "text-gray-700 font-medium"
                                  )}
                                >
                                  <span className="text-lg flex-shrink-0">🇬🇧</span>
                                  <span className="flex-1">English</span>
                                  {language === "EN" && (
                                    <Check className="h-4 w-4 text-primary flex-shrink-0" strokeWidth={3} />
                                  )}
                                </button>
                              </motion.div>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
