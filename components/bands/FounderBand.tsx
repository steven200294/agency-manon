import { ButtonNav } from "@/components/primitives/Buttons";
import MediaSlot from "@/components/primitives/MediaSlot";
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

      {/* LE PORTRAIT N'EST PAS COMBLÉ PAR UNE PHOTO DE BANQUE D'IMAGES.

          Mettre le visage d'un inconnu sous le nom d'une personne réelle n'est
          pas un emplacement provisoire, c'est un faux. La colonne de gauche
          garde donc sa place avec un emplacement déclaré : il tient le rapport
          et l'encombrement du portrait définitif, et il dit le cadrage
          attendu, pour que le fichier fourni tombe juste du premier coup.

          Ce qu'il remplace : un médaillon vide de 320px portant la mention
          « portrait de Manon », qui ne disait ni ce qu'on attendait ni à quel
          format. Voir MediaSlot et public/brand/sections/CREDITS.md. */}
      <figure className="founder">
        <MediaSlot
          subject="Portrait de Manon Ferrandino"
          format="1000 × 1250, cadrage portrait"
          className="founder__portrait"
        />

        <div className="founder__words">
          <blockquote className="founder__quote">
            <p className="statement statement--wide">« {FOUNDER.quote} »</p>
          </blockquote>

          <figcaption className="founder__attribution">
            {FOUNDER.attribution}
          </figcaption>
        </div>
      </figure>

      <div className="band-foot">
        <ButtonNav>{FOUNDER.ctaLabel}</ButtonNav>
      </div>
    </section>
  );
}
