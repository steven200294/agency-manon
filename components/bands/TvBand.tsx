import { ButtonNav } from "@/components/primitives/Buttons";
import { TV } from "@/content/site";

/* ==========================================================================
   BANDE 11 sur 13 — `section.framer-4whkl4`  ·  SECTION 9b, l'émission

   Aucun fond propre. Pleine largeur, colonne doublement centrée, aucun
   padding, écart 30px — le plus serré du document. C'est aussi la bande la
   plus haute : 1616px mesurés, ce qui laisse la place aux deux blocs de
   cette section.

   Trois rôles typographiques n'existent QUE dans cette bande, et le relevé
   le dit explicitement (« vue dans : section “EN SAVOIR PLUS SUR” ») :

     — h3 variante 2 sur 2 — 30px, capitales, interligne 70px, centré
     — h2 variante 1 sur 4 — 50px, graisse 500, capitales, interligne 39px
     — h5 — 24px, graisse 500, capitales, interligne 34px

   Ils tombent exactement sur le bloc « Qui veut être mon associé ? » : un
   surtitre, un nom d'émission en capitales, une phrase de positionnement.
   L'interligne de 39px pour un corps de 50px fait volontairement se
   chevaucher les lignes du grand titre — c'est une décision, pas une
   coquille, et elle est reprise telle quelle.

   Les quatre repères chiffrés qui ouvraient cette bande en sont sortis : ils
   ont désormais leur propre section, juste après la deuxième. Voir
   MarkersBand.
   ========================================================================== */

export default function TvBand() {
  return (
    <section className="band-learn-more">
      <h3 className="t-h3-eyebrow">{TV.eyebrow}</h3>

      <h2 className="t-h2-caps">{TV.title}</h2>

      <p className="t-intro" style={{ maxWidth: "620px" }}>
        {TV.lead}
      </p>

      {/* Trois marques restent à fournir : le document laisse les
          emplacements ouverts. */}
      <ul className="tv__brands">
        {TV.brands.map((brand) => (
          <li key={brand} className="tv__brand">
            {brand}
          </li>
        ))}
      </ul>

      <h5 className="t-h5" style={{ maxWidth: "820px" }}>
        {TV.statement}
      </h5>

      <ButtonNav>{TV.ctaLabel} →</ButtonNav>
    </section>
  );
}
