import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
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
      <body className="bg-bg-base text-text-primary font-sans flex min-h-screen flex-col antialiased">
        <SkipToContent />
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
