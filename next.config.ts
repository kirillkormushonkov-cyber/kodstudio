import type { NextConfig } from "next";

// CSP allows: inline scripts/styles (legacy-browser detection + Tailwind),
// Cloudflare Turnstile widget, Cloudflare Insights beacon (CF auto-injects
// on kodstudio.ru), and the Yandex Maps iframe on /contacts.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com",
  "frame-src https://challenges.cloudflare.com https://yandex.ru",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Defense-in-depth: explicitly pin which origins may invoke Server
    // Actions. Same-origin works by default, but listing prod domains
    // prevents a future config change from silently widening the allow-list.
    serverActions: {
      allowedOrigins: ["kodstudio.ru", "www.kodstudio.ru"],
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
