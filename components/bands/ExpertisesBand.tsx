import { ButtonNav } from "@/components/primitives/Buttons";
import { EXPERTISES, EXPERTISES_INTRO } from "@/content/site";

/* ==========================================================================
   BANDE 11 sur 13 — `div.framer-1skweis`  ·  SECTION 7, les expertises

   Aucun fond propre. La seule bande en RANGÉE du document, alignée en haut,
   écart 48px, padding latéral 40px, largeur max 1240px, aucun padding
   vertical.

   DEUX ÉCARTS, tous les deux liés à la piste :

   — la bande est repassée en COLONNE. Une rangée de deux colonnes ne porte
     pas un titre, une piste et un bouton ;
   — la piste s'échappe de la largeur maximale de 1240px pour aller toucher
     les deux bords de l'écran (`width: 100vw` recentré). C'est ce qui lui
     donne le débordement qu'une piste doit avoir : si elle s'arrêtait à
     1240px, rien n'indiquerait qu'elle continue.

   Cinq cartes ne se répartissent proprement sur aucune grille à trois ou
   quatre colonnes — d'où la piste plutôt qu'une grille. Voir MISSING.md.
   ========================================================================== */

export default function ExpertisesBand() {
  return (
    <section className="band-faq expertises-band" id="expertises">
      <div className="band-head">
        <h2 className="t-h2">{EXPERTISES_INTRO.title}</h2>
        <p className="band-head__lede">{EXPERTISES_INTRO.lede}</p>
      </div>

      {/* Le carrousel est abandonné. Il rognait ses cartes des deux côtés sans
          affordance : la première et la dernière étaient coupées en plein
          milieu, ce qui se lisait comme un débordement, pas comme une piste
          qu'on fait défiler.

          Les numéros aussi : « 01 → 05 » sur cinq métiers qui ne se suivent
          pas dans un ordre. La méthode, elle, garde les siens — ce sont
          quatre étapes. Voir `.ledger` dans lower-bands.css. */}
      <ul className="ledger ledger--offers">
        {EXPERTISES.map((item) => (
          <li key={item.number} className="ledger__row">
            <h3 className="ledger__title">{item.title}</h3>
            <p className="ledger__body">{item.body}</p>
            {item.tag ? <span className="ledger__note">{item.tag}</span> : null}
          </li>
        ))}
      </ul>

      <div className="band-foot">
        <ButtonNav>{EXPERTISES_INTRO.ctaLabel}</ButtonNav>
      </div>
    </section>
  );
}
