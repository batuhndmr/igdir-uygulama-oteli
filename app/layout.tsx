import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iğdır Uygulama Oteli | TOBB Turizm Mesleki ve Teknik Anadolu Lisesi",
  description: "Türkiye Odalar ve Borsalar Birliği Turizm Mesleki ve Teknik Anadolu Lisesi Uygulama Oteli - 30 odalı, 60 yatak kapasiteli modern tesislerimizle öğrencilere iş hayatı öncesi deneyim sunuyoruz. 15 Aralık 2025'te açılıyoruz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
