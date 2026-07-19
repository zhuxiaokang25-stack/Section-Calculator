"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useLanguage, Translations } from "@/lib/i18n";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type TranslateFunc = (key: keyof Translations) => string;

function formatLength(value: number): string {
  if (value >= 1000) {
    return `${value.toFixed(0)} mm (${(value / 1000).toFixed(1)} m)`;
  }
  return `${value.toFixed(2)} mm`;
}

const concreteGrades = [
  { label: "C20", value: 20 },
  { label: "C25", value: 25 },
  { label: "C30", value: 30 },
  { label: "C35", value: 35 },
  { label: "C40", value: 40 },
  { label: "C45", value: 45 },
  { label: "C50", value: 50 },
  { label: "C55", value: 55 },
  { label: "C60", value: 60 },
];

const steelGrades = [
  { label: "Grade 30", value: 210 },
  { label: "Grade 40", value: 275 },
  { label: "Grade 60", value: 420 },
  { label: "HRB335", value: 335 },
  { label: "HRB400", value: 400 },
  { label: "HRB500", value: 500 },
  { label: "Grade 80", value: 560 },
];

interface FoundationParams {
  length: number;
  width: number;
  thickness: number;
  depth: number;
  axialForce: number;
  momentX: number;
  momentY: number;
  qult: number;
  gamma: number;
  fc: number;
  fy: number;
  cover: number;
  barDiameter: number;
  columnWidth: number;
  columnDepth: number;
}

interface FoundationResults {
  qmax: number;
  qmin: number;
  qavg: number;
  eccentricityX: number;
  eccentricityY: number;
  isEccentricityOK: boolean;
  effectiveLength: number;
  effectiveWidth: number;
  punchingShearCapacity: number;
  punchingShearDemand: number;
  isPunchingShearOK: boolean;
  oneWayShearCapacity: number;
  oneWayShearDemand: number;
  isOneWayShearOK: boolean;
  steelAreaX: number;
  steelAreaY: number;
  barSpacingX: number;
  barSpacingY: number;
  designCheck: string;
  calculationSteps: { label: string; value: string; formula: string }[];
}

