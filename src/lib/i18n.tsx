"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type LanguageType = "en" | "zh" | "ja" | "es";

export interface Translations {
  title: string;
  description: string;
  
  privacyPolicy: string;
  termsOfService: string;
  about: string;
  contact: string;
  home: string;
  
  privacyPageTitle: string;
  privacyLastUpdated: string;
  privacyIntro: string;
  privacyInformationCollection: string;
  privacyHowWeUse: string;
  privacyGoogleAdSenseTitle: string;
  privacyGoogleAdSense: string;
  privacyCookiesTitle: string;
  privacyCookies: string;
  privacyGDPRTitle: string;
  privacyGDPR: string;
  privacyCCPATitle: string;
  privacyCCPA: string;
  privacyDataSecurityTitle: string;
  privacyDataSecurity: string;
  privacyChangesTitle: string;
  privacyChanges: string;
  privacyContactTitle: string;
  privacyContact: string;
  privacyInfoPersonal: string;
  privacyInfoUsage: string;
  privacyInfoDevice: string;
  privacyUseProvide: string;
  privacyUseImprove: string;
  privacyUseCommunicate: string;
  privacyUseAdvertise: string;
  
  termsPageTitle: string;
  termsLastUpdated: string;
  termsIntro: string;
  termsAcceptance: string;
  termsToolUse: string;
  termsDisclaimer: string;
  termsAccuracy: string;
  termsLimitation: string;
  termsIntellectual: string;
  termsModifications: string;
  termsTermination: string;
  termsGoverning: string;
  
  aboutPageTitle: string;
  aboutIntro: string;
  aboutTeam: string;
  aboutMission: string;
  aboutExperienceTitle: string;
  aboutExperience: string;
  aboutTechnologyTitle: string;
  aboutTechnology: string;
  aboutCommitmentTitle: string;
  aboutCommitment: string;
  aboutQuote: string;
  
  contactPageTitle: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactSubmit: string;
  contactSuccess: string;
  contactRequired: string;
  
  cookieBannerTitle: string;
  cookieBannerText: string;
  cookieAccept: string;
  cookieReject: string;
  
  language: string;
  
  seoTitle: string;
  seoDescription: string;
  seoContent: string;
  
  toolSectionTitle: string;
  toolSectionDesc: string;
  toolBeamTitle: string;
  toolBeamDesc: string;
  toolColumnTitle: string;
  toolColumnDesc: string;
  toolSlabTitle: string;
  toolSlabDesc: string;
  toolFoundationTitle: string;
  toolFoundationDesc: string;
  toolRetainingTitle: string;
  toolRetainingDesc: string;
  
  gettingStarted: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  
  comingSoon: string;

  sectionSelectType: string;
  sectionInputParams: string;
  sectionResults: string;
  sectionCopyResults: string;
  sectionCopied: string;
  sectionEnterParams: string;
  
  shapeRectangle: string;
  shapeCircle: string;
  shapeIbeam: string;
  shapeChannel: string;
  shapeAngle: string;
  
  paramWidth: string;
  paramHeight: string;
  paramDiameter: string;
  paramTopFlangeWidth: string;
  paramTopFlangeThickness: string;
  paramBottomFlangeWidth: string;
  paramBottomFlangeThickness: string;
  paramWebHeight: string;
  paramWebThickness: string;
  paramFlangeWidth: string;
  paramFlangeThickness: string;
  paramLegWidth1: string;
  paramLegThickness1: string;
  paramLegWidth2: string;
  paramLegThickness2: string;
  
  resultArea: string;
  resultCentroidX: string;
  resultCentroidY: string;
  resultIx: string;
  resultIy: string;
  resultSx: string;
  resultSy: string;
  resultRx: string;
  resultRy: string;
  
  unitMm: string;
  unitMm2: string;
  unitMm3: string;
  unitMm4: string;
  
  symbolIx: string;
  symbolIy: string;
  symbolSx: string;
  symbolSy: string;
  symbolRx: string;
  symbolRy: string;
  
  sectionSeoTitle: string;
    sectionSeoContent: string;
    sectionFormulas: string;
    
    beamSupportType: string;
    beamLoadType: string;
    beamInputParams: string;
    beamResults: string;
    beamDiagrams: string;
    beamCopyResults: string;
    beamCopied: string;
    beamExport: string;
    beamPrint: string;
    
    supportBothHinged: string;
    supportBothFixed: string;
    supportHingedFixed: string;
    
    loadUniform: string;
    loadPoint: string;
    loadDistributed: string;
    
    paramSpanLength: string;
    paramLoadValue: string;
    paramLoadPosition: string;
    paramElasticModulus: string;
    paramMomentInertia: string;
    
    resultReactionA: string;
    resultReactionB: string;
    resultShearMax: string;
    resultMomentMax: string;
    resultDeflectionMax: string;
    
    symbolV: string;
    symbolM: string;
    symbolDelta: string;
    
    shearDiagram: string;
    momentDiagram: string;
    deflectionDiagram: string;
    
    unitKN: string;
    unitKnm: string;
    unitNmm2: string;
    unitKnm2: string;
    
    beamSeoTitle: string;
    beamSeoContent: string;
    beamFormulas: string;
    beamIntro: string;
    beamHowToUse: string;
    beamNotes: string;
    
    pdfExport: string;
    pdfReportTitle: string;
    pdfInputParams: string;
    pdfCalculationSteps: string;
    pdfResults: string;
    pdfGeneratedBy: string;
    pdfDate: string;
    
    backToHome: string;
    results: string;
    toolConcreteTitle: string;
    toolConcreteDesc: string;
    concreteMode: string;
    concreteSlab: string;
    concreteWall: string;
    concreteColumn: string;
    concreteCurb: string;
    concreteQuantity: string;
    concreteWaste: string;
    concreteLength: string;
    concreteWidth: string;
    concreteThickness: string;
    concreteHeight: string;
    concreteDiameter: string;
    concreteSection: string;
    concreteVolume: string;
    concreteTotalVolume: string;
    concreteVolumeWithWaste: string;
    concreteUnitM3: string;
    concreteUnitFt3: string;
    concreteBagEstimation: string;
    concreteBagWeight: string;
    concreteBagsNeeded: string;
    concreteResultVolume: string;
    concreteResultBags: string;
    
    concreteSeoTitle: string;
    concreteSeoContent: string;
    concreteFormulas: string;
    concreteIntro: string;
    concreteHowToUse: string;
    concreteNotes: string;
    
    seoHowCalculateVolume: string;
    seoSlabFooting: string;
    seoWall: string;
    seoColumnCylinder: string;
    seoCurbGutter: string;
    
    seoWhyWaste: string;
    seoWasteReason1: string;
    seoWasteReason2: string;
    seoWasteReason3: string;
    seoWasteReason4: string;
    seoWasteRecommended: string;
    seoWasteSimple: string;
    seoWasteWalls: string;
    seoWasteComplex: string;
    
    seoGradesTitle: string;
    seoGradeC10: string;
    seoGradeC10Desc: string;
    seoGradeC10Use1: string;
    seoGradeC10Use2: string;
    seoGradeC10Use3: string;
    seoGradeC20: string;
    seoGradeC20Desc: string;
    seoGradeC20Use1: string;
    seoGradeC20Use2: string;
    seoGradeC20Use3: string;
    seoGradeC30: string;
    seoGradeC30Desc: string;
    seoGradeC30Use1: string;
    seoGradeC30Use2: string;
    seoGradeC30Use3: string;
    
    seoHowManyBags: string;
    seoBagsIntro: string;
    seoBagsGuideTitle: string;
    seoBagsStep1Title: string;
    seoBagsStep1Desc: string;
    seoBagsStep2Title: string;
    seoBagsStep2Desc: string;
    seoBagsStep3Title: string;
    seoBagsStep3Desc: string;
    seoBagsStep4Title: string;
    seoBagsStep4Desc: string;
    seoBagsStep5Title: string;
    seoBagsStep5Desc: string;
    
    seoBagSizesTitle: string;
    seoBagSize: string;
    seoBagVolumeM3: string;
    seoBagVolumeFt3: string;
    seoBagUses: string;
    seoBag20kgUse: string;
    seoBag25kgUse: string;
    seoBag40kgUse: string;
    seoBag40lbUse: string;
    seoBag60lbUse: string;
    seoBag80lbUse: string;
    
    seoTipsTitle: string;
    seoTipRoundUp: string;
    seoTipReadyMix: string;
    seoTipDelivery: string;
    seoTipWeather: string;
    seoConclusion: string;
    
    columnDesignTitle: string;
    columnDesignDesc: string;
    columnSelectSectionType: string;
    columnInputParams: string;
    columnResults: string;
    columnSectionType: string;
    columnAxialForce: string;
    columnBendingMoment: string;
    columnFc: string;
    columnFy: string;
    columnClearHeight: string;
    columnKFactor: string;
    columnKFixed: string;
    columnKHinged: string;
    columnKFree: string;
    columnCover: string;
    columnBarDiameter: string;
    columnNumBars: string;
    columnSlendernessRatio: string;
    columnEccentricity: string;
    columnReinforcementRatio: string;
    columnMinRatio: string;
    columnMaxRatio: string;
    columnRequiredRatio: string;
    columnSteelArea: string;
    columnRequiredBars: string;
    columnDesignCheck: string;
    columnCapacityRatio: string;
    columnCalculationSteps: string;
    columnCrossSection: string;
    columnEnterParams: string;
    columnSmallEccentric: string;
    columnLargeEccentric: string;
    columnCurrent: string;
    columnMinReinforcementControlled: string;
    columnInsufficientReinforcement: string;
    columnConcrete: string;
    columnRebar: string;
    columnCoverLabel: string;
    columnWarningFc: string;
    columnWarningFy: string;
    columnWarningDimensions: string;
    columnWarningDiameter: string;
    columnWarningReinforcementInsufficient: string;
    columnWarningSectionTooSmall: string;
    columnPMInteractionDiagram: string;
    columnPMTitle: string;
    columnPMXAxis: string;
    columnPMYAxis: string;
    columnPMInteractionCurve: string;
    columnPMCurrentPoint: string;
    columnFailedSectionCapacity: string;
    columnFailedSectionCapacityDesc: string;
    columnFailedInsufficientReinforcement: string;
    columnBarUnit: string;
    columnWarningSectionTooSmallDesc: string;
    columnPass: string;
    columnMarginal: string;
    columnFail: string;
    columnRectangular: string;
    columnCircular: string;
    columnShortColumn: string;
    columnLongColumn: string;
    columnDesignResults: string;
    columnDimensions: string;
    columnDiameter: string;
    columnConcreteStrength: string;
    columnSteelStrength: string;
    columnRequiredReinforcement: string;
    columnRequiredSteelArea: string;
    columnPreset: string;
    columnGeneratePDF: string;
    columnGeneratingPDF: string;
    
    columnSeoTitle: string;
    columnSeoContent1: string;
    columnSeoContent2: string;
    columnSeoContent3: string;
    columnSeoContent4: string;
    columnSeoContent5: string;
    columnSeoContent6: string;
    columnSeoContent7: string;
    columnSeoContent8: string;
    columnSeoContent9: string;
    columnSeoContent10: string;
    columnSeoContent11: string;
    columnSeoContent12: string;
    columnSeoContent13: string;
    columnSeoContent14: string;
    columnSeoContent15: string;
}

