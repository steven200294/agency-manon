import Image from "next/image";
import { ZINAMARA as Z } from "@/content/cases";
import {
  CaseHero,
  CaseSection,
  ClosingBlock,
  ConceptBlock,
  RecapTable,
} from "./CaseParts";

export default function ZinAmaraCase() {
  return (
    <>
      <CaseHero kicker={Z.kicker} client={Z.client} title={Z.title} />

      <CaseSection title={Z.stats.title}>
        <div className="case-stats">
          {Z.stats.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 809px) 50vw, 300px"
            />
          ))}
        </div>
        <p className="case-caption">{Z.stats.caption}</p>
        {Z.stats.body.map((text) => (
          <p key={text} className="case-body">
            {text}
          </p>
        ))}
      </CaseSection>

      <CaseSection title={Z.angle.title}>
        {/* L'ordre est annoncé une fois, puis tenu sur chaque bloc. */}
        <ol className="case-order" aria-label="Ordre de chaque bloc">
          {Z.angle.order.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        {Z.angle.intro.map((text) => (
          <p key={text} className="case-body case-body--intro">
            {text}
          </p>
        ))}
      </CaseSection>

      <CaseSection title={Z.conceptsTitle}>
        {Z.pillars.map((pillar) => (
          <div key={pillar.name} className="pillar">
            <h3 className="pillar__title">
              <span className="pillar__label">
                Pilier {pillar.number} · {pillar.name}
              </span>
              <em>{pillar.tagline}</em>
            </h3>
            {pillar.concepts.map((item) => (
              <ConceptBlock key={item.number} item={item} />
            ))}
          </div>
        ))}
      </CaseSection>

      <CaseSection title={Z.method.title}>
        <p className="case-body case-body--intro">{Z.method.intro}</p>
        <ol className="phases">
          {Z.method.phases.map((phase) => (
            <li key={phase.number}>
              <span className="phases__number">{phase.number}</span>
              <h3>{phase.name}</h3>
              <p>{phase.text}</p>
            </li>
          ))}
        </ol>

        <h3 className="case-subtitle">{Z.method.pillarsTitle}</h3>
        <ul className="pillar-cols">
          {Z.method.pillars.map((pillar) => (
            <li key={pillar.name}>
              <h4>{pillar.name}</h4>
              <p>{pillar.text}</p>
            </li>
          ))}
        </ul>
        <p className="case-body">{Z.method.link}</p>

        <h3 className="case-subtitle">{Z.method.recapTitle}</h3>
        <RecapTable head={["Concept", "Pilier"]} rows={Z.method.recap} />
        <p className="case-body">{Z.method.recapNote}</p>
      </CaseSection>

      <ClosingBlock title={Z.closing.title} body={Z.closing.body} />
    </>
  );
}
