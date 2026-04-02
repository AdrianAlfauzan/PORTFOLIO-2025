"use client";

import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

const COOKIE_NAME = "googtrans";

declare global {
  interface Window {
    __GOOGLE_TRANSLATION_CONFIG__?: {
      defaultLanguage: string;
    };
  }
}

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const cookies = parseCookies();
    const existing = cookies[COOKIE_NAME];

    if (existing) {
      const lang = existing.split("/")[2];
      setCurrentLang(lang);
    } else if (window.__GOOGLE_TRANSLATION_CONFIG__) {
      setCurrentLang(window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage);
    }
  }, []);

  const switchLanguage = (lang: string) => {
    setCookie(null, COOKIE_NAME, "/auto/" + lang, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
    window.location.reload();
  };

  if (!isMounted) {
    return (
      <div className="flex items-center gap-2 notranslate">
        <div className="px-3 py-2 rounded-xl text-sm font-medium bg-white/5 text-zinc-300 animate-pulse">🇬🇧 EN</div>
        <div className="px-3 py-2 rounded-xl text-sm font-medium bg-white/5 text-zinc-300 animate-pulse">🇮🇩 ID</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 notranslate">
      <button
        onClick={() => switchLanguage("en")}
        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${currentLang === "en" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-white/5 text-zinc-300 hover:bg-white/10"}`}
      >
        🇬🇧 EN
      </button>
      <button
        onClick={() => switchLanguage("id")}
        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${currentLang === "id" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-white/5 text-zinc-300 hover:bg-white/10"}`}
      >
        🇮🇩 ID
      </button>
    </div>
  );
}
