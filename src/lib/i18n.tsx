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
  privacyGoogleAdSense: string;
  privacyCookies: string;
  privacyGDPR: string;
  privacyCCPA: string;
  privacyDataSecurity: string;
  privacyChanges: string;
  privacyContact: string;
  
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
  aboutExperience: string;
  aboutTechnology: string;
  aboutCommitment: string;
  
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
    privacyGoogleAdSense: "Google AdSense: Our website uses Google AdSense to display ads. Google AdSense may collect information about your visits to this and other websites in order to provide targeted advertisements about goods and services of interest to you. Google AdSense uses cookies and other tracking technologies to collect this information. You can learn more about Google's privacy practices and how to opt out by visiting Google's Privacy Policy.",
    privacyCookies: "Cookies: We use cookies to enhance your experience on our website. Cookies are small data files that are stored on your device. You can disable cookies in your browser settings, but this may affect the functionality of our website.",
    privacyGDPR: "GDPR Compliance: For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at the email address provided below.",
    privacyCCPA: "CCPA Compliance: For users in California, we comply with the California Consumer Privacy Act (CCPA). You have the right to opt out of the sale of your personal information. To exercise this right, please contact us at the email address provided below.",
    privacyDataSecurity: "Data Security: We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.",
    privacyChanges: "Changes to This Policy: We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
    privacyContact: "Contact Us: If you have any questions or concerns about this Privacy Policy, please contact us at contact@useciviltools.com.",
    
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
    aboutExperience: "With over 20 years of combined experience in civil engineering, our team of seasoned professionals understands the challenges engineers face every day. We have worked on major infrastructure projects across the globe, from skyscrapers to bridges, and we bring that expertise to every tool we create.",
    aboutTechnology: "We leverage cutting-edge web technologies to deliver tools that are both powerful and accessible. Our tools are designed with the modern engineer in mind, featuring intuitive interfaces and comprehensive calculation capabilities.",
    aboutCommitment: "We are committed to continuous improvement and innovation. We regularly update our tools based on user feedback and the latest engineering standards.",
    
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
    
    language: "Language"
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
    privacyGoogleAdSense: "Google AdSense：我们的网站使用Google AdSense显示广告。Google AdSense可能收集您访问本网站和其他网站的信息，以便提供您可能感兴趣的商品和服务的定向广告。Google AdSense使用cookies和其他跟踪技术来收集这些信息。您可以访问Google的隐私政策了解更多关于Google隐私实践和如何选择退出的信息。",
    privacyCookies: "Cookies：我们使用cookies来增强您在我们网站上的体验。Cookies是存储在您设备上的小型数据文件。您可以在浏览器设置中禁用cookies，但这可能会影响我们网站的功能。",
    privacyGDPR: "GDPR合规性：对于欧洲经济区（EEA）的用户，我们遵守通用数据保护条例（GDPR）。您有权访问、更正或删除您的个人数据。要行使这些权利，请通过下方提供的电子邮件地址联系我们。",
    privacyCCPA: "CCPA合规性：对于加利福尼亚州的用户，我们遵守加州消费者隐私法案（CCPA）。您有权选择退出出售您的个人信息。要行使此权利，请通过下方提供的电子邮件地址联系我们。",
    privacyDataSecurity: "数据安全：我们采取合理措施保护您的信息免受未经授权的访问、使用或披露。但是，互联网传输或电子存储的任何方法都不是100%安全的。",
    privacyChanges: "本政策的更改：我们可能会不时更新本隐私政策。我们将通过在此页面上发布新的隐私政策来通知您任何更改。",
    privacyContact: "联系我们：如果您对本隐私政策有任何疑问或担忧，请通过contact@useciviltools.com联系我们。",
    
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
    aboutExperience: "我们的资深专业团队拥有超过20年的土木工程经验，深知工程师每天面临的挑战。我们曾参与过全球范围内的重大基础设施项目，从摩天大楼到桥梁，我们将这些专业知识融入到我们创建的每一个工具中。",
    aboutTechnology: "我们利用前沿的网络技术提供既强大又易于访问的工具。我们的工具专为现代工程师设计，具有直观的界面和全面的计算能力。",
    aboutCommitment: "我们致力于持续改进和创新。我们会根据用户反馈和最新的工程标准定期更新我们的工具。",
    
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
    
    language: "语言"
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
    privacyGoogleAdSense: "Google AdSense：当ウェブサイトでは、広告表示のためにGoogle AdSenseを使用しています。Google AdSenseは、お客様の興味のある商品やサービスに関するターゲティング広告を提供するために、本サイトおよび他のウェブサイトへのアクセス情報を収集する場合があります。Google AdSenseはこの情報を収集するためにクッキーおよびその他の追跡技術を使用します。Googleのプライバシー慣行およびオプトアウト方法の詳細については、Googleのプライバシーポリシーをご覧ください。",
    privacyCookies: "クッキー：当社は、お客様のウェブサイトでの体験を向上させるためにクッキーを使用しています。クッキーはお客様のデバイスに保存される小さなデータファイルです。ブラウザの設定でクッキーを無効にすることができますが、これにより当ウェブサイトの機能に影響が生じる場合があります。",
    privacyGDPR: "GDPRコンプライアンス：欧州経済領域（EEA）のユーザーに対して、当社は一般データ保護規則（GDPR）に準拠しています。お客様は個人情報へのアクセス、訂正、削除の権利を有しています。これらの権利を行使するには、以下に記載のメールアドレスまでお問い合わせください。",
    privacyCCPA: "CCPAコンプライアンス：カリフォルニア州のユーザーに対して、当社はカリフォルニア消費者プライバシー法（CCPA）に準拠しています。お客様は個人情報の販売をオプトアウトする権利を有しています。この権利を行使するには、以下に記載のメールアドレスまでお問い合わせください。",
    privacyDataSecurity: "データセキュリティ：当社は、お客様の情報が未承認のアクセス、使用、または開示から保護されるよう合理的な措置を講じています。ただし、インターネット経由の送信または電子的な保存方法は100％安全ではありません。",
    privacyChanges: "本ポリシーの変更：当社は随時本プライバシーポリシーを更新する場合があります。変更があった場合、新しいプライバシーポリシーを本ページに掲載することでお知らせします。",
    privacyContact: "お問い合わせ：本プライバシーポリシーに関するご質問や懸念がある場合は、contact@useciviltools.comまでお問い合わせください。",
    
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
    aboutExperience: "土木工学における合計20年以上の経験を持つ私たちのチームは、エンジニアが毎日直面する課題を深く理解しています。私たちは世界中の主要なインフラプロジェクトに携わってきました。",
    aboutTechnology: "私たちは最先端のウェブ技術を活用して、強力かつアクセスしやすいツールを提供しています。私たちのツールは、直感的なインターフェースと包括的な計算機能を備えた、現代のエンジニアのために設計されています。",
    aboutCommitment: "私たちは継続的な改善と革新に取り組んでいます。ユーザーのフィードバックと最新の工学基準に基づいて、ツールを定期的に更新しています。",
    
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
    
    language: "言語"
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
    privacyGoogleAdSense: "Google AdSense: Nuestro sitio web utiliza Google AdSense para mostrar anuncios. Google AdSense puede recopilar información sobre sus visitas a este y otros sitios web para proporcionar anuncios dirigidos sobre bienes y servicios que le interesan. Google AdSense utiliza cookies y otras tecnologías de seguimiento para recopilar esta información. Puede obtener más información sobre las prácticas de privacidad de Google y cómo optar por no participar visitando la Política de Privacidad de Google.",
    privacyCookies: "Cookies: Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Las cookies son pequeños archivos de datos que se almacenan en su dispositivo. Puede desactivar las cookies en la configuración de su navegador, pero esto puede afectar la funcionalidad de nuestro sitio web.",
    privacyGDPR: "Cumplimiento con el RGPD: Para los usuarios en el Espacio Económico Europeo (EEE), cumplimos con el Reglamento General de Protección de Datos (RGPD). Usted tiene derecho a acceder, corregir o eliminar sus datos personales. Para ejercer estos derechos, contáctenos en la dirección de correo electrónico proporcionada a continuación.",
    privacyCCPA: "Cumplimiento con el CCPA: Para los usuarios en California, cumplimos con la Ley de Privacidad del Consumidor de California (CCPA). Usted tiene derecho a optar por no participar en la venta de su información personal. Para ejercer este derecho, contáctenos en la dirección de correo electrónico proporcionada a continuación.",
    privacyDataSecurity: "Seguridad de Datos: Tomamos medidas razonables para proteger su información contra el acceso, uso o divulgación no autorizados. Sin embargo, ningún método de transmisión por internet o almacenamiento electrónico es 100% seguro.",
    privacyChanges: "Cambios a Esta Política: Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.",
    privacyContact: "Contáctenos: Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad, contáctenos en contact@useciviltools.com.",
    
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
    aboutExperience: "Con más de 20 años de experiencia combinada en ingeniería civil, nuestro equipo de profesionales experimentados entiende los desafíos que enfrentan los ingenieros todos los días. Hemos trabajado en proyectos de infraestructura importantes en todo el mundo, desde rascacielos hasta puentes, y traemos esa experiencia a cada herramienta que creamos.",
    aboutTechnology: "Aprovechamos tecnologías web de vanguardia para ofrecer herramientas que son tanto poderosas como accesibles. Nuestras herramientas están diseñadas pensando en el ingeniero moderno, con interfaces intuitivas y capacidades de cálculo completas.",
    aboutCommitment: "Estamos comprometidos con la mejora continua y la innovación. Actualizamos regularmente nuestras herramientas basándonos en el feedback de los usuarios y los estándares de ingeniería más recientes.",
    
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
    
    language: "Idioma"
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
