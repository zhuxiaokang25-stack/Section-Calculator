"use client";

import { useLanguage } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("title")}</h1>
        <p className="text-gray-600 mb-6">{t("description")}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">Section Calculator</h3>
            <p className="text-sm text-gray-600">Calculate section properties for various shapes</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="font-semibold text-green-800 mb-2">Beam Analysis</h3>
            <p className="text-sm text-gray-600">Analyze beam deflection and stress</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <h3 className="font-semibold text-purple-800 mb-2">Column Design</h3>
            <p className="text-sm text-gray-600">Design columns according to standards</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <h3 className="font-semibold text-orange-800 mb-2">Slab Design</h3>
            <p className="text-sm text-gray-600">Calculate slab thickness and reinforcement</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <h3 className="font-semibold text-red-800 mb-2">Foundation Design</h3>
            <p className="text-sm text-gray-600">Design footings and foundations</p>
          </div>
          <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
            <h3 className="font-semibold text-teal-800 mb-2">Retaining Wall</h3>
            <p className="text-sm text-gray-600">Design and analyze retaining walls</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Select a calculation tool from the grid above</li>
          <li>Enter the required parameters</li>
          <li>Click calculate to get results</li>
          <li>Use the copy button to export results</li>
        </ol>
      </div>
    </div>
  );
}
