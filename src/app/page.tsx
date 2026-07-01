"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useLanguage();

  const tools = [
    {
      title: t("toolSectionTitle"),
      desc: t("toolSectionDesc"),
      color: "blue",
      href: "/section-calculator",
      comingSoon: false,
    },
    {
      title: t("toolBeamTitle"),
      desc: t("toolBeamDesc"),
      color: "green",
      href: "#",
      comingSoon: true,
    },
    {
      title: t("toolColumnTitle"),
      desc: t("toolColumnDesc"),
      color: "purple",
      href: "#",
      comingSoon: true,
    },
    {
      title: t("toolSlabTitle"),
      desc: t("toolSlabDesc"),
      color: "orange",
      href: "#",
      comingSoon: true,
    },
    {
      title: t("toolFoundationTitle"),
      desc: t("toolFoundationDesc"),
      color: "red",
      href: "#",
      comingSoon: true,
    },
    {
      title: t("toolRetainingTitle"),
      desc: t("toolRetainingDesc"),
      color: "teal",
      href: "#",
      comingSoon: true,
    },
  ];

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-800" },
    green: { bg: "bg-green-50", border: "border-green-100", text: "text-green-800" },
    purple: { bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-800" },
    orange: { bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-800" },
    red: { bg: "bg-red-50", border: "border-red-100", text: "text-red-800" },
    teal: { bg: "bg-teal-50", border: "border-teal-100", text: "text-teal-800" },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("seoTitle")}</h1>
        <p className="text-gray-600 mb-6">{t("seoDescription")}</p>
        
        <div className="prose prose-gray max-w-none mb-6">
          {t("seoContent").split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-600 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, index) => {
            const colors = colorClasses[tool.color];
            return (
              <div
                key={index}
                className={`${colors.bg} rounded-lg p-4 border ${colors.border} relative overflow-hidden`}
              >
                {tool.comingSoon && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1">
                    {t("comingSoon")}
                  </div>
                )}
                {tool.comingSoon ? (
                  <div className="pointer-events-none">
                    <h3 className={`font-semibold ${colors.text} mb-2 opacity-70`}>
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-500">{tool.desc}</p>
                  </div>
                ) : (
                  <Link href={tool.href}>
                    <h3 className={`font-semibold ${colors.text} mb-2 hover:underline`}>
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600">{tool.desc}</p>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("gettingStarted")}</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>{t("step1")}</li>
          <li>{t("step2")}</li>
          <li>{t("step3")}</li>
          <li>{t("step4")}</li>
        </ol>
      </div>
    </div>
  );
}
