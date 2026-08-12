import { CONSTAT, CONSTAT_CARDS } from "@/content/site";

/* ==========================================================================
   BANDE 2 sur 13 — `div.framer-2jno83`  ·  SECTION 2, le constat

   Aucun fond propre. La bande la plus étroite du document (1120px) et la
   seule sans padding vertical — elle se colle au bloc d'accroche.

   ÉCART : le relevé mesure une COLONNE centrée, écart 56px. La bande passe
   ici en deux colonnes — le texte à gauche, deux visuels à droite.

   La colonne de droite a d'abord porté une piste défilante, elle-même
   empruntée à un composant apporté séparément. Elle porte maintenant DEUX
   BOÎTES SUPERPOSÉES, pivotées en sens inverse : c'est une demande
   explicite, et le compte est plus juste — deux visuels à montrer, pas cinq
   cadres à remplir. Le détail du mécanisme est dans `content.css`.
   ========================================================================== */

export default function ConstatBand() {
  return (
    <section className="band-testimonials-intro constat-band">
      {/* Colonne de gauche — le texte. Il est bâti sur une rupture : trois
          constats plats, un pivot, une définition. La mise en page suit ce
          rythme plutôt que de tout aplatir en un paragraphe. */}
      <div className="constat">
        <span className="badge">{CONSTAT.badge}</span>

        <h2 className="t-h2-left constat__title">{CONSTAT.title}</h2>

        <div className="constat__lines">
          {CONSTAT.lines.map((line) => (
            <p key={line} className="constat__line">
              {line}
            </p>
          ))}
        </div>

        <p className="constat__pivot">{CONSTAT.pivot}</p>

        <p className="t-body constat__closing">
          {CONSTAT.closing}
          <em className="constat__term">{CONSTAT.closingEmphasis}</em>
        </p>
      </div>

      {/* Colonne de droite — deux boîtes superposées, pivotées en sens
          inverse. Elle remplace la piste défilante, à la demande.

          Le carrousel n'était pas mesuré non plus : le relevé donne une
          colonne centrée, et la piste venait d'un composant apporté à côté.
          On échange donc un écart contre un autre, et celui-ci a l'avantage
          de tenir en deux images au lieu de cinq — l'agence en a deux à
          montrer, pas cinq.

          L'ordre du contenu EST l'ordre de profondeur : la première carte
          part derrière et pivote vers la gauche, la seconde passe devant et
          pivote vers la droite. */}
      <div className="constat__stack">
        {CONSTAT_CARDS.map((card, index) => (
          <div
            key={card.label}
            className={`constat__card constat__card--${index === 0 ? "back" : "front"}`}
          >
            {card.src ? (
              // Image nue, comme partout dans le projet : next/image poserait
              // son wrapper et ses styles par-dessus le cadre pivoté.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.src}
                alt={card.label}
                className="constat__card-image"
                loading="lazy"
              />
            ) : (
              <div
                className="constat__card-slot"
                role="img"
                aria-label={`Emplacement d'image : ${card.label}`}
              >
                <span className="media-frame__label">{card.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
