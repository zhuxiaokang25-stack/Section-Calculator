"use client";

import { useState, useMemo, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type SectionType = "rectangular" | "circular";

interface ColumnParams {
  sectionType: SectionType;
  width: number;
  height: number;
  diameter: number;
  axialForce: number;
  bendingMoment: number;
  fc: number;
  fy: number;
  clearHeight: number;
  kFactor: number;
  cover: number;
  barDiameter: number;
  numBars: number;
}

interface ColumnResults {
  grossArea: number;
  slendernessRatio: number;
  radiusGyration: number;
  eccentricity: number;
  isShortColumn: boolean;
  minReinforcementRatio: number;
  maxReinforcementRatio: number;
  requiredSteelArea: number;
  requiredReinforcementRatio: number;
  numBarsRequired: number;
  capacityRatio: number;
  designCheck: string;
  puOverPhiPn: number;
  muOverPhiMn: number;
}

function calculateColumn(params: ColumnParams): ColumnResults | null {
  const { sectionType, width, height, diameter, axialForce, bendingMoment, fc, fy, clearHeight, kFactor, cover, barDiameter, numBars } = params;

  if (axialForce <= 0) return null;

  const grossArea = sectionType === "rectangular" 
    ? width * height 
    : Math.PI * (diameter / 2) ** 2;

  const depth = sectionType === "rectangular" ? height : diameter;
  const radiusGyration = depth / Math.sqrt(12);
  const slendernessRatio = (kFactor * clearHeight) / radiusGyration;
  const isShortColumn = slendernessRatio <= 100;

  const eccentricity = bendingMoment / axialForce;

  const minReinforcementRatio = 0.01;
  const maxReinforcementRatio = 0.08;

  const d = depth - cover - barDiameter / 2;
  const barArea = Math.PI * (barDiameter / 2) ** 2;
  const currentSteelArea = numBars * barArea;

  const phiPn = 0.65 * (0.85 * fc * (grossArea - currentSteelArea) + fy * currentSteelArea);
  
  let phiMn = 0;
  if (currentSteelArea > 0) {
    const a = (fy * currentSteelArea) / (0.85 * fc * (sectionType === "rectangular" ? width : diameter));
    phiMn = 0.9 * currentSteelArea * fy * (d - a / 2);
  }

  const puOverPhiPn = axialForce / phiPn;
  const muOverPhiMn = bendingMoment > 0 ? bendingMoment / phiMn : 0;

  const requiredSteelArea = (axialForce / 0.65 - 0.85 * fc * grossArea) / (fy - 0.85 * fc);
  const requiredReinforcementRatio = Math.max(requiredSteelArea / grossArea, minReinforcementRatio);
  const clampedRequiredSteelArea = Math.max(requiredSteelArea, minReinforcementRatio * grossArea);
  const numBarsRequired = Math.ceil(clampedRequiredSteelArea / barArea);

  const capacityRatio = Math.max(puOverPhiPn, muOverPhiMn);
  
  let designCheck = "";
  if (capacityRatio <= 1.0) {
    designCheck = "PASS";
  } else if (capacityRatio <= 1.1) {
    designCheck = "MARGINAL";
  } else {
    designCheck = "FAIL";
  }

  return {
    grossArea,
    slendernessRatio,
    radiusGyration,
    eccentricity,
    isShortColumn,
    minReinforcementRatio,
    maxReinforcementRatio,
    requiredSteelArea,
    requiredReinforcementRatio,
    numBarsRequired,
    capacityRatio,
    designCheck,
    puOverPhiPn,
    muOverPhiMn,
  };
}

function CrossSectionDiagram({ params, results }: { params: ColumnParams; results: ColumnResults | null }) {
  const svgSize = 300;
  const { sectionType, width, height, diameter, cover, barDiameter, numBars } = params;
  
  const scale = svgSize / Math.max(sectionType === "rectangular" ? Math.max(width, height) : diameter);
  
  const innerWidth = sectionType === "rectangular" ? width - 2 * cover : diameter - 2 * cover;
  const innerHeight = sectionType === "rectangular" ? height - 2 * cover : diameter - 2 * cover;
  
  const barRadius = (barDiameter / 2) * scale;

  const bars = useMemo(() => {
    const positions: { x: number; y: number }[] = [];
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    
    if (sectionType === "rectangular") {
      const innerW = innerWidth * scale;
      const innerH = innerHeight * scale;
      const spacingX = innerW / 3;
      const spacingY = innerH / 3;
      
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (row === 1 && col === 1) continue;
          positions.push({
            x: cx - innerW / 2 + spacingX / 2 + col * spacingX,
            y: cy - innerH / 2 + spacingY / 2 + row * spacingY,
          });
        }
      }
    } else {
      const r = innerWidth * scale / 2;
      for (let i = 0; i < numBars; i++) {
        const angle = (i / numBars) * 2 * Math.PI - Math.PI / 2;
        positions.push({
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
        });
      }
    }
    
    return positions.slice(0, Math.min(numBars, positions.length));
  }, [sectionType, innerWidth, innerHeight, numBars, scale]);

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
      <svg width={svgSize} height={svgSize} className="border border-gray-300 rounded">
        {sectionType === "rectangular" ? (
          <>
            <rect
              x={0}
              y={0}
              width={width * scale}
              height={height * scale}
              fill="#f5f5f5"
              stroke="#374151"
              strokeWidth={2}
            />
            <rect
              x={cover * scale}
              y={cover * scale}
              width={innerWidth * scale}
              height={innerHeight * scale}
              fill="none"
              stroke="#9ca3af"
              strokeWidth={1}
              strokeDasharray="5,5"
            />
          </>
        ) : (
          <>
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={(diameter / 2) * scale}
              fill="#f5f5f5"
              stroke="#374151"
              strokeWidth={2}
            />
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={(innerWidth / 2) * scale}
              fill="none"
              stroke="#9ca3af"
              strokeWidth={1}
              strokeDasharray="5,5"
            />
          </>
        )}
        {bars.map((bar, i) => (
          <circle
            key={i}
            cx={bar.x}
            cy={bar.y}
            r={barRadius}
            fill="#dc2626"
            stroke="#991b1b"
            strokeWidth={1}
          />
        ))}
        {sectionType === "rectangular" && (
          <>
            <line
              x1={0}
              y1={svgSize / 2}
              x2={width * scale}
              y2={svgSize / 2}
              stroke="#6b7280"
              strokeWidth={1}
              strokeDasharray="3,3"
            />
            <line
              x1={svgSize / 2}
              y1={0}
              x2={svgSize / 2}
              y2={height * scale}
              stroke="#6b7280"
              strokeWidth={1}
              strokeDasharray="3,3"
            />
          </>
        )}
      </svg>
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 border-2 border-gray-700"></div>
          <span>Concrete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <span>Rebar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0 border-t-2 border-dashed border-gray-400"></div>
          <span>Cover ({cover}mm)</span>
        </div>
      </div>
    </div>
  );
}

