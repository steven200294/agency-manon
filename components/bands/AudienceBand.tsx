import { ButtonPrimary } from "@/components/primitives/Buttons";
import { AUDIENCE, AUDIENCES } from "@/content/site";

/* ==========================================================================
   BANDE 4 sur 13 — `div.framer-35fqpn`  ·  SECTION 4, pour qui

   Aucun fond propre. Même gabarit que la bande 3, sans `overflow: hidden`.

   Structure mesurée dans le squelette :
     `div.framer-1gpxn4z [flex row, gap 24px]`
       → 3 × `div.framer-11wqwu7` → boîte 4 sur 4 (`.card`)

   La carte apporte ses valeurs mesurées : padding 32px, écart interne 24px,
   rayon 28px, fond de carte, ombre portée.

   ÉCART : le relevé mesure une rangée de TROIS cartes, le document décrit
   QUATRE publics. La rangée se replie en 2 + 2 — un partage régulier, alors
   qu'une rangée de trois aurait laissé une carte seule. Voir MISSING.md.
   ========================================================================== */

export default function AudienceBand() {
  return (
    <section className="band-solutions">
      <div className="flex w-full flex-col items-center" style={{ gap: "16px" }}>
        <h2 className="t-h2">{AUDIENCE.title}</h2>
        <p className="t-intro">{AUDIENCE.subtitle}</p>
      </div>

      <div className="band-cards-2">
        {AUDIENCES.map((item) => (
          <article key={item.title} className="card band-cards-2__item">
            <div className="flex flex-col" style={{ gap: "8px" }}>
              <h4
                className="t-h4"
                style={{ fontSize: "26px", lineHeight: "33.8px" }}
              >
                {item.title}
              </h4>
              <p className="t-body">{item.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col items-center" style={{ gap: "20px" }}>
        <p className="t-intro">{AUDIENCE.ctaLead}</p>
        <ButtonPrimary labelClassName="t-label">
          {AUDIENCE.ctaLabel} →
        </ButtonPrimary>
      </div>
    </section>
  );
}
