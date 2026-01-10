"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import {
  getCookiePreferences,
  saveCookiePreferences,
  shouldShowBanner,
  type CookiePreferences,
} from "./cookieUtils";
import { cn } from "@/lib/utils";

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true
  performance: false,
  advertising: false,
  functional: false,
  allAccepted: false,
  timestamp: Date.now(),
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (shouldShowBanner()) {
      setIsVisible(true);
    } else {
      // Load existing preferences if any
      const existing = getCookiePreferences();
      if (existing) {
        setPreferences(existing);
      }
    }
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showPreferences) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreferences]);

  const toggleCategory = (category: keyof CookiePreferences) => {
    if (category === "necessary") return; // Cannot disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      performance: true,
      advertising: true,
      functional: true,
      allAccepted: true,
      timestamp: Date.now(),
    };
    saveCookiePreferences(allAccepted);
    setPreferences(allAccepted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const rejected: CookiePreferences = {
      necessary: true, // Always true
      performance: false,
      advertising: false,
      functional: false,
      allAccepted: false,
      timestamp: Date.now(),
    };
    saveCookiePreferences(rejected);
    setPreferences(rejected);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const updated: CookiePreferences = {
      ...preferences,
      allAccepted:
        preferences.performance &&
        preferences.advertising &&
        preferences.functional,
      timestamp: Date.now(),
    };
    saveCookiePreferences(updated);
    setPreferences(updated);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleManagePreferences = () => {
    setShowPreferences(true);
  };

  const handleClosePreferences = () => {
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      <AnimatePresence>
        {!showPreferences && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4"
          >
            <div className="mx-auto max-w-6xl">
              <div className="relative rounded-xl bg-white/98 backdrop-blur-md border border-gray-200/50 shadow-2xl p-4 md:p-5">
                <button
                  onClick={handleRejectAll}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Kapat"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="pr-7">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Çerez Kullanımı
                  </h3>
                  <p className="text-xs text-gray-700 mb-1.5 leading-normal">
                    Sitemizde deneyiminizi iyileştirmek, kişiselleştirme tercihlerinizi
                    hatırlamak, sitemizin performansını optimize etmek ve pazarlama
                    faaliyetleri yürütmek amacıyla çerezler ve diğer tanımlama
                    teknolojilerini kullanıyoruz. Çerez ve diğer tanımlama teknolojilerinin
                    tamamına onay vermeniz halinde "Tümünü Kabul Et" ve tamamını reddetmeniz
                    halinde ise "Tümünü Reddet" seçeneği ile ilerleyebilirsiniz. Ayrıca,
                    "Tercihlerimi Yönet" menüsünden butonları tercihinize göre açık veya
                    kapalı konuma getirerek onaylarınızı her zaman özelleştirebilir ve
                    tercihlerinizi kaydedebilirsiniz.
                  </p>
                  <p className="text-xs text-gray-600 mb-4">
                    Daha fazla bilgi için lütfen{" "}
                    <a
                      href="#"
                      className="text-primary hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Çerez Politikamızı
                    </a>{" "}
                    inceleyiniz.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handleAcceptAll}
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Tümünü Kabul Et
                    </Button>
                    <Button
                      onClick={handleRejectAll}
                      variant="outline"
                      size="sm"
                      className="border-gray-300"
                    >
                      Tümünü Reddet
                    </Button>
                    <Button
                      onClick={handleManagePreferences}
                      variant="outline"
                      size="sm"
                      className="border-gray-300"
                    >
                      Tercihlerimi Yönet
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePreferences}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">
                    Çerez ve Tanımlama Teknolojileri Yönetim Paneli
                  </h2>
                  <button
                    onClick={handleClosePreferences}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <p className="text-xs text-gray-700 mb-4 leading-relaxed">
                    Sitemizin performansını optimize etmek, deneyimlerinizi iyileştirmek,
                    kişiselleştirme tercihlerinizi hatırlamak ve pazarlama faaliyetleri
                    yürütmek amacıyla çerezler ve diğer tanımlama teknolojilerini
                    kullanmaktayız. Aşağıda yer alan panel butonlarından çerezlere ilişkin
                    tercihlerinizi her zaman özelleştirebilir ve tercihlerinizi
                    kaydedebilirsiniz. Detaylı bilgi için lütfen{" "}
                    <a
                      href="#"
                      className="text-primary hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Çerez Politikamızı
                    </a>{" "}
                    ziyaret ediniz.
                  </p>

                  {/* Zorunlu Çerezler */}
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      Zorunlu Çerezler
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      Zorunlu çerezler, web sitemizin düzgün çalışmasını sağlamak ve bilgi
                      toplumu hizmetlerinin yerine getirilebilmesi amacıyla kullanılır. Bu
                      çerezlerin kullanımı için açık rızanız gerekmez. Tarayıcı ayarlarınızdan
                      tüm çerezleri engelleyebilirsiniz, ancak bu durumda sitemizin bazı
                      bölümlerinin düzgün çalışmayabileceğini hatırlatmak isteriz.
                    </p>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-900">
                          Zorunlu Çerezler
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Her zaman aktif - Devre dışı bırakılamaz
                        </p>
                      </div>
                      <div className="w-10 h-5 bg-primary rounded-full flex items-center justify-end px-0.5">
                        <div className="w-3.5 h-3.5 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Zorunlu Olmayan Çerezler */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Zorunlu Olmayan Çerezler
                    </h3>

                    {/* Performans ve Analiz */}
                    <CookieCategory
                      title="Performans ve Analiz Çerezleri"
                      description="Kullanıcı davranışlarını analiz etmek ve site performansını optimize etmek için kullanılır."
                      enabled={preferences.performance}
                      onToggle={() => toggleCategory("performance")}
                      isExpanded={expandedCategories.includes("performance")}
                      onToggleExpand={() => toggleCategoryExpansion("performance")}
                      cookies={[
                        { name: "_ga", purpose: "Google Analytics, kullanıcı oturumlarını ve etkinliklerini analiz eder." },
                        { name: "_gid", purpose: "Google Analytics, oturum bazlı kullanıcı izleme." },
                        { name: "_clck", purpose: "Microsoft Clarity, kullanıcı gezinme alışkanlıklarını anlamak için." },
                        { name: "_clsk", purpose: "Microsoft Clarity, oturum verilerini birleştirmek için." },
                      ]}
                    />

                    {/* Reklam ve Hedefleme */}
                    <CookieCategory
                      title="Reklam ve Hedefleme Çerezleri"
                      description="Kullanıcı tercihlerini izlemek ve reklamları optimize etmek için kullanılır."
                      enabled={preferences.advertising}
                      onToggle={() => toggleCategory("advertising")}
                      isExpanded={expandedCategories.includes("advertising")}
                      onToggleExpand={() => toggleCategoryExpansion("advertising")}
                      cookies={[
                        { name: "IDE", purpose: "Google DoubleClick, reklamları optimize etmek için." },
                        { name: "SRM_B", purpose: "Microsoft Bing, reklam ve analiz amaçlı." },
                        { name: "_fbp", purpose: "Facebook, reklam performansını izlemek için." },
                        { name: "_gcl_au", purpose: "Google AdSense, reklam dönüşümlerini izlemek için." },
                      ]}
                    />

                    {/* Fonksiyonel */}
                    <CookieCategory
                      title="Fonksiyonel Çerezler"
                      description="Web sitesinin işleyişini destekler ancak zorunlu değildir."
                      enabled={preferences.functional}
                      onToggle={() => toggleCategory("functional")}
                      isExpanded={expandedCategories.includes("functional")}
                      onToggleExpand={() => toggleCategoryExpansion("functional")}
                      cookies={[
                        { name: "bcookie", purpose: "Tarayıcı kimliği doğrulama ve güvenlik için." },
                        { name: "bscookie", purpose: "Oturum güvenliğini sağlamak için." },
                      ]}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-gray-200 flex justify-end gap-2">
                  <Button
                    onClick={handleClosePreferences}
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                  >
                    İptal
                  </Button>
                  <Button
                    onClick={handleSavePreferences}
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Kaydet
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface CookieCategoryProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  cookies: Array<{ name: string; purpose: string }>;
}

function CookieCategory({
  title,
  description,
  enabled,
  onToggle,
  isExpanded,
  onToggleExpand,
  cookies,
}: CookieCategoryProps) {
  return (
    <div className="mb-3 border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-gray-50">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleExpand}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          </div>
          {isExpanded && (
            <p className="text-xs text-gray-600 mt-1.5 ml-6">{description}</p>
          )}
        </div>
        <button
          onClick={onToggle}
          className={cn(
            "relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none",
            enabled ? "bg-primary" : "bg-gray-300"
          )}
          aria-label={`${title} ${enabled ? "kapat" : "aç"}`}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 w-3.5 h-3.5 bg-white rounded-full transition-transform duration-300",
              enabled && "translate-x-5"
            )}
          />
        </button>
      </div>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="px-3 pb-3 bg-white"
        >
          <div className="mt-2 space-y-1.5">
            {cookies.map((cookie, index) => (
              <div key={index} className="text-xs">
                <span className="font-mono font-semibold text-gray-900">
                  {cookie.name}:
                </span>{" "}
                <span className="text-gray-600">{cookie.purpose}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
