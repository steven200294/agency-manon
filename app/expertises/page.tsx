import type { Metadata } from "next";
import SiteHeader from "@/components/bands/SiteHeader";
import SiteFooter from "@/components/bands/SiteFooter";
import { ExpertisesPage } from "@/components/cases/KitPages";
import { EXPERTISES_PAGE } from "@/content/kit";

export const metadata: Metadata = { title: EXPERTISES_PAGE.metaTitle };

export default function Page() {
  return (
    <div className="page-canvas">
      <SiteHeader />
      <div className="page-content">
        <main className="case-page">
          <ExpertisesPage />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
