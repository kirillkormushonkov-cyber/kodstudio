import { BlogPreview } from "@/components/sections/BlogPreview";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export default async function Home() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kodstudio.dev";
  return (
    <main className="flex-1">
      <OrganizationJsonLd url={url} />
      <Hero />
      <ClientsMarquee />
      <Services />
      <FeaturedCases />
      <Stats />
      <Process />
      <TechStack />
      <Testimonials />
      <BlogPreview />
      <CTASection />
    </main>
  );
}
