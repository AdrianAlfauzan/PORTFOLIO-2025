import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Adrian Wrapped 2025",
  description: "Developer journey wrapped",
  icons: {
    icon: "/public/CodingNGamer.webp",
    apple: "/public/CodingNGamer.webp",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
