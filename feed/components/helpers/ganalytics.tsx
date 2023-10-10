"use client";

import Script from "next/script";

export default function GoogleAnalytics({ GA_TRACKING_ID }: { GA_TRACKING_ID: string }) {
  return (
    <>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-VRCDSH2VPX"/>
      <Script strategy="afterInteractive" id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', "${GA_TRACKING_ID}");
        `}
      </Script>
    </>
  );
};