export function OrganizationJsonLd({ url }: { url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KodStudio",
    url,
    logo: `${url}/icon.svg`,
    description:
      "Студия дизайна и инженерии. Проектируем и разрабатываем сайты, Telegram-боты и мобильные приложения.",
    sameAs: [
      "https://t.me/kodstudio",
      "https://github.com/kodstudio",
      "https://behance.net/kodstudio",
      "https://linkedin.com/company/kodstudio",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@kodstudio.dev",
      availableLanguage: ["Russian", "English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
