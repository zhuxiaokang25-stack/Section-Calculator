"use client";

import { useState, useMemo } from "react";
import { useLanguage, Translations } from "@/lib/i18n";
import Link from "next/link";
import jsPDF from "jspdf";

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

  const handleExportPDF = () => {
    if (!results) return;
    
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 20;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(t("pdfReportTitle"), pageWidth / 2, y, { align: "center" });
    y += 10;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`${t("toolSectionTitle")} - ${getShapeLabel()}`, pageWidth / 2, y, { align: "center" });
    y += 8;
    
    doc.setFontSize(10);
    doc.setFillColor(200, 200, 200);
    doc.text(`${t("pdfGeneratedBy")}: useciviltools.com`, 20, y);
    doc.text(`${t("pdfDate")}: ${new Date().toLocaleDateString()}`, pageWidth - 60, y);
    y += 15;
    
    doc.setLineWidth(0.5);
    doc.line(20, y, pageWidth - 20, y);
    y += 12;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(t("pdfInputParams"), 20, y);
    y += 8;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    if (shape === "rectangle") {
      doc.text(`${t("paramWidth")}: ${params.rectangle.width} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramHeight")}: ${params.rectangle.height} ${t("unitMm")}`, 25, y);
      y += 6;
    } else if (shape === "circle") {
      doc.text(`${t("paramDiameter")}: ${params.circle.diameter} ${t("unitMm")}`, 25, y);
      y += 6;
    } else if (shape === "ibeam") {
      doc.text(`${t("paramTopFlangeWidth")}: ${params.ibeam.topFlangeWidth} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramTopFlangeThickness")}: ${params.ibeam.topFlangeThickness} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramWebHeight")}: ${params.ibeam.webHeight} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramWebThickness")}: ${params.ibeam.webThickness} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramBottomFlangeWidth")}: ${params.ibeam.bottomFlangeWidth} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramBottomFlangeThickness")}: ${params.ibeam.bottomFlangeThickness} ${t("unitMm")}`, 25, y);
      y += 6;
    } else if (shape === "channel") {
      doc.text(`${t("paramFlangeWidth")}: ${params.channel.flangeWidth} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramFlangeThickness")}: ${params.channel.flangeThickness} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramWebHeight")}: ${params.channel.webHeight} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramWebThickness")}: ${params.channel.webThickness} ${t("unitMm")}`, 25, y);
      y += 6;
    } else if (shape === "angle") {
      doc.text(`${t("paramLegWidth1")}: ${params.angle.legWidth1} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramLegThickness1")}: ${params.angle.legThickness1} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramLegWidth2")}: ${params.angle.legWidth2} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`${t("paramLegThickness2")}: ${params.angle.legThickness2} ${t("unitMm")}`, 25, y);
      y += 6;
    }
    
    y += 10;
    doc.setLineWidth(0.5);
    doc.line(20, y, pageWidth - 20, y);
    y += 12;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(t("pdfCalculationSteps"), 20, y);
    y += 8;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    if (shape === "rectangle") {
      doc.text(`1. ${t("resultArea")}: A = b × h = ${params.rectangle.width} × ${params.rectangle.height} = ${results.area.toFixed(2)} ${t("unitMm2")}`, 25, y);
      y += 6;
      doc.text(`2. ${t("resultCentroidX")}: Cₓ = b/2 = ${params.rectangle.width}/2 = ${results.centroidX.toFixed(2)} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`3. ${t("resultCentroidY")}: Cᵧ = h/2 = ${params.rectangle.height}/2 = ${results.centroidY.toFixed(2)} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`4. ${t("resultIx")}: Iₓ = (b × h³) / 12 = (${params.rectangle.width} × ${params.rectangle.height}³) / 12 = ${results.momentInertiaX.toFixed(2)} ${t("unitMm4")}`, 25, y);
      y += 6;
      doc.text(`5. ${t("resultIy")}: Iᵧ = (h × b³) / 12 = (${params.rectangle.height} × ${params.rectangle.width}³) / 12 = ${results.momentInertiaY.toFixed(2)} ${t("unitMm4")}`, 25, y);
      y += 6;
      doc.text(`6. ${t("resultSx")}: Sₓ = Iₓ / (h/2) = ${results.momentInertiaX.toFixed(2)} / ${results.centroidY.toFixed(2)} = ${results.sectionModulusX.toFixed(2)} ${t("unitMm3")}`, 25, y);
      y += 6;
      doc.text(`7. ${t("resultSy")}: Sᵧ = Iᵧ / (b/2) = ${results.momentInertiaY.toFixed(2)} / ${results.centroidX.toFixed(2)} = ${results.sectionModulusY.toFixed(2)} ${t("unitMm3")}`, 25, y);
      y += 6;
    } else if (shape === "circle") {
      const radius = params.circle.diameter / 2;
      doc.text(`1. ${t("resultArea")}: A = π × r² = π × ${radius}² = ${results.area.toFixed(2)} ${t("unitMm2")}`, 25, y);
      y += 6;
      doc.text(`2. ${t("resultCentroidX")}: Cₓ = r = ${radius} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`3. ${t("resultCentroidY")}: Cᵧ = r = ${radius} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`4. ${t("resultIx")}: Iₓ = π × r⁴ / 4 = π × ${radius}⁴ / 4 = ${results.momentInertiaX.toFixed(2)} ${t("unitMm4")}`, 25, y);
      y += 6;
      doc.text(`5. ${t("resultSx")}: Sₓ = Iₓ / r = ${results.momentInertiaX.toFixed(2)} / ${radius} = ${results.sectionModulusX.toFixed(2)} ${t("unitMm3")}`, 25, y);
      y += 6;
    } else {
      doc.text(`1. ${t("resultArea")}: A = ΣA_i = ${results.area.toFixed(2)} ${t("unitMm2")}`, 25, y);
      y += 6;
      doc.text(`2. ${t("resultCentroidX")}: Cₓ = (ΣA_i × x_i) / A = ${results.centroidX.toFixed(2)} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`3. ${t("resultCentroidY")}: Cᵧ = (ΣA_i × y_i) / A = ${results.centroidY.toFixed(2)} ${t("unitMm")}`, 25, y);
      y += 6;
      doc.text(`4. ${t("resultIx")}: Iₓ = Σ(I_i + A_i × d_i²) = ${results.momentInertiaX.toFixed(2)} ${t("unitMm4")}`, 25, y);
      y += 6;
      doc.text(`5. ${t("resultIy")}: Iᵧ = Σ(I_i + A_i × d_i²) = ${results.momentInertiaY.toFixed(2)} ${t("unitMm4")}`, 25, y);
      y += 6;
      doc.text(`6. ${t("resultSx")}: Sₓ = Iₓ / c = ${results.sectionModulusX.toFixed(2)} ${t("unitMm3")}`, 25, y);
      y += 6;
      doc.text(`7. ${t("resultSy")}: Sᵧ = Iᵧ / c = ${results.sectionModulusY.toFixed(2)} ${t("unitMm3")}`, 25, y);
      y += 6;
    }
    
    y += 10;
    doc.setLineWidth(0.5);
    doc.line(20, y, pageWidth - 20, y);
    y += 12;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(t("pdfResults"), 20, y);
    y += 8;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    const resultLabels = [
      { key: "resultArea", value: results.area, unit: t("unitMm2") },
      { key: "resultCentroidX", value: results.centroidX, unit: t("unitMm") },
      { key: "resultCentroidY", value: results.centroidY, unit: t("unitMm") },
      { key: "symbolIx", value: results.momentInertiaX, unit: t("unitMm4") },
      { key: "symbolIy", value: results.momentInertiaY, unit: t("unitMm4") },
      { key: "symbolSx", value: results.sectionModulusX, unit: t("unitMm3") },
      { key: "symbolSy", value: results.sectionModulusY, unit: t("unitMm3") },
      { key: "symbolRx", value: results.radiusGyrationX, unit: t("unitMm") },
      { key: "symbolRy", value: results.radiusGyrationY, unit: t("unitMm") },
    ];
    
    resultLabels.forEach((item) => {
      const label = t(item.key as keyof Translations);
      doc.text(`${label}: ${item.value.toFixed(4)} ${item.unit}`, 25, y);
      y += 6;
    });
    
    y += 10;
    doc.setLineWidth(0.5);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;
    
    const chartStartX = 30;
    const chartStartY = y;
    const chartWidth = pageWidth - 60;
    const chartHeight = 60;
    
    doc.setFillColor(240, 240, 240);
    doc.rect(chartStartX, chartStartY, chartWidth, chartHeight, "F");
    doc.setLineWidth(0.5);
    doc.rect(chartStartX, chartStartY, chartWidth, chartHeight);
    
    if (shape === "rectangle") {
      const { width, height } = params.rectangle;
      const scaleX = chartWidth * 0.6 / Math.max(width, height);
      const scaleY = chartHeight * 0.6 / Math.max(width, height);
      const rectWidth = width * scaleX;
      const rectHeight = height * scaleY;
      const rectX = chartStartX + (chartWidth - rectWidth) / 2;
      const rectY = chartStartY + (chartHeight - rectHeight) / 2;
      
      doc.setLineWidth(1);
      doc.rect(rectX, rectY, rectWidth, rectHeight);
      
      doc.setLineWidth(0.5);
      doc.setLineDashPattern([2, 2], 0);
      doc.line(rectX, rectY + rectHeight / 2, rectX + rectWidth, rectY + rectHeight / 2);
      doc.line(rectX + rectWidth / 2, rectY, rectX + rectWidth / 2, rectY + rectHeight);
      doc.setLineDashPattern([], 0);
      
      doc.setFontSize(8);
      doc.text(`${width} ${t("unitMm")}`, rectX + rectWidth / 2, chartStartY - 5, { align: "center" });
      doc.text(`${height} ${t("unitMm")}`, chartStartX - 5, rectY + rectHeight / 2, { align: "right" });
    } else if (shape === "circle") {
      const { diameter } = params.circle;
      const scale = chartWidth * 0.5 / diameter;
      const radius = (diameter * scale) / 2;
      const centerX = chartStartX + chartWidth / 2;
      const centerY = chartStartY + chartHeight / 2;
      
      doc.setLineWidth(1);
      doc.circle(centerX, centerY, radius);
      
      doc.setLineWidth(0.5);
      doc.setLineDashPattern([2, 2], 0);
      doc.line(centerX - radius, centerY, centerX + radius, centerY);
      doc.line(centerX, centerY - radius, centerX, centerY + radius);
      doc.setLineDashPattern([], 0);
      
      doc.setFontSize(8);
      doc.text(`${diameter} ${t("unitMm")}`, centerX, chartStartY - 5, { align: "center" });
    }
    
    y = chartStartY + chartHeight + 15;
    
    doc.setFontSize(8);
    doc.text("useciviltools.com", pageWidth / 2, pageHeight - 10, { align: "center" });
    
    doc.save(`${t("toolSectionTitle")}-${getShapeLabel()}-${new Date().toISOString().slice(0, 10)}.pdf`);
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