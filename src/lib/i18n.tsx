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
    concreteNotes: "Note: Concrete volume calculations should include a waste factor to account for spillage, uneven surfaces, and over-excavation. The recommended waste percentage varies by project type: 5% for simple slabs, 10% for complex structures. Always round up to the nearest full bag when ordering."
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
    concreteNotes: "注意：混凝土体积计算应包括损耗系数，以考虑溢出、不平表面和超挖等因素。建议的损耗百分比因项目类型而异：简单平板为5%，复杂结构为10%。订购时应向上取整到最近的整袋。"
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
    concreteNotes: "注：コンクリートの体積計算には、こぼれ、不均一な表面、過剰掘削などを考慮するためのロス係数を含める必要があります。推奨されるロス率はプロジェクトの種類によって異なります：単純なスラブは5%、複雑な構造物は10%です。注文時には常に最寄りの袋数に切り上げてください。"
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
    concreteNotes: "Nota: Los cálculos de volumen de concreto deben incluir un factor de residuo para tener en cuenta derrames, superficies irregulares y excavación excesiva. El porcentaje de residuo recomendado varía según el tipo de proyecto: 5% para losetas simples, 10% para estructuras complejas. Siempre redondee hacia arriba al saco completo más cercano al pedir."
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
