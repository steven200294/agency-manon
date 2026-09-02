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
      <div className="band-head">
        {/* Le surtitre en capitales espacées est retiré, et le titre avec.
            « VUES À LA TÉLÉVISION » au-dessus de « QUI VEUT ÊTRE MON
            ASSOCIÉ ? », les deux en capitales, se disputaient le même rôle :
            deux titres l'un sur l'autre n'en font aucun.

            Le nom de l'émission redevient le titre de la section, en casse
            normale ; la mention de la diffusion passe en chapô, où elle
            informe au lieu de crier. */}
        <h2 className="t-h2">{TV.title}</h2>
        <p className="band-head__lede">{TV.lead}</p>
      </div>

      <div className="tv">
        {/* La déclaration porte la section. C'est la seule phrase de la page
            qui relie la marque à l'investisseur — elle mérite le corps
            d'affichage, pas une ligne de capitales centrées. */}
        <p className="statement statement--wide">{TV.statement}</p>

        {/* ⚠ TROIS MARQUES À FOURNIR. Le document laisse les emplacements
            ouverts ; ils sont composés comme la liste des clients pour que
            l'attente ne ressemble pas à une panne. */}
        <ul className="roster tv__roster">
          {TV.brands.map((brand) => (
            <li key={brand} className="roster__name">
              {brand}
            </li>
          ))}
        </ul>
      </div>

      <div className="band-foot">
        <ButtonNav>{TV.ctaLabel}</ButtonNav>
      </div>
    </section>
  );
}
