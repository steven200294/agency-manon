import Image from "next/image";
import MediaSlot from "@/components/primitives/MediaSlot";
import { AGENCE_PAGE as A, EXPERTISES_PAGE as E } from "@/content/kit";
import { CaseCta, CaseHero, CaseSection } from "./CaseParts";

/* Les deux pages du kit média. Elles réemploient la mise en page des cas
   clients (`.case-page`) : même colonne, mêmes titres, même appel final. */

function Cards({
  items,
}: {
  items: readonly { name: string; body: readonly string[] }[];
}) {
  return (
    <ul className="phases">
      {items.map((item) => (
        <li key={item.name}>
          <h3>{item.name}</h3>
          {item.body.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </li>
      ))}
    </ul>
  );
}

export function ExpertisesPage() {
  return (
    <>
      <CaseHero kicker={E.kicker} client="The Trace Agency" title={E.title} />
      <CaseSection title="Nos expertises">
        <Cards items={E.expertises} />
      </CaseSection>
      <CaseSection title={E.detail.title}>
        <p className="case-body case-body--intro">{E.detail.body}</p>
      </CaseSection>
      <CaseSection title={E.solutionsTitle}>
        <p className="case-body">{E.solutionsIntro}</p>
        <Cards items={E.solutions} />
      </CaseSection>
      <CaseCta />
    </>
  );
}

export function AgencePage() {
  return (
    <>
      <CaseHero kicker={A.kicker} client="The Trace Agency" title={A.title} />
      <CaseSection>
        <div className="case-stats">
          {A.portraits.map((p) =>
            p.src ? (
              <Image
                key={p.subject}
                src={p.src}
                alt={p.alt ?? p.subject}
                width={574}
                height={460}
                sizes="(max-width: 809px) 50vw, 300px"
                style={{ aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "58% 15%" }}
              />
            ) : (
              <MediaSlot
                key={p.subject}
                subject={p.subject}
                format={p.format}
                ratio="4 / 5"
              />
            ),
          )}
        </div>
        {A.intro.map((text) => (
          <p key={text} className="case-body case-body--intro">
            {text}
          </p>
        ))}
      </CaseSection>
      <CaseSection title={A.expertiseTitle}>
        <ul className="pillar-cols">
          {A.expertise.map((text) => (
            <li key={text}>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </CaseSection>
      <CaseSection title={A.adnTitle}>
        <p className="case-body case-body--intro">{A.adn}</p>
      </CaseSection>
      <CaseCta />
    </>
  );
}
