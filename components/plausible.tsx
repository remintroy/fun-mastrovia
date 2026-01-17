"use client";

import Script from "next/script";

export default function PlausibleAnalytics() {
    return (
        <>
            {/* Plausible main script */}
            <Script
                strategy="afterInteractive"
                data-domain="fun.mastrovia.com"
                src="https://plausible.remin.in/js/script.outbound-links.js"
            />

            {/* Plausible queue init */}
            <Script
                id="plausible-init"
                strategy="afterInteractive"
            >
                {`
          window.plausible = window.plausible || function () {
            (window.plausible.q = window.plausible.q || []).push(arguments);
          };
        `}
            </Script>
        </>
    );
}