function calculateFoundation(params: FoundationParams, t: TranslateFunc): FoundationResults | null {
  const { length, width, thickness, depth, axialForce, momentX, momentY, qult, gamma, fc, fy, cover, barDiameter, columnWidth, columnDepth } = params;

  if (axialForce <= 0 || length <= 0 || width <= 0 || thickness <= 0) return null;

  const calculationSteps: { label: string; value: string; formula: string }[] = [];

  const area = length * width;
  const weight = area * (thickness / 1000) * 25 + area * depth * gamma;
  const netAxialForce = axialForce + weight;

  const eccentricityX = momentY / netAxialForce;
  const eccentricityY = momentX / netAxialForce;

  const radiusX = width / 6;
  const radiusY = length / 6;

  const isEccentricityOK = eccentricityX <= radiusX && eccentricityY <= radiusY;

  let qmax, qmin, effectiveLength, effectiveWidth;

  if (isEccentricityOK) {
    qmax = (netAxialForce / area) + (momentX / (width * length * length / 12)) + (momentY / (length * width * width / 12));
    qmin = (netAxialForce / area) - (momentX / (width * length * length / 12)) - (momentY / (length * width * width / 12));
    effectiveLength = length;
    effectiveWidth = width;
  } else {
    const kx = eccentricityX / radiusX;
    const ky = eccentricityY / radiusY;
    effectiveLength = length * (1 - kx);
    effectiveWidth = width * (1 - ky);
    qmax = 2 * netAxialForce / (effectiveLength * effectiveWidth);
    qmin = 0;
  }

  calculationSteps.push({
    label: t("foundationBearingPressure"),
    value: `${qmax.toFixed(2)} kPa / ${qmin.toFixed(2)} kPa`,
    formula: `q = P/A ± Mx/Sx ± My/Sy`
  });

  const d = thickness - cover - barDiameter / 2;
  const criticalPerimeter = 4 * (columnWidth + columnDepth + 2 * d);
  const punchingShearCapacity = 0.75 * 0.17 * Math.sqrt(fc) * criticalPerimeter * d / 1000;
  const punchingShearDemand = netAxialForce - qmin * area;

  calculationSteps.push({
    label: t("foundationPunchingShear"),
    value: `${punchingShearDemand.toFixed(1)} kN / ${punchingShearCapacity.toFixed(1)} kN`,
    formula: `Vc = 0.75 * 0.17 * sqrt(f'c) * bo * d`
  });

  const oneWayShearCapacity = 0.75 * 0.17 * Math.sqrt(fc) * width * d / 1000;
  const shearSpan = (length - columnWidth) / 2;
  const oneWayShearDemand = qmax * width * shearSpan / 1000;

  calculationSteps.push({
    label: t("foundationOneWayShear"),
    value: `${oneWayShearDemand.toFixed(1)} kN / ${oneWayShearCapacity.toFixed(1)} kN`,
    formula: `Vc = 0.75 * 0.17 * sqrt(f'c) * b * d`
  });

  const momentSpanX = (length - columnWidth) / 2;
  const momentSpanY = (width - columnDepth) / 2;
  const momentXVal = qmax * width * momentSpanX * momentSpanX / 2 / 1000000;
  const momentYVal = qmax * length * momentSpanY * momentSpanY / 2 / 1000000;

  const steelAreaX = momentXVal * 1000000 / (0.9 * fy * d);
  const steelAreaY = momentYVal * 1000000 / (0.9 * fy * d);

  const barArea = Math.PI * (barDiameter / 2) ** 2;
  const barSpacingX = barArea * width / steelAreaX;
  const barSpacingY = barArea * length / steelAreaY;

  calculationSteps.push({
    label: t("foundationReinforcement"),
    value: `X: ${steelAreaX.toFixed(0)} mm² | Y: ${steelAreaY.toFixed(0)} mm²`,
    formula: `As = Mu / (0.9 * fy * d)`
  });

  const isPunchingShearOK = punchingShearDemand <= punchingShearCapacity;
  const isOneWayShearOK = oneWayShearDemand <= oneWayShearCapacity;

  let designCheck = t("foundationPass");
  if (!isEccentricityOK) designCheck = t("foundationFail");
  else if (!isPunchingShearOK || !isOneWayShearOK) designCheck = t("foundationFail");

  return {
    qmax, qmin, qavg: netAxialForce / area,
    eccentricityX, eccentricityY, isEccentricityOK,
    effectiveLength, effectiveWidth,
    punchingShearCapacity, punchingShearDemand, isPunchingShearOK,
    oneWayShearCapacity, oneWayShearDemand, isOneWayShearOK,
    steelAreaX, steelAreaY, barSpacingX, barSpacingY,
    designCheck, calculationSteps
  };
}

function BearingPressureDiagram({ results, params }: { results: FoundationResults; params: FoundationParams }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();

    const maxPressure = Math.max(results.qmax, Math.abs(results.qmin));
    const minPressure = Math.min(results.qmin, 0);

    const drawBar = (x: number, value: number, width: number, color: string) => {
      const y0 = height - padding;
      const barHeight = ((value - minPressure) / (maxPressure - minPressure)) * chartHeight;
      const y = value >= 0 ? y0 - barHeight : y0;
      const h = value >= 0 ? barHeight : -barHeight;

      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, h);

      ctx.strokeStyle = "#666";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, h);
    };

    const segmentWidth = chartWidth / 20;
    for (let i = 0; i < 20; i++) {
      const x = padding + i * segmentWidth;
      const t = i / 19;
      const pressure = results.qmin + (results.qmax - results.qmin) * (1 - Math.abs(t - 0.5) * 2);
      const color = pressure < 0 ? "#ef4444" : pressure > results.qavg * 1.2 ? "#f59e0b" : "#3b82f6";
      drawBar(x, pressure, segmentWidth - 2, color);
    }

    ctx.fillStyle = "#333";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Foundation Length", width / 2, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Pressure (kPa)", 0, 0);
    ctx.restore();

    ctx.font = "bold 10px Arial";
    ctx.fillStyle = "#3b82f6";
    ctx.fillText("Compression", width - padding + 80, padding + 15);
    ctx.fillStyle = "#ef4444";
    ctx.fillText("Tension/Zero", width - padding + 80, padding + 35);

  }, [results, params]);

  return <canvas ref={canvasRef} width={600} height={300} className="w-full" />;
}