export default function ColumnDesignPage() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const [params, setParams] = useState<ColumnParams>({
    sectionType: "rectangular",
    width: 400,
    height: 500,
    diameter: 400,
    axialForce: 1500,
    bendingMoment: 100,
    fc: 30,
    fy: 460,
    clearHeight: 3000,
    kFactor: 1.0,
    cover: 40,
    barDiameter: 25,
    numBars: 8,
  });

  const results = useMemo(() => calculateColumn(params), [params]);

  const handleExportPDF = async () => {
    if (!printRef.current) return;
    
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("column-design-report.pdf");
    } catch (error) {
      console.error("PDF export failed:", error);
    }
  };

  const handleCopyResults = () => {
    if (!results) return;
    
    const resultText = `
Column Design Results:
- Section Type: ${params.sectionType === "rectangular" ? "Rectangular" : "Circular"}
- Dimensions: ${params.sectionType === "rectangular" ? `${params.width}mm x ${params.height}mm` : `${params.diameter}mm diameter`}
- Axial Force: ${params.axialForce} kN
- Bending Moment: ${params.bendingMoment} kNm
- Concrete Strength: ${params.fc} MPa
- Steel Strength: ${params.fy} MPa

Results:
- Gross Area: ${results.grossArea.toFixed(0)} mm²
- Slenderness Ratio: ${results.slendernessRatio.toFixed(2)}
- ${results.isShortColumn ? "Short Column" : "Long Column"}
- Eccentricity: ${results.eccentricity.toFixed(2)} mm
- Required Reinforcement Ratio: ${(results.requiredReinforcementRatio * 100).toFixed(2)}%
- Required Steel Area: ${results.requiredSteelArea.toFixed(0)} mm²
- Required Bars: ${results.numBarsRequired}
- Capacity Ratio: ${(results.capacityRatio * 100).toFixed(1)}%
- Design Check: ${results.designCheck}
    `.trim();
    
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t("columnDesignTitle")}</h1>
            <p className="text-gray-600 mt-1">{t("columnDesignDesc")}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopyResults}
              disabled={!results}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {copied ? t("sectionCopied") : t("sectionCopyResults")}
            </button>
            <button
              onClick={handleExportPDF}
              disabled={!results}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {t("beamExport")}
            </button>
          </div>
        </div>

        <div ref={printRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{t("columnInputParams")}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnSectionType")}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setParams({ ...params, sectionType: "rectangular" })}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                      params.sectionType === "rectangular"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {t("shapeRectangle")}
                  </button>
                  <button
                    onClick={() => setParams({ ...params, sectionType: "circular" })}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                      params.sectionType === "circular"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {t("shapeCircle")}
                  </button>
                </div>
              </div>
            </div>

            {params.sectionType === "rectangular" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("paramWidth")} (mm)
                  </label>
                  <input
                    type="number"
                    value={params.width}
                    onChange={(e) => setParams({ ...params, width: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("paramHeight")} (mm)
                  </label>
                  <input
                    type="number"
                    value={params.height}
                    onChange={(e) => setParams({ ...params, height: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("paramDiameter")} (mm)
                  </label>
                  <input
                    type="number"
                    value={params.diameter}
                    onChange={(e) => setParams({ ...params, diameter: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnAxialForce")} (kN)
                </label>
                <input
                  type="number"
                  value={params.axialForce}
                  onChange={(e) => setParams({ ...params, axialForce: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnBendingMoment")} (kNm)
                </label>
                <input
                  type="number"
                  value={params.bendingMoment}
                  onChange={(e) => setParams({ ...params, bendingMoment: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnFc")} (MPa)
                </label>
                <input
                  type="number"
                  value={params.fc}
                  onChange={(e) => setParams({ ...params, fc: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnFy")} (MPa)
                </label>
                <input
                  type="number"
                  value={params.fy}
                  onChange={(e) => setParams({ ...params, fy: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnClearHeight")} (mm)
                </label>
                <input
                  type="number"
                  value={params.clearHeight}
                  onChange={(e) => setParams({ ...params, clearHeight: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnKFactor")}
                </label>
                <select
                  value={params.kFactor}
                  onChange={(e) => setParams({ ...params, kFactor: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={0.5}>0.5 ({t("columnKFixed")})</option>
                  <option value={1.0}>1.0 ({t("columnKHinged")})</option>
                  <option value={1.5}>1.5 ({t("columnKFree")})</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnCover")} (mm)
                </label>
                <input
                  type="number"
                  value={params.cover}
                  onChange={(e) => setParams({ ...params, cover: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnBarDiameter")} (mm)
                </label>
                <select
                  value={params.barDiameter}
                  onChange={(e) => setParams({ ...params, barDiameter: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={12}>12</option>
                  <option value={16}>16</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={32}>32</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnNumBars")}
                </label>
                <input
                  type="number"
                  value={params.numBars}
                  onChange={(e) => setParams({ ...params, numBars: Math.max(4, Number(e.target.value)) })}
                  min={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{t("columnResults")}</h2>
            
            {results ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{t("resultArea")}</p>
                      <p className="text-xl font-bold text-gray-800">{results.grossArea.toFixed(0)} mm²</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t("columnSlendernessRatio")}</p>
                      <p className="text-xl font-bold text-gray-800">{results.slendernessRatio.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className={`rounded-lg p-4 ${results.isShortColumn ? "bg-green-50" : "bg-yellow-50"}`}>
                  <p className="text-sm text-gray-600">
                    {results.isShortColumn ? t("columnShortColumn") : t("columnLongColumn")}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    kl/r = {results.slendernessRatio.toFixed(2)} {results.isShortColumn ? "<= 100" : "> 100"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">{t("columnEccentricity")}</p>
                  <p className="text-xl font-bold text-gray-800">{results.eccentricity.toFixed(2)} mm</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">{t("columnReinforcementRatio")}</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("columnMinRatio")}</span>
                      <span className="font-medium">{(results.minReinforcementRatio * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("columnMaxRatio")}</span>
                      <span className="font-medium">{(results.maxReinforcementRatio * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("columnRequiredRatio")}</span>
                      <span className="font-bold text-blue-600">{(results.requiredReinforcementRatio * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">{t("columnSteelArea")}</p>
                  <p className="text-xl font-bold text-gray-800">{results.requiredSteelArea.toFixed(0)} mm²</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">{t("columnRequiredBars")}</p>
                  <p className="text-xl font-bold text-gray-800">{results.numBarsRequired} x {params.barDiameter}mm</p>
                </div>

                <div className={`rounded-lg p-4 ${
                  results.designCheck === "PASS" ? "bg-green-50" : 
                  results.designCheck === "MARGINAL" ? "bg-yellow-50" : "bg-red-50"
                }`}>
                  <p className="text-sm text-gray-600">{t("columnDesignCheck")}</p>
                  <p className={`text-xl font-bold mt-1 ${
                    results.designCheck === "PASS" ? "text-green-600" : 
                    results.designCheck === "MARGINAL" ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {results.designCheck}
                  </p>
                  <div className="mt-2 text-sm">
                    <p>Capacity Ratio: {(results.capacityRatio * 100).toFixed(1)}%</p>
                    <p>Axial: {(results.puOverPhiPn * 100).toFixed(1)}%</p>
                    <p>Flexural: {(results.muOverPhiMn * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">{t("columnEnterParams")}</p>
            )}

            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-700 mb-3">{t("columnCrossSection")}</h3>
              <CrossSectionDiagram params={params} results={results} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("columnSeoTitle")}</h2>
        
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
          <p>{t("columnSeoContent1")}</p>
          <p>{t("columnSeoContent2")}</p>
          <p>{t("columnSeoContent3")}</p>
          <p>{t("columnSeoContent4")}</p>
          <p>{t("columnSeoContent5")}</p>
          <p>{t("columnSeoContent6")}</p>
          <p>{t("columnSeoContent7")}</p>
          <p>{t("columnSeoContent8")}</p>
          <p>{t("columnSeoContent9")}</p>
          <p>{t("columnSeoContent10")}</p>
          <p>{t("columnSeoContent11")}</p>
          <p>{t("columnSeoContent12")}</p>
          <p>{t("columnSeoContent13")}</p>
          <p>{t("columnSeoContent14")}</p>
          <p>{t("columnSeoContent15")}</p>
        </div>
      </div>
    </div>
  );
}