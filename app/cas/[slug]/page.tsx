import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/bands/SiteHeader";
import SiteFooter from "@/components/bands/SiteFooter";
import ZinAmaraCase from "@/components/cases/ZinAmaraCase";
import BniCase from "@/components/cases/BniCase";
import { BNI, ZINAMARA } from "@/content/cases";

/* Une page par cas client, générée à la construction. Le slug vient de
   content/cases.ts ; un slug inconnu renvoie une 404. */
const PAGES = {
  [ZINAMARA.slug]: {
    Component: ZinAmaraCase,
    title: `${ZINAMARA.client} — cas client`,
    description: ZINAMARA.metaDescription,
  },
  [BNI.slug]: {
    Component: BniCase,
    title: `${BNI.client} — cas client`,
    description: BNI.metaDescription,
  },
} as const;

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/cas/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = PAGES[slug as keyof typeof PAGES];
  return page ? { title: page.title, description: page.description } : {};
}

export default async function CasePage(props: PageProps<"/cas/[slug]">) {
  const { slug } = await props.params;
  const page = PAGES[slug as keyof typeof PAGES];
  if (!page) notFound();
  const { Component } = page;

  return (
    <div className="page-canvas">
      <SiteHeader />
      <div className="page-content">
        <main className="case-page">
          <Component />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
