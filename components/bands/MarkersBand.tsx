import CountUp from "@/components/primitives/CountUp";
import FaceBubbles from "@/components/primitives/FaceBubbles";
import {
  MARKERS,
  MARKERS_FOOTNOTE,
  MARKERS_TITLE,
  MARKER_FACES,
} from "@/content/site";

/* ==========================================================================
   BANDE 3 sur 13 — `div.framer-1ra32b7`  ·  les repères chiffrés

   Aucun fond propre. Colonne centrée alignée en haut, écart 56px,
   padding 120px en haut et 40px sur les côtés, largeur max 1240px.

   Structure mesurée dans le squelette :
     `div.framer-dfhdqs [flex row, gap 24px, align-items: center]`
       → paires `[flex column, gap 2px]`

   C'EST LE SEUL GABARIT À QUATRE COLONNES DU RELEVÉ, et le document compte
   exactement quatre repères. Après avoir servi au manifeste puis avoir été
   partagée avec le bloc de l'émission, cette bande retrouve enfin le contenu
   pour lequel elle a été mesurée : une rangée de quatre chiffres.

   L'écart de 2px entre le chiffre et sa légende est mesuré : c'est ce qui
   les soude visuellement en une seule unité de lecture.

   Le manifeste occupe la même géométrie plus bas dans la page. Deux sections
   partagent donc ce gabarit — le relevé n'en compte que treize, et le
   document en demande douze plus un pied de page. Voir MISSING.md.
   ========================================================================== */

export default function MarkersBand() {
  return (
    <section className="band-stats markers-band">
      {/* NON MESURÉ — ajout demandé. Les visages entourent les chiffres :
          ils apparaissent à l'entrée dans l'écran et dérivent au défilement.
          Ils sont posés en fond de la bande, sous le contenu et sans prise
          au clic. Photos à fournir dans `MARKER_FACES`. */}
      <FaceBubbles sources={MARKER_FACES} />

      <h2 className="t-h2">{MARKERS_TITLE}</h2>

      {/* `div.framer-dfhdqs [flex row, gap 24px, align-items: center]` */}
      <div className="markers__row">
        {MARKERS.map((marker) => (
          /* `div.framer-1198l0u [flex column, gap 2px]` */
          <div key={marker.label} className="markers__item">
            <CountUp value={marker.value} className="t-h3-stat markers__value" />
            <p className="t-body">{marker.label}</p>
          </div>
        ))}
      </div>

      <div className="markers__footnote">
        {MARKERS_FOOTNOTE.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}
