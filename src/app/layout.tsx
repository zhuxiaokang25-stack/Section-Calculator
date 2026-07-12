import ClientLayout from "./ClientLayout";
import "../styles/globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" href="https://useciviltools.com/sitemap.xml" />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
        
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C64RKCG9TV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C64RKCG9TV');
          `}
        </Script>
      </body>
    </html>
  );
}
