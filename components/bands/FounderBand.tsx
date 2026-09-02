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
      <div className="band-head">
        <h2 className="t-h2">{FOUNDER.title}</h2>
      </div>

      {/* LE PORTRAIT EST RETIRÉ, PAS REMPLACÉ.

          L'emplacement affichait un médaillon vide de 320px portant la
          mention « portrait de Manon » : une boîte grise à côté d'une
          citation, qui déséquilibrait la section sans rien montrer.

          Il n'est pas comblé par une photo de banque d'images : mettre le
          visage d'un inconnu sous le nom d'une personne réelle n'est pas un
          emplacement provisoire, c'est un faux. La citation porte donc la
          section seule — et le jour où le vrai portrait arrive, il reprend la
          colonne de gauche que la grille lui garde. Voir
          public/brand/sections/CREDITS.md. */}
      <figure className="founder">
        <blockquote className="founder__quote">
          <p className="statement statement--wide">« {FOUNDER.quote} »</p>
        </blockquote>

        <figcaption className="founder__attribution">
          {FOUNDER.attribution}
        </figcaption>
      </figure>

      <div className="band-foot">
        <ButtonNav>{FOUNDER.ctaLabel}</ButtonNav>
      </div>
    </section>
  );
}