function ReinforcementDiagram({ params }: { params: FoundationParams }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    const scale = Math.min((width - padding * 2) / params.length, (height - padding * 2) / params.width);
    const drawLength = params.length * scale;
    const drawWidth = params.width * scale;
    const drawX = (width - drawLength) / 2;
    const drawY = (height - drawWidth) / 2;

    ctx.fillStyle = "#e5e7eb";
    ctx.fillRect(drawX, drawY, drawLength, drawWidth);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, drawLength, drawWidth);

    const columnDrawWidth = params.columnWidth * scale;
    const columnDrawDepth = params.columnDepth * scale;
    const columnX = drawX + (drawLength - columnDrawWidth) / 2;
    const columnY = drawY + (drawWidth - columnDrawDepth) / 2;

    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(columnX, columnY, columnDrawWidth, columnDrawDepth);
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 1;
    ctx.strokeRect(columnX, columnY, columnDrawWidth, columnDrawDepth);

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 1.5;
    const spacingX = Math.max(5, params.length * scale / 10);
    for (let i = 0; i < 10; i++) {
      const x = drawX + i * spacingX;
      ctx.beginPath();
      ctx.moveTo(x, drawY);
      ctx.lineTo(x, drawY + drawWidth);
      ctx.stroke();
    }

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 1.5;
    const spacingY = Math.max(5, params.width * scale / 10);
    for (let i = 0; i < 10; i++) {
      const y = drawY + i * spacingY;
      ctx.beginPath();
      ctx.moveTo(drawX, y);
      ctx.lineTo(drawX + drawLength, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#333";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("L = " + params.length + " mm", width / 2, height - 15);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("B = " + params.width + " mm", 0, 0);
    ctx.restore();

  }, [params]);

  return <canvas ref={canvasRef} width={400} height={400} className="w-full" />;
}

