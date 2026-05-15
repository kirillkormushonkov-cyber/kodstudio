import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackgroundDecor } from "@/components/system/BackgroundDecor";
import { MatrixRain } from "@/components/system/MatrixRain";
import { CustomCursor } from "@/components/system/CustomCursor";
import { LenisProvider } from "@/components/system/LenisProvider";
import { PageTransition } from "@/components/system/PageTransition";
import { SkipToContent } from "@/components/system/SkipToContent";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kodstudio.dev";
const SITE_NAME = "KodStudio";
const TITLE = "KodStudio — Software Studio";
const DESCRIPTION =
  "Дизайн-студия и команда инженеров. Проектируем, разрабатываем и развиваем продукты — от лендингов до сложных веб-приложений.";

export const viewport: Viewport = {
  themeColor: "#0A0A14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · KodStudio",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "веб-студия",
    "разработка сайтов",
    "дизайн",
    "Next.js",
    "React",
    "KodStudio",
    "software studio",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var ok=window.CSS&&CSS.supports&&CSS.supports('color','color-mix(in srgb, red, blue)');if(!ok)document.documentElement.setAttribute('data-legacy-browser','1');}catch(e){document.documentElement.setAttribute('data-legacy-browser','1');}})();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `#legacy-browser-fallback{display:none}html[data-legacy-browser] body>*:not(#legacy-browser-fallback){display:none !important}html[data-legacy-browser] #legacy-browser-fallback{display:block !important;position:fixed;top:0;left:0;right:0;bottom:0;background:#0a0a14;color:#f4f4f8;z-index:99999;overflow:auto;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased}`,
          }}
        />
      </head>
      <body className="bg-bg-base text-text-primary font-sans flex min-h-screen flex-col antialiased">
        <div id="legacy-browser-fallback">
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              padding: "48px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                margin: "0 auto 32px",
                borderRadius: "16px",
                background: "#6b5bff",
                color: "#fff",
                fontSize: "44px",
                fontWeight: "bold",
                lineHeight: "72px",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              K
            </div>
            <h1
              style={{
                fontSize: "28px",
                margin: "0 0 16px",
                fontWeight: "bold",
                color: "#f4f4f8",
              }}
            >
              Браузер устарел
            </h1>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0 0 12px",
                color: "#a1a1b5",
              }}
            >
              Сайт KodStudio использует современные веб-технологии и требует
              свежую версию браузера.
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0 0 32px",
                color: "#a1a1b5",
              }}
            >
              Обновите ваш браузер до последней версии или установите один из
              современных:
            </p>
            <div
              style={{
                display: "block",
                margin: "0 0 32px",
              }}
            >
              <a
                href="https://www.google.com/chrome/"
                style={{
                  display: "inline-block",
                  margin: "6px",
                  padding: "12px 24px",
                  background: "#6b5bff",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Google Chrome
              </a>
              <a
                href="https://www.microsoft.com/edge"
                style={{
                  display: "inline-block",
                  margin: "6px",
                  padding: "12px 24px",
                  background: "#1a1a2e",
                  color: "#f4f4f8",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "15px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                Microsoft Edge
              </a>
              <a
                href="https://www.mozilla.org/firefox/"
                style={{
                  display: "inline-block",
                  margin: "6px",
                  padding: "12px 24px",
                  background: "#1a1a2e",
                  color: "#f4f4f8",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "15px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                Firefox
              </a>
            </div>
            <div
              style={{
                paddingTop: "24px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                fontSize: "14px",
                color: "#a1a1b5",
                lineHeight: "1.6",
              }}
            >
              <p style={{ margin: "0 0 8px" }}>
                Если обновить браузер не получается — свяжитесь с нами напрямую:
              </p>
              <p style={{ margin: "0" }}>
                <a
                  href="mailto:hello@kodstudio.dev"
                  style={{ color: "#8b5cf6", textDecoration: "none" }}
                >
                  hello@kodstudio.dev
                </a>
              </p>
            </div>
          </div>
        </div>
        <SkipToContent />
        <BackgroundDecor />
        <MatrixRain />
        <LenisProvider>
          <CustomCursor />
          <Header />
          <div
            id="main-content"
            tabIndex={-1}
            className="flex flex-1 flex-col outline-none"
          >
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </LenisProvider>
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
