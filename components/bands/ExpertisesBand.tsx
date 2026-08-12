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
      <div className="flex w-full flex-col items-center" style={{ gap: "16px" }}>
        <h2 className="t-h2">{EXPERTISES_INTRO.title}</h2>
        <p className="t-intro">{EXPERTISES_INTRO.lede}</p>
      </div>

      <div className="expertises">
        <ul className="expertises__rail">
          {EXPERTISES.map((item) => (
            <li key={item.number} className="card expertise">
              <div className="expertise__head">
                <span className="expertise__number">{item.number}</span>
                {item.tag ? (
                  <span className="expertise__tag">{item.tag}</span>
                ) : null}
              </div>

              <div className="flex flex-col" style={{ gap: "8px" }}>
                <h4
                  className="t-h4"
                  style={{ fontSize: "24px", lineHeight: "31.2px" }}
                >
                  {item.title}
                </h4>
                <p className="t-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ButtonNav>{EXPERTISES_INTRO.ctaLabel} →</ButtonNav>
    </section>
  );
}
