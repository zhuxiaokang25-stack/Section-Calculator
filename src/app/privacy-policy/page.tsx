"use client";

import { useLanguage } from "@/lib/i18n";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("privacyPageTitle")}</h1>
        <p className="text-gray-500 text-sm mb-6">{t("privacyLastUpdated")}</p>
        
        <div className="space-y-6">
          <section>
            <p className="text-gray-600 leading-relaxed">{t("privacyIntro")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("privacyInformationCollection")}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>{t("privacyInfoPersonal")}</li>
              <li>{t("privacyInfoUsage")}</li>
              <li>{t("privacyInfoDevice")}</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("privacyHowWeUse")}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>{t("privacyUseProvide")}</li>
              <li>{t("privacyUseImprove")}</li>
              <li>{t("privacyUseCommunicate")}</li>
              <li>{t("privacyUseAdvertise")}</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("privacyGoogleAdSenseTitle")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("privacyGoogleAdSense")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("privacyCookiesTitle")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("privacyCookies")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("privacyGDPRTitle")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("privacyGDPR")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("privacyCCPATitle")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("privacyCCPA")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("privacyDataSecurityTitle")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("privacyDataSecurity")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("privacyChangesTitle")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("privacyChanges")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("privacyContactTitle")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("privacyContact")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
