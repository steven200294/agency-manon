import ImageBox from "@/components/primitives/ImageBox";
import { ButtonNav } from "@/components/primitives/Buttons";
import { FOUNDER } from "@/content/site";

/* ==========================================================================
   BANDE 8 sur 13 — `div.framer-c45up6`  ·  SECTION 8, signature fondatrice

   Aucun fond propre. Colonne centrée alignée en haut, écart 72px,
   padding 120px en haut et 40px sur les côtés.
   Seule bande du document dont la largeur maximale est 1400px.

   Structure mesurée dans le squelette :

     div.framer-dplkph  [flex row, gap 56px]
       div.framer-1xl49vv  [flex row, gap 10px, center]  → portrait
       div.framer-1h4my8h  [flex column, gap 32px]       → texte

   Portrait à gauche, parole à droite : c'est exactement ce que demande une
   signature de fondatrice, et c'est ce que le relevé mesure. C'est la bande
   où le contenu réel et la structure mesurée se recouvrent le mieux.

   Le portrait est posé dans le médaillon mesuré (boîte 2 sur 4) : rayon
   100px, liseré interne clair, ombre portée.
   ========================================================================== */

export default function FounderBand() {
  return (
    <section className="band-founder" id="agence">
      <h2 className="t-h2">{FOUNDER.title}</h2>

      {/* `div.framer-dplkph [flex row, gap 56px]` */}
      <div className="founder">
        {/* `div.framer-1xl49vv [flex row, gap 10px, center]` */}
        <div
          className="flex shrink-0 flex-row items-center justify-center"
          style={{ gap: "10px" }}
        >
          <div className="medallion">
            <ImageBox
              label={FOUNDER.portraitLabel}
              width="320px"
              variant="media-sm"
            />
          </div>
        </div>

        {/* `div.framer-1h4my8h [flex column, gap 32px]` */}
        <div className="flex flex-1 flex-col" style={{ gap: "32px" }}>
          <blockquote className="founder__quote">
            <p>« {FOUNDER.quote} »</p>
          </blockquote>

          <p className="founder__attribution">{FOUNDER.attribution}</p>

          <div>
            <ButtonNav>{FOUNDER.ctaLabel} →</ButtonNav>
          </div>
        </div>
      </div>
    </section>
  );
}
