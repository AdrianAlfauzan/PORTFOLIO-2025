import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "@/components/ui/ToastContainer";
import Script from "next/script";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Adrian Wrapped 2025",
  description: "Developer journey wrapped",
  icons: {
    icon: "/CodingNGamer.webp",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Sembunyikan Google Translate banner */}
        <style>{`
          .skiptranslate { display: none !important; }
          body { top: 0px !important; }
        `}</style>
      </head>
      <body className={`${plusJakarta.variable} antialiased`}>
        {/* Google Translate Script */}
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        <Script id="google-translate" strategy="beforeInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,id',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>

        {/* Hidden div for Google Translate */}
        <div id="google_translate_element" className="hidden" />

        <ToastContainer />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
