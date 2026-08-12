import ImageBox from "@/components/primitives/ImageBox";
import CountUp from "@/components/primitives/CountUp";
import { ButtonNav } from "@/components/primitives/Buttons";
import { UGC, UGC_BRANDS, UGC_FIGURES } from "@/content/site";

/* ==========================================================================
   BANDE 6 sur 13 — `div.framer-16jxr11`  ·  SECTION 6, focus UGC

   Aucun fond propre. Même gabarit que les bandes 3 à 5.

   C'est la bande que le squelette détaille le plus précisément :

     div.framer-16jxr11  [flex column, gap 56px, align-items: center]
       section  [flex row]
         ul.framer--carousel  [flex row, gap 32px, align-items: center]
       a  [flex row, gap 10px, center]

   Le carrousel mesuré reçoit ici le bandeau de logos UGC, et le lien final
   la sortie vers l'offre — exactement les deux rôles que la structure
   prévoit. Le reste de la section, plus long que ce que le relevé décrit,
   s'empile au-dessus dans la colonne à écart 56px.

   Le carrousel n'est PAS animé : la section « Motion engines » du relevé a
   été retirée du document. Voir motion.css.
   ========================================================================== */

export default function UgcBand() {
  return (
    <section className="band-team" id="ugc">
      <div className="flex w-full flex-col items-center" style={{ gap: "12px" }}>
        <h2 className="t-h2">{UGC.title}</h2>
        <h2 className="t-h2-accent" style={{ textAlign: "center" }}>
          {UGC.subtitle}
        </h2>
      </div>

      <div className="ugc">
        {/* Ce que c'est */}
        <div className="ugc__block">
          <h3 className="ugc__block-title">{UGC.whatTitle}</h3>
          <p className="t-intro ugc__text">{UGC.what}</p>
          <div className="ugc__antitheses">
            {UGC.whatLines.map((line) => (
              <p key={line} className="ugc__antithesis">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Pourquoi ça marche */}
        <div className="ugc__block">
          <h3 className="ugc__block-title">{UGC.whyTitle}</h3>
          <p className="t-intro ugc__text">{UGC.why}</p>
          <p className="ugc__closing">{UGC.whyClosing}</p>
        </div>

        {/* La valeur ajoutée. Elle était empilée sous les deux autres ; elle
            les rejoint en troisième colonne pour que la section tienne sur un
            écran. Voir fullscreen.css. */}
        <div className="ugc__block">
          <h3 className="ugc__block-title">{UGC.valueTitle}</h3>
          <p className="t-intro ugc__text">{UGC.value}</p>
          <p className="ugc__closing">{UGC.valueClosing}</p>
        </div>
      </div>

      {/* Les quatre chiffres */}
      <div className="flex w-full flex-col items-center" style={{ gap: "20px" }}>
        <h3 className="ugc__block-title">{UGC.figuresTitle}</h3>

        <div className="ugc__figures">
          {UGC_FIGURES.map((figure) => (
            <div key={figure.value} className="ugc__figure">
              <CountUp
                value={figure.value}
                className="t-h3-stat ugc__figure-value"
              />
              <p className="t-body">{figure.label}</p>
              {figure.source ? (
                <p className="ugc__figure-source">{figure.source}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* `section [flex row]` → `ul.framer--carousel [flex row, gap 32px]`
          Le bandeau de logos UGC. Deux marques nommées dans le document, les
          autres restent des emplacements. Voir MISSING.md. */}
      <section className="flex w-full flex-row items-center">
        <ul
          className="framer--carousel flex min-w-0 flex-1 flex-row items-center justify-center flex-wrap"
          style={{ gap: "32px" }}
        >
          {UGC_BRANDS.map((brand) => (
            <li key={brand} className="medallion">
              <ImageBox label={brand} width="56px" variant="media-sm" />
            </li>
          ))}
          {[1, 2, 3].map((slot) => (
            <li key={`slot-${slot}`} className="medallion">
              <ImageBox label="À fournir" width="56px" variant="media-sm" />
            </li>
          ))}
        </ul>
      </section>

      <ButtonNav>{UGC.ctaLabel} →</ButtonNav>
    </section>
  );
}
