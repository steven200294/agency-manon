import type { Metadata } from "next";
import SiteHeader from "@/components/bands/SiteHeader";
import SiteFooter from "@/components/bands/SiteFooter";
import { AgencePage } from "@/components/cases/KitPages";
import { AGENCE_PAGE } from "@/content/kit";

export const metadata: Metadata = { title: AGENCE_PAGE.metaTitle };

export default function Page() {
  return (
    <div className="page-canvas">
      <SiteHeader />
      <div className="page-content">
        <main className="case-page">
          <AgencePage />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