export default function FoundationDesignPage() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const [params, setParams] = useState<FoundationParams>({
    length: 2500,
    width: 2000,
    thickness: 500,
    depth: 1500,
    axialForce: 1500,
    momentX: 100,
    momentY: 50,
    qult: 200,
    gamma: 18,
    fc: 30,
    fy: 460,
    cover: 75,
    barDiameter: 16,
    columnWidth: 400,
    columnDepth: 500,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromColumn = urlParams.get("fromColumn");
    if (fromColumn) {
      try {
        const data = JSON.parse(decodeURIComponent(fromColumn));
        setParams(prev => ({
          ...prev,
          axialForce: data.axialForce || prev.axialForce,
          momentX: data.bendingMoment || prev.momentX,
          columnWidth: data.width || data.diameter || prev.columnWidth,
          columnDepth: data.height || data.diameter || prev.columnDepth,
        }));
      } catch (e) {
        console.error("Failed to parse column data");
      }
    }
  }, []);

  const results = useMemo(() => calculateFoundation(params, t), [params, t]);

  const handleExportPDF = async () => {
    if (!printRef.current) return;

    try {
      setIsGeneratingPDF(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
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
      pdf.save(`foundation-design-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleCopyResults = () => {
    if (!results) return;

    const resultText = `
${t("foundationDesignResults")}:
- ${t("foundationDimensions")}: ${params.length}mm x ${params.width}mm x ${params.thickness}mm
- ${t("foundationDepth")}: ${params.depth}mm
- ${t("foundationAxialForce")}: ${params.axialForce} kN
- ${t("foundationMomentX")}: ${params.momentX} kNm
- ${t("foundationMomentY")}: ${params.momentY} kNm

${t("foundationResults")}:
- ${t("foundationBearingPressure")}: ${results.qmax.toFixed(2)} / ${results.qmin.toFixed(2)} kPa
- ${t("foundationPunchingShear")}: ${results.punchingShearDemand.toFixed(1)} / ${results.punchingShearCapacity.toFixed(1)} kN
- ${t("foundationOneWayShear")}: ${results.oneWayShearDemand.toFixed(1)} / ${results.oneWayShearCapacity.toFixed(1)} kN
- ${t("foundationReinforcement")}: X: ${results.steelAreaX.toFixed(0)} mm², Y: ${results.steelAreaY.toFixed(0)} mm²
- ${t("foundationDesignCheck")}: ${results.designCheck}
    `.trim();

    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportFromColumn = () => {
    const columnData = {
      axialForce: params.axialForce,
      bendingMoment: params.momentX,
      width: params.columnWidth,
      height: params.columnDepth,
    };
    window.open(`/tools/column-design?fromFoundation=${encodeURIComponent(JSON.stringify(columnData))}`, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t("foundationDesignTitle")}</h1>
            <p className="text-gray-600 mt-1">{t("foundationDesignDesc")}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleImportFromColumn}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t("foundationImportColumn")}
            </button>
            <button
              onClick={handleCopyResults}
              disabled={!results}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {copied ? t("sectionCopied") : t("sectionCopyResults")}
            </button>
            <button
              onClick={handleExportPDF}
              disabled={!results || isGeneratingPDF}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {isGeneratingPDF ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("columnGeneratingPDF")}
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t("columnGeneratePDF")}
                </>
              )}
            </button>
          </div>
        </div>

        <div ref={printRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{t("foundationInputParams")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationLength")} (mm)
                </label>
                <input
                  type="number"
                  value={params.length}
                  onChange={(e) => setParams({ ...params, length: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationWidth")} (mm)
                </label>
                <input
                  type="number"
                  value={params.width}
                  onChange={(e) => setParams({ ...params, width: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationThickness")} (mm)
                </label>
                <input
                  type="number"
                  value={params.thickness}
                  onChange={(e) => setParams({ ...params, thickness: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationDepth")} (mm)
                </label>
                <input
                  type="number"
                  value={params.depth}
                  onChange={(e) => setParams({ ...params, depth: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationAxialForce")} (kN)
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
                  {t("foundationMomentX")} (kNm)
                </label>
                <input
                  type="number"
                  value={params.momentX}
                  onChange={(e) => setParams({ ...params, momentX: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationMomentY")} (kNm)
                </label>
                <input
                  type="number"
                  value={params.momentY}
                  onChange={(e) => setParams({ ...params, momentY: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationQult")} (kPa)
                </label>
                <input
                  type="number"
                  value={params.qult}
                  onChange={(e) => setParams({ ...params, qult: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationGamma")} (kN/m³)
                </label>
                <input
                  type="number"
                  value={params.gamma}
                  onChange={(e) => setParams({ ...params, gamma: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnFc")} (MPa)
                </label>
                <div className="flex gap-2 w-full">
                  <input
                    type="number"
                    value={params.fc}
                    onChange={(e) => setParams({ ...params, fc: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select
                    onChange={(e) => setParams({ ...params, fc: Number(e.target.value) })}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-sm"
                  >
                    <option value="">{t("columnPreset")}</option>
                    {concreteGrades.map((grade) => (
                      <option key={grade.label} value={grade.value}>{grade.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("columnFy")} (MPa)
                </label>
                <div className="flex gap-2 w-full">
                  <input
                    type="number"
                    value={params.fy}
                    onChange={(e) => setParams({ ...params, fy: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select
                    onChange={(e) => setParams({ ...params, fy: Number(e.target.value) })}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-sm"
                  >
                    <option value="">{t("columnPreset")}</option>
                    {steelGrades.map((grade) => (
                      <option key={grade.label} value={grade.value}>{grade.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <input
                  type="number"
                  value={params.barDiameter}
                  onChange={(e) => setParams({ ...params, barDiameter: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationColumnWidth")} (mm)
                </label>
                <input
                  type="number"
                  value={params.columnWidth}
                  onChange={(e) => setParams({ ...params, columnWidth: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("foundationColumnDepth")} (mm)
                </label>
                <input
                  type="number"
                  value={params.columnDepth}
                  onChange={(e) => setParams({ ...params, columnDepth: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{t("foundationResults")}</h2>

            {results ? (
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2">{t("foundationBearingPressure")}</h3>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationQmax")}:</span>
                    <span className="font-bold text-blue-600">{results.qmax.toFixed(2)} kPa</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationQmin")}:</span>
                    <span className={`font-bold ${results.qmin < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                      {results.qmin.toFixed(2)} kPa
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationQavg")}:</span>
                    <span className="font-bold text-blue-600">{results.qavg.toFixed(2)} kPa</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("foundationEccentricity")}:</span>
                    <span>{results.eccentricityX.toFixed(2)} / {results.eccentricityY.toFixed(2)} mm</span>
                  </div>
                  {!results.isEccentricityOK && (
                    <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm font-medium">⚠️ {t("foundationTensionWarning")}</p>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">{t("foundationPunchingShear")}</h3>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationDemand")}:</span>
                    <span className="font-bold">{results.punchingShearDemand.toFixed(1)} kN</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationCapacity")}:</span>
                    <span className="font-bold">{results.punchingShearCapacity.toFixed(1)} kN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("foundationRatio")}:</span>
                    <span className={`font-bold ${results.isPunchingShearOK ? 'text-green-600' : 'text-red-600'}`}>
                      {(results.punchingShearDemand / results.punchingShearCapacity * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-purple-800 mb-2">{t("foundationOneWayShear")}</h3>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationDemand")}:</span>
                    <span className="font-bold">{results.oneWayShearDemand.toFixed(1)} kN</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationCapacity")}:</span>
                    <span className="font-bold">{results.oneWayShearCapacity.toFixed(1)} kN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("foundationRatio")}:</span>
                    <span className={`font-bold ${results.isOneWayShearOK ? 'text-green-600' : 'text-red-600'}`}>
                      {(results.oneWayShearDemand / results.oneWayShearCapacity * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-green-800 mb-2">{t("foundationReinforcement")}</h3>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationSteelX")}:</span>
                    <span className="font-bold">{results.steelAreaX.toFixed(0)} mm²</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationSteelY")}:</span>
                    <span className="font-bold">{results.steelAreaY.toFixed(0)} mm²</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t("foundationSpacingX")}:</span>
                    <span className="font-bold">{results.barSpacingX.toFixed(0)} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("foundationSpacingY")}:</span>
                    <span className="font-bold">{results.barSpacingY.toFixed(0)} mm</span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  results.designCheck === t("foundationPass") 
                    ? 'bg-green-100 border-green-300' 
                    : 'bg-red-100 border-red-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {results.designCheck === t("foundationPass") ? '✅' : '❌'} {t("foundationDesignCheck")}
                    </span>
                    <span className={`font-bold text-lg ${
                      results.designCheck === t("foundationPass") ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {results.designCheck}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-3">{t("foundationPressureDiagram")}</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <BearingPressureDiagram results={results} params={params} />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-3">{t("foundationReinforcementDiagram")}</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ReinforcementDiagram params={params} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-12">
                <p>{t("foundationEnterParams")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}