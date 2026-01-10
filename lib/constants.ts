export interface NavLink {
  label: string;
  href: string;
}

export interface RoomFacility {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating?: number;
}

export const navLinks: NavLink[] = [
  { label: "Ana Sayfa", href: "#hero" },
  { label: "Hakkımızda", href: "#about" },
  { label: "Odalar & Tesisler", href: "#rooms" },
  { label: "Hizmetler", href: "#services" },
  { label: "Galeri", href: "#gallery" },
  { label: "Özellikler", href: "#features" },
  { label: "Yorumlar", href: "#testimonials" },
  { label: "Konum", href: "#location" },
  { label: "İletişim", href: "#contact" },
];

export const roomFacilities: RoomFacility[] = [
  {
    id: "1",
    title: "30 Oda",
    description: "26 standart oda ve 4 süit ile toplam 60 yatak kapasiteli konaklama imkanı.",
    icon: "Bed",
  },
  {
    id: "2",
    title: "Restoran",
    description: "100 kişilik restoran ve fuaye alanı ile halka açık yemek hizmeti.",
    icon: "Utensils",
  },
  {
    id: "3",
    title: "Kahvaltı",
    description: "Ağrı Dağı manzarası eşliğinde şehir gürültüsünden uzak kahvaltı servisi.",
    icon: "Coffee",
  },
  {
    id: "4",
    title: "Konferans Salonu",
    description: "60 kişilik konferans salonu ve eğitim toplantı odaları.",
    icon: "Users",
  },
  {
    id: "5",
    title: "Seyir Kafesi",
    description: "Ağrı Dağı manzaralı seyir kafesinde mocktail ve kahve çeşitleri.",
    icon: "GraduationCap",
  },
  {
    id: "6",
    title: "Spor Salonu",
    description: "Modern spor salonu ile sağlıklı yaşam imkanı.",
    icon: "Sparkles",
  },
  {
    id: "7",
    title: "Otopark",
    description: "Açık ve kapalı otopark alanı ile güvenli park imkanı.",
    icon: "Car",
  },
  {
    id: "8",
    title: "Wi-Fi & TV & Klima",
    description: "Odalarda TV, klima, mini bar ve ücretsiz Wi-Fi hizmeti.",
    icon: "Wifi",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "24/7 Resepsiyon",
    description: "Günün her saati hizmetinizdeyiz",
    icon: "Clock",
  },
  {
    id: "2",
    title: "Çamaşırhane",
    description: "Çamaşırhane ve kuru temizleme hizmeti",
    icon: "Droplet",
  },
  {
    id: "3",
    title: "Mescit",
    description: "Dini ibadetleriniz için mescit hizmeti",
    icon: "MapPin",
  },
  {
    id: "4",
    title: "Özel Menü",
    description: "Kalabalık grup müşteriler için özel menü uygulama hizmeti",
    icon: "Shield",
  },
  {
    id: "5",
    title: "Çocuk Konaklama",
    description: "7 yaşına kadar çocuklar için ücretsiz konaklama imkanı",
    icon: "Briefcase",
  },
  {
    id: "6",
    title: "Eğitim Odaklı Hizmet",
    description: "Turizm öğrencilerine pratik deneyim imkanı",
    icon: "GraduationCap",
  },
];

export const features: Feature[] = [
  {
    id: "1",
    title: "30 Oda, 60 Yatak",
    description: "26 standart oda ve 4 süit ile toplam 60 yatak kapasiteli modern tesisler.",
    icon: "Bed",
  },
  {
    id: "2",
    title: "Eğitim Odaklı Yaklaşım",
    description: "Turizm Mesleki ve Teknik Anadolu Lisesi öğrencilerine iş hayatı öncesi deneyim sunuyoruz.",
    icon: "BookOpen",
  },
  {
    id: "3",
    title: "Staj Deneyimi",
    description: "10. ve 11. sınıf öğrencilerimiz 5 yıldızlı otellerde 5 ay staj yaparak yenilikçi uygulamaları öğreniyor.",
    icon: "Award",
  },
  {
    id: "4",
    title: "Ağrı Dağı Manzarası",
    description: "Eşsiz Ağrı Dağı manzarası eşliğinde şehir gürültüsünden uzak nezih ortam.",
    icon: "Navigation",
  },
  {
    id: "5",
    title: "Modern Tesisler",
    description: "Konferans salonu, spor salonu, toplantı odaları ve özgün kafe ile kapsamlı hizmet.",
    icon: "Building",
  },
  {
    id: "6",
    title: "Halka Açık",
    description: "Dışarıdan müşteri kabul eden, herkese açık uygulama oteli.",
    icon: "Users",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    role: "Turizm Öğrencisi",
    content: "Burada staj yapma fırsatı buldum. Hem teorik bilgilerimi pratiğe dökme hem de gerçek bir otel ortamında çalışma deneyimi kazandım. Çok memnun kaldım!",
    rating: 5,
  },
  {
    id: "2",
    name: "Ayşe Demir",
    role: "Misafir",
    content: "Ağrı Dağı manzarası eşliğinde harika bir konaklama deneyimi yaşadık. Personel çok ilgili ve yardımsever. Kesinlikle tekrar geleceğiz.",
    rating: 5,
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    role: "Eğitimci",
    content: "Öğrencilerimizin uygulama yapması için ideal bir ortam. Hem öğrenciler hem de misafirler için harika bir deneyim sunuyorlar.",
    rating: 5,
  },
  {
    id: "4",
    name: "Fatma Şahin",
    role: "İş Seyahati",
    content: "Konferans salonu ve toplantı odaları çok iyi düzenlenmiş. İş seyahatlerim için mükemmel bir seçenek.",
    rating: 5,
  },
  {
    id: "5",
    name: "Ali Çelik",
    role: "Aile",
    content: "7 yaşındaki çocuğumuz için ücretsiz konaklama imkanından yararlandık. Aile dostu bir ortam, herkese tavsiye ederim.",
    rating: 5,
  },
  {
    id: "6",
    name: "Zeynep Arslan",
    role: "Turizm Öğrencisi",
    content: "Pratik derslerimiz için burada bulunmak harika bir deneyimdi. Gerçek bir otel ortamında çalışmak mesleki gelişimime çok katkı sağladı.",
    rating: 5,
  },
];

export const contactInfo = {
  phone: "0476 228 60 30",
  email: "info@ornek-otel.edu.tr",
  address: "14 Kasım Mah. İlham Aliyev Cad. No: 282, Merkez, Iğdır (TÜVTÜRK Muayene İstasyonu Karşısı)",
  mapUrl: "https://maps.app.goo.gl/eJuv265RmFV4dPGM8?g_st=iw",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.1234567890!2d44.0456!3d39.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU1JzI0LjIiTiA0NMKwMDInNDAuNCJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str",
  openingDate: "15 Aralık 2025",
  airportDistance: "18.8 km",
  cityCenterDistance: "1.39 km",
};
