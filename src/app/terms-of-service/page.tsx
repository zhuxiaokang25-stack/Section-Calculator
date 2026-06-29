"use client";

import { useLanguage } from "@/lib/i18n";

export default function TermsOfServicePage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("termsPageTitle")}</h1>
        <p className="text-gray-500 text-sm mb-6">{t("termsLastUpdated")}</p>
        
        <div className="space-y-6">
          <section>
            <p className="text-gray-600 leading-relaxed">{t("termsIntro")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">{t("termsAcceptance")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Use of Tools</h2>
            <p className="text-gray-600 leading-relaxed">{t("termsToolUse")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">{t("termsDisclaimer")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Accuracy</h2>
            <p className="text-gray-600 leading-relaxed">{t("termsAccuracy")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">{t("termsLimitation")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">{t("termsIntellectual")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Modifications</h2>
            <p className="text-gray-600 leading-relaxed">{t("termsModifications")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Termination</h2>
            <p className="text-gray-600 leading-relaxed">{t("termsTermination")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">{t("termsGoverning")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
