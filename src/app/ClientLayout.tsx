"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage, LanguageType } from "@/lib/i18n";

const languages: { key: LanguageType; label: string }[] = [
  { key: "en", label: "English" },
  { key: "zh", label: "中文" },
  { key: "ja", label: "日本語" },
  { key: "es", label: "Español" },
];

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.key}
          onClick={() => setLanguage(lang.key)}
          className={`py-1 px-3 rounded-lg border-2 transition-all text-sm ${
            language === lang.key
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-blue-300 text-gray-600"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-1">{t("cookieBannerTitle")}</h3>
          <p className="text-sm text-gray-300">{t("cookieBannerText")}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {t("cookieAccept")}
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {t("cookieReject")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold text-blue-400">
              {t("title")}
            </Link>
            <p className="text-gray-400 text-sm mt-1">{t("description")}</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/privacy-policy"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {t("termsOfService")}
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {t("contact")}
            </Link>
          </nav>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Civil Engineering Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-700">
              {useLanguage().t("title")}
            </Link>
            <LanguageSelector />
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieBanner />
      </div>
    </LanguageProvider>
  );
}

export default ClientLayout;
