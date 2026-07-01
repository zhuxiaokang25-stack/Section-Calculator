"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";

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

  const handleCopyResults = () => {
    if (!results) return;
    const text = `Section Calculator Results - ${shape.toUpperCase()}

Area: ${results.area.toFixed(4)} mm²
Centroid X: ${results.centroidX.toFixed(4)} mm
Centroid Y: ${results.centroidY.toFixed(4)} mm
Moment of Inertia X: ${results.momentInertiaX.toFixed(4)} mm⁴
Moment of Inertia Y: ${results.momentInertiaY.toFixed(4)} mm⁴
Section Modulus X: ${results.sectionModulusX.toFixed(4)} mm³
Section Modulus Y: ${results.sectionModulusY.toFixed(4)} mm³
Radius of Gyration X: ${results.radiusGyrationX.toFixed(4)} mm
Radius of Gyration Y: ${results.radiusGyrationY.toFixed(4)} mm`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shapes: { value: ShapeType; label: string }[] = [
    { value: "rectangle", label: "Rectangle" },
    { value: "circle", label: "Circle" },
    { value: "ibeam", label: "I-Beam" },
    { value: "channel", label: "Channel" },
    { value: "angle", label: "Angle" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("toolSectionTitle")}</h1>
        <p className="text-gray-600 mb-6">{t("toolSectionDesc")}</p>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Select Section Type</label>
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
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Input Parameters (mm)</h3>
            
            {shape === "rectangle" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Width</label>
                  <input
                    type="number"
                    value={params.rectangle.width}
                    onChange={(e) => setParams({ ...params, rectangle: { ...params.rectangle, width: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Height</label>
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
                  <label className="block text-gray-700 text-sm mb-1">Diameter</label>
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
                  <label className="block text-gray-700 text-sm mb-1">Top Flange Width</label>
                  <input
                    type="number"
                    value={params.ibeam.topFlangeWidth}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, topFlangeWidth: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Top Flange Thickness</label>
                  <input
                    type="number"
                    value={params.ibeam.topFlangeThickness}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, topFlangeThickness: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Web Height</label>
                  <input
                    type="number"
                    value={params.ibeam.webHeight}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, webHeight: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Web Thickness</label>
                  <input
                    type="number"
                    value={params.ibeam.webThickness}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, webThickness: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Bottom Flange Width</label>
                  <input
                    type="number"
                    value={params.ibeam.bottomFlangeWidth}
                    onChange={(e) => setParams({ ...params, ibeam: { ...params.ibeam, bottomFlangeWidth: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Bottom Flange Thickness</label>
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
                  <label className="block text-gray-700 text-sm mb-1">Flange Width</label>
                  <input
                    type="number"
                    value={params.channel.flangeWidth}
                    onChange={(e) => setParams({ ...params, channel: { ...params.channel, flangeWidth: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Flange Thickness</label>
                  <input
                    type="number"
                    value={params.channel.flangeThickness}
                    onChange={(e) => setParams({ ...params, channel: { ...params.channel, flangeThickness: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Web Height</label>
                  <input
                    type="number"
                    value={params.channel.webHeight}
                    onChange={(e) => setParams({ ...params, channel: { ...params.channel, webHeight: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Web Thickness</label>
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
                  <label className="block text-gray-700 text-sm mb-1">Leg 1 Width</label>
                  <input
                    type="number"
                    value={params.angle.legWidth1}
                    onChange={(e) => setParams({ ...params, angle: { ...params.angle, legWidth1: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Leg 1 Thickness</label>
                  <input
                    type="number"
                    value={params.angle.legThickness1}
                    onChange={(e) => setParams({ ...params, angle: { ...params.angle, legThickness1: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Leg 2 Width</label>
                  <input
                    type="number"
                    value={params.angle.legWidth2}
                    onChange={(e) => setParams({ ...params, angle: { ...params.angle, legWidth2: parseFloat(e.target.value) || 0 } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Leg 2 Thickness</label>
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
              <h3 className="font-semibold text-gray-800">Results</h3>
              <button
                onClick={handleCopyResults}
                disabled={!results}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                }`}
              >
                {copied ? "Copied!" : "Copy Results"}
              </button>
            </div>
            
            {results ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="font-semibold text-gray-800">{results.area.toFixed(4)} mm²</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Centroid X</p>
                  <p className="font-semibold text-gray-800">{results.centroidX.toFixed(4)} mm</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Centroid Y</p>
                  <p className="font-semibold text-gray-800">{results.centroidY.toFixed(4)} mm</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">I<sub>x</sub></p>
                  <p className="font-semibold text-gray-800">{results.momentInertiaX.toFixed(4)} mm⁴</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">I<sub>y</sub></p>
                  <p className="font-semibold text-gray-800">{results.momentInertiaY.toFixed(4)} mm⁴</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">S<sub>x</sub></p>
                  <p className="font-semibold text-gray-800">{results.sectionModulusX.toFixed(4)} mm³</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">S<sub>y</sub></p>
                  <p className="font-semibold text-gray-800">{results.sectionModulusY.toFixed(4)} mm³</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">r<sub>x</sub></p>
                  <p className="font-semibold text-gray-800">{results.radiusGyrationX.toFixed(4)} mm</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 col-span-2">
                  <p className="text-sm text-gray-500">r<sub>y</sub></p>
                  <p className="font-semibold text-gray-800">{results.radiusGyrationY.toFixed(4)} mm</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Enter parameters to calculate</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
