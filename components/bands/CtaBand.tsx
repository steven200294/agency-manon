import { ButtonPrimary } from "@/components/primitives/Buttons";
import { FINAL_CTA } from "@/content/site";

/* ==========================================================================
   BANDE 12 sur 13 — `div.framer-3w4l57`  ·  SECTION 10, l'appel final

   Aucun fond propre. Rangée centrée, écart 10px — le plus serré du
   document —, padding 120px en haut et 40px sur les côtés, largeur max
   1240px, `overflow: clip`.

   C'est ici qu'est placé le SEUL DÉGRADÉ de la page, `div.framer-rfpz8s` :
   colonne centrée, padding latéral 80px, écart 10px, rayon 32px,
   `overflow: hidden`.

   L'écart de 10px du bloc dégradé est exactement celui de la bande, et la
   bande est une rangée centrée sans autre contenu mesuré : le bloc y tient
   naturellement seul. Le relevé ne dit pas explicitement dans quelle bande
   il se trouve — c'est la lecture la plus cohérente avec les valeurs.

   Le titre est le h1 variante 2 sur 2 (64px), qui est aussi le corps de
   l'emphase — les deux se raccordent sans décrochement.
   ========================================================================== */

export default function CtaBand() {
  return (
    <section className="band-cta">
      {/* Le bloc ne porte AUCUN padding vertical mesuré : seuls ses 80px
          latéraux le sont. Sa hauteur est donc donnée par son contenu et par
          l'écart de 10px. */}
      <div className="panel-gradient final-cta w-full">
        <h1 className="t-h1-display">
          {FINAL_CTA.titleBefore}
          {FINAL_CTA.titleEmphasis}
          {FINAL_CTA.titleAfter}
        </h1>

        <p className="final-cta__subtitle">{FINAL_CTA.subtitle}</p>

        <p className="final-cta__body">{FINAL_CTA.body}</p>

        <p className="final-cta__reassurance">{FINAL_CTA.reassurance}</p>

        {/* La flèche collée au libellé est retirée, comme sur les autres
            appels de la page : le bouton est déjà un bouton, la flèche ne
            disait rien de plus que sa forme. */}
        <ButtonPrimary labelClassName="t-label" className="final-cta__button">
          {FINAL_CTA.ctaLabel}
        </ButtonPrimary>
      </div>
    </section>
  );
}
