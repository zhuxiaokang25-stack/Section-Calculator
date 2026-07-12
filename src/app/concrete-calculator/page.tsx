"use client";

import { useState, useMemo } from "react";
import { useLanguage, Translations } from "@/lib/i18n";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type ConcreteMode = "slab" | "wall" | "column" | "curb";

interface ConcreteParams {
  length: number;
  width: number;
  thickness: number;
  height: number;
  diameter: number;
  sectionWidth: number;
  sectionHeight: number;
  quantity: number;
  waste: number;
}

interface ConcreteResults {
  volume: number;
  volumeWithWaste: number;
  bags20kg: number;
  bags25kg: number;
  bags40kg: number;
  bags40lb: number;
  bags60lb: number;
  bags80lb: number;
}

const bagOptions = [
  { weight: 20, unit: "kg", label: "20kg" },
  { weight: 25, unit: "kg", label: "25kg" },
  { weight: 40, unit: "kg", label: "40kg" },
  { weight: 40, unit: "lb", label: "40lb" },
  { weight: 60, unit: "lb", label: "60lb" },
  { weight: 80, unit: "lb", label: "80lb" },
];

export default function ConcreteCalculatorPage() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<ConcreteMode>("slab");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [selectedBag, setSelectedBag] = useState("25kg");
  const [copied, setCopied] = useState(false);

  const [params, setParams] = useState<ConcreteParams>({
    length: 5,
    width: 3,
    thickness: 0.15,
    height: 2.5,
    diameter: 0.4,
    sectionWidth: 0.3,
    sectionHeight: 0.2,
    quantity: 1,
    waste: 5,
  });

  const results = useMemo<ConcreteResults | null>(() => {
    let volume = 0;

    switch (mode) {
      case "slab":
        volume = params.length * params.width * params.thickness;
        break;
      case "wall":
        volume = params.length * params.height * params.thickness;
        break;
      case "column":
        const radius = params.diameter / 2;
        volume = Math.PI * radius * radius * params.height;
        break;
      case "curb":
        volume = params.length * params.sectionWidth * params.sectionHeight;
        break;
    }

    volume *= params.quantity;
    const wasteFactor = 1 + params.waste / 100;
    const volumeWithWaste = volume * wasteFactor;

    const concreteDensityKgPerM3 = 2400;
    const concreteDensityLbPerFt3 = 150;

    let totalKg: number;
    let totalLb: number;

    if (unit === "metric") {
      totalKg = volumeWithWaste * concreteDensityKgPerM3;
      totalLb = totalKg * 2.20462;
    } else {
      totalLb = volumeWithWaste * concreteDensityLbPerFt3;
      totalKg = totalLb / 2.20462;
    }

    return {
      volume,
      volumeWithWaste,
      bags20kg: Math.ceil(totalKg / 20),
      bags25kg: Math.ceil(totalKg / 25),
      bags40kg: Math.ceil(totalKg / 40),
      bags40lb: Math.ceil(totalLb / 40),
      bags60lb: Math.ceil(totalLb / 60),
      bags80lb: Math.ceil(totalLb / 80),
    };
  }, [mode, unit, params]);

  const getSelectedBagCount = () => {
    if (!results) return 0;
    switch (selectedBag) {
      case "20kg": return results.bags20kg;
      case "25kg": return results.bags25kg;
      case "40kg": return results.bags40kg;
      case "40lb": return results.bags40lb;
      case "60lb": return results.bags60lb;
      case "80lb": return results.bags80lb;
      default: return 0;
    }
  };

  const handleCopyResults = () => {
    if (!results) return;
    const text = `${t("toolConcreteTitle")}\n${t("concreteMode")}: ${mode === "slab" ? t("concreteSlab") : mode === "wall" ? t("concreteWall") : mode === "column" ? t("concreteColumn") : t("concreteCurb")}\n${t("concreteTotalVolume")}: ${results.volume.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}\n${t("concreteVolumeWithWaste")}: ${results.volumeWithWaste.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}\n${t("concreteBagsNeeded")} (${selectedBag}): ${getSelectedBagCount()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = async () => {
    if (!results) return;

    const modeLabel = mode === "slab" ? t("concreteSlab") : mode === "wall" ? t("concreteWall") : mode === "column" ? t("concreteColumn") : t("concreteCurb");

    const pdfContent = document.createElement("div");
    pdfContent.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 800px;
      background: white;
      padding: 40px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    `;

    pdfContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">${t("pdfReportTitle")}</h1>
        <h2 style="font-size: 18px; color: #333;">${t("toolConcreteTitle")}</h2>
        <div style="font-size: 12px; color: #666; margin-top: 10px;">
          <span>${t("pdfGeneratedBy")}: useciviltools.com</span>
          <span style="margin-left: 30px;">${t("pdfDate")}: ${new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid #ccc; margin-bottom: 20px;">

      <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">${t("pdfInputParams")}</h3>
      <div style="font-size: 13px; line-height: 1.8; padding-left: 20px;">
        <p>${t("concreteMode")}: ${modeLabel}</p>
        <p>${t("concreteQuantity")}: ${params.quantity}</p>
        <p>${t("concreteWaste")}: ${params.waste}%</p>
        ${mode === "slab" ? `
          <p>${t("concreteLength")}: ${params.length} ${unit === "metric" ? "m" : "ft"}</p>
          <p>${t("concreteWidth")}: ${params.width} ${unit === "metric" ? "m" : "ft"}</p>
          <p>${t("concreteThickness")}: ${params.thickness} ${unit === "metric" ? "m" : "ft"}</p>
        ` : mode === "wall" ? `
          <p>${t("concreteLength")}: ${params.length} ${unit === "metric" ? "m" : "ft"}</p>
          <p>${t("concreteHeight")}: ${params.height} ${unit === "metric" ? "m" : "ft"}</p>
          <p>${t("concreteThickness")}: ${params.thickness} ${unit === "metric" ? "m" : "ft"}</p>
        ` : mode === "column" ? `
          <p>${t("concreteDiameter")}: ${params.diameter} ${unit === "metric" ? "m" : "ft"}</p>
          <p>${t("concreteHeight")}: ${params.height} ${unit === "metric" ? "m" : "ft"}</p>
        ` : `
          <p>${t("concreteLength")}: ${params.length} ${unit === "metric" ? "m" : "ft"}</p>
          <p>${t("concreteSection")}: ${params.sectionWidth} × ${params.sectionHeight} ${unit === "metric" ? "m" : "ft"}</p>
        `}
      </div>

      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">

      <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">${t("pdfCalculationSteps")}</h3>
      <div style="font-size: 13px; line-height: 1.8; padding-left: 20px;">
        ${mode === "slab" ? `
          <p>1. ${t("concreteVolume")}: V = L × W × T = ${params.length} × ${params.width} × ${params.thickness} = ${results.volume.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}</p>
        ` : mode === "wall" ? `
          <p>1. ${t("concreteVolume")}: V = L × H × T = ${params.length} × ${params.height} × ${params.thickness} = ${results.volume.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}</p>
        ` : mode === "column" ? `
          <p>1. ${t("concreteVolume")}: V = π × r² × H = π × (${params.diameter / 2})² × ${params.height} = ${results.volume.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}</p>
        ` : `
          <p>1. ${t("concreteVolume")}: V = L × W × H = ${params.length} × ${params.sectionWidth} × ${params.sectionHeight} = ${results.volume.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}</p>
        `}
        <p>2. ${t("concreteTotalVolume")}: V_total = V × ${params.quantity} = ${results.volume.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}</p>
        <p>3. ${t("concreteVolumeWithWaste")}: V_waste = V_total × (1 + ${params.waste}%) = ${results.volumeWithWaste.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">

      <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">${t("pdfResults")}</h3>
      <div style="font-size: 13px; line-height: 1.8; padding-left: 20px;">
        <p>${t("concreteTotalVolume")}: ${results.volume.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}</p>
        <p>${t("concreteVolumeWithWaste")}: ${results.volumeWithWaste.toFixed(4)} ${unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}</p>
        <p>${t("concreteBagsNeeded")} (20kg): ${results.bags20kg}</p>
        <p>${t("concreteBagsNeeded")} (25kg): ${results.bags25kg}</p>
        <p>${t("concreteBagsNeeded")} (40kg): ${results.bags40kg}</p>
        <p>${t("concreteBagsNeeded")} (40lb): ${results.bags40lb}</p>
        <p>${t("concreteBagsNeeded")} (60lb): ${results.bags60lb}</p>
        <p>${t("concreteBagsNeeded")} (80lb): ${results.bags80lb}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">

      <div style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
        useciviltools.com
      </div>
    `;

    document.body.appendChild(pdfContent);

    try {
      const canvas = await html2canvas(pdfContent, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdfWidth = 210;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      const doc = new jsPDF({
        orientation: pdfHeight > 297 ? "portrait" : "portrait",
        unit: "mm",
        format: "a4",
      });

      if (pdfHeight <= 297) {
        doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      } else {
        const pageHeight = 297;
        let startY = 0;

        while (startY < pdfHeight) {
          const currentHeight = Math.min(pageHeight, pdfHeight - startY);
          const imgStartY = (startY / pdfHeight) * imgHeight;
          const imgEndY = imgStartY + (currentHeight / pdfHeight) * imgHeight;

          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = imgWidth;
          tempCanvas.height = Math.round(imgEndY - imgStartY);
          const ctx = tempCanvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(canvas, 0, imgStartY, imgWidth, imgEndY - imgStartY, 0, 0, imgWidth, tempCanvas.height);
            const tempImgData = tempCanvas.toDataURL("image/png");
            doc.addImage(tempImgData, "PNG", 0, 0, pdfWidth, currentHeight);
          }

          startY += currentHeight;
          if (startY < pdfHeight) {
            doc.addPage();
          }
        }
      }

      doc.save(`${t("toolConcreteTitle")}-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("PDF export error:", error);
    } finally {
      document.body.removeChild(pdfContent);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm mb-2 block">
              ← {t("backToHome")}
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">{t("toolConcreteTitle")}</h1>
            <p className="text-gray-600 mt-2">{t("toolConcreteDesc")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">{t("concreteMode")}</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "slab" as ConcreteMode, label: t("concreteSlab") },
                  { value: "wall" as ConcreteMode, label: t("concreteWall") },
                  { value: "column" as ConcreteMode, label: t("concreteColumn") },
                  { value: "curb" as ConcreteMode, label: t("concreteCurb") },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setMode(item.value)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      mode === item.value
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {mode === "slab" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteLength")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.length}
                      onChange={(e) => setParams({ ...params, length: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteWidth")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.width}
                      onChange={(e) => setParams({ ...params, width: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteThickness")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.thickness}
                      onChange={(e) => setParams({ ...params, thickness: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.001"
                    />
                  </div>
                </>
              )}

              {mode === "wall" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteLength")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.length}
                      onChange={(e) => setParams({ ...params, length: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteHeight")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.height}
                      onChange={(e) => setParams({ ...params, height: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteThickness")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.thickness}
                      onChange={(e) => setParams({ ...params, thickness: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.001"
                    />
                  </div>
                </>
              )}

              {mode === "column" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteDiameter")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.diameter}
                      onChange={(e) => setParams({ ...params, diameter: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteHeight")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.height}
                      onChange={(e) => setParams({ ...params, height: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </>
              )}

              {mode === "curb" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteLength")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.length}
                      onChange={(e) => setParams({ ...params, length: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteSection")} - {t("concreteWidth")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.sectionWidth}
                      onChange={(e) => setParams({ ...params, sectionWidth: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {t("concreteSection")} - {t("concreteHeight")} ({unit === "metric" ? "m" : "ft"})
                    </label>
                    <input
                      type="number"
                      value={params.sectionHeight}
                      onChange={(e) => setParams({ ...params, sectionHeight: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">{t("concreteQuantity")}</label>
                <input
                  type="number"
                  value={params.quantity}
                  onChange={(e) => setParams({ ...params, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">{t("concreteWaste")}</label>
                <input
                  type="number"
                  value={params.waste}
                  onChange={(e) => setParams({ ...params, waste: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="50"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">{t("concreteBagWeight")}</label>
                <select
                  value={selectedBag}
                  onChange={(e) => setSelectedBag(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {bagOptions.map((bag) => (
                    <option key={bag.label} value={bag.label}>
                      {bag.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setUnit("metric")}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                    unit === "metric"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  {t("concreteUnitM3")}
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                    unit === "imperial"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  {t("concreteUnitFt3")}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">{t("results")}</h2>

            {results && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <p className="text-sm opacity-90">{t("concreteTotalVolume")}</p>
                  <p className="text-3xl font-bold mt-1">
                    {results.volume.toFixed(4)} {unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                  <p className="text-sm opacity-90">{t("concreteVolumeWithWaste")} ({params.waste}%)</p>
                  <p className="text-3xl font-bold mt-1">
                    {results.volumeWithWaste.toFixed(4)} {unit === "metric" ? t("concreteUnitM3") : t("concreteUnitFt3")}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                  <p className="text-sm opacity-90">{t("concreteBagsNeeded")} ({selectedBag})</p>
                  <p className="text-3xl font-bold mt-1">{getSelectedBagCount()}</p>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-700 mb-3">{t("concreteBagEstimation")}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {bagOptions.map((bag) => {
                      const count = bag.weight === 20 ? results.bags20kg :
                                    bag.weight === 25 ? results.bags25kg :
                                    bag.weight === 40 && bag.unit === "kg" ? results.bags40kg :
                                    bag.weight === 40 && bag.unit === "lb" ? results.bags40lb :
                                    bag.weight === 60 ? results.bags60lb : results.bags80lb;
                      return (
                        <div
                          key={bag.label}
                          onClick={() => setSelectedBag(bag.label)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedBag === bag.label
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <p className="text-xs text-gray-500">{bag.label}</p>
                          <p className="text-lg font-bold text-gray-800">{count}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-2">
              <button
                onClick={handleCopyResults}
                disabled={!results}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                }`}
              >
                {copied ? t("sectionCopied") : t("sectionCopyResults")}
              </button>
              <button
                onClick={handleExportPDF}
                disabled={!results}
                className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t("pdfExport")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("concreteFormulas")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">{t("seoHowCalculateVolume")}</h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-800">{t("seoSlabFooting")}</p>
                  <p className="text-sm">V = Length × Width × Thickness</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-800">{t("seoWall")}</p>
                  <p className="text-sm">V = Length × Height × Thickness</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-800">{t("seoColumnCylinder")}</p>
                  <p className="text-sm">V = π × (Diameter/2)² × Height</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-800">{t("seoCurbGutter")}</p>
                  <p className="text-sm">V = Length × Section Width × Section Height</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">{t("seoWhyWaste")}</h3>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{t("seoWasteReason1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{t("seoWasteReason2")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{t("seoWasteReason3")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{t("seoWasteReason4")}</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                <strong>{t("seoWasteRecommended")}</strong><br/>
                • {t("seoWasteSimple")}<br/>
                • {t("seoWasteWalls")}<br/>
                • {t("seoWasteComplex")}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{t("seoGradesTitle")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800">{t("seoGradeC10")}</p>
                <p className="text-sm text-gray-600 mt-2">{t("seoGradeC10Desc")}</p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li>• {t("seoGradeC10Use1")}</li>
                  <li>• {t("seoGradeC10Use2")}</li>
                  <li>• {t("seoGradeC10Use3")}</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800">{t("seoGradeC20")}</p>
                <p className="text-sm text-gray-600 mt-2">{t("seoGradeC20Desc")}</p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li>• {t("seoGradeC20Use1")}</li>
                  <li>• {t("seoGradeC20Use2")}</li>
                  <li>• {t("seoGradeC20Use3")}</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800">{t("seoGradeC30")}</p>
                <p className="text-sm text-gray-600 mt-2">{t("seoGradeC30Desc")}</p>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li>• {t("seoGradeC30Use1")}</li>
                  <li>• {t("seoGradeC30Use2")}</li>
                  <li>• {t("seoGradeC30Use3")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("seoHowManyBags")}</h2>
          
          <div className="text-gray-600 leading-relaxed">
            <p className="mb-4">{t("seoBagsIntro")}</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">{t("seoBagsGuideTitle")}</h3>
            
            <ol className="space-y-4">
              <li className="flex">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
                <div>
                  <p className="font-medium text-gray-800">{t("seoBagsStep1Title")}</p>
                  <p className="text-sm text-gray-600 mt-1">{t("seoBagsStep1Desc")}</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
                <div>
                  <p className="font-medium text-gray-800">{t("seoBagsStep2Title")}</p>
                  <p className="text-sm text-gray-600 mt-1">{t("seoBagsStep2Desc")}</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
                <div>
                  <p className="font-medium text-gray-800">{t("seoBagsStep3Title")}</p>
                  <p className="text-sm text-gray-600 mt-1">{t("seoBagsStep3Desc")}</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</span>
                <div>
                  <p className="font-medium text-gray-800">{t("seoBagsStep4Title")}</p>
                  <p className="text-sm text-gray-600 mt-1">{t("seoBagsStep4Desc")}</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">5</span>
                <div>
                  <p className="font-medium text-gray-800">{t("seoBagsStep5Title")}</p>
                  <p className="text-sm text-gray-600 mt-1">{t("seoBagsStep5Desc")}</p>
                </div>
              </li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">{t("seoBagSizesTitle")}</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">{t("seoBagSize")}</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">{t("seoBagVolumeM3")}</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">{t("seoBagVolumeFt3")}</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">{t("seoBagUses")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">20kg</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.0083</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.29</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{t("seoBag20kgUse")}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">25kg</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.0104</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.37</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{t("seoBag25kgUse")}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">40kg</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.0167</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.59</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{t("seoBag40kgUse")}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">40lb</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.0075</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.265</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{t("seoBag40lbUse")}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">60lb</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.0113</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.397</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{t("seoBag60lbUse")}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">80lb</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.0151</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">0.533</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{t("seoBag80lbUse")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">{t("seoTipsTitle")}</h3>
            
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{t("seoTipRoundUp")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{t("seoTipReadyMix")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{t("seoTipDelivery")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{t("seoTipWeather")}</span>
              </li>
            </ul>

            <p className="mt-6 text-gray-600">{t("seoConclusion")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}