import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Components
import Navbar from "@/components/Navbar";
import { ToastContainer } from "@/components/ui/ToastContainer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

// ========== OPTIMASI SEO DI SINI ==========
export const metadata: Metadata = {
  title: {
    // Template untuk halaman lain: "Judul Halaman | Adrian Fauzan"
    default: "Adrian Fauzan | Portofolio Data & Software Engineer",
    template: "%s | Adrian Fauzan",
  },
  description: "Portofolio Adrian Musa Al Fauzan - Mahasiswa IT spesialis Data Engineer dan Software Engineer. Lihat proyek Python, SQL, Next.js, dan analisis data.",
  keywords: ["Data Engineer", "Software Engineer", "Portofolio", "Next.js", "Python", "SQL", "Adrian Fauzan", "Mahasiswa IT"],
  authors: [{ name: "Adrian Musa Al Fauzan" }],
  creator: "Adrian Musa Al Fauzan",
  publisher: "Adrian Musa Al Fauzan",

  // Open Graph (untuk tampilan bagus di LinkedIn, WhatsApp, Twitter)
  openGraph: {
    title: "Adrian Fauzan | Data & Software Engineer",
    description: "Portofolio proyek Data Engineer dan Software Engineer. Klik untuk lihat karya Adrian!",
    url: "https://adrianalfauzan-dev.netlify.app",
    siteName: "Adrian Fauzan Portfolio",
    images: [
      {
        url: "/og-image.png", // Buat gambar ini nanti
        width: 1200,
        height: 630,
        alt: "Adrian Fauzan Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Twitter Card (tetap muncul meskipun Anda tidak punya Twitter aktif)
  twitter: {
    card: "summary_large_image",
    title: "Adrian Fauzan | Data & Software Engineer",
    description: "Portofolio proyek Data Engineer dan Software Engineer. Kunjungi LinkedIn saya di linkedin.com/in/adrian-alfauzan",
    images: ["/CodingNGamer.webp"],
  },

  // Icons
  icons: {
    icon: "/CodingNGamer.webp",
    apple: "/apple-touch-icon.png", // Buat ini juga
  },

  // Opsional: verifikasi Google Search Console
  verification: {
    google: "googlee663e92c65ff7230", // Dapatkan dari Google Search Console
  },

  // Alternatif bahasa
  alternates: {
    languages: {
      id: "/id",
      en: "/en",
    },
  },

  // Robots (biar Google mau index)
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      {" "}
      {/* Ganti dari 'en' jadi 'id' karena target Indonesia */}
      <head>
        {/* Sembunyikan Google Translate banner */}
        <style>{`
          .skiptranslate { display: none !important; }
          body { top: 0px !important; }
        `}</style>

        {/* Meta tambahan untuk SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${plusJakarta.variable} antialiased`}>
        {/* Google Translate Script */}
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        <Script id="google-translate" strategy="beforeInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'id', // Ganti jadi 'id' karena bahasa utama Indonesia
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
