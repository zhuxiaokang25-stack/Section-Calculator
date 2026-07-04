"use client";

import { useState, useMemo, useRef } from "react";
import { useLanguage, Translations } from "@/lib/i18n";
import Link from "next/link";

type SupportType = "bothHinged" | "bothFixed" | "hingedFixed";
type LoadType = "uniform" | "point";

interface BeamParams {
  spanLength: number;
  loadValue: number;
  loadPosition: number;
  elasticModulus: number;
  momentInertia: number;
}

interface AnalysisResults {
  reactionA: number;
  reactionB: number;
  maxShear: number;
  maxMoment: number;
  maxDeflection: number;
  shearData: { x: number; y: number }[];
  momentData: { x: number; y: number }[];
  deflectionData: { x: number; y: number }[];
}

export default function BeamAnalysisPage() {
  const { t } = useLanguage();
  const [supportType, setSupportType] = useState<SupportType>("bothHinged");
  const [loadType, setLoadType] = useState<LoadType>("uniform");
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const [params, setParams] = useState<BeamParams>({
    spanLength: 5000,
    loadValue: 10,
    loadPosition: 2500,
    elasticModulus: 205000,
    momentInertia: 100000000,
  });

  const results = useMemo<AnalysisResults | null>(() => {
    const { spanLength, loadValue, loadPosition, elasticModulus, momentInertia } = params;
    
    if (spanLength <= 0 || loadValue <= 0) return null;

    const L = spanLength / 1000;
    const w = loadType === "uniform" ? loadValue : 0;
    const P = loadType === "point" ? loadValue : 0;
    const a = loadPosition / 1000;
    const b = L - a;
    const EI = elasticModulus * momentInertia / 1000000000;

    let reactionA: number, reactionB: number;

    if (supportType === "bothHinged") {
      if (loadType === "uniform") {
        reactionA = w * L / 2;
        reactionB = w * L / 2;
      } else {
        reactionA = P * b / L;
        reactionB = P * a / L;
      }
    } else if (supportType === "bothFixed") {
      if (loadType === "uniform") {
        reactionA = w * L / 2;
        reactionB = w * L / 2;
      } else {
        reactionA = P * b * (L + b) / (L * L);
        reactionB = P * a * (L + a) / (L * L);
      }
    } else {
      if (loadType === "uniform") {
        reactionA = (w * L) / 2;
        reactionB = (w * L) / 2;
      } else {
        reactionA = P * (1 - a/L) * (1 + (a/L)*(a/L));
        reactionB = P * (a/L) * (a/L) * (3 - a/L);
      }
    }

    const shearData: { x: number; y: number }[] = [];
    const momentData: { x: number; y: number }[] = [];
    const deflectionData: { x: number; y: number }[] = [];
    const numPoints = 100;

    for (let i = 0; i <= numPoints; i++) {
      const x = (i / numPoints) * spanLength;
      const xm = x / 1000;

      let shear: number;
      if (loadType === "uniform") {
        shear = reactionA - w * xm;
      } else {
        shear = x < loadPosition ? reactionA : reactionA - P;
      }
      shearData.push({ x, y: shear });

      let moment: number;
      if (loadType === "uniform") {
        moment = reactionA * xm - w * xm * xm / 2;
      } else {
        if (x < loadPosition) {
          moment = reactionA * xm;
        } else {
          moment = reactionA * xm - P * (xm - a);
        }
      }

      if (supportType === "bothFixed") {
        if (loadType === "uniform") {
          moment -= w * L * L / 12;
        } else {
          const fixedMomentA = -P * a * b * b / (L * L);
          const fixedMomentB = -P * a * a * b / (L * L);
          moment += fixedMomentA * (1 - xm/L) + fixedMomentB * (xm/L);
        }
      } else if (supportType === "hingedFixed") {
        if (loadType === "uniform") {
          moment -= w * L * L / 8;
        } else {
          const fixedMoment = -P * a * b * b / (L * L);
          moment += fixedMoment * (1 - xm/L);
        }
      }
      momentData.push({ x, y: moment });

      let deflection: number;
      if (loadType === "uniform") {
        if (supportType === "bothHinged") {
          deflection = (w * xm * (L * L * L - 2 * L * xm * xm + xm * xm * xm)) / (24 * EI);
        } else if (supportType === "bothFixed") {
          deflection = (w * xm * xm * (L - xm) * (L - xm)) / (24 * EI);
        } else {
          deflection = (w * xm * (L * L * L * L - 4 * L * L * xm * xm + 3 * xm * xm * xm * xm)) / (384 * EI);
        }
      } else {
        if (supportType === "bothHinged") {
          if (xm <= a) {
            deflection = (P * b * xm * (L * L - b * b - xm * xm)) / (6 * EI * L);
          } else {
            deflection = (P * a * (L - xm) * (2 * L * xm - xm * xm - a * a)) / (6 * EI * L);
          }
        } else if (supportType === "bothFixed") {
          if (xm <= a) {
            deflection = (P * b * xm * (L * L - b * b - xm * xm)) / (6 * EI * L);
          } else {
            deflection = (P * a * (L - xm) * (2 * L * xm - xm * xm - a * a)) / (6 * EI * L);
          }
        } else {
          if (xm <= a) {
            deflection = (P * b * xm * (L * L * L - b * b * L - 2 * xm * xm * L + b * b * xm)) / (6 * EI * L);
          } else {
            deflection = (P * a * (L - xm) * (2 * L * L * xm - xm * xm * xm - a * a * L - a * a * xm)) / (6 * EI * L);
          }
        }
      }
      deflectionData.push({ x, y: deflection * 1000 });
    }

    const maxShear = Math.max(...shearData.map(d => Math.abs(d.y)));
    const maxMoment = Math.max(...momentData.map(d => Math.abs(d.y)));
    const maxDeflection = Math.max(...deflectionData.map(d => Math.abs(d.y)));

    return {
      reactionA,
      reactionB,
      maxShear,
      maxMoment,
      maxDeflection,
      shearData,
      momentData,
      deflectionData,
    };
  }, [supportType, loadType, params]);

  const handleCopyResults = () => {
    if (!results) return;
    const text = `${t("toolBeamTitle")} Results

${t("beamSupportType")}: ${supportType === "bothHinged" ? t("supportBothHinged") : supportType === "bothFixed" ? t("supportBothFixed") : t("supportHingedFixed")}
${t("beamLoadType")}: ${loadType === "uniform" ? t("loadUniform") : t("loadPoint")}

${t("paramSpanLength")}: ${params.spanLength} mm
${t("paramLoadValue")}: ${params.loadValue} ${t("unitKN")}${loadType === "uniform" ? "/m" : ""}
${loadType === "point" && `${t("paramLoadPosition")}: ${params.loadPosition} mm`}

${t("resultReactionA")}: ${results.reactionA.toFixed(4)} ${t("unitKN")}
${t("resultReactionB")}: ${results.reactionB.toFixed(4)} ${t("unitKN")}
${t("resultShearMax")}: ${results.maxShear.toFixed(4)} ${t("unitKN")}
${t("resultMomentMax")}: ${results.maxMoment.toFixed(4)} ${t("unitKnm")}
${t("resultDeflectionMax")}: ${results.maxDeflection.toFixed(4)} ${t("unitMm")}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${t("toolBeamTitle")}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #1f2937; }
              table { border-collapse: collapse; width: 100%; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f3f4f6; }
              .diagram { margin: 20px 0; }
            </style>
          </head>
          <body>
            ${printRef.current.innerHTML}
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const supports: { value: SupportType; labelKey: keyof Translations }[] = [
    { value: "bothHinged", labelKey: "supportBothHinged" },
    { value: "bothFixed", labelKey: "supportBothFixed" },
    { value: "hingedFixed", labelKey: "supportHingedFixed" },
  ];

  const loads: { value: LoadType; labelKey: keyof Translations }[] = [
    { value: "uniform", labelKey: "loadUniform" },
    { value: "point", labelKey: "loadPoint" },
  ];

  const renderDiagram = (data: { x: number; y: number }[], title: string, symbol: string, unit: string, color: string) => {
    if (data.length === 0) return null;
    
    const maxY = Math.max(...data.map(d => Math.abs(d.y))) || 1;
    const padding = 20;
    const width = 400;
    const height = 150;
    const scaleX = (width - padding * 2) / params.spanLength;
    const scaleY = (height - padding * 2) / (maxY * 1.2);

    const pathData = data.map((d, i) => {
      const x = padding + d.x * scaleX;
      const y = height / 2 - d.y * scaleY;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(" ");

    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-500 mb-2">{symbol}</p>
        <svg width={width} height={height} className="mx-auto">
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#e5e7eb" strokeWidth={2} />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e5e7eb" strokeWidth={1} />
          {data.filter((_, i) => i % 10 === 0).map((d, i) => (
            <g key={i}>
              <line x1={padding + d.x * scaleX} y1={height / 2 - 5} x2={padding + d.x * scaleX} y2={height / 2 + 5} stroke="#9ca3af" strokeWidth={1} />
              <text x={padding + d.x * scaleX} y={height - 5} fontSize="10" textAnchor="middle" fill="#6b7280">
                {(d.x / 1000).toFixed(1)}
              </text>
            </g>
          ))}
          <path d={pathData} stroke={color} strokeWidth={2} fill="none" />
        </svg>
        <p className="text-xs text-gray-500 text-center mt-1">Unit: {unit}</p>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t("home")}
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">{t("toolBeamTitle")}</span>
      </div>

      <div ref={printRef}>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("toolBeamTitle")}</h1>
          <p className="text-gray-600 mb-6">{t("beamIntro")}</p>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">{t("beamSupportType")}</label>
            <div className="flex flex-wrap gap-2">
              {supports.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSupportType(s.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    supportType === s.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 text-gray-600"
                  }`}
                >
                  {t(s.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">{t("beamLoadType")}</label>
            <div className="flex flex-wrap gap-2">
              {loads.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLoadType(l.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    loadType === l.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 text-gray-600"
                  }`}
                >
                  {t(l.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4">{t("beamInputParams")}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramSpanLength")} ({t("unitMm")})</label>
                  <input
                    type="number"
                    value={params.spanLength}
                    onChange={(e) => setParams({ ...params, spanLength: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramLoadValue")} ({t("unitKN")}{loadType === "uniform" ? "/m" : ""})</label>
                  <input
                    type="number"
                    value={params.loadValue}
                    onChange={(e) => setParams({ ...params, loadValue: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {loadType === "point" && (
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">{t("paramLoadPosition")} ({t("unitMm")})</label>
                    <input
                      type="number"
                      value={params.loadPosition}
                      onChange={(e) => setParams({ ...params, loadPosition: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramElasticModulus")} ({t("unitNmm2")})</label>
                  <input
                    type="number"
                    value={params.elasticModulus}
                    onChange={(e) => setParams({ ...params, elasticModulus: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramMomentInertia")} ({t("unitMm4")})</label>
                  <input
                    type="number"
                    value={params.momentInertia}
                    onChange={(e) => setParams({ ...params, momentInertia: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4">{t("beamResults")}</h3>
              
              {results ? (
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">{t("resultReactionA")}</p>
                    <p className="font-semibold text-gray-800">{results.reactionA.toFixed(4)} {t("unitKN")}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">{t("resultReactionB")}</p>
                    <p className="font-semibold text-gray-800">{results.reactionB.toFixed(4)} {t("unitKN")}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">{t("symbolV")}</p>
                    <p className="font-semibold text-gray-800">{results.maxShear.toFixed(4)} {t("unitKN")}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">{t("symbolM")}</p>
                    <p className="font-semibold text-gray-800">{results.maxMoment.toFixed(4)} {t("unitKnm")}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">{t("symbolDelta")}</p>
                    <p className="font-semibold text-gray-800">{results.maxDeflection.toFixed(4)} {t("unitMm")}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">{t("sectionEnterParams")}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={handleCopyResults}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? t("beamCopied") : t("beamCopyResults")}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h5l-1.405-1.405A2.032 2.032 0 0121 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {t("beamPrint")}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("beamDiagrams")}</h2>
          
          {results ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderDiagram(results.shearData, t("shearDiagram"), t("symbolV"), t("unitKN"), "#ef4444")}
              {renderDiagram(results.momentData, t("momentDiagram"), t("symbolM"), t("unitKnm"), "#3b82f6")}
              {renderDiagram(results.deflectionData, t("deflectionDiagram"), t("symbolDelta"), t("unitMm"), "#10b981")}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">{t("sectionEnterParams")}</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("beamFormulas")}</h2>
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">{t("supportBothHinged")} - {t("loadUniform")}</h3>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><strong>{t("resultReactionA")}/{t("resultReactionB")}:</strong> R = wL/2</p>
              <p><strong>{t("resultShearMax")}:</strong> Vₘₐₓ = wL/2</p>
              <p><strong>{t("resultMomentMax")}:</strong> Mₘₐₓ = wL²/8</p>
              <p><strong>{t("resultDeflectionMax")}:</strong> δₘₐₓ = 5wL⁴/(384EI)</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">{t("supportBothHinged")} - {t("loadPoint")}</h3>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><strong>{t("resultReactionA")}:</strong> Rₐ = Pb/L</p>
              <p><strong>{t("resultReactionB")}:</strong> Rᵦ = Pa/L</p>
              <p><strong>{t("resultMomentMax")}:</strong> Mₘₐₓ = Pab/L</p>
              <p><strong>{t("resultDeflectionMax")}:</strong> δₘₐₓ = Pab(L+a)(L+b)/(6EIL)</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">{t("supportBothFixed")} - {t("loadUniform")}</h3>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><strong>{t("resultReactionA")}/{t("resultReactionB")}:</strong> R = wL/2</p>
              <p><strong>Fixed Moment:</strong> M = wL²/12</p>
              <p><strong>{t("resultMomentMax")}:</strong> Mₘₐₓ = wL²/24</p>
              <p><strong>{t("resultDeflectionMax")}:</strong> δₘₐₓ = wL⁴/(384EI)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("beamSeoTitle")}</h2>
        <div className="prose prose-gray max-w-none">
          {t("beamSeoContent").split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-600 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("beamHowToUse")}</h2>
        <div className="prose prose-gray max-w-none">
          {t("beamHowToUse").split("\n\n").map((step, index) => (
            <p key={index} className="text-gray-600 leading-relaxed mb-2">
              {step}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
        <p className="text-yellow-800 text-sm">
          {t("beamNotes")}
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {t("home")}
        </Link>
      </div>
    </div>
  );
}