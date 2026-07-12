"use client";

import { useState, useMemo, useRef } from "react";
import { useLanguage, Translations } from "@/lib/i18n";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type ShapeType = "rectangle" | "circle" | "ibeam" | "channel" | "angle";

interface Results {
  area: number;
  centroidX: number;
  centroidY: number;
  momentInertiaX: number;
  momentInertiaY: number;
  sectionModulusX: number;
  sectionModulusY: number;
  radiusGyrationX: number;
  radiusGyrationY: number;
}

interface ShapeParams {
  rectangle: { width: number; height: number };
  circle: { diameter: number };
  ibeam: { topFlangeWidth: number; topFlangeThickness: number; webHeight: number; webThickness: number; bottomFlangeWidth: number; bottomFlangeThickness: number };
  channel: { flangeWidth: number; flangeThickness: number; webHeight: number; webThickness: number };
  angle: { legWidth1: number; legThickness1: number; legWidth2: number; legThickness2: number };
}

export default function SectionCalculatorPage() {
  const { t } = useLanguage();
  const [shape, setShape] = useState<ShapeType>("rectangle");
  const [copied, setCopied] = useState(false);
  
  const [params, setParams] = useState<ShapeParams>({
    rectangle: { width: 100, height: 200 },
    circle: { diameter: 150 },
    ibeam: { topFlangeWidth: 150, topFlangeThickness: 12, webHeight: 200, webThickness: 8, bottomFlangeWidth: 150, bottomFlangeThickness: 12 },
    channel: { flangeWidth: 80, flangeThickness: 10, webHeight: 150, webThickness: 8 },
    angle: { legWidth1: 100, legThickness1: 10, legWidth2: 100, legThickness2: 10 },
  });

  const results = useMemo<Results | null>(() => {
    switch (shape) {
      case "rectangle": {
        const { width, height } = params.rectangle;
        const area = width * height;
        const centroidX = width / 2;
        const centroidY = height / 2;
        const momentInertiaX = (width * Math.pow(height, 3)) / 12;
        const momentInertiaY = (height * Math.pow(width, 3)) / 12;
        const sectionModulusX = momentInertiaX / centroidY;
        const sectionModulusY = momentInertiaY / centroidX;
        const radiusGyrationX = Math.sqrt(momentInertiaX / area);
        const radiusGyrationY = Math.sqrt(momentInertiaY / area);
        return { area, centroidX, centroidY, momentInertiaX, momentInertiaY, sectionModulusX, sectionModulusY, radiusGyrationX, radiusGyrationY };
      }
      case "circle": {
        const { diameter } = params.circle;
        const radius = diameter / 2;
        const area = Math.PI * Math.pow(radius, 2);
        const centroidX = radius;
        const centroidY = radius;
        const momentInertiaX = (Math.PI * Math.pow(radius, 4)) / 4;
        const momentInertiaY = (Math.PI * Math.pow(radius, 4)) / 4;
        const sectionModulusX = momentInertiaX / radius;
        const sectionModulusY = momentInertiaY / radius;
        const radiusGyrationX = radius / Math.sqrt(2);
        const radiusGyrationY = radius / Math.sqrt(2);
        return { area, centroidX, centroidY, momentInertiaX, momentInertiaY, sectionModulusX, sectionModulusY, radiusGyrationX, radiusGyrationY };
      }
      case "ibeam": {
        const { topFlangeWidth, topFlangeThickness, webHeight, webThickness, bottomFlangeWidth, bottomFlangeThickness } = params.ibeam;
        const topFlangeArea = topFlangeWidth * topFlangeThickness;
        const bottomFlangeArea = bottomFlangeWidth * bottomFlangeThickness;
        const webArea = webHeight * webThickness;
        const area = topFlangeArea + bottomFlangeArea + webArea;
        
        const topFlangeY = webHeight + topFlangeThickness / 2;
        const bottomFlangeY = bottomFlangeThickness / 2;
        const webY = webHeight / 2 + bottomFlangeThickness;
        const centroidY = (topFlangeArea * topFlangeY + bottomFlangeArea * bottomFlangeY + webArea * webY) / area;
        const centroidX = Math.max(topFlangeWidth, bottomFlangeWidth, webThickness) / 2;
        
        const topFlangeIx = (topFlangeWidth * Math.pow(topFlangeThickness, 3)) / 12 + topFlangeArea * Math.pow(topFlangeY - centroidY, 2);
        const bottomFlangeIx = (bottomFlangeWidth * Math.pow(bottomFlangeThickness, 3)) / 12 + bottomFlangeArea * Math.pow(centroidY - bottomFlangeY, 2);
        const webIx = (webThickness * Math.pow(webHeight, 3)) / 12 + webArea * Math.pow(webY - centroidY, 2);
        const momentInertiaX = topFlangeIx + bottomFlangeIx + webIx;
        
        const topFlangeIy = (topFlangeThickness * Math.pow(topFlangeWidth, 3)) / 12;
        const bottomFlangeIy = (bottomFlangeThickness * Math.pow(bottomFlangeWidth, 3)) / 12;
        const webIy = (webHeight * Math.pow(webThickness, 3)) / 12;
        const momentInertiaY = topFlangeIy + bottomFlangeIy + webIy;
        
        const sectionModulusX = momentInertiaX / Math.max(centroidY, webHeight + topFlangeThickness + bottomFlangeThickness - centroidY);
        const sectionModulusY = momentInertiaY / centroidX;
        const radiusGyrationX = Math.sqrt(momentInertiaX / area);
        const radiusGyrationY = Math.sqrt(momentInertiaY / area);
        return { area, centroidX, centroidY, momentInertiaX, momentInertiaY, sectionModulusX, sectionModulusY, radiusGyrationX, radiusGyrationY };
      }
      case "channel": {
        const { flangeWidth, flangeThickness, webHeight, webThickness } = params.channel;
        const topFlangeArea = flangeWidth * flangeThickness;
        const bottomFlangeArea = flangeWidth * flangeThickness;
        const webArea = webHeight * webThickness;
        const area = topFlangeArea + bottomFlangeArea + webArea;
        
        const topFlangeY = webHeight + flangeThickness / 2;
        const bottomFlangeY = flangeThickness / 2;
        const webY = webHeight / 2 + flangeThickness;
        const centroidY = (topFlangeArea * topFlangeY + bottomFlangeArea * bottomFlangeY + webArea * webY) / area;
        const centroidX = flangeWidth - ((topFlangeArea * (flangeWidth / 2) + bottomFlangeArea * (flangeWidth / 2) + webArea * (webThickness / 2)) / area);
        
        const topFlangeIx = (flangeWidth * Math.pow(flangeThickness, 3)) / 12 + topFlangeArea * Math.pow(topFlangeY - centroidY, 2);
        const bottomFlangeIx = (flangeWidth * Math.pow(flangeThickness, 3)) / 12 + bottomFlangeArea * Math.pow(centroidY - bottomFlangeY, 2);
        const webIx = (webThickness * Math.pow(webHeight, 3)) / 12 + webArea * Math.pow(webY - centroidY, 2);
        const momentInertiaX = topFlangeIx + bottomFlangeIx + webIx;
        
        const topFlangeIy = (flangeThickness * Math.pow(flangeWidth, 3)) / 12 + topFlangeArea * Math.pow(flangeWidth / 2 - centroidX, 2);
        const bottomFlangeIy = (flangeThickness * Math.pow(flangeWidth, 3)) / 12 + bottomFlangeArea * Math.pow(flangeWidth / 2 - centroidX, 2);
        const webIy = (webHeight * Math.pow(webThickness, 3)) / 12 + webArea * Math.pow(webThickness / 2 - centroidX, 2);
        const momentInertiaY = topFlangeIy + bottomFlangeIy + webIy;
        
        const sectionModulusX = momentInertiaX / Math.max(centroidY, webHeight + 2 * flangeThickness - centroidY);
        const sectionModulusY = momentInertiaY / Math.max(centroidX, flangeWidth - centroidX);
        const radiusGyrationX = Math.sqrt(momentInertiaX / area);
        const radiusGyrationY = Math.sqrt(momentInertiaY / area);
        return { area, centroidX, centroidY, momentInertiaX, momentInertiaY, sectionModulusX, sectionModulusY, radiusGyrationX, radiusGyrationY };
      }
      case "angle": {
        const { legWidth1, legThickness1, legWidth2, legThickness2 } = params.angle;
        const leg1Area = legWidth1 * legThickness1;
        const leg2Area = (legWidth2 - legThickness1) * legThickness2;
        const area = leg1Area + leg2Area;
        
        const centroidX = (leg1Area * (legThickness1 / 2) + leg2Area * (legThickness1 + (legWidth2 - legThickness1) / 2)) / area;
        const centroidY = (leg1Area * (legWidth1 / 2) + leg2Area * (legThickness2 / 2)) / area;
        
        const leg1Ix = (legThickness1 * Math.pow(legWidth1, 3)) / 12 + leg1Area * Math.pow(legWidth1 / 2 - centroidY, 2);
        const leg2Ix = ((legWidth2 - legThickness1) * Math.pow(legThickness2, 3)) / 12 + leg2Area * Math.pow(centroidY - legThickness2 / 2, 2);
        const momentInertiaX = leg1Ix + leg2Ix;
        
        const leg1Iy = (legWidth1 * Math.pow(legThickness1, 3)) / 12 + leg1Area * Math.pow(legThickness1 / 2 - centroidX, 2);
        const leg2Iy = (legThickness2 * Math.pow(legWidth2 - legThickness1, 3)) / 12 + leg2Area * Math.pow(legThickness1 + (legWidth2 - legThickness1) / 2 - centroidX, 2);
        const momentInertiaY = leg1Iy + leg2Iy;
        
        const sectionModulusX = momentInertiaX / Math.max(centroidY, legWidth1 - centroidY);
        const sectionModulusY = momentInertiaY / Math.max(centroidX, legWidth2 - centroidX);
        const radiusGyrationX = Math.sqrt(momentInertiaX / area);
        const radiusGyrationY = Math.sqrt(momentInertiaY / area);
        return { area, centroidX, centroidY, momentInertiaX, momentInertiaY, sectionModulusX, sectionModulusY, radiusGyrationX, radiusGyrationY };
      }
      default:
        return null;
    }
  }, [shape, params]);

  const getShapeLabel = () => {
    const shapeLabels: Record<ShapeType, keyof Translations> = {
      rectangle: "shapeRectangle",
      circle: "shapeCircle",
      ibeam: "shapeIbeam",
      channel: "shapeChannel",
      angle: "shapeAngle",
    };
    return t(shapeLabels[shape]);
  };

  const handleCopyResults = () => {
    if (!results) return;
    const text = `${t("toolSectionTitle")} Results - ${getShapeLabel()}

${t("resultArea")}: ${results.area.toFixed(4)} ${t("unitMm2")}
${t("resultCentroidX")}: ${results.centroidX.toFixed(4)} ${t("unitMm")}
${t("resultCentroidY")}: ${results.centroidY.toFixed(4)} ${t("unitMm")}
${t("resultIx")}: ${results.momentInertiaX.toFixed(4)} ${t("unitMm4")}
${t("resultIy")}: ${results.momentInertiaY.toFixed(4)} ${t("unitMm4")}
${t("resultSx")}: ${results.sectionModulusX.toFixed(4)} ${t("unitMm3")}
${t("resultSy")}: ${results.sectionModulusY.toFixed(4)} ${t("unitMm3")}
${t("resultRx")}: ${results.radiusGyrationX.toFixed(4)} ${t("unitMm")}
${t("resultRy")}: ${results.radiusGyrationY.toFixed(4)} ${t("unitMm")}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = async () => {
    if (!results) return;
    
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
        <h2 style="font-size: 18px; color: #333;">${t("toolSectionTitle")} - ${getShapeLabel()}</h2>
        <div style="font-size: 12px; color: #666; margin-top: 10px;">
          <span>${t("pdfGeneratedBy")}: useciviltools.com</span>
          <span style="margin-left: 30px;">${t("pdfDate")}: ${new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      <hr style="border: none; border-top: 1px solid #ccc; margin-bottom: 20px;">
      
      <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">${t("pdfInputParams")}</h3>
      <div style="font-size: 13px; line-height: 1.8; padding-left: 20px;">
        ${shape === "rectangle" ? `
          <p>${t("paramWidth")}: ${params.rectangle.width} ${t("unitMm")}</p>
          <p>${t("paramHeight")}: ${params.rectangle.height} ${t("unitMm")}</p>
        ` : shape === "circle" ? `
          <p>${t("paramDiameter")}: ${params.circle.diameter} ${t("unitMm")}</p>
        ` : shape === "ibeam" ? `
          <p>${t("paramTopFlangeWidth")}: ${params.ibeam.topFlangeWidth} ${t("unitMm")}</p>
          <p>${t("paramTopFlangeThickness")}: ${params.ibeam.topFlangeThickness} ${t("unitMm")}</p>
          <p>${t("paramWebHeight")}: ${params.ibeam.webHeight} ${t("unitMm")}</p>
          <p>${t("paramWebThickness")}: ${params.ibeam.webThickness} ${t("unitMm")}</p>
          <p>${t("paramBottomFlangeWidth")}: ${params.ibeam.bottomFlangeWidth} ${t("unitMm")}</p>
          <p>${t("paramBottomFlangeThickness")}: ${params.ibeam.bottomFlangeThickness} ${t("unitMm")}</p>
        ` : shape === "channel" ? `
          <p>${t("paramFlangeWidth")}: ${params.channel.flangeWidth} ${t("unitMm")}</p>
          <p>${t("paramFlangeThickness")}: ${params.channel.flangeThickness} ${t("unitMm")}</p>
          <p>${t("paramWebHeight")}: ${params.channel.webHeight} ${t("unitMm")}</p>
          <p>${t("paramWebThickness")}: ${params.channel.webThickness} ${t("unitMm")}</p>
        ` : `
          <p>${t("paramLegWidth1")}: ${params.angle.legWidth1} ${t("unitMm")}</p>
          <p>${t("paramLegThickness1")}: ${params.angle.legThickness1} ${t("unitMm")}</p>
          <p>${t("paramLegWidth2")}: ${params.angle.legWidth2} ${t("unitMm")}</p>
          <p>${t("paramLegThickness2")}: ${params.angle.legThickness2} ${t("unitMm")}</p>
        `}
      </div>
      
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
      
      <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">${t("pdfCalculationSteps")}</h3>
      <div style="font-size: 13px; line-height: 1.8; padding-left: 20px;">
        ${shape === "rectangle" ? `
          <p>1. ${t("resultArea")}: A = b × h = ${params.rectangle.width} × ${params.rectangle.height} = ${results.area.toFixed(2)} ${t("unitMm2")}</p>
          <p>2. ${t("resultCentroidX")}: Cₓ = b/2 = ${params.rectangle.width}/2 = ${results.centroidX.toFixed(2)} ${t("unitMm")}</p>
          <p>3. ${t("resultCentroidY")}: Cᵧ = h/2 = ${params.rectangle.height}/2 = ${results.centroidY.toFixed(2)} ${t("unitMm")}</p>
          <p>4. ${t("resultIx")}: Iₓ = (b × h³) / 12 = ${results.momentInertiaX.toFixed(2)} ${t("unitMm4")}</p>
          <p>5. ${t("resultIy")}: Iᵧ = (h × b³) / 12 = ${results.momentInertiaY.toFixed(2)} ${t("unitMm4")}</p>
          <p>6. ${t("resultSx")}: Sₓ = Iₓ / (h/2) = ${results.sectionModulusX.toFixed(2)} ${t("unitMm3")}</p>
          <p>7. ${t("resultSy")}: Sᵧ = Iᵧ / (b/2) = ${results.sectionModulusY.toFixed(2)} ${t("unitMm3")}</p>
        ` : shape === "circle" ? `
          <p>1. ${t("resultArea")}: A = π × r² = ${results.area.toFixed(2)} ${t("unitMm2")}</p>
          <p>2. ${t("resultCentroidX")}: Cₓ = r = ${results.centroidX.toFixed(2)} ${t("unitMm")}</p>
          <p>3. ${t("resultCentroidY")}: Cᵧ = r = ${results.centroidY.toFixed(2)} ${t("unitMm")}</p>
          <p>4. ${t("resultIx")}: Iₓ = π × r⁴ / 4 = ${results.momentInertiaX.toFixed(2)} ${t("unitMm4")}</p>
          <p>5. ${t("resultSx")}: Sₓ = Iₓ / r = ${results.sectionModulusX.toFixed(2)} ${t("unitMm3")}</p>
        ` : `
          <p>1. ${t("resultArea")}: A = ΣA_i = ${results.area.toFixed(2)} ${t("unitMm2")}</p>
          <p>2. ${t("resultCentroidX")}: Cₓ = (ΣA_i × x_i) / A = ${results.centroidX.toFixed(2)} ${t("unitMm")}</p>
          <p>3. ${t("resultCentroidY")}: Cᵧ = (ΣA_i × y_i) / A = ${results.centroidY.toFixed(2)} ${t("unitMm")}</p>
          <p>4. ${t("resultIx")}: Iₓ = Σ(I_i + A_i × d_i²) = ${results.momentInertiaX.toFixed(2)} ${t("unitMm4")}</p>
          <p>5. ${t("resultIy")}: Iᵧ = Σ(I_i + A_i × d_i²) = ${results.momentInertiaY.toFixed(2)} ${t("unitMm4")}</p>
          <p>6. ${t("resultSx")}: Sₓ = Iₓ / c = ${results.sectionModulusX.toFixed(2)} ${t("unitMm3")}</p>
          <p>7. ${t("resultSy")}: Sᵧ = Iᵧ / c = ${results.sectionModulusY.toFixed(2)} ${t("unitMm3")}</p>
        `}
      </div>
      
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
      
      <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">${t("pdfResults")}</h3>
      <div style="font-size: 13px; line-height: 1.8; padding-left: 20px;">
        <p>${t("resultArea")}: ${results.area.toFixed(4)} ${t("unitMm2")}</p>
        <p>${t("resultCentroidX")}: ${results.centroidX.toFixed(4)} ${t("unitMm")}</p>
        <p>${t("resultCentroidY")}: ${results.centroidY.toFixed(4)} ${t("unitMm")}</p>
        <p>${t("symbolIx")}: ${results.momentInertiaX.toFixed(4)} ${t("unitMm4")}</p>
        <p>${t("symbolIy")}: ${results.momentInertiaY.toFixed(4)} ${t("unitMm4")}</p>
        <p>${t("symbolSx")}: ${results.sectionModulusX.toFixed(4)} ${t("unitMm3")}</p>
        <p>${t("symbolSy")}: ${results.sectionModulusY.toFixed(4)} ${t("unitMm3")}</p>
        <p>${t("symbolRx")}: ${results.radiusGyrationX.toFixed(4)} ${t("unitMm")}</p>
        <p>${t("symbolRy")}: ${results.radiusGyrationY.toFixed(4)} ${t("unitMm")}</p>
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
      
      doc.save(`${t("toolSectionTitle")}-${getShapeLabel()}-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("PDF export error:", error);
    } finally {
      document.body.removeChild(pdfContent);
    }
  };

  const shapes: { value: ShapeType; labelKey: keyof Translations }[] = [
    { value: "rectangle", labelKey: "shapeRectangle" },
    { value: "circle", labelKey: "shapeCircle" },
    { value: "ibeam", labelKey: "shapeIbeam" },
    { value: "channel", labelKey: "shapeChannel" },
    { value: "angle", labelKey: "shapeAngle" },
  ];

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
        <span className="text-gray-600">{t("toolSectionTitle")}</span>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("toolSectionTitle")}</h1>
        <p className="text-gray-600 mb-6">{t("toolSectionDesc")}</p>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">{t("sectionSelectType")}</label>
          <div className="flex flex-wrap gap-2">
            {shapes.map((s) => (
              <button
                key={s.value}
                onClick={() => setShape(s.value)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  shape === s.value
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300 text-gray-600"
                }`}
              >
                {t(s.labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">{t("sectionInputParams")} ({t("unitMm")})</h3>
            
            {shape === "rectangle" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramWidth")}</label>
                  <input
                    type="number"
                    value={params.rectangle.width}
                    onChange={(e) => setParams({ ...params, rectangle: { ...params.rectangle, width: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramHeight")}</label>
                  <input
                    type="number"
                    value={params.rectangle.height}
                    onChange={(e) => setParams({ ...params, rectangle: { ...params.rectangle, height: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {shape === "circle" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramDiameter")}</label>
                  <input
                    type="number"
                    value={params.circle.diameter}
                    onChange={(e) => setParams({ ...params, circle: { diameter: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {shape === "ibeam" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramTopFlangeWidth")}</label>
                  <input
                    type="number"
                    value={params.ibeam.topFlangeWidth}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, topFlangeWidth: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramTopFlangeThickness")}</label>
                  <input
                    type="number"
                    value={params.ibeam.topFlangeThickness}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, topFlangeThickness: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramWebHeight")}</label>
                  <input
                    type="number"
                    value={params.ibeam.webHeight}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, webHeight: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramWebThickness")}</label>
                  <input
                    type="number"
                    value={params.ibeam.webThickness}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, webThickness: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramBottomFlangeWidth")}</label>
                  <input
                    type="number"
                    value={params.ibeam.bottomFlangeWidth}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, bottomFlangeWidth: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramBottomFlangeThickness")}</label>
                  <input
                    type="number"
                    value={params.ibeam.bottomFlangeThickness}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, bottomFlangeThickness: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {shape === "channel" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramFlangeWidth")}</label>
                  <input
                    type="number"
                    value={params.channel.flangeWidth}
                    onChange={(e) => setParams({ ...params, channel: { ...params.channel, flangeWidth: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramFlangeThickness")}</label>
                  <input
                    type="number"
                    value={params.channel.flangeThickness}
                    onChange={(e) => setParams({ ...params, channel: { ...params.channel, flangeThickness: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramWebHeight")}</label>
                  <input
                    type="number"
                    value={params.channel.webHeight}
                    onChange={(e) => setParams({ ...params, channel: { ...params.channel, webHeight: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramWebThickness")}</label>
                  <input
                    type="number"
                    value={params.channel.webThickness}
                    onChange={(e) => setParams({ ...params, channel: { ...params.channel, webThickness: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {shape === "angle" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramLegWidth1")}</label>
                  <input
                    type="number"
                    value={params.angle.legWidth1}
                    onChange={(e) => setParams({ ...params, angle: { ...params.angle, legWidth1: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramLegThickness1")}</label>
                  <input
                    type="number"
                    value={params.angle.legThickness1}
                    onChange={(e) => setParams({ ...params, angle: { ...params.angle, legThickness1: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramLegWidth2")}</label>
                  <input
                    type="number"
                    value={params.angle.legWidth2}
                    onChange={(e) => setParams({ ...params, angle: { ...params.angle, legWidth2: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">{t("paramLegThickness2")}</label>
                  <input
                    type="number"
                    value={params.angle.legThickness2}
                    onChange={(e) => setParams({ ...params, angle: { ...params.angle, legThickness2: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">{t("sectionResults")}</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyResults}
                  disabled={!results}
                  className={`px-4 py-2 rounded-lg transition-colors ${
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
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {t("pdfExport")}
                </button>
              </div>
            </div>
            
            {results ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{t("resultArea")}</p>
                  <p className="font-semibold text-gray-800">{results.area.toFixed(4)} {t("unitMm2")}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{t("resultCentroidX")}</p>
                  <p className="font-semibold text-gray-800">{results.centroidX.toFixed(4)} {t("unitMm")}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{t("resultCentroidY")}</p>
                  <p className="font-semibold text-gray-800">{results.centroidY.toFixed(4)} {t("unitMm")}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{t("symbolIx")}</p>
                  <p className="font-semibold text-gray-800">{results.momentInertiaX.toFixed(4)} {t("unitMm4")}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{t("symbolIy")}</p>
                  <p className="font-semibold text-gray-800">{results.momentInertiaY.toFixed(4)} {t("unitMm4")}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{t("symbolSx")}</p>
                  <p className="font-semibold text-gray-800">{results.sectionModulusX.toFixed(4)} {t("unitMm3")}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{t("symbolSy")}</p>
                  <p className="font-semibold text-gray-800">{results.sectionModulusY.toFixed(4)} {t("unitMm3")}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">{t("symbolRx")}</p>
                  <p className="font-semibold text-gray-800">{results.radiusGyrationX.toFixed(4)} {t("unitMm")}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 col-span-2">
                  <p className="text-sm text-gray-500">{t("symbolRy")}</p>
                  <p className="font-semibold text-gray-800">{results.radiusGyrationY.toFixed(4)} {t("unitMm")}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">{t("sectionEnterParams")}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("sectionFormulas")}</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">{t("shapeRectangle")}</h3>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><strong>{t("resultArea")}:</strong> A = b × h</p>
              <p><strong>{t("resultIx")}:</strong> Iₓ = (b × h³) / 12</p>
              <p><strong>{t("resultIy")}:</strong> Iᵧ = (h × b³) / 12</p>
              <p><strong>{t("resultSx")}:</strong> Sₓ = Iₓ / (h/2)</p>
              <p><strong>{t("resultRx")}:</strong> rₓ = √(Iₓ/A)</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">{t("shapeCircle")}</h3>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><strong>{t("resultArea")}:</strong> A = π × (d/2)²</p>
              <p><strong>{t("resultIx")}:</strong> Iₓ = π × (d/2)⁴ / 4</p>
              <p><strong>{t("resultSx")}:</strong> Sₓ = Iₓ / (d/2)</p>
              <p><strong>{t("resultRx")}:</strong> rₓ = (d/2) / √2</p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">{t("shapeIbeam")} / {t("shapeChannel")}</h3>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><strong>{t("resultArea")}:</strong> A = A_top + A_bottom + A_web</p>
              <p><strong>{t("resultIx")}:</strong> Iₓ = Σ(I_i + A_i × d_i²) (Parallel Axis Theorem)</p>
              <p><strong>{t("resultSx")}:</strong> Sₓ = Iₓ / c (c = distance from centroid to extreme fiber)</p>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">{t("shapeAngle")}</h3>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><strong>{t("resultArea")}:</strong> A = A_leg1 + A_leg2</p>
              <p><strong>{t("resultCentroidX")}:</strong> Cₓ = (A₁ × x₁ + A₂ × x₂) / A</p>
              <p><strong>{t("resultCentroidY")}:</strong> Cᵧ = (A₁ × y₁ + A₂ × y₂) / A</p>
              <p><strong>{t("resultIx")}:</strong> Iₓ = Σ(I_i + A_i × d_i²)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("sectionSeoTitle")}</h2>
        <div className="prose prose-gray max-w-none">
          {t("sectionSeoContent").split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-600 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
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