export const translations: Record<LanguageType, Translations> = {
  en: {
    title: "Civil Engineering Tools",
    description: "Professional civil engineering calculation tools",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    about: "About Us",
    contact: "Contact Us",
    home: "Home",
    
    privacyPageTitle: "Privacy Policy",
    privacyLastUpdated: "Last Updated: July 1, 2024",
    privacyIntro: "This Privacy Policy explains how we collect, use, and disclose your information when you visit or use our website and services. By using our website, you agree to the collection and use of information in accordance with this policy.",
    privacyInformationCollection: "We may collect the following types of information:",
    privacyHowWeUse: "We use the collected information for the following purposes:",
    privacyGoogleAdSenseTitle: "Google AdSense",
    privacyGoogleAdSense: "Our website uses Google AdSense to display ads. Google AdSense may collect information about your visits to this and other websites in order to provide targeted advertisements about goods and services of interest to you. Google AdSense uses cookies and other tracking technologies to collect this information. You can learn more about Google's privacy practices and how to opt out by visiting Google's Privacy Policy.",
    privacyCookiesTitle: "Cookies",
    privacyCookies: "We use cookies to enhance your experience on our website. Cookies are small data files that are stored on your device. You can disable cookies in your browser settings, but this may affect the functionality of our website.",
    privacyGDPRTitle: "GDPR Compliance",
    privacyGDPR: "For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at the email address provided below.",
    privacyCCPATitle: "CCPA Compliance",
    privacyCCPA: "For users in California, we comply with the California Consumer Privacy Act (CCPA). You have the right to opt out of the sale of your personal information. To exercise this right, please contact us at the email address provided below.",
    privacyDataSecurityTitle: "Data Security",
    privacyDataSecurity: "We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.",
    privacyChangesTitle: "Changes to This Policy",
    privacyChanges: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
    privacyContactTitle: "Contact Us",
    privacyContact: "If you have any questions or concerns about this Privacy Policy, please contact us at contact@useciviltools.com.",
    privacyInfoPersonal: "Personal identification information (Name, email address, etc.)",
    privacyInfoUsage: "Usage data (Pages visited, time spent, etc.)",
    privacyInfoDevice: "Device information (Browser type, IP address, etc.)",
    privacyUseProvide: "To provide and maintain our service",
    privacyUseImprove: "To improve and personalize your experience",
    privacyUseCommunicate: "To communicate with you",
    privacyUseAdvertise: "To display targeted advertisements",
    
    termsPageTitle: "Terms of Service",
    termsLastUpdated: "Last Updated: July 1, 2024",
    termsIntro: "These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.",
    termsAcceptance: "Acceptance of Terms: By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.",
    termsToolUse: "Use of Tools: The tools provided on our website are for informational and educational purposes only. They are designed to assist with civil engineering calculations but should not be relied upon as the sole basis for engineering decisions.",
    termsDisclaimer: "Disclaimer: The calculations provided by our tools are for reference only. We make no guarantees or warranties regarding the accuracy, completeness, or reliability of the results. Users are responsible for verifying all calculations and consulting with qualified engineering professionals before making any engineering decisions.",
    termsAccuracy: "Accuracy: While we strive to provide accurate calculations, errors may occur. We do not accept liability for any damages or losses resulting from the use of our tools.",
    termsLimitation: "Limitation of Liability: In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our website or tools.",
    termsIntellectual: "Intellectual Property: All content on our website, including text, graphics, and software, is the property of us or our licensors and is protected by copyright laws.",
    termsModifications: "Modifications: We reserve the right to modify or discontinue our website or services at any time without notice.",
    termsTermination: "Termination: We may terminate or suspend your access to our website at any time, without cause or notice.",
    termsGoverning: "Governing Law: These terms shall be governed by and construed in accordance with the laws of the United States.",
    
    aboutPageTitle: "About Us",
    aboutIntro: "Welcome to Civil Engineering Tools - your trusted companion for professional civil engineering calculations.",
    aboutTeam: "Our Story",
    aboutMission: "Our mission is to provide civil engineers and students with powerful, accurate, and easy-to-use calculation tools that simplify complex engineering tasks.",
    aboutExperienceTitle: "Our Experience",
    aboutExperience: "With over 20 years of combined experience in civil engineering, our team of seasoned professionals understands the challenges engineers face every day. We have worked on major infrastructure projects across the globe, from skyscrapers to bridges, and we bring that expertise to every tool we create.",
    aboutTechnologyTitle: "Technology",
    aboutTechnology: "We leverage cutting-edge web technologies to deliver tools that are both powerful and accessible. Our tools are designed with the modern engineer in mind, featuring intuitive interfaces and comprehensive calculation capabilities.",
    aboutCommitmentTitle: "Our Commitment",
    aboutCommitment: "We are committed to continuous improvement and innovation. We regularly update our tools based on user feedback and the latest engineering standards.",
    aboutQuote: "Engineering is not just about building structures; it's about building a better world. We are dedicated to providing tools that empower engineers to make informed decisions and create safe, sustainable infrastructure for generations to come.",
    
    contactPageTitle: "Contact Us",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSubmit: "Submit",
    contactSuccess: "Thank you! Your message has been sent successfully.",
    contactRequired: "This field is required",
    
    cookieBannerTitle: "Cookie Consent",
    cookieBannerText: "We use cookies to enhance your experience on our website. By continuing to use our site, you consent to our use of cookies.",
    cookieAccept: "Accept",
    cookieReject: "Reject",
    
    language: "Language",
    
    seoTitle: "Your Ultimate Civil Engineering Tool Suite",
    seoDescription: "Professional civil engineering calculation tools for structural analysis, section properties, beam design, and more.",
    seoContent: "Welcome to UseCivilTools.com, your comprehensive suite of professional civil engineering calculation tools designed to streamline your structural analysis and design workflows. Whether you're a seasoned civil engineer working on complex infrastructure projects or a student learning the fundamentals of structural mechanics, our platform provides you with accurate, reliable, and easy-to-use calculation solutions.\n\nOur Section Calculator tool allows you to quickly compute section properties for various shapes including rectangles, circles, I-beams, channels, angles, and custom composite sections. Calculate area, centroid, moment of inertia, section modulus, and radius of gyration with precision.\n\nBuilt by a team of experienced civil engineers with over 20 years of combined industry experience, UseCivilTools.com adheres to the latest engineering standards including AISC, Eurocode, GB standards, and more. We understand the critical nature of engineering calculations and have designed our tools to help you make informed decisions.\n\nIn addition to our flagship Section Calculator, we're continuously expanding our toolset to include Beam Analysis, Column Design, Slab Design, Foundation Design, and Retaining Wall analysis tools. Each tool is developed with the same commitment to accuracy and usability.\n\nStart your engineering calculations today and experience the difference that professional-grade tools can make in your workflow.",
    
    toolSectionTitle: "Section Calculator",
    toolSectionDesc: "Calculate section properties for various shapes",
    toolBeamTitle: "Beam Analysis",
    toolBeamDesc: "Analyze beam deflection and stress",
    toolColumnTitle: "Column Design",
    toolColumnDesc: "Design columns according to standards",
    toolSlabTitle: "Slab Design",
    toolSlabDesc: "Calculate slab thickness and reinforcement",
    toolFoundationTitle: "Foundation Design",
    toolFoundationDesc: "Design footings and foundations",
    toolRetainingTitle: "Retaining Wall",
    toolRetainingDesc: "Design and analyze retaining walls",
    
    gettingStarted: "Getting Started",
    step1: "Select a calculation tool from the grid above",
    step2: "Enter the required parameters",
    step3: "Click calculate to get results",
    step4: "Use the copy button to export results",
    
    comingSoon: "Coming Soon",
    
    sectionSelectType: "Select Section Type",
    sectionInputParams: "Input Parameters",
    sectionResults: "Results",
    sectionCopyResults: "Copy Results",
    sectionCopied: "Copied!",
    sectionEnterParams: "Enter parameters to calculate",
    
    shapeRectangle: "Rectangle",
    shapeCircle: "Circle",
    shapeIbeam: "I-Beam",
    shapeChannel: "Channel",
    shapeAngle: "Angle",
    
    paramWidth: "Width",
    paramHeight: "Height",
    paramDiameter: "Diameter",
    paramTopFlangeWidth: "Top Flange Width",
    paramTopFlangeThickness: "Top Flange Thickness",
    paramBottomFlangeWidth: "Bottom Flange Width",
    paramBottomFlangeThickness: "Bottom Flange Thickness",
    paramWebHeight: "Web Height",
    paramWebThickness: "Web Thickness",
    paramFlangeWidth: "Flange Width",
    paramFlangeThickness: "Flange Thickness",
    paramLegWidth1: "Leg 1 Width",
    paramLegThickness1: "Leg 1 Thickness",
    paramLegWidth2: "Leg 2 Width",
    paramLegThickness2: "Leg 2 Thickness",
    
    resultArea: "Area",
    resultCentroidX: "Centroid X",
    resultCentroidY: "Centroid Y",
    resultIx: "Moment of Inertia X",
    resultIy: "Moment of Inertia Y",
    resultSx: "Section Modulus X",
    resultSy: "Section Modulus Y",
    resultRx: "Radius of Gyration X",
    resultRy: "Radius of Gyration Y",
    
    unitMm: "mm",
    unitMm2: "mm²",
    unitMm3: "mm³",
    unitMm4: "mm⁴",
    
    symbolIx: "Iₓ (Moment of Inertia)",
    symbolIy: "Iᵧ (Moment of Inertia)",
    symbolSx: "Sₓ (Section Modulus)",
    symbolSy: "Sᵧ (Section Modulus)",
    symbolRx: "rₓ (Radius of Gyration)",
    symbolRy: "rᵧ (Radius of Gyration)",
    
    sectionSeoTitle: "Section Properties Calculator - Civil Engineering Tool",
    sectionSeoContent: "Our Section Properties Calculator is an essential tool for civil engineers, structural designers, and engineering students. This powerful calculator allows you to quickly and accurately compute key section properties for various structural shapes including rectangles, circles, I-beams, channels, and angles.\n\n**Why Use Our Section Calculator?**\n\nSection properties are fundamental to structural analysis and design. The moment of inertia (I), section modulus (S), and radius of gyration (r) are critical parameters that determine a structure's resistance to bending, shear, and axial forces. Our calculator provides instant, precise results that you can trust.\n\n**Key Features:**\n\n1. **Multiple Section Types**: Calculate properties for rectangles, circles, I-beams, channels, and angle sections - the most commonly used shapes in civil engineering.\n\n2. **Comprehensive Results**: Get all the essential section properties in one place: Area, Centroid coordinates, Moment of Inertia (Iₓ, Iᵧ), Section Modulus (Sₓ, Sᵧ), and Radius of Gyration (rₓ, rᵧ).\n\n3. **Real-time Calculations**: See results instantly as you input parameters, making it easy to experiment with different dimensions and compare designs.\n\n4. **Copy Results**: Quickly export your calculation results with a single click for documentation or further analysis.\n\n**Understanding Section Properties:**\n\n- **Area (A)**: The cross-sectional area of the section, which determines the amount of material used and affects the member's resistance to axial forces.\n\n- **Centroid (Cₓ, Cᵧ)**: The geometric center of the section. This is crucial for determining the neutral axis in bending and for calculating moment of inertia about the correct axes.\n\n- **Moment of Inertia (Iₓ, Iᵧ)**: A measure of the section's resistance to bending about the x or y axis. Higher moment of inertia means greater stiffness and resistance to deflection.\n\n- **Section Modulus (Sₓ, Sᵧ)**: Calculated as I/c, where c is the distance from the centroid to the extreme fiber. This parameter is used to determine the bending stress in a member.\n\n- **Radius of Gyration (rₓ, rᵧ)**: A measure of how far the area is distributed from the centroid. It's used in column design to determine slenderness ratio and buckling resistance.\n\n**Engineering Applications:**\n\nOur Section Calculator is used by engineers worldwide for:\n\n- Beam design and analysis\n- Column design for axial and bending loads\n- Truss member sizing\n- Plate and slab design\n- Composite section analysis\n- Steel and reinforced concrete design\n\n**Formulas Used:**\n\nFor a rectangle with width b and height h:\n- Area: A = b × h\n- Moment of Inertia about X-axis: Iₓ = (b × h³) / 12\n- Moment of Inertia about Y-axis: Iᵧ = (h × b³) / 12\n- Section Modulus: S = I / (h/2)\n- Radius of Gyration: r = √(I/A)\n\nFor a circle with diameter d:\n- Area: A = π × (d/2)²\n- Moment of Inertia: I = π × (d/2)⁴ / 4\n\nFor built-up sections like I-beams, channels, and angles, we use the parallel axis theorem to calculate the combined properties of each component.\n\n**Built by Engineers, for Engineers:**\n\nAt UseCivilTools.com, we understand the importance of accurate, reliable calculations in civil engineering. Our team of experienced engineers has designed this tool to meet the highest standards of precision and usability. Whether you're working on a small residential project or a large-scale infrastructure development, our Section Calculator will help you make informed design decisions.\n\nStart calculating section properties today and experience the power of professional-grade engineering tools at your fingertips.",
    sectionFormulas: "Formulas & Reference",
    
    beamSupportType: "Support Type",
    beamLoadType: "Load Type",
    beamInputParams: "Input Parameters",
    beamResults: "Results",
    beamDiagrams: "Diagrams",
    beamCopyResults: "Copy Results",
    beamCopied: "Copied!",
    beamExport: "Export",
    beamPrint: "Print",
    
    supportBothHinged: "Both Hinged",
    supportBothFixed: "Both Fixed",
    supportHingedFixed: "Hinged - Fixed",
    
    loadUniform: "Uniform Load",
    loadPoint: "Point Load",
    loadDistributed: "Distributed Load",
    
    paramSpanLength: "Span Length",
    paramLoadValue: "Load Value",
    paramLoadPosition: "Load Position",
    paramElasticModulus: "Elastic Modulus",
    paramMomentInertia: "Moment of Inertia",
    
    resultReactionA: "Reaction at A",
    resultReactionB: "Reaction at B",
    resultShearMax: "Max Shear Force",
    resultMomentMax: "Max Bending Moment",
    resultDeflectionMax: "Max Deflection",
    
    symbolV: "V (Shear Force)",
    symbolM: "M (Bending Moment)",
    symbolDelta: "δ (Deflection)",
    
    shearDiagram: "Shear Force Diagram",
    momentDiagram: "Bending Moment Diagram",
    deflectionDiagram: "Deflection Diagram",
    
    unitKN: "kN",
    unitKnm: "kN·m",
    unitNmm2: "N/mm²",
    unitKnm2: "kN·m²",
    
    beamSeoTitle: "Beam Analysis Tool - Civil Engineering Structural Analysis",
    beamSeoContent: "Our Beam Analysis Tool is a comprehensive structural analysis solution for civil engineers, architects, and engineering students. This powerful tool allows you to analyze various beam configurations with different support conditions and loading scenarios, providing detailed results including shear force diagrams, bending moment diagrams, deflection diagrams, and key internal force values.\n\n**Why Use Our Beam Analysis Tool?**\n\nBeam analysis is a fundamental part of structural engineering. Understanding the behavior of beams under different loads and support conditions is essential for designing safe and efficient structures. Our tool provides accurate, reliable results that you can use for your engineering projects.\n\n**Key Features:**\n\n1. **Multiple Support Conditions**: Analyze beams with both hinged supports, both fixed supports, or a combination of hinged and fixed supports.\n\n2. **Flexible Loading Options**: Apply uniform loads across the entire span, point loads at any location, or partial distributed loads.\n\n3. **Comprehensive Results**: Get complete analysis including support reactions, shear force diagrams, bending moment diagrams, deflection diagrams, and maximum values.\n\n4. **Real-time Analysis**: See results instantly as you change parameters, making it easy to experiment with different scenarios.\n\n5. **Export and Print**: Export your results for documentation or print them directly for your records.\n\n**Understanding Beam Analysis:**\n\n- **Support Reactions**: The forces exerted by supports to maintain equilibrium. These are calculated using static equilibrium equations (ΣF = 0, ΣM = 0).\n\n- **Shear Force (V)**: The internal force that tends to shear the beam cross-section. It is the algebraic sum of all vertical forces to the left (or right) of the section.\n\n- **Bending Moment (M)**: The internal moment that causes bending of the beam. It is the algebraic sum of all moments to the left (or right) of the section.\n\n- **Deflection (δ)**: The vertical displacement of the beam under load. It depends on the material properties (E), cross-section properties (I), span length, and loading.\n\n**Engineering Applications:**\n\nOur Beam Analysis Tool is used by engineers worldwide for:\n\n- Design of floor beams in buildings\n- Bridge beam analysis\n- Roof structure design\n- Cantilever beam analysis\n- Continuous beam design\n- Steel and concrete beam design\n\n**Formulas Used:**\n\nFor a simply supported beam (both hinged) with span L and uniform load w:\n- Support reactions: Rₐ = Rᵦ = wL/2\n- Maximum shear force: Vₘₐₓ = wL/2\n- Maximum bending moment: Mₘₐₓ = wL²/8\n- Maximum deflection at center: δₘₐₓ = 5wL⁴/(384EI)\n\nFor a simply supported beam with central point load P:\n- Support reactions: Rₐ = Rᵦ = P/2\n- Maximum shear force: Vₘₐₓ = P/2\n- Maximum bending moment: Mₘₐₓ = PL/4\n- Maximum deflection at center: δₘₐₓ = PL³/(48EI)\n\n**Built by Engineers, for Engineers:**\n\nAt UseCivilTools.com, we understand the importance of accurate, reliable calculations in civil engineering. Our team of experienced engineers has designed this tool to meet the highest standards of precision and usability. Whether you're working on a small residential project or a large-scale infrastructure development, our Beam Analysis Tool will help you make informed design decisions.\n\nStart analyzing beams today and experience the power of professional-grade engineering tools at your fingertips.",
    beamFormulas: "Formulas & Reference",
    beamIntro: "The Beam Analysis tool allows you to analyze the structural behavior of beams under various loading conditions and support configurations. Enter the beam parameters, select the support type and load type, and get instant results including shear force diagrams, bending moment diagrams, and deflection calculations.",
    beamHowToUse: "1. Select the support type from the available options (Both Hinged, Both Fixed, or Hinged-Fixed).\n\n2. Select the load type (Uniform Load or Point Load).\n\n3. Enter the beam parameters including span length, load value, and load position (for point loads).\n\n4. Optionally enter the elastic modulus and moment of inertia for deflection calculations.\n\n5. View the results including support reactions, shear force diagram, bending moment diagram, and deflection diagram.\n\n6. Use the copy button to export results or the print button to print the analysis.",
    beamNotes: "Note: This tool assumes linear elastic behavior and small deflections. Results should be verified by a qualified engineering professional before use in actual design. The calculations follow standard structural analysis principles and are based on Euler-Bernoulli beam theory.",
    
    pdfExport: "Export Professional PDF Report",
    pdfReportTitle: "Professional Calculation Report",
    pdfInputParams: "Input Parameters",
    pdfCalculationSteps: "Calculation Steps",
    pdfResults: "Results",
    pdfGeneratedBy: "Generated by",
    pdfDate: "Date",
    
    backToHome: "Back to Home",
    results: "Results",
    toolConcreteTitle: "Concrete Volume Calculator",
    toolConcreteDesc: "Calculate concrete volume, estimate bags needed, and account for waste",
    concreteMode: "Calculation Mode",
    concreteSlab: "Slab / Footing",
    concreteWall: "Wall",
    concreteColumn: "Column / Cylinder",
    concreteCurb: "Curb / Gutter",
    concreteQuantity: "Quantity",
    concreteWaste: "Waste %",
    concreteLength: "Length",
    concreteWidth: "Width",
    concreteThickness: "Thickness",
    concreteHeight: "Height",
    concreteDiameter: "Diameter",
    concreteSection: "Section Size",
    concreteVolume: "Volume",
    concreteTotalVolume: "Total Volume",
    concreteVolumeWithWaste: "Volume with Waste",
    concreteUnitM3: "m³",
    concreteUnitFt3: "ft³",
    concreteBagEstimation: "Bag Estimation",
    concreteBagWeight: "Bag Weight",
    concreteBagsNeeded: "Bags Needed",
    concreteResultVolume: "Total Volume:",
    concreteResultBags: "Estimated Bags:",
    
    concreteSeoTitle: "Concrete Volume Calculator - How Many Bags of Concrete Do I Need?",
    concreteSeoContent: "Our Concrete Volume Calculator helps you accurately estimate concrete requirements for slabs, walls, columns, and curbs. Calculate volume in cubic meters or cubic feet, account for waste, and determine the number of bags needed.",
    concreteFormulas: "Formulas & Reference",
    concreteIntro: "The Concrete Volume Calculator is an essential tool for construction professionals and DIY enthusiasts. It provides accurate volume calculations for various concrete structures including slabs, foundations, walls, columns, and curbs. With built-in waste estimation and bag calculation features, you can ensure you order the right amount of concrete for your project.",
    concreteHowToUse: "1. Select the calculation mode (Slab/Footing, Wall, Column/Cylinder, or Curb/Gutter)\n2. Enter the dimensions for your structure\n3. Specify the quantity if you have multiple identical structures\n4. Set the waste percentage (typically 5-10%)\n5. Choose your preferred bag weight for estimation\n6. View the results including total volume and number of bags needed",
    concreteNotes: "Note: Concrete volume calculations should include a waste factor to account for spillage, uneven surfaces, and over-excavation. The recommended waste percentage varies by project type: 5% for simple slabs, 10% for complex structures. Always round up to the nearest full bag when ordering.",
    
    seoHowCalculateVolume: "How to Calculate Concrete Volume?",
    seoSlabFooting: "Slab / Footing",
    seoWall: "Wall",
    seoColumnCylinder: "Column / Cylinder",
    seoCurbGutter: "Curb / Gutter",
    
    seoWhyWaste: "Why Must You Account for Waste?",
    seoWasteReason1: "Spillage: Some concrete will inevitably be spilled during pouring and transportation.",
    seoWasteReason2: "Uneven Surfaces: The ground may not be perfectly level, requiring extra concrete to achieve the desired thickness.",
    seoWasteReason3: "Over-excavation: Excavated areas often need more concrete than calculated due to irregular shapes.",
    seoWasteReason4: "Contingencies: Having extra concrete ensures you won't run short, which could cause costly delays.",
    seoWasteRecommended: "Recommended waste percentages:",
    seoWasteSimple: "Simple slabs: 5%",
    seoWasteWalls: "Walls and columns: 7-10%",
    seoWasteComplex: "Complex structures: 10-15%",
    
    seoGradesTitle: "Different Concrete Grades and Their Uses",
    seoGradeC10: "C10 - C15",
    seoGradeC10Desc: "Low strength concrete used for non-structural applications such as:",
    seoGradeC10Use1: "Foundation bedding",
    seoGradeC10Use2: "Mass concrete fill",
    seoGradeC10Use3: "Non-load bearing walls",
    seoGradeC20: "C20 - C25",
    seoGradeC20Desc: "Medium strength concrete used for general construction:",
    seoGradeC20Use1: "Reinforced concrete slabs",
    seoGradeC20Use2: "Beams and columns",
    seoGradeC20Use3: "Driveways and patios",
    seoGradeC30: "C30 - C40",
    seoGradeC30Desc: "High strength concrete for heavy-duty applications:",
    seoGradeC30Use1: "High-rise structures",
    seoGradeC30Use2: "Bridge decks",
    seoGradeC30Use3: "Industrial floors",
    
    seoHowManyBags: "How Many Bags of Concrete Do I Need?",
    seoBagsIntro: "Calculating how many bags of concrete you need is a crucial step in any construction project. Order too few, and you'll face delays and additional delivery costs. Order too many, and you'll waste money on unused material. Our concrete calculator simplifies this process by providing accurate estimates based on your specific project requirements.",
    seoBagsGuideTitle: "Step-by-Step Guide to Calculating Concrete Bags",
    seoBagsStep1Title: "Determine the shape of your concrete structure",
    seoBagsStep1Desc: "Is it a slab, wall, column, or curb? Each shape has a different volume formula.",
    seoBagsStep2Title: "Measure the dimensions",
    seoBagsStep2Desc: "Use consistent units (meters or feet) for all measurements.",
    seoBagsStep3Title: "Calculate the volume",
    seoBagsStep3Desc: "Apply the appropriate formula for your structure type.",
    seoBagsStep4Title: "Add waste factor",
    seoBagsStep4Desc: "Include 5-10% extra for spillage, uneven surfaces, and contingencies.",
    seoBagsStep5Title: "Convert to bags",
    seoBagsStep5Desc: "Divide the total weight by the bag weight (20kg, 25kg, 40kg, 40lb, 60lb, or 80lb).",
    
    seoBagSizesTitle: "Common Bag Sizes and Coverage",
    seoBagSize: "Bag Size",
    seoBagVolumeM3: "Volume per Bag (m³)",
    seoBagVolumeFt3: "Volume per Bag (ft³)",
    seoBagUses: "Typical Uses",
    seoBag20kgUse: "Small repairs, DIY projects",
    seoBag25kgUse: "General construction, slabs",
    seoBag40kgUse: "Large projects, professional use",
    seoBag40lbUse: "Small jobs, repairs (US)",
    seoBag60lbUse: "Medium projects (US)",
    seoBag80lbUse: "Large projects, professional (US)",
    
    seoTipsTitle: "Tips for Ordering Concrete",
    seoTipRoundUp: "Round up: Always round up to the nearest full bag. You can't buy half a bag of concrete.",
    seoTipReadyMix: "Consider ready-mix: For large projects (over 10m³), ready-mixed concrete delivered by truck is often more cost-effective.",
    seoTipDelivery: "Check delivery minimums: Many suppliers have minimum order quantities for delivery.",
    seoTipWeather: "Plan for weather: Concrete pouring is weather-dependent. Have a backup plan for rain or extreme temperatures.",
    seoConclusion: "By following these guidelines and using our concrete calculator, you can ensure that you order the right amount of concrete for your project, saving time and money while avoiding costly mistakes.",
    
    columnDesignTitle: "RC Column Design Tool",
    columnDesignDesc: "Design reinforced concrete columns with rectangular or circular sections",
    columnSelectSectionType: "Select Section Type",
    columnInputParams: "Input Parameters",
    columnResults: "Calculation Results",
    columnSectionType: "Section Type",
    columnAxialForce: "Axial Force",
    columnBendingMoment: "Bending Moment",
    columnFc: "Concrete Strength (f'c)",
    columnFy: "Steel Strength (fy)",
    columnClearHeight: "Clear Height",
    columnKFactor: "Effective Length Factor (k)",
    columnKFixed: "Fixed-Fixed",
    columnKHinged: "Hinged-Hinged",
    columnKFree: "Free-Fixed",
    columnCover: "Concrete Cover",
    columnBarDiameter: "Bar Diameter",
    columnNumBars: "Number of Bars",
    columnSlendernessRatio: "Slenderness Ratio (kl/r)",
    columnShortColumn: "Short Column (kl/r ≤ 100)",
    columnLongColumn: "Long Column (kl/r > 100)",
    columnEccentricity: "Eccentricity (e = M/P)",
    columnReinforcementRatio: "Reinforcement Ratio",
    columnMinRatio: "Minimum Ratio (ρmin)",
    columnMaxRatio: "Maximum Ratio (ρmax)",
    columnRequiredRatio: "Required Ratio",
    columnSteelArea: "Required Steel Area",
    columnRequiredBars: "Required Number of Bars",
    columnDesignCheck: "Design Check",
    columnCapacityRatio: "Capacity Ratio",
    columnCalculationSteps: "Calculation Steps",
    columnCrossSection: "Cross Section",
    columnEnterParams: "Enter parameters to calculate",
    columnSmallEccentric: "Small Eccentric",
    columnLargeEccentric: "Large Eccentric",
    columnCurrent: "Current",
    columnMinReinforcementControlled: "Controlled by minimum reinforcement ratio",
    columnInsufficientReinforcement: "Insufficient reinforcement - needs more bars",
    columnConcrete: "Concrete",
    columnRebar: "Rebar",
    columnCoverLabel: "Cover",
    columnWarningFc: "Warning: Concrete strength should be between 10-100 MPa.",
    columnWarningFy: "Warning: Steel strength should be between 200-700 MPa.",
    columnWarningDimensions: "Warning: Column dimensions should be at least 150mm.",
    columnWarningDiameter: "Warning: Column diameter should be at least 200mm.",
    columnWarningReinforcementInsufficient: "Steel spacing too small",
    columnWarningSectionTooSmall: "Section too small",
    columnPMInteractionDiagram: "P-M Interaction Diagram",
    columnPMTitle: "P-M Interaction Diagram (ACI 318)",
    columnPMXAxis: "Axial Force P (kN)",
    columnPMYAxis: "Bending Moment M (kNm)",
    columnPMInteractionCurve: "Interaction Curve",
    columnPMCurrentPoint: "Current (P,M)",
    columnFailedSectionCapacity: "FAILED: Section Capacity Exceeded",
    columnFailedSectionCapacityDesc: "The applied loads (P={P} kN, M={M} kNm) exceed the section capacity even with maximum reinforcement (8%). Consider increasing column dimensions or material strength.",
    columnFailedInsufficientReinforcement: "FAILED: Insufficient Reinforcement",
    columnBarUnit: "bars",
    columnWarningSectionTooSmallDesc: "The required reinforcement ratio exceeds 8%. Consider increasing column dimensions.",
    columnPass: "PASS",
    columnMarginal: "MARGINAL",
    columnFail: "FAIL",
    columnRectangular: "Rectangular",
    columnCircular: "Circular",
    columnDesignResults: "Column Design Results",
    columnDimensions: "Dimensions",
    columnDiameter: "diameter",
    columnConcreteStrength: "Concrete Strength",
    columnSteelStrength: "Steel Strength",
    columnRequiredReinforcement: "Required Reinforcement Ratio",
    columnRequiredSteelArea: "Required Steel Area",
    columnPreset: "Preset",
    columnGeneratePDF: "Generate PDF Report",
    columnGeneratingPDF: "Generating...",
    
    columnSeoTitle: "RC Column Design: Understanding Slenderness Ratio and Eccentric Compression",
    
    columnSeoContent1: "Reinforced concrete (RC) column design is a fundamental aspect of structural engineering that requires careful consideration of several critical factors. Columns are vertical structural members that primarily carry axial compressive loads, but they must also be designed to resist bending moments, shear forces, and potential buckling. In this comprehensive guide, we will explore the key concepts of RC column design, with a particular focus on slenderness ratio and eccentric compression.",
    
    columnSeoContent2: "**What is a Reinforced Concrete Column?**",
    
    columnSeoContent3: "A reinforced concrete column is a structural element that transfers loads from beams and slabs to the foundation. Unlike steel columns, RC columns combine the compressive strength of concrete with the tensile strength of reinforcing steel bars (rebars). The concrete carries the compressive forces, while the steel reinforcement provides tensile strength and prevents brittle failure. RC columns are widely used in buildings, bridges, and other structures due to their durability, fire resistance, and cost-effectiveness.",
    
    columnSeoContent4: "**Slenderness Ratio: A Critical Parameter**",
    
    columnSeoContent5: "The slenderness ratio is one of the most important parameters in column design. It is defined as the ratio of the effective length of the column to its radius of gyration (kl/r). This ratio determines whether a column will fail by crushing (short column) or buckling (long column).",
    
    columnSeoContent6: "**Understanding Effective Length (kl)**",
    
    columnSeoContent7: "The effective length factor (k) accounts for the end conditions of the column. Different support conditions result in different effective lengths:\n\n- **k = 0.5**: Both ends fixed (restrained against rotation and lateral movement)\n- **k = 1.0**: Both ends hinged (free to rotate but restrained against lateral movement)\n- **k = 1.5**: One end fixed, one end free (cantilever column)\n- **k = 1.0 - 1.2**: One end fixed, one end hinged",
    
    columnSeoContent8: "**Radius of Gyration (r)**",
    
    columnSeoContent9: "The radius of gyration is a measure of how far the area of the cross-section is distributed from its centroid. It is calculated as r = √(I/A), where I is the moment of inertia and A is the cross-sectional area. For a rectangular section with dimensions b × h, the radius of gyration about the stronger axis is r = h/√12, and about the weaker axis is r = b/√12. For a circular section with diameter d, r = d/√16.",
    
    columnSeoContent10: "**Short vs. Long Columns**",
    
    columnSeoContent11: "Columns are classified based on their slenderness ratio:\n\n- **Short Columns**: kl/r ≤ 100 (ACI 318 limit). These columns fail by crushing when the axial load exceeds the compressive strength of the concrete and steel. Slenderness effects are negligible.\n\n- **Long Columns**: kl/r > 100. These columns fail by buckling before reaching their crushing strength. The higher the slenderness ratio, the lower the allowable axial load due to lateral instability.\n\n- **Intermediate Columns**: These fall between short and long columns, experiencing both material and stability failure modes.",
    
    columnSeoContent12: "**Eccentric Compression: Combined Axial Load and Bending**",
    
    columnSeoContent13: "In most real-world applications, columns are subjected to both axial compression and bending moments. This is known as eccentric compression. The eccentricity (e) is the distance from the centroid of the column to the point of application of the axial load, calculated as e = M/P, where M is the bending moment and P is the axial load.",
    
    columnSeoContent14: "**Types of Eccentric Loading**",
    
    columnSeoContent15: "Eccentric compression can be classified into two types:\n\n1. **Uniaxial Eccentricity**: The load is eccentric about one axis only, causing bending in one direction. This is common in columns supporting beams on one side.\n\n2. **Biaxial Eccentricity**: The load is eccentric about both axes, causing bending in two perpendicular directions. This occurs in corner columns or columns with asymmetric loading.\n\n**Design Considerations for Eccentric Compression:**\n\n- **Interaction Diagram**: This diagram shows the relationship between axial load capacity (φPn) and flexural capacity (φMn) for a given column section. It helps determine if the column can resist the combined loading.\n\n- **Neutral Axis Depth**: The position of the neutral axis determines whether the section is in compression-controlled or tension-controlled failure.\n\n- **Minimum Eccentricity**: Even for nominally concentric loads, code requirements specify a minimum eccentricity to account for accidental imperfections and construction tolerances.\n\n**ACI 318 Provisions for Column Design:**\n\nThe ACI 318 Building Code Requirements for Structural Concrete provides comprehensive guidelines for RC column design:\n\n- **Reinforcement Ratio**: ρmin = 1% and ρmax = 8% of gross area for tied columns; ρmin = 0.8% for spiral columns.\n\n- **Longitudinal Reinforcement**: At least four bars are required for rectangular columns, and six bars for circular columns.\n\n- **Transverse Reinforcement**: Ties or spirals must be provided to prevent buckling of longitudinal bars.\n\n- **Slenderness Effects**: For columns with kl/r > 22, slenderness reduction factors must be applied to the axial load capacity.\n\n**Eurocode 2 Provisions:**\n\nEurocode 2 uses a similar approach but with different slenderness limits:\n\n- **Short Columns**: λ ≤ 15 (for rectangular sections) or λ ≤ 18 (for circular sections)\n- **Long Columns**: λ > the above limits, requiring second-order analysis\n\n**Design Steps for RC Columns:**\n\n1. Determine the design loads (axial force and bending moments)\n2. Select the column dimensions and material properties\n3. Calculate the slenderness ratio and classify the column\n4. Perform strength calculations for combined axial load and bending\n5. Check minimum and maximum reinforcement ratios\n6. Design transverse reinforcement (ties/spirals)\n7. Verify deflection and stability requirements\n\n**Common Failure Modes:**\n\n- **Crushing Failure**: Occurs in short columns when the concrete reaches its compressive strength.\n- **Buckling Failure**: Occurs in long columns due to lateral instability.\n- **Flexural Failure**: Occurs when the bending moment exceeds the flexural capacity, causing tension failure in the reinforcement.\n- **Shear Failure**: Occurs when shear forces exceed the shear capacity, typically in short, heavily loaded columns.\n\n**Practical Tips for Column Design:**\n\n- Use larger cross-sections for columns with high slenderness ratios to reduce kl/r.\n- Provide adequate lateral bracing to reduce effective length.\n- Use spiral reinforcement for circular columns to increase ductility.\n- Consider minimum eccentricity requirements even for concentric loading.\n- Verify the interaction diagram for combined axial load and bending.\n\n**Conclusion:**\n\nRC column design is a complex but essential aspect of structural engineering. Understanding slenderness ratio and eccentric compression is crucial for designing safe and efficient columns. By following the appropriate design codes and considering all relevant factors, engineers can create columns that will perform reliably under various loading conditions. Our RC Column Design Tool simplifies this process by providing instant calculations based on ACI 318 standards, helping you design columns quickly and accurately."
  },
  zh: {
    title: "土木工程工具",
    description: "专业的土木工程计算工具",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    about: "关于我们",
    contact: "联系我们",
    home: "首页",
    
    privacyPageTitle: "隐私政策",
    privacyLastUpdated: "最后更新：2024年7月1日",
    privacyIntro: "本隐私政策说明了我们在您访问或使用我们的网站和服务时如何收集、使用和披露您的信息。使用我们的网站即表示您同意按照本政策收集和使用信息。",
    privacyInformationCollection: "我们可能收集以下类型的信息：",
    privacyHowWeUse: "我们将收集的信息用于以下目的：",
    privacyGoogleAdSenseTitle: "Google AdSense",
    privacyGoogleAdSense: "我们的网站使用Google AdSense显示广告。Google AdSense可能收集您访问本网站和其他网站的信息，以便提供您可能感兴趣的商品和服务的定向广告。Google AdSense使用cookies和其他跟踪技术来收集这些信息。您可以访问Google的隐私政策了解更多关于Google隐私实践和如何选择退出的信息。",
    privacyCookiesTitle: "Cookies",
    privacyCookies: "我们使用cookies来增强您在我们网站上的体验。Cookies是存储在您设备上的小型数据文件。您可以在浏览器设置中禁用cookies，但这可能会影响我们网站的功能。",
    privacyGDPRTitle: "GDPR 合规性",
    privacyGDPR: "对于欧洲经济区（EEA）的用户，我们遵守通用数据保护条例（GDPR）。您有权访问、更正或删除您的个人数据。要行使这些权利，请通过下方提供的电子邮件地址联系我们。",
    privacyCCPATitle: "CCPA 合规性",
    privacyCCPA: "对于加利福尼亚州的用户，我们遵守加州消费者隐私法案（CCPA）。您有权选择退出出售您的个人信息。要行使此权利，请通过下方提供的电子邮件地址联系我们。",
    privacyDataSecurityTitle: "数据安全",
    privacyDataSecurity: "我们采取合理措施保护您的信息免受未经授权的访问、使用或披露。但是，互联网传输或电子存储的任何方法都不是100%安全的。",
    privacyChangesTitle: "政策变更",
    privacyChanges: "我们可能会不时更新本隐私政策。我们将通过在此页面上发布新的隐私政策来通知您任何更改。",
    privacyContactTitle: "联系我们",
    privacyContact: "如果您对本隐私政策有任何疑问或担忧，请通过contact@useciviltools.com联系我们。",
    privacyInfoPersonal: "个人身份信息（姓名、邮箱地址等）",
    privacyInfoUsage: "使用数据（访问的页面、花费的时间等）",
    privacyInfoDevice: "设备信息（浏览器类型、IP地址等）",
    privacyUseProvide: "提供和维护我们的服务",
    privacyUseImprove: "改进和个性化您的体验",
    privacyUseCommunicate: "与您沟通",
    privacyUseAdvertise: "显示定向广告",
    
    termsPageTitle: "服务条款",
    termsLastUpdated: "最后更新：2024年7月1日",
    termsIntro: "这些服务条款管辖您对我们网站和服务的使用。访问或使用我们的网站即表示您同意受这些条款的约束。",
    termsAcceptance: "接受条款：使用我们的网站即表示您承认已阅读、理解并同意受这些服务条款和我们的隐私政策的约束。",
    termsToolUse: "工具使用：我们网站上提供的工具仅供信息和教育目的使用。它们旨在协助进行土木工程计算，但不应作为工程决策的唯一依据。",
    termsDisclaimer: "免责声明：我们工具提供的计算仅供参考。我们不对结果的准确性、完整性或可靠性作出任何保证或担保。用户有责任验证所有计算并在做出任何工程决策前咨询合格的工程专业人员。",
    termsAccuracy: "准确性：虽然我们努力提供准确的计算，但可能会出现错误。我们对因使用我们的工具而导致的任何损害或损失不承担责任。",
    termsLimitation: "责任限制：在任何情况下，我们均不对因使用我们的网站或工具而产生的任何直接、间接、偶然、特殊或后果性损害承担责任。",
    termsIntellectual: "知识产权：我们网站上的所有内容，包括文本、图形和软件，都是我们或我们的许可方的财产，并受版权法保护。",
    termsModifications: "修改：我们保留随时修改或终止我们的网站或服务的权利，无需通知。",
    termsTermination: "终止：我们可以随时终止或暂停您对我们网站的访问，无需理由或通知。",
    termsGoverning: "适用法律：这些条款应受美国法律管辖并按照美国法律解释。",
    
    aboutPageTitle: "关于我们",
    aboutIntro: "欢迎来到土木工程工具 - 您值得信赖的专业土木工程计算伴侣。",
    aboutTeam: "我们的故事",
    aboutMission: "我们的使命是为土木工程师和学生提供强大、准确且易于使用的计算工具，简化复杂的工程任务。",
    aboutExperienceTitle: "我们的经验",
    aboutExperience: "我们的资深专业团队拥有超过20年的土木工程经验，深知工程师每天面临的挑战。我们曾参与过全球范围内的重大基础设施项目，从摩天大楼到桥梁，我们将这些专业知识融入到我们创建的每一个工具中。",
    aboutTechnologyTitle: "技术",
    aboutTechnology: "我们利用前沿的网络技术提供既强大又易于访问的工具。我们的工具专为现代工程师设计，具有直观的界面和全面的计算能力。",
    aboutCommitmentTitle: "我们的承诺",
    aboutCommitment: "我们致力于持续改进和创新。我们会根据用户反馈和最新的工程标准定期更新我们的工具。",
    aboutQuote: "工程不仅仅是建造结构，更是建造一个更美好的世界。我们致力于提供工具，让工程师能够做出明智的决策，为子孙后代创造安全、可持续的基础设施。",
    
    contactPageTitle: "联系我们",
    contactName: "姓名",
    contactEmail: "邮箱",
    contactMessage: "留言",
    contactSubmit: "提交",
    contactSuccess: "感谢您的留言！您的信息已成功发送。",
    contactRequired: "此字段为必填项",
    
    cookieBannerTitle: "Cookie同意",
    cookieBannerText: "我们使用cookies来增强您在我们网站上的体验。继续使用我们的网站即表示您同意我们使用cookies。",
    cookieAccept: "同意",
    cookieReject: "拒绝",
    
    language: "语言",
    
    seoTitle: "您的终极土木工程工具套件",
    seoDescription: "用于结构分析、截面特性、梁设计等的专业土木工程计算工具。",
    seoContent: "欢迎来到UseCivilTools.com，您的专业土木工程计算工具综合套件，旨在简化您的结构分析和设计工作流程。无论您是从事复杂基础设施项目的资深土木工程师，还是学习结构力学基础的学生，我们的平台都为您提供准确、可靠且易于使用的计算解决方案。\n\n我们的截面计算器工具允许您快速计算各种形状的截面特性，包括矩形、圆形、工字梁、槽型钢、角钢和自定义组合截面。精确计算面积、形心、惯性矩、截面模量和回转半径。\n\nUseCivilTools.com由拥有20多年行业经验的资深土木工程师团队打造，遵循最新的工程标准，包括AISC、Eurocode、国家标准等。我们理解工程计算的关键性质，并设计我们的工具来帮助您做出明智的决策。\n\n除了我们的旗舰截面计算器外，我们正在不断扩展工具集，包括梁分析、柱设计、板设计、基础设计和挡土墙分析工具。每个工具都以同样的准确性和可用性承诺开发。\n\n今天就开始您的工程计算，体验专业级工具可以为您的工作流程带来的改变。",
    
    toolSectionTitle: "截面计算器",
    toolSectionDesc: "计算各种形状的截面特性",
    toolBeamTitle: "梁分析",
    toolBeamDesc: "分析梁的挠度和应力",
    toolColumnTitle: "柱设计",
    toolColumnDesc: "按标准设计柱",
    toolSlabTitle: "板设计",
    toolSlabDesc: "计算板厚度和配筋",
    toolFoundationTitle: "基础设计",
    toolFoundationDesc: "设计地基和基础",
    toolRetainingTitle: "挡土墙",
    toolRetainingDesc: "设计和分析挡土墙",
    
    gettingStarted: "开始使用",
    step1: "从上方网格中选择计算工具",
    step2: "输入所需参数",
    step3: "点击计算获取结果",
    step4: "使用复制按钮导出结果",
    
    comingSoon: "即将推出",
    
    sectionSelectType: "选择截面类型",
    sectionInputParams: "输入参数",
    sectionResults: "计算结果",
    sectionCopyResults: "复制结果",
    sectionCopied: "已复制！",
    sectionEnterParams: "请输入参数进行计算",
    
    shapeRectangle: "矩形",
    shapeCircle: "圆形",
    shapeIbeam: "工字梁",
    shapeChannel: "槽型钢",
    shapeAngle: "角钢",
    
    paramWidth: "宽度",
    paramHeight: "高度",
    paramDiameter: "直径",
    paramTopFlangeWidth: "上翼缘宽度",
    paramTopFlangeThickness: "上翼缘厚度",
    paramBottomFlangeWidth: "下翼缘宽度",
    paramBottomFlangeThickness: "下翼缘厚度",
    paramWebHeight: "腹板高度",
    paramWebThickness: "腹板厚度",
    paramFlangeWidth: "翼缘宽度",
    paramFlangeThickness: "翼缘厚度",
    paramLegWidth1: "腿1宽度",
    paramLegThickness1: "腿1厚度",
    paramLegWidth2: "腿2宽度",
    paramLegThickness2: "腿2厚度",
    
    resultArea: "面积",
    resultCentroidX: "形心 X",
    resultCentroidY: "形心 Y",
    resultIx: "惯性矩 X",
    resultIy: "惯性矩 Y",
    resultSx: "截面模量 X",
    resultSy: "截面模量 Y",
    resultRx: "回转半径 X",
    resultRy: "回转半径 Y",
    
    unitMm: "mm",
    unitMm2: "mm²",
    unitMm3: "mm³",
    unitMm4: "mm⁴",
    
    symbolIx: "Iₓ (惯性矩 / Moment of Inertia)",
    symbolIy: "Iᵧ (惯性矩 / Moment of Inertia)",
    symbolSx: "Sₓ (截面模量 / Section Modulus)",
    symbolSy: "Sᵧ (截面模量 / Section Modulus)",
    symbolRx: "rₓ (回转半径 / Radius of Gyration)",
    symbolRy: "rᵧ (回转半径 / Radius of Gyration)",
    
    sectionSeoTitle: "截面特性计算器 - 土木工程工具",
    sectionSeoContent: "我们的截面特性计算器是土木工程师、结构设计师和工程学生必不可少的工具。这个强大的计算器允许您快速准确地计算各种结构形状（包括矩形、圆形、工字梁、槽型钢和角钢）的关键截面特性。\n\n**为什么使用我们的截面计算器？**\n\n截面特性是结构分析和设计的基础。惯性矩（I）、截面模量（S）和回转半径（r）是决定结构抗弯曲、抗剪切和轴向力能力的关键参数。我们的计算器提供您可以信赖的即时、精确结果。\n\n**主要功能：**\n\n1. **多种截面类型**：计算矩形、圆形、工字梁、槽型钢和角钢等土木工程中最常用形状的特性。\n\n2. **全面的结果**：在一个地方获取所有基本截面特性：面积、形心坐标、惯性矩（Iₓ, Iᵧ）、截面模量（Sₓ, Sᵧ）和回转半径（rₓ, rᵧ）。\n\n3. **实时计算**：输入参数时即时查看结果，便于尝试不同尺寸并比较设计方案。\n\n4. **复制结果**：一键快速导出计算结果，用于文档记录或进一步分析。\n\n**理解截面特性：**\n\n- **面积（A）**：截面的横截面积，决定材料用量并影响构件的轴向力抵抗能力。\n\n- **形心（Cₓ, Cᵧ）**：截面的几何中心。这对于确定弯曲时的中性轴以及计算关于正确轴的惯性矩至关重要。\n\n- **惯性矩（Iₓ, Iᵧ）**：截面绕x轴或y轴弯曲的抵抗力的度量。惯性矩越大，刚度和抗挠度能力越强。\n\n- **截面模量（Sₓ, Sᵧ）**：计算为I/c，其中c是从形心到最远纤维的距离。此参数用于确定构件中的弯曲应力。\n\n- **回转半径（rₓ, rᵧ）**：面积相对于形心分布程度的度量。用于柱设计中确定长细比和屈曲抵抗力。\n\n**工程应用：**\n\n我们的截面计算器被全球工程师用于：\n\n- 梁设计和分析\n- 承受轴向和弯曲荷载的柱设计\n- 桁架构件尺寸确定\n- 板设计\n- 组合截面分析\n- 钢结构和钢筋混凝土设计\n\n**使用的公式：**\n\n对于宽度为b、高度为h的矩形：\n- 面积：A = b × h\n- 绕X轴的惯性矩：Iₓ = (b × h³) / 12\n- 绕Y轴的惯性矩：Iᵧ = (h × b³) / 12\n- 截面模量：S = I / (h/2)\n- 回转半径：r = √(I/A)\n\n对于直径为d的圆形：\n- 面积：A = π × (d/2)²\n- 惯性矩：I = π × (d/2)⁴ / 4\n\n对于工字梁、槽型钢和角钢等组合截面，我们使用平行轴定理计算每个组成部分的综合特性。\n\n**由工程师打造，为工程师服务：**\n\n在UseCivilTools.com，我们理解准确可靠的计算在土木工程中的重要性。我们经验丰富的工程师团队设计了这个工具，以满足最高标准的精度和可用性。无论您是在从事小型住宅项目还是大型基础设施开发，我们的截面计算器都将帮助您做出明智的设计决策。\n\n今天就开始计算截面特性，体验专业级工程工具的强大功能。",
    sectionFormulas: "公式与参考",
    
    beamSupportType: "支座类型",
    beamLoadType: "荷载类型",
    beamInputParams: "输入参数",
    beamResults: "计算结果",
    beamDiagrams: "内力图",
    beamCopyResults: "复制结果",
    beamCopied: "已复制！",
    beamExport: "导出",
    beamPrint: "打印",
    
    supportBothHinged: "两侧铰接",
    supportBothFixed: "两侧刚接",
    supportHingedFixed: "一端铰接一端刚接",
    
    loadUniform: "均布荷载",
    loadPoint: "集中荷载",
    loadDistributed: "分布荷载",
    
    paramSpanLength: "跨度",
    paramLoadValue: "荷载值",
    paramLoadPosition: "荷载位置",
    paramElasticModulus: "弹性模量",
    paramMomentInertia: "惯性矩",
    
    resultReactionA: "支座反力 A",
    resultReactionB: "支座反力 B",
    resultShearMax: "最大剪力",
    resultMomentMax: "最大弯矩",
    resultDeflectionMax: "最大挠度",
    
    symbolV: "V (剪力 / Shear Force)",
    symbolM: "M (弯矩 / Bending Moment)",
    symbolDelta: "δ (挠度 / Deflection)",
    
    shearDiagram: "剪力图",
    momentDiagram: "弯矩图",
    deflectionDiagram: "变形图",
    
    unitKN: "kN",
    unitKnm: "kN·m",
    unitNmm2: "N/mm²",
    unitKnm2: "kN·m²",
    
    beamSeoTitle: "梁分析工具 - 土木工程结构分析",
    beamSeoContent: "我们的梁分析工具是土木工程师、建筑师和工程学生的综合结构分析解决方案。这个强大的工具允许您分析具有不同支撑条件和荷载场景的各种梁配置，提供详细的结果，包括剪力图、弯矩图、变形图和关键内力值。\n\n**为什么使用我们的梁分析工具？**\n\n梁分析是结构工程的基础部分。理解梁在不同荷载和支撑条件下的行为对于设计安全高效的结构至关重要。我们的工具提供准确可靠的结果，可用于您的工程项目。\n\n**主要功能：**\n\n1. **多种支撑条件**：分析两侧铰接、两侧刚接或铰接与刚接组合的梁。\n\n2. **灵活的荷载选项**：施加全跨均布荷载、任意位置的集中荷载或部分分布荷载。\n\n3. **全面的结果**：获得完整的分析结果，包括支座反力、剪力图、弯矩图、变形图和最大值。\n\n4. **实时分析**：更改参数时即时查看结果，便于尝试不同场景。\n\n5. **导出和打印**：导出结果用于文档记录或直接打印。\n\n**理解梁分析：**\n\n- **支座反力**：支座为维持平衡而施加的力。使用静力学平衡方程计算（ΣF = 0, ΣM = 0）。\n\n- **剪力（V）**：使梁截面产生剪切的内力。它是截面左侧（或右侧）所有垂直力的代数和。\n\n- **弯矩（M）**：使梁产生弯曲的内力矩。它是截面左侧（或右侧）所有力矩的代数和。\n\n- **挠度（δ）**：梁在荷载作用下的竖向位移。取决于材料特性（E）、截面特性（I）、跨度和荷载。\n\n**工程应用：**\n\n我们的梁分析工具被全球工程师用于：\n\n- 建筑楼面梁设计\n- 桥梁梁分析\n- 屋顶结构设计\n- 悬臂梁分析\n- 连续梁设计\n- 钢梁和混凝土梁设计\n\n**使用的公式：**\n\n对于跨度为L、均布荷载为w的简支梁（两侧铰接）：\n- 支座反力：Rₐ = Rᵦ = wL/2\n- 最大剪力：Vₘₐₓ = wL/2\n- 最大弯矩：Mₘₐₓ = wL²/8\n- 跨中最大挠度：δₘₐₓ = 5wL⁴/(384EI)\n\n对于跨中集中荷载P的简支梁：\n- 支座反力：Rₐ = Rᵦ = P/2\n- 最大剪力：Vₘₐₓ = P/2\n- 最大弯矩：Mₘₐₓ = PL/4\n- 跨中最大挠度：δₘₐₓ = PL³/(48EI)\n\n**由工程师打造，为工程师服务：**\n\n在UseCivilTools.com，我们理解准确可靠的计算在土木工程中的重要性。我们经验丰富的工程师团队设计了这个工具，以满足最高标准的精度和可用性。无论您是在从事小型住宅项目还是大型基础设施开发，我们的梁分析工具都将帮助您做出明智的设计决策。\n\n今天就开始分析梁，体验专业级工程工具的强大功能。",
    beamFormulas: "公式与参考",
    beamIntro: "梁分析工具允许您分析梁在各种荷载条件和支撑配置下的结构行为。输入梁参数，选择支座类型和荷载类型，即可获得包括剪力图、弯矩图和挠度计算在内的即时结果。",
    beamHowToUse: "1. 从可用选项中选择支座类型（两侧铰接、两侧刚接或一端铰接一端刚接）。\n\n2. 选择荷载类型（均布荷载或集中荷载）。\n\n3. 输入梁参数，包括跨度、荷载值和荷载位置（集中荷载）。\n\n4. 可选输入弹性模量和惯性矩用于挠度计算。\n\n5. 查看结果，包括支座反力、剪力图、弯矩图和变形图。\n\n6. 使用复制按钮导出结果或使用打印按钮打印分析结果。",
    beamNotes: "注意：本工具假设线弹性行为和小挠度。实际设计使用前应经过合格工程专业人员验证。计算遵循标准结构分析原理，基于欧拉-伯努利梁理论。",
    
    pdfExport: "导出专业PDF报告",
    pdfReportTitle: "专业计算报告",
    pdfInputParams: "输入参数",
    pdfCalculationSteps: "计算步骤",
    pdfResults: "计算结果",
    pdfGeneratedBy: "由",
    pdfDate: "日期",
    
    backToHome: "返回首页",
    results: "计算结果",
    toolConcreteTitle: "混凝土体积计算器",
    toolConcreteDesc: "计算混凝土体积，估算所需袋数，并考虑损耗",
    concreteMode: "计算模式",
    concreteSlab: "平板/基础",
    concreteWall: "墙体",
    concreteColumn: "圆柱",
    concreteCurb: "路缘石/水沟",
    concreteQuantity: "数量",
    concreteWaste: "损耗率 %",
    concreteLength: "长度",
    concreteWidth: "宽度",
    concreteThickness: "厚度",
    concreteHeight: "高度",
    concreteDiameter: "直径",
    concreteSection: "截面尺寸",
    concreteVolume: "体积",
    concreteTotalVolume: "总体积",
    concreteVolumeWithWaste: "含损耗体积",
    concreteUnitM3: "m³",
    concreteUnitFt3: "ft³",
    concreteBagEstimation: "袋数估算",
    concreteBagWeight: "袋重",
    concreteBagsNeeded: "所需袋数",
    concreteResultVolume: "总体积：",
    concreteResultBags: "估算袋数：",
    
    concreteSeoTitle: "混凝土体积计算器 - 需要多少袋混凝土？",
    concreteSeoContent: "我们的混凝土体积计算器帮助您准确估算平板、墙体、圆柱和路缘石的混凝土需求。支持立方米和立方英尺计算，考虑损耗因素，并确定所需袋数。",
    concreteFormulas: "公式与参考",
    concreteIntro: "混凝土体积计算器是建筑专业人士和DIY爱好者的必备工具。它提供各种混凝土结构（包括平板、基础、墙体、圆柱和路缘石）的准确体积计算。通过内置的损耗估算和袋数计算功能，您可以确保为项目订购正确数量的混凝土。",
    concreteHowToUse: "1. 选择计算模式（平板/基础、墙体、圆柱或路缘石/水沟）\n2. 输入结构尺寸\n3. 如果有多个相同结构，指定数量\n4. 设置损耗百分比（通常为5-10%）\n5. 选择您偏好的袋重进行估算\n6. 查看结果，包括总体积和所需袋数",
    concreteNotes: "注意：混凝土体积计算应包括损耗系数，以考虑溢出、不平表面和超挖等因素。建议的损耗百分比因项目类型而异：简单平板为5%，复杂结构为10%。订购时应向上取整到最近的整袋。",
    
    seoHowCalculateVolume: "如何计算混凝土体积？",
    seoSlabFooting: "平板/基础",
    seoWall: "墙体",
    seoColumnCylinder: "圆柱",
    seoCurbGutter: "路缘石/水沟",
    
    seoWhyWaste: "为什么计算时必须考虑损耗？",
    seoWasteReason1: "溢出：浇筑和运输过程中难免会有混凝土溢出。",
    seoWasteReason2: "不平表面：地面可能不完全平整，需要额外混凝土来达到所需厚度。",
    seoWasteReason3: "超挖：挖掘区域通常因形状不规则而需要比计算更多的混凝土。",
    seoWasteReason4: "应急储备：备有额外混凝土可确保不会短缺，避免造成昂贵的延误。",
    seoWasteRecommended: "建议损耗百分比：",
    seoWasteSimple: "简单平板：5%",
    seoWasteWalls: "墙体和圆柱：7-10%",
    seoWasteComplex: "复杂结构：10-15%",
    
    seoGradesTitle: "不同标号混凝土的用途说明",
    seoGradeC10: "C10 - C15",
    seoGradeC10Desc: "低强度混凝土，用于非承重结构，例如：",
    seoGradeC10Use1: "基础垫层",
    seoGradeC10Use2: "大体积混凝土填充",
    seoGradeC10Use3: "非承重墙",
    seoGradeC20: "C20 - C25",
    seoGradeC20Desc: "中强度混凝土，用于一般建筑：",
    seoGradeC20Use1: "钢筋混凝土平板",
    seoGradeC20Use2: "梁和柱",
    seoGradeC20Use3: "车道和露台",
    seoGradeC30: "C30 - C40",
    seoGradeC30Desc: "高强度混凝土，用于重型应用：",
    seoGradeC30Use1: "高层建筑",
    seoGradeC30Use2: "桥梁桥面",
    seoGradeC30Use3: "工业地坪",
    
    seoHowManyBags: "需要多少袋混凝土？",
    seoBagsIntro: "计算需要多少袋混凝土是任何建筑项目的关键步骤。订购太少会面临延误和额外的运输成本，订购太多则会浪费金钱在未使用的材料上。我们的混凝土计算器通过根据您的具体项目需求提供准确估算，简化了这一过程。",
    seoBagsGuideTitle: "计算混凝土袋数的分步指南",
    seoBagsStep1Title: "确定混凝土结构的形状",
    seoBagsStep1Desc: "是平板、墙体、圆柱还是路缘石？每种形状有不同的体积公式。",
    seoBagsStep2Title: "测量尺寸",
    seoBagsStep2Desc: "所有测量使用一致的单位（米或英尺）。",
    seoBagsStep3Title: "计算体积",
    seoBagsStep3Desc: "应用适合您结构类型的公式。",
    seoBagsStep4Title: "添加损耗系数",
    seoBagsStep4Desc: "包括5-10%的额外量用于溢出、不平表面和应急情况。",
    seoBagsStep5Title: "转换为袋数",
    seoBagsStep5Desc: "将总重量除以袋重（20kg、25kg、40kg、40lb、60lb或80lb）。",
    
    seoBagSizesTitle: "常见袋尺寸和覆盖范围",
    seoBagSize: "袋尺寸",
    seoBagVolumeM3: "每袋体积 (m³)",
    seoBagVolumeFt3: "每袋体积 (ft³)",
    seoBagUses: "典型用途",
    seoBag20kgUse: "小型维修、DIY项目",
    seoBag25kgUse: "一般建筑、平板",
    seoBag40kgUse: "大型项目、专业用途",
    seoBag40lbUse: "小型工作、维修（美国）",
    seoBag60lbUse: "中型项目（美国）",
    seoBag80lbUse: "大型项目、专业用途（美国）",
    
    seoTipsTitle: "订购混凝土的提示",
    seoTipRoundUp: "向上取整：始终向上取整到最近的整袋。不能购买半袋混凝土。",
    seoTipReadyMix: "考虑预拌混凝土：对于大型项目（超过10m³），卡车运送的预拌混凝土通常更具成本效益。",
    seoTipDelivery: "检查最低配送量：许多供应商有最低订购数量要求。",
    seoTipWeather: "计划天气：混凝土浇筑依赖天气。为雨天或极端温度准备备用计划。",
    seoConclusion: "遵循这些指南并使用我们的混凝土计算器，您可以确保为项目订购正确数量的混凝土，节省时间和金钱，避免昂贵的错误。",
    
    columnDesignTitle: "钢筋混凝土柱设计工具",
    columnDesignDesc: "设计矩形或圆形截面的钢筋混凝土柱",
    columnSelectSectionType: "选择截面类型",
    columnInputParams: "输入参数",
    columnResults: "计算结果",
    columnSectionType: "截面类型",
    columnAxialForce: "轴向力",
    columnBendingMoment: "弯矩",
    columnFc: "混凝土强度 (f'c)",
    columnFy: "钢筋强度 (fy)",
    columnClearHeight: "净高",
    columnKFactor: "计算长度系数 (k)",
    columnKFixed: "两端固定",
    columnKHinged: "两端铰接",
    columnKFree: "一端固定一端自由",
    columnCover: "混凝土保护层",
    columnBarDiameter: "钢筋直径",
    columnNumBars: "钢筋数量",
    columnSlendernessRatio: "长细比 (kl/r)",
    columnShortColumn: "短柱 (kl/r ≤ 100)",
    columnLongColumn: "长柱 (kl/r > 100)",
    columnEccentricity: "偏心距 (e = M/P)",
    columnReinforcementRatio: "配筋率",
    columnMinRatio: "最小配筋率 (ρmin)",
    columnMaxRatio: "最大配筋率 (ρmax)",
    columnRequiredRatio: "所需配筋率",
    columnSteelArea: "所需钢筋面积",
    columnRequiredBars: "所需钢筋数量",
    columnDesignCheck: "设计验算",
    columnCapacityRatio: "承载力利用率",
    columnCalculationSteps: "计算步骤",
    columnCrossSection: "截面图",
    columnEnterParams: "请输入计算参数",
    columnSmallEccentric: "小偏心受压",
    columnLargeEccentric: "大偏心受压",
    columnCurrent: "当前",
    columnMinReinforcementControlled: "由最小配筋率控制",
    columnInsufficientReinforcement: "配筋不足 - 需要增加钢筋数量",
    columnConcrete: "混凝土",
    columnRebar: "钢筋",
    columnCoverLabel: "保护层",
    columnWarningFc: "警告：混凝土强度应在10-100 MPa之间。",
    columnWarningFy: "警告：钢筋强度应在200-700 MPa之间。",
    columnWarningDimensions: "警告：柱尺寸应至少为150mm。",
    columnWarningDiameter: "警告：柱直径应至少为200mm。",
    columnWarningReinforcementInsufficient: "钢筋净距太小",
    columnWarningSectionTooSmall: "截面尺寸太小",
    columnPMInteractionDiagram: "P-M相互作用图",
    columnPMTitle: "P-M相互作用图 (ACI 318)",
    columnPMXAxis: "轴向力 P (kN)",
    columnPMYAxis: "弯矩 M (kNm)",
    columnPMInteractionCurve: "相互作用曲线",
    columnPMCurrentPoint: "当前 (P,M)",
    columnFailedSectionCapacity: "FAILED: 截面承载力超限",
    columnFailedSectionCapacityDesc: "施加的荷载（P={P} kN, M={M} kNm）超过了截面最大配筋（8%）时的承载能力。请考虑增大柱截面尺寸或提高材料强度。",
    columnFailedInsufficientReinforcement: "FAILED: 配筋不足",
    columnBarUnit: "根",
    columnWarningSectionTooSmallDesc: "所需配筋率超过8%。请考虑增大柱截面尺寸。",
    columnPass: "通过",
    columnMarginal: "边缘",
    columnFail: "失败",
    columnRectangular: "矩形",
    columnCircular: "圆形",
    columnDesignResults: "柱设计结果",
    columnDimensions: "尺寸",
    columnDiameter: "直径",
    columnConcreteStrength: "混凝土强度",
    columnSteelStrength: "钢筋强度",
    columnRequiredReinforcement: "所需配筋率",
    columnRequiredSteelArea: "所需钢筋面积",
    columnPreset: "预设",
    columnGeneratePDF: "生成PDF报告",
    columnGeneratingPDF: "生成中...",
    
    columnSeoTitle: "钢筋混凝土柱设计：长细比与偏心受压详解",
    
    columnSeoContent1: "钢筋混凝土柱设计是结构工程的基本内容，需要仔细考虑多个关键因素。柱是主要承受轴向压力的竖向结构构件，但同时也必须能够抵抗弯矩、剪力和可能的屈曲。在本综合指南中，我们将探讨钢筋混凝土柱设计的关键概念，特别关注长细比和偏心受压。",
    
    columnSeoContent2: "**什么是钢筋混凝土柱？**",
    
    columnSeoContent3: "钢筋混凝土柱是将梁和板的荷载传递到基础的结构构件。与钢柱不同，钢筋混凝土柱结合了混凝土的抗压强度和钢筋的抗拉强度。混凝土承受压力，而钢筋提供抗拉强度并防止脆性破坏。由于其耐久性、耐火性和成本效益，钢筋混凝土柱广泛应用于建筑、桥梁和其他结构中。",
    
    columnSeoContent4: "**长细比：关键参数**",
    
    columnSeoContent5: "长细比是柱设计中最重要的参数之一。它定义为柱的计算长度与回转半径之比（kl/r）。这个比率决定了柱是因压碎而破坏（短柱）还是因屈曲而破坏（长柱）。",
    
    columnSeoContent6: "**理解计算长度（kl）**",
    
    columnSeoContent7: "计算长度系数（k）考虑了柱的端部约束条件。不同的支撑条件会产生不同的计算长度：\n\n- **k = 0.5**：两端固定（限制转动和横向移动）\n- **k = 1.0**：两端铰接（可自由转动但限制横向移动）\n- **k = 1.5**：一端固定，一端自由（悬臂柱）\n- **k = 1.0 - 1.2**：一端固定，一端铰接",
    
    columnSeoContent8: "**回转半径（r）**",
    
    columnSeoContent9: "回转半径是衡量截面面积相对于形心分布距离的指标。计算公式为 r = √(I/A)，其中 I 是惯性矩，A 是截面积。对于尺寸为 b × h 的矩形截面，强轴的回转半径为 r = h/√12，弱轴为 r = b/√12。对于直径为 d 的圆形截面，r = d/√16。",
    
    columnSeoContent10: "**短柱与长柱**",
    
    columnSeoContent11: "根据长细比，柱可分为：\n\n- **短柱**：kl/r ≤ 100（ACI 318限值）。当轴向荷载超过混凝土和钢筋的抗压强度时，这类柱会因压碎而破坏。长细比效应可忽略不计。\n\n- **长柱**：kl/r > 100。这类柱在达到压碎强度之前就会因屈曲而破坏。长细比越高，由于横向失稳，允许的轴向荷载越低。\n\n- **中长柱**：介于短柱和长柱之间，同时经历材料破坏和稳定性破坏模式。",
    
    columnSeoContent12: "**偏心受压：轴向荷载与弯矩组合**",
    
    columnSeoContent13: "在大多数实际应用中，柱同时承受轴向压力和弯矩。这被称为偏心受压。偏心距（e）是柱形心到轴向荷载作用点的距离，计算公式为 e = M/P，其中 M 是弯矩，P 是轴向荷载。",
    
    columnSeoContent14: "**偏心荷载类型**",
    
    columnSeoContent15: "偏心受压可分为两种类型：\n\n1. **单向偏心**：荷载仅相对于一个轴偏心，导致单向弯曲。这在单侧支撑梁的柱中很常见。\n\n2. **双向偏心**：荷载相对于两个轴都偏心，导致两个垂直方向的弯曲。这发生在角柱或非对称荷载的柱中。\n\n**偏心受压设计要点：**\n\n- **相互作用图**：该图显示了给定柱截面的轴向承载力（φPn）和抗弯承载力（φMn）之间的关系。它有助于确定柱是否能够抵抗组合荷载。\n\n- **中和轴深度**：中和轴的位置决定了截面是受压控制还是受拉控制破坏。\n\n- **最小偏心距**：即使对于名义上的中心荷载，规范要求也规定了最小偏心距，以考虑偶然缺陷和施工偏差。\n\n**ACI 318柱设计规定：**\n\nACI 318《结构混凝土建筑规范要求》提供了钢筋混凝土柱设计的全面指南：\n\n- **配筋率**：普通箍筋柱的ρmin = 1%，ρmax = 8%；螺旋箍筋柱的ρmin = 0.8%。\n\n- **纵向钢筋**：矩形柱至少需要4根钢筋，圆形柱至少需要6根钢筋。\n\n- **横向钢筋**：必须设置箍筋或螺旋筋以防止纵向钢筋屈曲。\n\n- **长细比效应**：对于 kl/r > 22 的柱，必须对轴向承载力应用长细折减系数。\n\n**Eurocode 2规定：**\n\nEurocode 2采用类似的方法，但长细比限值不同：\n\n- **短柱**：λ ≤ 15（矩形截面）或 λ ≤ 18（圆形截面）\n- **长柱**：λ > 上述限值，需要二阶分析\n\n**钢筋混凝土柱设计步骤：**\n\n1. 确定设计荷载（轴向力和弯矩）\n2. 选择柱尺寸和材料特性\n3. 计算长细比并分类柱类型\n4. 进行轴向荷载和弯矩组合的强度计算\n5. 检查最小和最大配筋率\n6. 设计横向钢筋（箍筋/螺旋筋）\n7. 验证挠度和稳定性要求\n\n**常见破坏模式：**\n\n- **压碎破坏**：发生在短柱中，当混凝土达到抗压强度时。\n- **屈曲破坏**：发生在长柱中，由于横向失稳。\n- **弯曲破坏**：当弯矩超过抗弯承载力时发生，导致钢筋受拉破坏。\n- **剪切破坏**：当剪力超过抗剪承载力时发生，通常在短而重载的柱中。\n\n**柱设计实用技巧：**\n\n- 对于长细比较高的柱，使用较大的截面尺寸以减小 kl/r。\n- 提供足够的横向支撑以减小计算长度。\n- 对圆形柱使用螺旋箍筋以提高延性。\n- 即使对于中心荷载，也要考虑最小偏心距要求。\n- 验证轴向荷载和弯矩组合的相互作用图。\n\n**结论：**\n\n钢筋混凝土柱设计是结构工程中复杂但必不可少的内容。理解长细比和偏心受压对于设计安全高效的柱至关重要。通过遵循适当的设计规范并考虑所有相关因素，工程师可以创建在各种荷载条件下可靠运行的柱。我们的钢筋混凝土柱设计工具通过提供基于ACI 318标准的即时计算，简化了这一过程，帮助您快速准确地设计柱。"
  },
  ja: {
    title: "土木工学ツール",
    description: "専門的な土木工学計算ツール",
    privacyPolicy: "プライバシーポリシー",
    termsOfService: "利用規約",
    about: "私たちについて",
    contact: "お問い合わせ",
    home: "ホーム",
    
    privacyPageTitle: "プライバシーポリシー",
    privacyLastUpdated: "最終更新日：2024年7月1日",
    privacyIntro: "本プライバシーポリシーは、当ウェブサイトおよびサービスをご訪問またはご利用いただく際に、お客様の情報をどのように収集、使用、開示するかを説明します。当ウェブサイトをご利用いただくことで、本ポリシーに従った情報の収集および使用に同意されたものとみなします。",
    privacyInformationCollection: "当社は以下の種類の情報を収集する場合があります：",
    privacyHowWeUse: "収集した情報は以下の目的で使用します：",
    privacyGoogleAdSenseTitle: "Google AdSense",
    privacyGoogleAdSense: "当ウェブサイトでは、広告表示のためにGoogle AdSenseを使用しています。Google AdSenseは、お客様の興味のある商品やサービスに関するターゲティング広告を提供するために、本サイトおよび他のウェブサイトへのアクセス情報を収集する場合があります。Google AdSenseはこの情報を収集するためにクッキーおよびその他の追跡技術を使用します。Googleのプライバシー慣行およびオプトアウト方法の詳細については、Googleのプライバシーポリシーをご覧ください。",
    privacyCookiesTitle: "クッキー",
    privacyCookies: "当社は、お客様のウェブサイトでの体験を向上させるためにクッキーを使用しています。クッキーはお客様のデバイスに保存される小さなデータファイルです。ブラウザの設定でクッキーを無効にすることができますが、これにより当ウェブサイトの機能に影響が生じる場合があります。",
    privacyGDPRTitle: "GDPR コンプライアンス",
    privacyGDPR: "欧州経済領域（EEA）のユーザーに対して、当社は一般データ保護規則（GDPR）に準拠しています。お客様は個人情報へのアクセス、訂正、削除の権利を有しています。これらの権利を行使するには、以下に記載のメールアドレスまでお問い合わせください。",
    privacyCCPATitle: "CCPA コンプライアンス",
    privacyCCPA: "カリフォルニア州のユーザーに対して、当社はカリフォルニア消費者プライバシー法（CCPA）に準拠しています。お客様は個人情報の販売をオプトアウトする権利を有しています。この権利を行使するには、以下に記載のメールアドレスまでお問い合わせください。",
    privacyDataSecurityTitle: "データセキュリティ",
    privacyDataSecurity: "当社は、お客様の情報が未承認のアクセス、使用、または開示から保護されるよう合理的な措置を講じています。ただし、インターネット経由の送信または電子的な保存方法は100％安全ではありません。",
    privacyChangesTitle: "本ポリシーの変更",
    privacyChanges: "当社は随時本プライバシーポリシーを更新する場合があります。変更があった場合、新しいプライバシーポリシーを本ページに掲載することでお知らせします。",
    privacyContactTitle: "お問い合わせ",
    privacyContact: "本プライバシーポリシーに関するご質問や懸念がある場合は、contact@useciviltools.comまでお問い合わせください。",
    privacyInfoPersonal: "個人識別情報（氏名、メールアドレス等）",
    privacyInfoUsage: "使用データ（訪問ページ、滞在時間等）",
    privacyInfoDevice: "デバイス情報（ブラウザタイプ、IPアドレス等）",
    privacyUseProvide: "サービスの提供と維持",
    privacyUseImprove: "体験の改善と個別化",
    privacyUseCommunicate: "お客様との連絡",
    privacyUseAdvertise: "ターゲティング広告の表示",
    
    termsPageTitle: "利用規約",
    termsLastUpdated: "最終更新日：2024年7月1日",
    termsIntro: "本利用規約は、当ウェブサイトおよびサービスのご利用を規律します。当ウェブサイトにアクセスまたはご利用いただくことで、これらの規約に拘束されることに同意されたものとみなします。",
    termsAcceptance: "規約の承認：当ウェブサイトをご利用いただくことで、お客様は本利用規約およびプライバシーポリシーを読み、理解し、拘束されることに同意したものとみなします。",
    termsToolUse: "ツールの使用：当ウェブサイトで提供されるツールは、情報提供および教育目的のみに使用されます。これらは土木工学計算を支援するために設計されていますが、工学的判断の唯一の根拠として依存すべきではありません。",
    termsDisclaimer: "免責事項：当社のツールによって提供される計算は参考情報としてのみ提供されます。当社は結果の正確性、完全性、または信頼性に関して一切保証または保証を行いません。ユーザーは、すべての計算を検証し、工学的判断を下す前に資格のある工学専門家に相談する責任があります。",
    termsAccuracy: "正確性：当社は正確な計算を提供するよう努めていますが、エラーが発生する可能性があります。当社は、当社のツールの使用に起因するいかなる損害または損失に対しても責任を負いません。",
    termsLimitation: "責任の制限：いかなる場合においても、当社は当ウェブサイトまたはツールの使用に起因する直接的、間接的、偶発的、特別的、または結果的な損害に対して責任を負いません。",
    termsIntellectual: "知的財産：当ウェブサイト上のすべてのコンテンツ（テキスト、グラフィックス、ソフトウェアを含む）は当社または当社のライセンサーの財産であり、著作権法によって保護されています。",
    termsModifications: "変更：当社は通知なしにいつでも当ウェブサイトまたはサービスを変更または中止する権利を留保します。",
    termsTermination: "終了：当社は理由または通知なしに、いつでもお客様の当ウェブサイトへのアクセスを終了または一時停止することができます。",
    termsGoverning: "準拠法：本規約は米国の法律に準拠し解釈されます。",
    
    aboutPageTitle: "私たちについて",
    aboutIntro: "土木工学ツールへようこそ - プロフェッショナルな土木工学計算のための信頼できるパートナーです。",
    aboutTeam: "私たちのストーリー",
    aboutMission: "私たちの使命は、土木技師や学生に強力で正確かつ使いやすい計算ツールを提供し、複雑な工学タスクを簡素化することです。",
    aboutExperienceTitle: "私たちの経験",
    aboutExperience: "土木工学における合計20年以上の経験を持つ私たちのチームは、エンジニアが毎日直面する課題を深く理解しています。私たちは世界中の主要なインフラプロジェクトに携わってきました。",
    aboutTechnologyTitle: "技術",
    aboutTechnology: "私たちは最先端のウェブ技術を活用して、強力かつアクセスしやすいツールを提供しています。私たちのツールは、直感的なインターフェースと包括的な計算機能を備えた、現代のエンジニアのために設計されています。",
    aboutCommitmentTitle: "私たちの約束",
    aboutCommitment: "私たちは継続的な改善と革新に取り組んでいます。ユーザーのフィードバックと最新の工学基準に基づいて、ツールを定期的に更新しています。",
    aboutQuote: "工学は単に構造物を建てることではありません。より良い世界を建設することです。私たちは、エンジニアが情報に基づいた意思決定を行い、将来の世代のために安全で持続可能なインフラストラクチャを創造することを可能にするツールを提供することに専念しています。",
    
    contactPageTitle: "お問い合わせ",
    contactName: "お名前",
    contactEmail: "メールアドレス",
    contactMessage: "メッセージ",
    contactSubmit: "送信",
    contactSuccess: "ありがとうございます！メッセージが正常に送信されました。",
    contactRequired: "このフィールドは必須です",
    
    cookieBannerTitle: "クッキーの同意",
    cookieBannerText: "当ウェブサイトでの体験を向上させるためにクッキーを使用しています。当サイトの利用を続けることで、クッキーの使用に同意されたものとみなします。",
    cookieAccept: "同意する",
    cookieReject: "拒否する",
    
    language: "言語",
    
    seoTitle: "究極の土木工学ツールスイート",
    seoDescription: "構造解析、断面特性、梁設計などの専門的な土木工学計算ツール。",
    seoContent: "UseCivilTools.comへようこそ、構造解析および設計ワークフローを効率化するために設計されたプロフェッショナルな土木工学計算ツールの包括的なスイートです。複雑なインフラプロジェクトに取り組む経験豊富な土木技師であろうと、構造力学の基礎を学ぶ学生であろうと、私たちのプラットフォームは正確で信頼性が高く使いやすい計算ソリューションを提供します。\n\n私たちの断面計算ツールを使用すると、矩形、円形、I型梁、チャンネル、アングル、カスタム複合断面などのさまざまな形状の断面特性をすばやく計算できます。面積、重心、慣性モーメント、断面係数、および回転半径を正確に計算します。\n\nUseCivilTools.comは、合計20年以上の業界経験を持つ経験豊富な土木技師チームによって構築されており、AISC、Eurocode、GB標準などの最新の工学基準に準拠しています。私たちは工学計算の重要性を理解しており、情報に基づいた意思決定を支援するためにツールを設計しました。\n\n主力製品である断面計算ツールに加えて、梁解析、柱設計、スラブ設計、基礎設計、擁壁解析ツールを含むツールセットを継続的に拡張しています。各ツールは、同じ精度と使いやすさへの取り組みで開発されています。\n\n今日から工学計算を開始し、プロフェッショナルグレードのツールがワークフローにもたらす違いを体験してください。",
    
    toolSectionTitle: "断面計算",
    toolSectionDesc: "さまざまな形状の断面特性を計算",
    toolBeamTitle: "梁解析",
    toolBeamDesc: "梁のたわみと応力を解析",
    toolColumnTitle: "柱設計",
    toolColumnDesc: "基準に従って柱を設計",
    toolSlabTitle: "スラブ設計",
    toolSlabDesc: "スラブの厚さと鉄筋を計算",
    toolFoundationTitle: "基礎設計",
    toolFoundationDesc: "フーチングと基礎を設計",
    toolRetainingTitle: "擁壁",
    toolRetainingDesc: "擁壁の設計と解析",
    
    gettingStarted: "始め方",
    step1: "上記のグリッドから計算ツールを選択",
    step2: "必要なパラメータを入力",
    step3: "計算をクリックして結果を取得",
    step4: "コピーボタンを使用して結果をエクスポート",
    
    comingSoon: "近日公開",
    
    sectionSelectType: "断面タイプを選択",
    sectionInputParams: "入力パラメータ",
    sectionResults: "計算結果",
    sectionCopyResults: "結果をコピー",
    sectionCopied: "コピーしました！",
    sectionEnterParams: "計算するパラメータを入力してください",
    
    shapeRectangle: "矩形",
    shapeCircle: "円形",
    shapeIbeam: "I形鋼",
    shapeChannel: "チャンネル形鋼",
    shapeAngle: "山形鋼",
    
    paramWidth: "幅",
    paramHeight: "高さ",
    paramDiameter: "直径",
    paramTopFlangeWidth: "上部フランジ幅",
    paramTopFlangeThickness: "上部フランジ厚さ",
    paramBottomFlangeWidth: "下部フランジ幅",
    paramBottomFlangeThickness: "下部フランジ厚さ",
    paramWebHeight: "ウェブ高さ",
    paramWebThickness: "ウェブ厚さ",
    paramFlangeWidth: "フランジ幅",
    paramFlangeThickness: "フランジ厚さ",
    paramLegWidth1: "脚1幅",
    paramLegThickness1: "脚1厚さ",
    paramLegWidth2: "脚2幅",
    paramLegThickness2: "脚2厚さ",
    
    resultArea: "面積",
    resultCentroidX: "重心 X",
    resultCentroidY: "重心 Y",
    resultIx: "慣性モーメント X",
    resultIy: "慣性モーメント Y",
    resultSx: "断面係数 X",
    resultSy: "断面係数 Y",
    resultRx: "回転半径 X",
    resultRy: "回転半径 Y",
    
    unitMm: "mm",
    unitMm2: "mm²",
    unitMm3: "mm³",
    unitMm4: "mm⁴",
    
    symbolIx: "Iₓ (慣性モーメント / Moment of Inertia)",
    symbolIy: "Iᵧ (慣性モーメント / Moment of Inertia)",
    symbolSx: "Sₓ (断面係数 / Section Modulus)",
    symbolSy: "Sᵧ (断面係数 / Section Modulus)",
    symbolRx: "rₓ (回転半径 / Radius of Gyration)",
    symbolRy: "rᵧ (回転半径 / Radius of Gyration)",
    
    sectionSeoTitle: "断面特性計算 - 土木工学ツール",
    sectionSeoContent: "当社の断面特性計算ツールは、土木技師、構造設計者、工学学生にとって不可欠なツールです。この強力な計算ツールを使用すると、矩形、円形、I形鋼、チャンネル形鋼、山形鋼などのさまざまな構造形状の重要な断面特性を迅速かつ正確に計算できます。\n\n**なぜ当社の断面計算ツールを使用するのですか？**\n\n断面特性は、構造解析と設計の基礎です。慣性モーメント（I）、断面係数（S）、回転半径（r）は、構造物の曲げ、せん断、軸力に対する抵抗力を決定する重要なパラメータです。当社の計算ツールは、信頼できる即時かつ正確な結果を提供します。\n\n**主な機能：**\n\n1. **複数の断面タイプ**：矩形、円形、I形鋼、チャンネル形鋼、山形鋼など、土木工学で最も一般的に使用される形状の特性を計算します。\n\n2. **包括的な結果**：すべての基本的な断面特性を1か所で取得：面積、重心座標、慣性モーメント（Iₓ, Iᵧ）、断面係数（Sₓ, Sᵧ）、回転半径（rₓ, rᵧ）。\n\n3. **リアルタイム計算**：パラメータを入力すると即座に結果が表示されるため、異なる寸法を試したり、設計案を比較したりするのが簡単です。\n\n4. **結果をコピー**：計算結果を1クリックですばやくエクスポートし、ドキュメント記録またはさらなる分析に使用します。\n\n**断面特性の理解：**\n\n- **面積（A）**：断面の横断面積。使用される材料の量を決定し、部材の軸力抵抗能力に影響します。\n\n- **重心（Cₓ, Cᵧ）**：断面の幾何学的中心。曲げ時の中立軸を決定し、正しい軸に関する慣性モーメントを計算するために重要です。\n\n- **慣性モーメント（Iₓ, Iᵧ）**：断面のx軸またはy軸周りの曲げ抵抗の尺度。慣性モーメントが大きいほど、剛性とたわみ抵抗が大きくなります。\n\n- **断面係数（Sₓ, Sᵧ）**：I/cとして計算され、cは重心から最遠繊維までの距離です。このパラメータは、部材の曲げ応力を決定するために使用されます。\n\n- **回転半径（rₓ, rᵧ）**：重心に対する面積の分布度合いの尺度。柱設計において細長比と座屈抵抗を決定するために使用されます。\n\n**工学的応用：**\n\n当社の断面計算ツールは、世界中のエンジニアによって次の用途に使用されています：\n\n- 梁の設計と解析\n- 軸力および曲げ荷重を受ける柱の設計\n- トラス部材の寸法決定\n- 板の設計\n- 合成断面の解析\n- 鋼構造および鉄筋コンクリートの設計\n\n**使用される公式：**\n\n幅b、高さhの矩形について：\n- 面積：A = b × h\n- X軸周りの慣性モーメント：Iₓ = (b × h³) / 12\n- Y軸周りの慣性モーメント：Iᵧ = (h × b³) / 12\n- 断面係数：S = I / (h/2)\n- 回転半径：r = √(I/A)\n\n直径dの円形について：\n- 面積：A = π × (d/2)²\n- 慣性モーメント：I = π × (d/2)⁴ / 4\n\nI形鋼、チャンネル形鋼、山形鋼などの組立断面については、平行軸の定理を使用して各構成要素の複合特性を計算します。\n\n**エンジニアによって作成され、エンジニアのために：**\n\nUseCivilTools.comでは、土木工学における正確で信頼性の高い計算の重要性を理解しています。経験豊富なエンジニアチームが、最高水準の精度と使いやすさを満たすようにこのツールを設計しました。小規模な住宅プロジェクトであろうと、大規模なインフラ開発であろうと、当社の断面計算ツールは、賢明な設計決定を行うのに役立ちます。\n\n今日から断面特性の計算を開始し、プロフェッショナルグレードの工学ツールの強力な機能を体験してください。",
    sectionFormulas: "公式と参考",
    
    beamSupportType: "支持条件",
    beamLoadType: "荷重タイプ",
    beamInputParams: "入力パラメータ",
    beamResults: "計算結果",
    beamDiagrams: "線図",
    beamCopyResults: "結果をコピー",
    beamCopied: "コピーしました！",
    beamExport: "エクスポート",
    beamPrint: "印刷",
    
    supportBothHinged: "両端ヒンジ",
    supportBothFixed: "両端固定",
    supportHingedFixed: "ヒンジ－固定",
    
    loadUniform: "一様荷重",
    loadPoint: "集中荷重",
    loadDistributed: "分布荷重",
    
    paramSpanLength: "スパン長",
    paramLoadValue: "荷重値",
    paramLoadPosition: "荷重位置",
    paramElasticModulus: "弾性係数",
    paramMomentInertia: "慣性モーメント",
    
    resultReactionA: "支持反力 A",
    resultReactionB: "支持反力 B",
    resultShearMax: "最大せん断力",
    resultMomentMax: "最大曲げモーメント",
    resultDeflectionMax: "最大たわみ",
    
    symbolV: "V (せん断力 / Shear Force)",
    symbolM: "M (曲げモーメント / Bending Moment)",
    symbolDelta: "δ (たわみ / Deflection)",
    
    shearDiagram: "せん断力線図",
    momentDiagram: "曲げモーメント線図",
    deflectionDiagram: "たわみ線図",
    
    unitKN: "kN",
    unitKnm: "kN·m",
    unitNmm2: "N/mm²",
    unitKnm2: "kN·m²",
    
    beamSeoTitle: "梁解析ツール - 土木工学構造解析",
    beamSeoContent: "当社の梁解析ツールは、土木技師、建築家、工学学生のための包括的な構造解析ソリューションです。この強力なツールを使用すると、さまざまな支持条件と荷重シナリオの下でのさまざまな梁構成を解析し、せん断力線図、曲げモーメント線図、たわみ線図、および重要な内部力値を含む詳細な結果を提供します。\n\n**なぜ当社の梁解析ツールを使用するのですか？**\n\n梁解析は構造工学の基本的な部分です。さまざまな荷重と支持条件下での梁の挙動を理解することは、安全で効率的な構造物を設計するために不可欠です。当社のツールは、エンジニアリングプロジェクトに使用できる正確で信頼性の高い結果を提供します。\n\n**主な機能：**\n\n1. **複数の支持条件**：両端ヒンジ、両端固定、またはヒンジと固定の組み合わせの梁を解析します。\n\n2. **柔軟な荷重オプション**：全スパンにわたる一様荷重、任意の位置の集中荷重、または部分的な分布荷重を適用します。\n\n3. **包括的な結果**：支持反力、せん断力線図、曲げモーメント線図、たわみ線図、および最大値を含む完全な解析結果を取得します。\n\n4. **リアルタイム解析**：パラメータを変更すると即座に結果が表示されるため、さまざまなシナリオを試すのが簡単です。\n\n5. **エクスポートと印刷**：結果をエクスポートしてドキュメントに使用するか、直接印刷します。\n\n**梁解析の理解：**\n\n- **支持反力**：平衡を維持するために支持体によって加えられる力。静力学平衡方程式（ΣF = 0、ΣM = 0）を使用して計算されます。\n\n- **せん断力（V）**：梁の断面をせん断する傾向のある内力。断面の左側（または右側）のすべての垂直力の代数和です。\n\n- **曲げモーメント（M）**：梁を曲げさせる内力矩。断面の左側（または右側）のすべてのモーメントの代数和です。\n\n- **たわみ（δ）**：荷重下での梁の垂直変位。材料特性（E）、断面特性（I）、スパン長、および荷重に依存します。\n\n**工学的応用：**\n\n当社の梁解析ツールは、世界中のエンジニアによって次の用途に使用されています：\n\n- 建物の床梁設計\n- 橋梁解析\n- 屋根構造設計\n- 片持ち梁解析\n- 連続梁設計\n- 鋼梁およびコンクリート梁設計\n\n**使用される公式：**\n\nスパンL、一様荷重wの単純支持梁（両端ヒンジ）の場合：\n- 支持反力：Rₐ = Rᵦ = wL/2\n- 最大せん断力：Vₘₐₓ = wL/2\n- 最大曲げモーメント：Mₘₐₓ = wL²/8\n- 中央の最大たわみ：δₘₐₓ = 5wL⁴/(384EI)\n\n中央集中荷重Pの単純支持梁の場合：\n- 支持反力：Rₐ = Rᵦ = P/2\n- 最大せん断力：Vₘₐₓ = P/2\n- 最大曲げモーメント：Mₘₐₓ = PL/4\n- 中央の最大たわみ：δₘₐₓ = PL³/(48EI)\n\n**エンジニアによって作成され、エンジニアのために：**\n\nUseCivilTools.comでは、土木工学における正確で信頼性の高い計算の重要性を理解しています。経験豊富なエンジニアチームが、最高水準の精度と使いやすさを満たすようにこのツールを設計しました。小規模な住宅プロジェクトであろうと、大規模なインフラ開発であろうと、当社の梁解析ツールは、賢明な設計決定を行うのに役立ちます。\n\n今日から梁を解析し、プロフェッショナルグレードのエンジニアリングツールの強力な機能を体験してください。",
    beamFormulas: "公式と参考",
    beamIntro: "梁解析ツールを使用すると、さまざまな荷重条件と支持構成下での梁の構造的挙動を解析できます。梁のパラメータを入力し、支持タイプと荷重タイプを選択すると、せん断力線図、曲げモーメント線図、たわみ計算を含む即時結果が表示されます。",
    beamHowToUse: "1. 使用可能なオプションから支持タイプを選択します（両端ヒンジ、両端固定、またはヒンジ－固定）。\n\n2. 荷重タイプを選択します（一様荷重または集中荷重）。\n\n3. 梁のパラメータ（スパン長、荷重値、荷重位置（集中荷重の場合））を入力します。\n\n4. たわみ計算のために弾性係数と慣性モーメントをオプションで入力します。\n\n5. 支持反力、せん断力線図、曲げモーメント線図、たわみ線図を含む結果を表示します。\n\n6. コピーボタンを使用して結果をエクスポートするか、印刷ボタンを使用して解析結果を印刷します。",
    beamNotes: "注：このツールは線形弾性挙動と小さなたわみを仮定しています。実際の設計に使用する前に、資格のあるエンジニアリング専門家によって検証されるべきです。計算は標準的な構造解析原理に従い、オイラー・ベルヌーイ梁理論に基づいています。",
    
    pdfExport: "プロフェッショナルPDFレポートをエクスポート",
    pdfReportTitle: "プロフェッショナル計算レポート",
    pdfInputParams: "入力パラメータ",
    pdfCalculationSteps: "計算ステップ",
    pdfResults: "結果",
    pdfGeneratedBy: "によって生成",
    pdfDate: "日付",
    
    backToHome: "ホームに戻る",
    results: "結果",
    toolConcreteTitle: "コンクリート体積計算機",
    toolConcreteDesc: "コンクリートの体積を計算し、必要な袋数を推定し、ロスを考慮する",
    concreteMode: "計算モード",
    concreteSlab: "スラブ/フーチング",
    concreteWall: "壁",
    concreteColumn: "柱/シリンダー",
    concreteCurb: "縁石/側溝",
    concreteQuantity: "数量",
    concreteWaste: "ロス率 %",
    concreteLength: "長さ",
    concreteWidth: "幅",
    concreteThickness: "厚さ",
    concreteHeight: "高さ",
    concreteDiameter: "直径",
    concreteSection: "断面寸法",
    concreteVolume: "体積",
    concreteTotalVolume: "総体積",
    concreteVolumeWithWaste: "ロスを含む体積",
    concreteUnitM3: "m³",
    concreteUnitFt3: "ft³",
    concreteBagEstimation: "袋数推定",
    concreteBagWeight: "袋の重さ",
    concreteBagsNeeded: "必要な袋数",
    concreteResultVolume: "総体積：",
    concreteResultBags: "推定袋数：",
    
    concreteSeoTitle: "コンクリート体積計算機 - コンクリートは何袋必要ですか？",
    concreteSeoContent: "当社のコンクリート体積計算機は、スラブ、壁、柱、縁石のコンクリート必要量を正確に推定するのに役立ちます。立方メートルまたは立方フィートで体積を計算し、ロスを考慮し、必要な袋数を決定します。",
    concreteFormulas: "公式と参考",
    concreteIntro: "コンクリート体積計算機は、建設関係者やDIY愛好家にとって必須のツールです。スラブ、基礎、壁、柱、縁石などのさまざまなコンクリート構造物の正確な体積計算を提供します。組み込みのロス推定と袋数計算機能により、プロジェクトに必要なコンクリートの量を正しく注文できます。",
    concreteHowToUse: "1. 計算モードを選択（スラブ/フーチング、壁、柱/シリンダー、または縁石/側溝）\n2. 構造物の寸法を入力\n3. 同じ構造物が複数ある場合は数量を指定\n4. ロス率を設定（通常5-10%）\n5. 推定に使用する袋の重量を選択\n6. 総体積と必要な袋数を含む結果を表示",
    concreteNotes: "注：コンクリートの体積計算には、こぼれ、不均一な表面、過剰掘削などを考慮するためのロス係数を含める必要があります。推奨されるロス率はプロジェクトの種類によって異なります：単純なスラブは5%、複雑な構造物は10%です。注文時には常に最寄りの袋数に切り上げてください。",
    
    seoHowCalculateVolume: "コンクリートの体積を計算する方法",
    seoSlabFooting: "スラブ/フーチング",
    seoWall: "壁",
    seoColumnCylinder: "柱/シリンダー",
    seoCurbGutter: "縁石/側溝",
    
    seoWhyWaste: "なぜロスを考慮する必要があるのか",
    seoWasteReason1: "こぼれ：打設と輸送中にコンクリートがこぼれることは避けられません。",
    seoWasteReason2: "不均一な表面：地面が完全に平らでない場合、所望の厚さを達成するために追加のコンクリートが必要になります。",
    seoWasteReason3: "過剰掘削：掘削領域は形状が不規則なため、計算よりも多くのコンクリートが必要になることがよくあります。",
    seoWasteReason4: "予備：追加のコンクリートを確保することで、不足による高価な遅延を避けることができます。",
    seoWasteRecommended: "推奨ロス率：",
    seoWasteSimple: "単純なスラブ：5%",
    seoWasteWalls: "壁と柱：7-10%",
    seoWasteComplex: "複雑な構造物：10-15%",
    
    seoGradesTitle: "コンクリートの種類と用途",
    seoGradeC10: "C10 - C15",
    seoGradeC10Desc: "低強度コンクリートで、非構造用途に使用されます：",
    seoGradeC10Use1: "基礎ベッド",
    seoGradeC10Use2: "マスコンクリート充填",
    seoGradeC10Use3: "非耐力壁",
    seoGradeC20: "C20 - C25",
    seoGradeC20Desc: "中強度コンクリートで、一般的な建設に使用されます：",
    seoGradeC20Use1: "鉄筋コンクリートスラブ",
    seoGradeC20Use2: "梁と柱",
    seoGradeC20Use3: "ドライブウェイとパティオ",
    seoGradeC30: "C30 - C40",
    seoGradeC30Desc: "高強度コンクリートで、重負荷用途に使用されます：",
    seoGradeC30Use1: "高層建築",
    seoGradeC30Use2: "橋梁床版",
    seoGradeC30Use3: "産業用床",
    
    seoHowManyBags: "コンクリートは何袋必要ですか？",
    seoBagsIntro: "必要なコンクリートの袋数を計算することは、どの建設プロジェクトにも重要なステップです。注文が少なすぎると遅延や追加の配送コストが発生し、多すぎると未使用の材料にお金を無駄にします。当社のコンクリート計算機は、お客様の具体的なプロジェクト要件に基づいて正確な見積もりを提供することで、このプロセスを簡素化します。",
    seoBagsGuideTitle: "コンクリート袋数の計算方法（ステップバイステップ）",
    seoBagsStep1Title: "コンクリート構造物の形状を決定する",
    seoBagsStep1Desc: "スラブ、壁、柱、それとも縁石ですか？各形状には異なる体積式があります。",
    seoBagsStep2Title: "寸法を測定する",
    seoBagsStep2Desc: "すべての測定に統一した単位（メートルまたはフィート）を使用してください。",
    seoBagsStep3Title: "体積を計算する",
    seoBagsStep3Desc: "構造物のタイプに合った適切な式を適用します。",
    seoBagsStep4Title: "ロス係数を追加する",
    seoBagsStep4Desc: "こぼれ、不均一な表面、予備のために5-10%の余裕を含めます。",
    seoBagsStep5Title: "袋数に変換する",
    seoBagsStep5Desc: "総重量を袋の重量（20kg、25kg、40kg、40lb、60lb、または80lb）で割ります。",
    
    seoBagSizesTitle: "一般的な袋のサイズとカバレッジ",
    seoBagSize: "袋のサイズ",
    seoBagVolumeM3: "1袋あたりの体積 (m³)",
    seoBagVolumeFt3: "1袋あたりの体積 (ft³)",
    seoBagUses: "一般的な用途",
    seoBag20kgUse: "小規模修理、DIYプロジェクト",
    seoBag25kgUse: "一般的な建設、スラブ",
    seoBag40kgUse: "大規模プロジェクト、プロ用",
    seoBag40lbUse: "小規模作業、修理（米国）",
    seoBag60lbUse: "中規模プロジェクト（米国）",
    seoBag80lbUse: "大規模プロジェクト、プロ用（米国）",
    
    seoTipsTitle: "コンクリート注文のヒント",
    seoTipRoundUp: "切り上げ：常に最寄りの袋数に切り上げてください。半袋は購入できません。",
    seoTipReadyMix: "レディーミックスを検討：大規模プロジェクト（10m³を超える）の場合、トラックで配送されるレディーミックスコンクリートの方がコスト効率が高いことが多いです。",
    seoTipDelivery: "配送の最低注文量を確認：多くの供給業者には最低注文量があります。",
    seoTipWeather: "天候を計画：コンクリートの打設は天候に左右されます。雨や極端な温度に備えて予備計画を立ててください。",
    seoConclusion: "これらのガイドラインに従い、当社のコンクリート計算機を使用することで、プロジェクトに必要なコンクリートの量を正しく注文でき、時間とお金を節約し、高価なミスを回避できます。",
    
    columnDesignTitle: "鉄筋コンクリート柱設計ツール",
    columnDesignDesc: "矩形または円形断面の鉄筋コンクリート柱を設計",
    columnInputParams: "入力パラメータ",
    columnResults: "計算結果",
    columnSectionType: "断面タイプ",
    columnAxialForce: "軸力",
    columnBendingMoment: "曲げモーメント",
    columnFc: "コンクリート強度 (f'c)",
    columnFy: "鉄筋強度 (fy)",
    columnClearHeight: "有効高さ",
    columnKFactor: "有効長さ係数 (k)",
    columnKFixed: "両端固定",
    columnKHinged: "両端ヒンジ",
    columnKFree: "片端固定片端自由",
    columnCover: "かぶり",
    columnBarDiameter: "鉄筋径",
    columnNumBars: "鉄筋本数",
    columnSlendernessRatio: "細長比 (kl/r)",
    columnShortColumn: "短柱 (kl/r ≤ 100)",
    columnLongColumn: "長柱 (kl/r > 100)",
    columnEccentricity: "偏心距離 (e = M/P)",
    columnReinforcementRatio: "鉄筋比",
    columnMinRatio: "最小鉄筋比 (ρmin)",
    columnMaxRatio: "最大鉄筋比 (ρmax)",
    columnRequiredRatio: "必要鉄筋比",
    columnSteelArea: "必要鉄筋面積",
    columnRequiredBars: "必要鉄筋本数",
    columnDesignCheck: "設計検証",
    columnCapacityRatio: "耐力利用率",
    columnCalculationSteps: "計算ステップ",
    columnCrossSection: "断面図",
    columnEnterParams: "計算パラメータを入力してください",
    columnSelectSectionType: "断面タイプの選択",
    columnSmallEccentric: "小偏心圧縮",
    columnLargeEccentric: "大偏心圧縮",
    columnCurrent: "現在",
    columnMinReinforcementControlled: "最小鉄筋比による制御",
    columnInsufficientReinforcement: "鉄筋不足 - 鉄筋本数の増加が必要",
    columnConcrete: "コンクリート",
    columnRebar: "鉄筋",
    columnCoverLabel: "かぶり",
    columnWarningFc: "警告：コンクリート強度は10-100 MPaの範囲内である必要があります。",
    columnWarningFy: "警告：鉄筋強度は200-700 MPaの範囲内である必要があります。",
    columnWarningDimensions: "警告：柱寸法は少なくとも150mm必要です。",
    columnWarningDiameter: "警告：柱直径は少なくとも200mm必要です。",
    columnWarningReinforcementInsufficient: "鉄筋間隔が小さすぎます",
    columnWarningSectionTooSmall: "断面寸法が小さすぎます",
    columnPMInteractionDiagram: "P-M相互作用図",
    columnPMTitle: "P-M相互作用図 (ACI 318)",
    columnPMXAxis: "軸力 P (kN)",
    columnPMYAxis: "曲げモーメント M (kNm)",
    columnPMInteractionCurve: "相互作用曲線",
    columnPMCurrentPoint: "現在 (P,M)",
    columnFailedSectionCapacity: "FAILED: 断面耐力超過",
    columnFailedSectionCapacityDesc: "作用する荷重（P={P} kN, M={M} kNm）は、最大鉄筋量（8%）でも断面耐力を超えています。柱寸法の増大または材料強度の向上を検討してください。",
    columnFailedInsufficientReinforcement: "FAILED: 鉄筋不足",
    columnBarUnit: "本",
    columnWarningSectionTooSmallDesc: "必要鉄筋比が8%を超えています。柱寸法の増大を検討してください。",
    columnPass: "合格",
    columnMarginal: "限界",
    columnFail: "不合格",
    columnRectangular: "矩形",
    columnCircular: "円形",
    columnDesignResults: "柱設計結果",
    columnDimensions: "寸法",
    columnDiameter: "直径",
    columnConcreteStrength: "コンクリート強度",
    columnSteelStrength: "鉄筋強度",
    columnRequiredReinforcement: "必要鉄筋比",
    columnRequiredSteelArea: "必要鉄筋面積",
    columnPreset: "プリセット",
    columnGeneratePDF: "PDFレポートを生成",
    columnGeneratingPDF: "生成中...",
    
    columnSeoTitle: "RC柱設計：細長比と偏心圧縮の理解",
    
    columnSeoContent1: "鉄筋コンクリート（RC）柱の設計は、構造工学の基本的な側面であり、いくつかの重要な要素を慎重に考慮する必要があります。柱は主に軸方向の圧縮荷重を負担する鉛直構造部材ですが、曲げモーメント、せん断力、および潜在的な座屈にも抵抗できるように設計する必要があります。この包括的なガイドでは、RC柱設計の主要な概念を探り、特に細長比と偏心圧縮に焦点を当てます。",
    
    columnSeoContent2: "**鉄筋コンクリート柱とは何ですか？**",
    
    columnSeoContent3: "鉄筋コンクリート柱は、梁やスラブからの荷重を基礎に伝達する構造要素です。鋼柱とは異なり、RC柱はコンクリートの圧縮強度と鉄筋の引張強度を組み合わせています。コンクリートが圧縮力を負担し、鉄筋が引張強度を提供して脆性破壊を防ぎます。耐久性、耐火性、コスト効率のため、RC柱は建物、橋梁、その他の構造物に広く使用されています。",
    
    columnSeoContent4: "**細長比：重要なパラメータ**",
    
    columnSeoContent5: "細長比は柱設計において最も重要なパラメータの1つです。柱の有効長さと回転半径の比（kl/r）として定義されます。この比は、柱がつぶれによって破壊する（短柱）か、座屈によって破壊する（長柱）かを決定します。",
    
    columnSeoContent6: "**有効長さ（kl）の理解**",
    
    columnSeoContent7: "有効長さ係数（k）は柱の端部条件を考慮します。異なる支持条件は異なる有効長さをもたらします：\n\n- **k = 0.5**：両端固定（回転と横方向の移動が制限される）\n- **k = 1.0**：両端ヒンジ（自由に回転するが横方向の移動は制限される）\n- **k = 1.5**：片端固定、片端自由（片持ち柱）\n- **k = 1.0 - 1.2**：片端固定、片端ヒンジ",
    
    columnSeoContent8: "**回転半径（r）**",
    
    columnSeoContent9: "回転半径は、断面の面積が形心からどれだけ離れて分布しているかの尺度です。r = √(I/A) として計算され、I は慣性モーメント、A は断面積です。寸法 b × h の矩形断面の場合、強軸に関する回転半径は r = h/√12、弱軸は r = b/√12 です。直径 d の円形断面の場合、r = d/√16 です。",
    
    columnSeoContent10: "**短柱と長柱**",
    
    columnSeoContent11: "細長比に基づいて柱は分類されます：\n\n- **短柱**：kl/r ≤ 100（ACI 318の制限）。軸荷重がコンクリートと鉄筋の圧縮強度を超えると、これらの柱はつぶれによって破壊します。細長比効果は無視できます。\n\n- **長柱**：kl/r > 100。これらの柱はつぶれ強度に達する前に座屈によって破壊します。細長比が高いほど、横方向の不安定性のため許容軸荷重は低くなります。\n\n- **中長柱**：短柱と長柱の間に位置し、材料破壊と安定性破壊の両方のモードを経験します。",
    
    columnSeoContent12: "**偏心圧縮：軸荷重と曲げの組み合わせ**",
    
    columnSeoContent13: "ほとんどの実際のアプリケーションでは、柱は軸方向の圧縮と曲げモーメントの両方を受けます。これは偏心圧縮と呼ばれます。偏心距離（e）は、柱の形心から軸荷重の作用点までの距離であり、e = M/P として計算され、M は曲げモーメント、P は軸荷重です。",
    
    columnSeoContent14: "**偏心荷重の種類**",
    
    columnSeoContent15: "偏心圧縮は2種類に分類できます：\n\n1. **単軸偏心**：荷重が1つの軸に対してのみ偏心し、一方向の曲げを引き起こします。これは片側の梁を支持する柱によく見られます。\n\n2. **二軸偏心**：荷重が両方の軸に対して偏心し、2つの垂直方向の曲げを引き起こします。これは角柱または非対称な荷重を受ける柱に発生します。\n\n**偏心圧縮の設計上の考慮事項：**\n\n- **相互作用図**：この図は、特定の柱断面に対する軸荷重耐力（φPn）と曲げ耐力（φMn）の関係を示します。組み合わせ荷重に抵抗できるかどうかを判断するのに役立ちます。\n\n- **中立軸の深さ**：中立軸の位置は、断面が圧縮制御破壊か引張制御破壊かを決定します。\n\n- **最小偏心距離**：名目的に中心荷重であっても、規格の要件では、偶発的な不具合と施工許容差を考慮して最小偏心距離が指定されています。\n\n**ACI 318の柱設計規定：**\n\nACI 318「構造用コンクリートの建築基準要求事項」は、RC柱設計の包括的なガイドラインを提供しています：\n\n- **鉄筋比**：拘束柱の場合、ρmin = 1%、ρmax = 8%；らせん柱の場合、ρmin = 0.8%。\n\n- **縦方向鉄筋**：矩形柱には少なくとも4本の鉄筋、円形柱には少なくとも6本の鉄筋が必要です。\n\n- **横方向鉄筋**：縦方向鉄筋の座屈を防ぐために、タイ筋またはらせん筋を設ける必要があります。\n\n- **細長比効果**：kl/r > 22 の柱の場合、軸荷重耐力に細長比低減係数を適用する必要があります。\n\n**Eurocode 2の規定：**\n\nEurocode 2は類似のアプローチを使用していますが、細長比の制限が異なります：\n\n- **短柱**：λ ≤ 15（矩形断面）または λ ≤ 18（円形断面）\n- **長柱**：λ > 上記の制限、二次解析が必要\n\n**RC柱の設計手順：**\n\n1. 設計荷重を決定する（軸力と曲げモーメント）\n2. 柱の寸法と材料特性を選択する\n3. 細長比を計算し、柱を分類する\n4. 軸荷重と曲げの組み合わせの強度計算を実行する\n5. 最小および最大鉄筋比を確認する\n6. 横方向鉄筋（タイ筋/らせん筋）を設計する\n7. たわみおよび安定性の要件を検証する\n\n**一般的な破壊モード：**\n\n- **つぶれ破壊**：短柱で発生し、コンクリートが圧縮強度に達したとき。\n- **座屈破壊**：長柱で発生し、横方向の不安定性による。\n- **曲げ破壊**：曲げモーメントが曲げ耐力を超えたときに発生し、鉄筋の引張破壊を引き起こす。\n- **せん断破壊**：せん断力がせん断耐力を超えたときに発生し、通常、短くて重い荷重を受ける柱で発生する。\n\n**柱設計の実践的なヒント：**\n\n- 細長比が高い柱には、kl/rを減少させるためにより大きな断面を使用します。\n- 有効長さを減少させるために十分な横方向ブレースを設けます。\n- 円形柱には延性を高めるためにらせん鉄筋を使用します。\n- 中心荷重であっても、最小偏心距離の要件を考慮します。\n- 軸荷重と曲げの組み合わせの相互作用図を検証します。\n\n**結論：**\n\nRC柱設計は構造工学において複雑ですが不可欠な側面です。細長比と偏心圧縮の理解は、安全で効率的な柱を設計するために重要です。適切な設計基準に従い、すべての関連要素を考慮することで、エンジニアは様々な荷重条件下で確実に機能する柱を作成することができます。当社のRC柱設計ツールは、ACI 318基準に基づく即時計算を提供することでこのプロセスを簡素化し、柱を迅速かつ正確に設計するのに役立ちます。"
  },
  es: {
    title: "Herramientas de Ingeniería Civil",
    description: "Herramientas de cálculo profesionales para ingeniería civil",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    about: "Sobre Nosotros",
    contact: "Contáctanos",
    home: "Inicio",
    
    privacyPageTitle: "Política de Privacidad",
    privacyLastUpdated: "Última Actualización: 1 de Julio de 2024",
    privacyIntro: "Esta Política de Privacidad explica cómo recopilamos, usamos y divulgamos su información cuando visita o usa nuestro sitio web y servicios. Al usar nuestro sitio web, usted acepta la recopilación y uso de información de acuerdo con esta política.",
    privacyInformationCollection: "Podemos recopilar los siguientes tipos de información:",
    privacyHowWeUse: "Usamos la información recopilada para los siguientes fines:",
    privacyGoogleAdSenseTitle: "Google AdSense",
    privacyGoogleAdSense: "Nuestro sitio web utiliza Google AdSense para mostrar anuncios. Google AdSense puede recopilar información sobre sus visitas a este y otros sitios web para proporcionar anuncios dirigidos sobre bienes y servicios que le interesan. Google AdSense utiliza cookies y otras tecnologías de seguimiento para recopilar esta información. Puede obtener más información sobre las prácticas de privacidad de Google y cómo optar por no participar visitando la Política de Privacidad de Google.",
    privacyCookiesTitle: "Cookies",
    privacyCookies: "Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Las cookies son pequeños archivos de datos que se almacenan en su dispositivo. Puede desactivar las cookies en la configuración de su navegador, pero esto puede afectar la funcionalidad de nuestro sitio web.",
    privacyGDPRTitle: "Cumplimiento con el RGPD",
    privacyGDPR: "Para los usuarios en el Espacio Económico Europeo (EEE), cumplimos con el Reglamento General de Protección de Datos (RGPD). Usted tiene derecho a acceder, corregir o eliminar sus datos personales. Para ejercer estos derechos, contáctenos en la dirección de correo electrónico proporcionada a continuación.",
    privacyCCPATitle: "Cumplimiento con el CCPA",
    privacyCCPA: "Para los usuarios en California, cumplimos con la Ley de Privacidad del Consumidor de California (CCPA). Usted tiene derecho a optar por no participar en la venta de su información personal. Para ejercer este derecho, contáctenos en la dirección de correo electrónico proporcionada a continuación.",
    privacyDataSecurityTitle: "Seguridad de Datos",
    privacyDataSecurity: "Tomamos medidas razonables para proteger su información contra el acceso, uso o divulgación no autorizados. Sin embargo, ningún método de transmisión por internet o almacenamiento electrónico es 100% seguro.",
    privacyChangesTitle: "Cambios a Esta Política",
    privacyChanges: "Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.",
    privacyContactTitle: "Contáctenos",
    privacyContact: "Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad, contáctenos en contact@useciviltools.com.",
    privacyInfoPersonal: "Información de identificación personal (Nombre, dirección de correo electrónico, etc.)",
    privacyInfoUsage: "Datos de uso (Páginas visitadas, tiempo transcurrido, etc.)",
    privacyInfoDevice: "Información del dispositivo (Tipo de navegador, dirección IP, etc.)",
    privacyUseProvide: "Para proporcionar y mantener nuestro servicio",
    privacyUseImprove: "Para mejorar y personalizar su experiencia",
    privacyUseCommunicate: "Para comunicarnos con usted",
    privacyUseAdvertise: "Para mostrar anuncios dirigidos",
    
    termsPageTitle: "Términos de Servicio",
    termsLastUpdated: "Última Actualización: 1 de Julio de 2024",
    termsIntro: "Estos Términos de Servicio rigen el uso de nuestro sitio web y servicios. Al acceder o usar nuestro sitio web, usted acepta estar sujeto a estos términos.",
    termsAcceptance: "Aceptación de Términos: Al usar nuestro sitio web, usted reconoce que ha leído, comprendido y acepta estar sujeto a estos Términos de Servicio y nuestra Política de Privacidad.",
    termsToolUse: "Uso de Herramientas: Las herramientas proporcionadas en nuestro sitio web son solo para fines informativos y educativos. Están diseñadas para ayudar con cálculos de ingeniería civil, pero no deben confiarse como la única base para decisiones de ingeniería.",
    termsDisclaimer: "Descargo de Responsabilidad: Los cálculos proporcionados por nuestras herramientas son solo para referencia. No hacemos garantías ni representaciones sobre la precisión, integridad o confiabilidad de los resultados. Los usuarios son responsables de verificar todos los cálculos y consultar con profesionales de ingeniería calificados antes de tomar cualquier decisión de ingeniería.",
    termsAccuracy: "Precisión: Aunque nos esforzamos por proporcionar cálculos precisos, pueden ocurrir errores. No aceptamos responsabilidad por daños o pérdidas resultantes del uso de nuestras herramientas.",
    termsLimitation: "Limitación de Responsabilidad: En ningún caso seremos responsables de daños directos, indirectos, incidentales, especiales o consecuentes derivados del uso de nuestro sitio web o herramientas.",
    termsIntellectual: "Propiedad Intelectual: Todo el contenido de nuestro sitio web, incluyendo texto, gráficos y software, es propiedad nuestra o de nuestros licenciantes y está protegido por leyes de copyright.",
    termsModifications: "Modificaciones: Nos reservamos el derecho de modificar o discontinuar nuestro sitio web o servicios en cualquier momento sin previo aviso.",
    termsTermination: "Terminación: Podemos terminar o suspender su acceso a nuestro sitio web en cualquier momento, sin causa o aviso previo.",
    termsGoverning: "Ley Aplicable: Estos términos se regirán e interpretarán de acuerdo con las leyes de los Estados Unidos.",
    
    aboutPageTitle: "Sobre Nosotros",
    aboutIntro: "Bienvenido a Herramientas de Ingeniería Civil - su compañero confiable para cálculos profesionales de ingeniería civil.",
    aboutTeam: "Nuestra Historia",
    aboutMission: "Nuestra misión es proporcionar a ingenieros civiles y estudiantes herramientas de cálculo poderosas, precisas y fáciles de usar que simplifiquen tareas de ingeniería complejas.",
    aboutExperienceTitle: "Nuestra Experiencia",
    aboutExperience: "Con más de 20 años de experiencia combinada en ingeniería civil, nuestro equipo de profesionales experimentados entiende los desafíos que enfrentan los ingenieros todos los días. Hemos trabajado en proyectos de infraestructura importantes en todo el mundo, desde rascacielos hasta puentes, y traemos esa experiencia a cada herramienta que creamos.",
    aboutTechnologyTitle: "Tecnología",
    aboutTechnology: "Aprovechamos tecnologías web de vanguardia para ofrecer herramientas que son tanto poderosas como accesibles. Nuestras herramientas están diseñadas pensando en el ingeniero moderno, con interfaces intuitivas y capacidades de cálculo completas.",
    aboutCommitmentTitle: "Nuestro Compromiso",
    aboutCommitment: "Estamos comprometidos con la mejora continua y la innovación. Actualizamos regularmente nuestras herramientas basándonos en el feedback de los usuarios y los estándares de ingeniería más recientes.",
    aboutQuote: "La ingeniería no se trata solo de construir estructuras; se trata de construir un mundo mejor. Estamos dedicados a proporcionar herramientas que empoderen a los ingenieros para tomar decisiones informadas y crear infraestructura segura y sostenible para las generaciones venideras.",
    
    contactPageTitle: "Contáctanos",
    contactName: "Nombre",
    contactEmail: "Correo Electrónico",
    contactMessage: "Mensaje",
    contactSubmit: "Enviar",
    contactSuccess: "¡Gracias! Su mensaje ha sido enviado con éxito.",
    contactRequired: "Este campo es obligatorio",
    
    cookieBannerTitle: "Consentimiento de Cookies",
    cookieBannerText: "Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Al continuar usando nuestro sitio, usted consiente el uso de cookies.",
    cookieAccept: "Aceptar",
    cookieReject: "Rechazar",
    
    language: "Idioma",
    
    seoTitle: "Su Suite de Herramientas de Ingeniería Civil Definitiva",
    seoDescription: "Herramientas de cálculo profesionales para análisis estructural, propiedades de sección, diseño de vigas y más.",
    seoContent: "Bienvenido a UseCivilTools.com, su suite completa de herramientas de cálculo profesional de ingeniería civil diseñada para optimizar sus flujos de trabajo de análisis estructural y diseño. Ya sea que sea un ingeniero civil experimentado trabajando en proyectos de infraestructura complejos o un estudiante aprendiendo los fundamentos de la mecánica estructural, nuestra plataforma le brinda soluciones de cálculo precisas, confiables y fáciles de usar.\n\nNuestra herramienta de Cálculo de Secciones le permite calcular rápidamente las propiedades de sección para varias formas, incluyendo rectángulos, círculos, vigas en I, canales, ángulos y secciones compuestas personalizadas. Calcule con precisión el área, el centroide, el momento de inercia, el módulo de sección y el radio de giro.\n\nUseCivilTools.com fue construido por un equipo de ingenieros civiles experimentados con más de 20 años de experiencia combinada en la industria. Cumplimos con los últimos estándares de ingeniería, incluyendo AISC, Eurocode, estándares GB y más. Entendemos la naturaleza crítica de los cálculos de ingeniería y hemos diseñado nuestras herramientas para ayudarlo a tomar decisiones informadas.\n\nAdemás de nuestra herramienta estrella de Cálculo de Secciones, continuamente expandimos nuestro conjunto de herramientas para incluir análisis de vigas, diseño de columnas, diseño de losas, diseño de cimentaciones y herramientas de análisis de muros de contención. Cada herramienta se desarrolla con el mismo compromiso de precisión y facilidad de uso.\n\nComience sus cálculos de ingeniería hoy y experimente la diferencia que las herramientas profesionales pueden marcar en su flujo de trabajo.",
    
    toolSectionTitle: "Calculadora de Secciones",
    toolSectionDesc: "Calcular propiedades de sección para varias formas",
    toolBeamTitle: "Análisis de Vigas",
    toolBeamDesc: "Analizar deflexión y esfuerzo de vigas",
    toolColumnTitle: "Diseño de Columnas",
    toolColumnDesc: "Diseñar columnas según estándares",
    toolSlabTitle: "Diseño de Losas",
    toolSlabDesc: "Calcular espesor y refuerzo de losas",
    toolFoundationTitle: "Diseño de Cimentaciones",
    toolFoundationDesc: "Diseñar zapatas y cimentaciones",
    toolRetainingTitle: "Muro de Contención",
    toolRetainingDesc: "Diseñar y analizar muros de contención",
    
    gettingStarted: "Cómo Empezar",
    step1: "Seleccione una herramienta de cálculo del cuadro superior",
    step2: "Ingrese los parámetros requeridos",
    step3: "Haga clic en calcular para obtener resultados",
    step4: "Use el botón de copiar para exportar resultados",
    
    comingSoon: "Próximamente",
    
    sectionSelectType: "Seleccionar Tipo de Sección",
    sectionInputParams: "Parámetros de Entrada",
    sectionResults: "Resultados",
    sectionCopyResults: "Copiar Resultados",
    sectionCopied: "¡Copiado!",
    sectionEnterParams: "Ingrese parámetros para calcular",
    
    shapeRectangle: "Rectángulo",
    shapeCircle: "Círculo",
    shapeIbeam: "Viga en I",
    shapeChannel: "Canal",
    shapeAngle: "Ángulo",
    
    paramWidth: "Ancho",
    paramHeight: "Alto",
    paramDiameter: "Diámetro",
    paramTopFlangeWidth: "Ancho del Flange Superior",
    paramTopFlangeThickness: "Espesor del Flange Superior",
    paramBottomFlangeWidth: "Ancho del Flange Inferior",
    paramBottomFlangeThickness: "Espesor del Flange Inferior",
    paramWebHeight: "Alto del Alma",
    paramWebThickness: "Espesor del Alma",
    paramFlangeWidth: "Ancho del Flange",
    paramFlangeThickness: "Espesor del Flange",
    paramLegWidth1: "Ancho de Pierna 1",
    paramLegThickness1: "Espesor de Pierna 1",
    paramLegWidth2: "Ancho de Pierna 2",
    paramLegThickness2: "Espesor de Pierna 2",
    
    resultArea: "Área",
    resultCentroidX: "Centroide X",
    resultCentroidY: "Centroide Y",
    resultIx: "Momento de Inercia X",
    resultIy: "Momento de Inercia Y",
    resultSx: "Módulo de Sección X",
    resultSy: "Módulo de Sección Y",
    resultRx: "Radio de Giro X",
    resultRy: "Radio de Giro Y",
    
    unitMm: "mm",
    unitMm2: "mm²",
    unitMm3: "mm³",
    unitMm4: "mm⁴",
    
    symbolIx: "Iₓ (Momento de Inercia)",
    symbolIy: "Iᵧ (Momento de Inercia)",
    symbolSx: "Sₓ (Módulo de Sección)",
    symbolSy: "Sᵧ (Módulo de Sección)",
    symbolRx: "rₓ (Radio de Giro)",
    symbolRy: "rᵧ (Radio de Giro)",
    
    sectionSeoTitle: "Calculadora de Propiedades de Sección - Herramienta de Ingeniería Civil",
    sectionSeoContent: "Nuestra Calculadora de Propiedades de Sección es una herramienta esencial para ingenieros civiles, diseñadores estructurales y estudiantes de ingeniería. Esta potente calculadora le permite calcular rápidamente y con precisión las propiedades clave de sección para varias formas estructurales, incluyendo rectángulos, círculos, vigas en I, canales y ángulos.\n\n**¿Por qué usar nuestra Calculadora de Sección?**\n\nLas propiedades de sección son fundamentales para el análisis y diseño estructural. El momento de inercia (I), el módulo de sección (S) y el radio de giro (r) son parámetros críticos que determinan la resistencia de una estructura a fuerzas de flexión, corte y axiales. Nuestra calculadora proporciona resultados instantáneos y precisos en los que puede confiar.\n\n**Características Clave:**\n\n1. **Múltiples Tipos de Sección**: Calcule propiedades para rectángulos, círculos, vigas en I, canales y secciones angulares, las formas más utilizadas en ingeniería civil.\n\n2. **Resultados Completos**: Obtenga todas las propiedades esenciales de sección en un solo lugar: Área, coordenadas del centroide, Momento de Inercia (Iₓ, Iᵧ), Módulo de Sección (Sₓ, Sᵧ) y Radio de Giro (rₓ, rᵧ).\n\n3. **Cálculos en Tiempo Real**: Ver resultados instantáneamente mientras ingresa parámetros, lo que facilita experimentar con diferentes dimensiones y comparar diseños.\n\n4. **Copiar Resultados**: Exporte rápidamente sus resultados de cálculo con un solo clic para documentación o análisis adicional.\n\n**Entendiendo las Propiedades de Sección:**\n\n- **Área (A)**: El área de la sección transversal, que determina la cantidad de material utilizado y afecta la resistencia del miembro a fuerzas axiales.\n\n- **Centroide (Cₓ, Cᵧ)**: El centro geométrico de la sección. Esto es crucial para determinar el eje neutro en flexión y para calcular el momento de inercia alrededor de los ejes correctos.\n\n- **Momento de Inercia (Iₓ, Iᵧ)**: Una medida de la resistencia de la sección a la flexión alrededor del eje x o y. Un momento de inercia mayor significa mayor rigidez y resistencia a la deflexión.\n\n- **Módulo de Sección (Sₓ, Sᵧ)**: Calculado como I/c, donde c es la distancia desde el centroide hasta la fibra extrema. Este parámetro se utiliza para determinar la tensión de flexión en un miembro.\n\n- **Radio de Giro (rₓ, rᵧ)**: Una medida de qué tan lejos está distribuida el área desde el centroide. Se usa en el diseño de columnas para determinar la relación de esbeltez y la resistencia al pandeo.\n\n**Aplicaciones de Ingeniería:**\n\nNuestra Calculadora de Sección es utilizada por ingenieros de todo el mundo para:\n\n- Diseño y análisis de vigas\n- Diseño de columnas para cargas axiales y de flexión\n- Dimensionamiento de miembros de vigas\n- Diseño de losas y planchas\n- Análisis de secciones compuestas\n- Diseño de acero y hormigón armado\n\n**Fórmulas Utilizadas:**\n\nPara un rectángulo con ancho b y alto h:\n- Área: A = b × h\n- Momento de Inercia alrededor del eje X: Iₓ = (b × h³) / 12\n- Momento de Inercia alrededor del eje Y: Iᵧ = (h × b³) / 12\n- Módulo de Sección: S = I / (h/2)\n- Radio de Giro: r = √(I/A)\n\nPara un círculo con diámetro d:\n- Área: A = π × (d/2)²\n- Momento de Inercia: I = π × (d/2)⁴ / 4\n\nPara secciones ensambladas como vigas en I, canales y ángulos, utilizamos el teorema de ejes paralelos para calcular las propiedades combinadas de cada componente.\n\n**Creada por Ingenieros, para Ingenieros:**\n\nEn UseCivilTools.com, entendemos la importancia de cálculos precisos y confiables en la ingeniería civil. Nuestro equipo de ingenieros experimentados ha diseñado esta herramienta para cumplir con los más altos estándares de precisión y facilidad de uso. Ya sea que esté trabajando en un proyecto residencial pequeño o en un desarrollo de infraestructura a gran escala, nuestra Calculadora de Sección le ayudará a tomar decisiones de diseño informadas.\n\nComience a calcular propiedades de sección hoy y experimente el poder de herramientas de ingeniería de nivel profesional al alcance de su mano.",
    sectionFormulas: "Fórmulas y Referencia",
    
    beamSupportType: "Tipo de Apoyo",
    beamLoadType: "Tipo de Carga",
    beamInputParams: "Parámetros de Entrada",
    beamResults: "Resultados",
    beamDiagrams: "Diagramas",
    beamCopyResults: "Copiar Resultados",
    beamCopied: "¡Copiado!",
    beamExport: "Exportar",
    beamPrint: "Imprimir",
    
    supportBothHinged: "Ambos Bisagras",
    supportBothFixed: "Ambos Fijos",
    supportHingedFixed: "Bisagra - Fijo",
    
    loadUniform: "Carga Uniforme",
    loadPoint: "Carga Puntual",
    loadDistributed: "Carga Distribuida",
    
    paramSpanLength: "Longitud del Van",
    paramLoadValue: "Valor de Carga",
    paramLoadPosition: "Posición de Carga",
    paramElasticModulus: "Módulo Elástico",
    paramMomentInertia: "Momento de Inercia",
    
    resultReactionA: "Reacción en A",
    resultReactionB: "Reacción en B",
    resultShearMax: "Fuerza Cortante Máxima",
    resultMomentMax: "Momento Flector Máximo",
    resultDeflectionMax: "Deflexión Máxima",
    
    symbolV: "V (Fuerza Cortante)",
    symbolM: "M (Momento Flector)",
    symbolDelta: "δ (Deflexión)",
    
    shearDiagram: "Diagrama de Cortante",
    momentDiagram: "Diagrama de Momento",
    deflectionDiagram: "Diagrama de Deflexión",
    
    unitKN: "kN",
    unitKnm: "kN·m",
    unitNmm2: "N/mm²",
    unitKnm2: "kN·m²",
    
    beamSeoTitle: "Herramienta de Análisis de Vigas - Análisis Estructural de Ingeniería Civil",
    beamSeoContent: "Nuestra Herramienta de Análisis de Vigas es una solución completa de análisis estructural para ingenieros civiles, arquitectos y estudiantes de ingeniería. Esta potente herramienta le permite analizar varias configuraciones de vigas con diferentes condiciones de apoyo y escenarios de carga, proporcionando resultados detallados que incluyen diagramas de fuerzas cortantes, diagramas de momentos flectores, diagramas de deflexión y valores de fuerzas internas clave.\n\n**¿Por qué usar nuestra Herramienta de Análisis de Vigas?**\n\nEl análisis de vigas es una parte fundamental de la ingeniería estructural. Entender el comportamiento de las vigas bajo diferentes cargas y condiciones de apoyo es esencial para diseñar estructuras seguras y eficientes. Nuestra herramienta proporciona resultados precisos y confiables que puede usar para sus proyectos de ingeniería.\n\n**Características Clave:**\n\n1. **Múltiples Condiciones de Apoyo**: Analice vigas con ambos apoyos bisagros, ambos apoyos fijos o una combinación de bisagra y fijo.\n\n2. **Opciones de Carga Flexibles**: Aplique cargas uniformes en todo el van, cargas puntuales en cualquier ubicación o cargas distribuidas parciales.\n\n3. **Resultados Completos**: Obtenga un análisis completo que incluya reacciones de apoyo, diagramas de fuerzas cortantes, diagramas de momentos flectores, diagramas de deflexión y valores máximos.\n\n4. **Análisis en Tiempo Real**: Ver resultados instantáneamente mientras cambia los parámetros, lo que facilita experimentar con diferentes escenarios.\n\n5. **Exportar e Imprimir**: Exportar sus resultados para documentación o imprimirlos directamente para sus registros.\n\n**Entendiendo el Análisis de Vigas:**\n\n- **Reacciones de Apoyo**: Las fuerzas ejercidas por los apoyos para mantener el equilibrio. Se calculan utilizando ecuaciones de equilibrio estático (ΣF = 0, ΣM = 0).\n\n- **Fuerza Cortante (V)**: La fuerza interna que tiende a cortar la sección transversal de la viga. Es la suma algebraica de todas las fuerzas verticales a la izquierda (o derecha) de la sección.\n\n- **Momento Flector (M)**: El momento interno que causa la flexión de la viga. Es la suma algebraica de todos los momentos a la izquierda (o derecha) de la sección.\n\n- **Deflexión (δ)**: El desplazamiento vertical de la viga bajo carga. Depende de las propiedades del material (E), propiedades de la sección (I), longitud del van y carga.\n\n**Aplicaciones de Ingeniería:**\n\nNuestra Herramienta de Análisis de Vigas es utilizada por ingenieros de todo el mundo para:\n\n- Diseño de vigas de piso en edificios\n- Análisis de vigas de puentes\n- Diseño de estructuras de techo\n- Análisis de vigas en voladizo\n- Diseño de vigas continuas\n- Diseño de vigas de acero y concreto\n\n**Fórmulas Utilizadas:**\n\nPara una viga simplemente apoyada (ambos bisagros) con van L y carga uniforme w:\n- Reacciones de apoyo: Rₐ = Rᵦ = wL/2\n- Fuerza cortante máxima: Vₘₐₓ = wL/2\n- Momento flector máximo: Mₘₐₓ = wL²/8\n- Deflexión máxima en el centro: δₘₐₓ = 5wL⁴/(384EI)\n\nPara una viga simplemente apoyada con carga puntual central P:\n- Reacciones de apoyo: Rₐ = Rᵦ = P/2\n- Fuerza cortante máxima: Vₘₐₓ = P/2\n- Momento flector máximo: Mₘₐₓ = PL/4\n- Deflexión máxima en el centro: δₘₐₓ = PL³/(48EI)\n\n**Creada por Ingenieros, para Ingenieros:**\n\nEn UseCivilTools.com, entendemos la importancia de cálculos precisos y confiables en la ingeniería civil. Nuestro equipo de ingenieros experimentados ha diseñado esta herramienta para cumplir con los más altos estándares de precisión y facilidad de uso. Ya sea que esté trabajando en un proyecto residencial pequeño o en un desarrollo de infraestructura a gran escala, nuestra Herramienta de Análisis de Vigas le ayudará a tomar decisiones de diseño informadas.\n\nComience a analizar vigas hoy y experimente el poder de herramientas de ingeniería de nivel profesional al alcance de su mano.",
    beamFormulas: "Fórmulas y Referencia",
    beamIntro: "La herramienta de análisis de vigas le permite analizar el comportamiento estructural de las vigas bajo varias condiciones de carga y configuraciones de apoyo. Ingrese los parámetros de la viga, seleccione el tipo de apoyo y el tipo de carga, y obtenga resultados instantáneos que incluyen diagramas de fuerzas cortantes, diagramas de momentos flectores y cálculos de deflexión.",
    beamHowToUse: "1. Seleccione el tipo de apoyo de las opciones disponibles (Ambos Bisagras, Ambos Fijos o Bisagra-Fijo).\n\n2. Seleccione el tipo de carga (Carga Uniforme o Carga Puntual).\n\n3. Ingrese los parámetros de la viga, incluyendo la longitud del van, el valor de la carga y la posición de la carga (para cargas puntuales).\n\n4. Opcionalmente, ingrese el módulo elástico y el momento de inercia para cálculos de deflexión.\n\n5. Visualice los resultados, incluyendo reacciones de apoyo, diagrama de fuerzas cortantes, diagrama de momentos flectores y diagrama de deflexión.\n\n6. Use el botón de copiar para exportar resultados o el botón de imprimir para imprimir el análisis.",
    beamNotes: "Nota: Esta herramienta asume comportamiento elástico lineal y deflexiones pequeñas. Los resultados deben verificarse por un profesional de ingeniería calificado antes de su uso en diseño real. Los cálculos siguen principios estándar de análisis estructural y se basan en la teoría de vigas Euler-Bernoulli.",
    
    pdfExport: "Exportar Informe PDF Profesional",
    pdfReportTitle: "Informe de Cálculo Profesional",
    pdfInputParams: "Parámetros de Entrada",
    pdfCalculationSteps: "Pasos de Cálculo",
    pdfResults: "Resultados",
    pdfGeneratedBy: "Generado por",
    pdfDate: "Fecha",
    
    backToHome: "Volver al Inicio",
    results: "Resultados",
    toolConcreteTitle: "Calculadora de Volumen de Concreto",
    toolConcreteDesc: "Calcular el volumen de concreto, estimar sacos necesarios y considerar residuos",
    concreteMode: "Modo de Cálculo",
    concreteSlab: "Loseta / Cimentación",
    concreteWall: "Pared",
    concreteColumn: "Columna / Cilindro",
    concreteCurb: "Borde / Zanjón",
    concreteQuantity: "Cantidad",
    concreteWaste: "Residuo %",
    concreteLength: "Longitud",
    concreteWidth: "Anchura",
    concreteThickness: "Espesor",
    concreteHeight: "Altura",
    concreteDiameter: "Diámetro",
    concreteSection: "Tamaño de Sección",
    concreteVolume: "Volumen",
    concreteTotalVolume: "Volumen Total",
    concreteVolumeWithWaste: "Volumen con Residuo",
    concreteUnitM3: "m³",
    concreteUnitFt3: "ft³",
    concreteBagEstimation: "Estimación de Sacos",
    concreteBagWeight: "Peso del Saco",
    concreteBagsNeeded: "Sacos Necesarios",
    concreteResultVolume: "Volumen Total:",
    concreteResultBags: "Sacos Estimados:",
    
    concreteSeoTitle: "Calculadora de Volumen de Concreto - ¿Cuántos sacos de concreto necesito?",
    concreteSeoContent: "Nuestra Calculadora de Volumen de Concreto le ayuda a estimar con precisión los requisitos de concreto para losetas, paredes, columnas y bordes. Calcule el volumen en metros cúbicos o pies cúbicos, considere los residuos y determine la cantidad de sacos necesarios.",
    concreteFormulas: "Fórmulas y Referencia",
    concreteIntro: "La Calculadora de Volumen de Concreto es una herramienta esencial para profesionales de la construcción y entusiastas de bricolaje. Proporciona cálculos precisos de volumen para diversas estructuras de concreto, incluyendo losetas, cimentaciones, paredes, columnas y bordes. Con funciones integradas de estimación de residuos y cálculo de sacos, puede asegurarse de pedir la cantidad correcta de concreto para su proyecto.",
    concreteHowToUse: "1. Seleccione el modo de cálculo (Loseta/Cimentación, Pared, Columna/Cilindro o Borde/Zanjón)\n2. Ingrese las dimensiones de su estructura\n3. Especifique la cantidad si tiene múltiples estructuras idénticas\n4. Establezca el porcentaje de residuo (típicamente 5-10%)\n5. Elija el peso del saco preferido para la estimación\n6. Ver los resultados, incluyendo el volumen total y la cantidad de sacos necesarios",
    concreteNotes: "Nota: Los cálculos de volumen de concreto deben incluir un factor de residuo para tener en cuenta derrames, superficies irregulares y excavación excesiva. El porcentaje de residuo recomendado varía según el tipo de proyecto: 5% para losetas simples, 10% para estructuras complejas. Siempre redondee hacia arriba al saco completo más cercano al pedir.",
    
    seoHowCalculateVolume: "¿Cómo calcular el volumen de concreto?",
    seoSlabFooting: "Loseta / Cimentación",
    seoWall: "Pared",
    seoColumnCylinder: "Columna / Cilindro",
    seoCurbGutter: "Borde / Zanjón",
    
    seoWhyWaste: "¿Por qué debe considerar los residuos?",
    seoWasteReason1: "Derrames: Es inevitable que se derrame algo de concreto durante la vertida y el transporte.",
    seoWasteReason2: "Superficies irregulares: El suelo puede no estar perfectamente nivelado, requiriendo concreto extra para alcanzar el grosor deseado.",
    seoWasteReason3: "Excavación excesiva: Las áreas excavadas a menudo necesitan más concreto del calculado debido a formas irregulares.",
    seoWasteReason4: "Contingencias: Tener concreto extra garantiza que no se quede sin material, lo que podría causar retrasos costosos.",
    seoWasteRecommended: "Porcentajes de residuo recomendados:",
    seoWasteSimple: "Losetas simples: 5%",
    seoWasteWalls: "Paredes y columnas: 7-10%",
    seoWasteComplex: "Estructuras complejas: 10-15%",
    
    seoGradesTitle: "Diferentes grados de concreto y sus usos",
    seoGradeC10: "C10 - C15",
    seoGradeC10Desc: "Concreto de baja resistencia usado para aplicaciones no estructurales como:",
    seoGradeC10Use1: "Apoyo de cimentación",
    seoGradeC10Use2: "Relleno de concreto masivo",
    seoGradeC10Use3: "Paredes no portantes",
    seoGradeC20: "C20 - C25",
    seoGradeC20Desc: "Concreto de resistencia media usado para construcción general:",
    seoGradeC20Use1: "Losetas de concreto reforzado",
    seoGradeC20Use2: "Vigas y columnas",
    seoGradeC20Use3: "Caminos de entrada y patios",
    seoGradeC30: "C30 - C40",
    seoGradeC30Desc: "Concreto de alta resistencia para aplicaciones pesadas:",
    seoGradeC30Use1: "Estructuras altas",
    seoGradeC30Use2: "Tableros de puentes",
    seoGradeC30Use3: "Suelos industriales",
    
    seoHowManyBags: "¿Cuántos sacos de concreto necesito?",
    seoBagsIntro: "Calcular cuántos sacos de concreto necesita es un paso crucial en cualquier proyecto de construcción. Pida pocos y enfrentará retrasos y costos de entrega adicionales. Pida muchos y desperdiciará dinero en material sin usar. Nuestra calculadora de concreto simplifica este proceso al proporcionar estimaciones precisas basadas en los requisitos específicos de su proyecto.",
    seoBagsGuideTitle: "Guía paso a paso para calcular sacos de concreto",
    seoBagsStep1Title: "Determine la forma de su estructura de concreto",
    seoBagsStep1Desc: "¿Es una loseta, pared, columna o borde? Cada forma tiene una fórmula de volumen diferente.",
    seoBagsStep2Title: "Mida las dimensiones",
    seoBagsStep2Desc: "Use unidades consistentes (metros o pies) para todas las mediciones.",
    seoBagsStep3Title: "Calcule el volumen",
    seoBagsStep3Desc: "Aplique la fórmula apropiada para el tipo de estructura.",
    seoBagsStep4Title: "Agregue factor de residuo",
    seoBagsStep4Desc: "Incluya un 5-10% extra para derrames, superficies irregulares y contingencias.",
    seoBagsStep5Title: "Convierta a sacos",
    seoBagsStep5Desc: "Divida el peso total entre el peso del saco (20kg, 25kg, 40kg, 40lb, 60lb o 80lb).",
    
    seoBagSizesTitle: "Tamaños comunes de sacos y cobertura",
    seoBagSize: "Tamaño del saco",
    seoBagVolumeM3: "Volumen por saco (m³)",
    seoBagVolumeFt3: "Volumen por saco (ft³)",
    seoBagUses: "Usos típicos",
    seoBag20kgUse: "Reparaciones pequeñas, proyectos DIY",
    seoBag25kgUse: "Construcción general, losetas",
    seoBag40kgUse: "Proyectos grandes, uso profesional",
    seoBag40lbUse: "Trabajos pequeños, reparaciones (EE.UU.)",
    seoBag60lbUse: "Proyectos medianos (EE.UU.)",
    seoBag80lbUse: "Proyectos grandes, profesional (EE.UU.)",
    
    seoTipsTitle: "Consejos para pedir concreto",
    seoTipRoundUp: "Redondee hacia arriba: Siempre redondee hacia arriba al saco completo más cercano. No se puede comprar medio saco de concreto.",
    seoTipReadyMix: "Considere el concreto premezclado: Para proyectos grandes (más de 10m³), el concreto premezclado entregado por camión suele ser más rentable.",
    seoTipDelivery: "Verifique los mínimos de entrega: Muchos proveedores tienen cantidades mínimas de pedido para la entrega.",
    seoTipWeather: "Planifique el clima: La vertida de concreto depende del clima. Tenga un plan de respaldo para lluvia o temperaturas extremas.",
    seoConclusion: "Siguiendo estas pautas y usando nuestra calculadora de concreto, puede asegurarse de pedir la cantidad correcta de concreto para su proyecto, ahorrando tiempo y dinero evitando errores costosos.",
    
    columnDesignTitle: "Herramienta de Diseño de Columnas RC",
    columnDesignDesc: "Diseñar columnas de hormigón armado con secciones rectangulares o circulares",
    columnInputParams: "Parámetros de Entrada",
    columnResults: "Resultados de Cálculo",
    columnSectionType: "Tipo de Sección",
    columnAxialForce: "Fuerza Axial",
    columnBendingMoment: "Momento de Flexión",
    columnFc: "Resistencia del Hormigón (f'c)",
    columnFy: "Resistencia del Acero (fy)",
    columnClearHeight: "Altura Libre",
    columnKFactor: "Factor de Longitud Efectiva (k)",
    columnKFixed: "Ambos Fijos",
    columnKHinged: "Ambos Articulados",
    columnKFree: "Uno Fijo, Uno Libre",
    columnCover: "Recubrimiento",
    columnBarDiameter: "Diámetro de Barras",
    columnNumBars: "Número de Barras",
    columnSlendernessRatio: "Relación de Esbeltez (kl/r)",
    columnShortColumn: "Columna Corta (kl/r ≤ 100)",
    columnLongColumn: "Columna Larga (kl/r > 100)",
    columnEccentricity: "Excentricidad (e = M/P)",
    columnReinforcementRatio: "Relación de Refuerzo",
    columnMinRatio: "Relación Mínima (ρmin)",
    columnMaxRatio: "Relación Máxima (ρmax)",
    columnRequiredRatio: "Relación Requerida",
    columnSteelArea: "Área de Acero Requerida",
    columnRequiredBars: "Número de Barras Requeridas",
    columnDesignCheck: "Verificación de Diseño",
    columnCapacityRatio: "Relación de Capacidad",
    columnCalculationSteps: "Pasos de Cálculo",
    columnCrossSection: "Sección Transversal",
    columnEnterParams: "Ingrese los parámetros para calcular",
    columnSelectSectionType: "Seleccionar Tipo de Sección",
    columnSmallEccentric: "Compresión Excéntrica Pequeña",
    columnLargeEccentric: "Compresión Excéntrica Grande",
    columnCurrent: "Actual",
    columnMinReinforcementControlled: "Controlado por la relación mínima de refuerzo",
    columnInsufficientReinforcement: "Refuerzo insuficiente - necesita más barras",
    columnConcrete: "Concreto",
    columnRebar: "Varilla",
    columnCoverLabel: "Revestimiento",
    columnWarningFc: "Advertencia: La resistencia del concreto debe estar entre 10-100 MPa.",
    columnWarningFy: "Advertencia: La resistencia del acero debe estar entre 200-700 MPa.",
    columnWarningDimensions: "Advertencia: Las dimensiones de la columna deben ser al menos 150mm.",
    columnWarningDiameter: "Advertencia: El diámetro de la columna debe ser al menos 200mm.",
    columnWarningReinforcementInsufficient: "Espaciado de varillas demasiado pequeño",
    columnWarningSectionTooSmall: "Sección demasiado pequeña",
    columnPMInteractionDiagram: "Diagrama de Interacción P-M",
    columnPMTitle: "Diagrama de Interacción P-M (ACI 318)",
    columnPMXAxis: "Fuerza Axial P (kN)",
    columnPMYAxis: "Momento de Flexión M (kNm)",
    columnPMInteractionCurve: "Curva de Interacción",
    columnPMCurrentPoint: "Actual (P,M)",
    columnFailedSectionCapacity: "FAILED: Capacidad de Sección Excedida",
    columnFailedSectionCapacityDesc: "Las cargas aplicadas (P={P} kN, M={M} kNm) exceden la capacidad de la sección incluso con refuerzo máximo (8%). Considere aumentar las dimensiones de la columna o la resistencia del material.",
    columnFailedInsufficientReinforcement: "FAILED: Refuerzo Insuficiente",
    columnBarUnit: "barras",
    columnWarningSectionTooSmallDesc: "La relación de refuerzo requerida excede el 8%. Considere aumentar las dimensiones de la columna.",
    columnPass: "APROBADO",
    columnMarginal: "MARGINAL",
    columnFail: "FALLÓ",
    columnRectangular: "Rectangular",
    columnCircular: "Circular",
    columnDesignResults: "Resultados del Diseño de Columnas",
    columnDimensions: "Dimensiones",
    columnDiameter: "diámetro",
    columnConcreteStrength: "Resistencia del Hormigón",
    columnSteelStrength: "Resistencia del Acero",
    columnRequiredReinforcement: "Relación de Refuerzo Requerida",
    columnRequiredSteelArea: "Área de Acero Requerida",
    columnPreset: "Predefinido",
    columnGeneratePDF: "Generar Informe PDF",
    columnGeneratingPDF: "Generando...",
    
    columnSeoTitle: "Diseño de Columnas RC: Entendiendo la Relación de Esbeltez y la Compresión Excéntrica",
    
    columnSeoContent1: "El diseño de columnas de hormigón armado (RC) es un aspecto fundamental de la ingeniería estructural que requiere una consideración cuidadosa de varios factores críticos. Las columnas son miembros estructurales verticales que soportan principalmente cargas compresivas axiales, pero también deben diseñarse para resistir momentos flectores, fuerzas de corte y posible pandeo. En esta guía completa, exploraremos los conceptos clave del diseño de columnas RC, con un enfoque particular en la relación de esbeltez y la compresión excéntrica.",
    
    columnSeoContent2: "**¿Qué es una Columna de Hormigón Armado?**",
    
    columnSeoContent3: "Una columna de hormigón armado es un elemento estructural que transmite cargas desde vigas y losas hasta la fundación. A diferencia de las columnas de acero, las columnas RC combinan la resistencia a la compresión del hormigón con la resistencia a la tracción de las barras de refuerzo (armadura). El hormigón soporta las fuerzas compresivas, mientras que el acero de refuerzo proporciona resistencia a la tracción y previene la fallo frágil. Las columnas RC se utilizan ampliamente en edificios, puentes y otras estructuras debido a su durabilidad, resistencia al fuego y rentabilidad.",
    
    columnSeoContent4: "**Relación de Esbeltez: Un Parámetro Crítico**",
    
    columnSeoContent5: "La relación de esbeltez es uno de los parámetros más importantes en el diseño de columnas. Se define como la relación entre la longitud efectiva de la columna y su radio de giro (kl/r). Esta relación determina si una columna fallará por aplastamiento (columna corta) o por pandeo (columna larga).",
    
    columnSeoContent6: "**Entendiendo la Longitud Efectiva (kl)**",
    
    columnSeoContent7: "El factor de longitud efectiva (k) tiene en cuenta las condiciones de los extremos de la columna. Diferentes condiciones de apoyo resultan en diferentes longitudes efectivas:\n\n- **k = 0.5**: Ambos extremos fijos (restringidos contra rotación y movimiento lateral)\n- **k = 1.0**: Ambos extremos articulados (libres para rotar pero restringidos contra movimiento lateral)\n- **k = 1.5**: Un extremo fijo, un extremo libre (columna en voladizo)\n- **k = 1.0 - 1.2**: Un extremo fijo, un extremo articulado",
    
    columnSeoContent8: "**Radio de Giro (r)**",
    
    columnSeoContent9: "El radio de giro es una medida de qué tan lejos está distribuida el área de la sección transversal desde su centroide. Se calcula como r = √(I/A), donde I es el momento de inercia y A es el área de la sección transversal. Para una sección rectangular con dimensiones b × h, el radio de giro alrededor del eje fuerte es r = h/√12, y alrededor del eje débil es r = b/√12. Para una sección circular con diámetro d, r = d/√16.",
    
    columnSeoContent10: "**Columnas Cortas vs. Largas**",
    
    columnSeoContent11: "Las columnas se clasifican según su relación de esbeltez:\n\n- **Columnas Cortas**: kl/r ≤ 100 (límite ACI 318). Estas columnas fallan por aplastamiento cuando la carga axial excede la resistencia a la compresión del hormigón y el acero. Los efectos de esbeltez son insignificantes.\n\n- **Columnas Largas**: kl/r > 100. Estas columnas fallan por pandeo antes de alcanzar su resistencia de aplastamiento. Cuanto mayor es la relación de esbeltez, menor es la carga axial permitida debido a la inestabilidad lateral.\n\n- **Columnas Intermedias**: Están entre las columnas cortas y largas, experimentando modos de fallo tanto de material como de estabilidad.",
    
    columnSeoContent12: "**Compresión Excéntrica: Carga Axial y Flexión Combinadas**",
    
    columnSeoContent13: "En la mayoría de las aplicaciones del mundo real, las columnas están sujetas a compresión axial y momentos flectores. Esto se conoce como compresión excéntrica. La excentricidad (e) es la distancia desde el centroide de la columna hasta el punto de aplicación de la carga axial, calculada como e = M/P, donde M es el momento de flexión y P es la carga axial.",
    
    columnSeoContent14: "**Tipos de Carga Excéntrica**",
    
    columnSeoContent15: "La compresión excéntrica se puede clasificar en dos tipos:\n\n1. **Excentricidad Uniaxial**: La carga es excéntrica solo alrededor de un eje, causando flexión en una dirección. Esto es común en columnas que soportan vigas en un solo lado.\n\n2. **Excentricidad Biaxial**: La carga es excéntrica alrededor de ambos ejes, causando flexión en dos direcciones perpendiculares. Esto ocurre en columnas de esquina o columnas con carga asimétrica.\n\n**Consideraciones de Diseño para Compresión Excéntrica:**\n\n- **Diagrama de Interacción**: Este diagrama muestra la relación entre la capacidad de carga axial (φPn) y la capacidad de flexión (φMn) para una sección de columna dada. Ayuda a determinar si la columna puede resistir la carga combinada.\n\n- **Profundidad del Eje Neutro**: La posición del eje neutro determina si la sección falla por compresión controlada o tracción controlada.\n\n- **Excentricidad Mínima**: Incluso para cargas nominalmente concéntricas, los requisitos del código especifican una excentricidad mínima para tener en cuenta imperfecciones accidentales y tolerancias de construcción.\n\n**Disposiciones ACI 318 para el Diseño de Columnas:**\n\nEl código ACI 318 Requisitos del Código de Edificación para Hormigón Estructural proporciona pautas completas para el diseño de columnas RC:\n\n- **Relación de Refuerzo**: ρmin = 1% y ρmax = 8% del área bruta para columnas atadas; ρmin = 0.8% para columnas helicoidales.\n\n- **Refuerzo Longitudinal**: Se requieren al menos cuatro barras para columnas rectangulares y seis barras para columnas circulares.\n\n- **Refuerzo Transversal**: Se deben proporcionar estribos o helicoides para prevenir el pandeo de las barras longitudinales.\n\n- **Efectos de Esbeltez**: Para columnas con kl/r > 22, se deben aplicar factores de reducción de esbeltez a la capacidad de carga axial.\n\n**Disposiciones Eurocode 2:**\n\nEl Eurocode 2 utiliza un enfoque similar pero con límites de esbeltez diferentes:\n\n- **Columnas Cortas**: λ ≤ 15 (para secciones rectangulares) o λ ≤ 18 (para secciones circulares)\n- **Columnas Largas**: λ > los límites anteriores, requiriendo análisis de segundo orden\n\n**Pasos de Diseño para Columnas RC:**\n\n1. Determinar las cargas de diseño (fuerza axial y momentos flectores)\n2. Seleccionar las dimensiones de la columna y las propiedades del material\n3. Calcular la relación de esbeltez y clasificar la columna\n4. Realizar cálculos de resistencia para carga axial y flexión combinadas\n5. Verificar las relaciones mínimas y máximas de refuerzo\n6. Diseñar el refuerzo transversal (estribos/helicoides)\n7. Verificar los requisitos de deflexión y estabilidad\n\n**Modos de Fallo Comunes:**\n\n- **Fallo por Aplastamiento**: Ocurre en columnas cortas cuando el hormigón alcanza su resistencia a la compresión.\n- **Fallo por Pandeo**: Ocurre en columnas largas debido a la inestabilidad lateral.\n- **Fallo por Flexión**: Ocurre cuando el momento de flexión excede la capacidad de flexión, causando fallo por tracción en el refuerzo.\n- **Fallo por Corte**: Ocurre cuando las fuerzas de corte exceden la capacidad de corte, típicamente en columnas cortas y cargadas pesadamente.\n\n**Consejos Prácticos para el Diseño de Columnas:**\n\n- Utilice secciones transversales más grandes para columnas con relaciones de esbeltez altas para reducir kl/r.\n- Proporcione refuerzo lateral adecuado para reducir la longitud efectiva.\n- Utilice refuerzo helicoidal para columnas circulares para aumentar la ductilidad.\n- Considere los requisitos de excentricidad mínima incluso para cargas concéntricas.\n- Verifique el diagrama de interacción para carga axial y flexión combinadas.\n\n**Conclusión:**\n\nEl diseño de columnas RC es un aspecto complejo pero esencial de la ingeniería estructural. Entender la relación de esbeltez y la compresión excéntrica es crucial para diseñar columnas seguras y eficientes. Al seguir los códigos de diseño apropiados y considerar todos los factores relevantes, los ingenieros pueden crear columnas que funcionen de manera confiable bajo diversas condiciones de carga. Nuestra Herramienta de Diseño de Columnas RC simplifica este proceso al proporcionar cálculos instantáneos basados en los estándares ACI 318, ayudándole a diseñar columnas rápidamente y con precisión."
  }
};

export interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: keyof Translations) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageType>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as LanguageType;
    if (savedLang && Object.keys(translations).includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: keyof Translations) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
