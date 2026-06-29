"use client";

import { useLanguage } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("aboutPageTitle")}</h1>
        <p className="text-gray-600 leading-relaxed mb-6">{t("aboutIntro")}</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t("aboutTeam")}</h2>
            <p className="text-gray-600 leading-relaxed">{t("aboutMission")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Experience</h2>
            <p className="text-gray-600 leading-relaxed">{t("aboutExperience")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Technology</h2>
            <p className="text-gray-600 leading-relaxed">{t("aboutTechnology")}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Commitment</h2>
            <p className="text-gray-600 leading-relaxed">{t("aboutCommitment")}</p>
          </section>
          
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <p className="text-blue-800 italic text-center">
              "Engineering is not just about building structures; it's about building a better world. 
              We are dedicated to providing tools that empower engineers to make informed decisions 
              and create safe, sustainable infrastructure for generations to come."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
