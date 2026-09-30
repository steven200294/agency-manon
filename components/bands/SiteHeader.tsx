import Link from "next/link";
import { ButtonPrimary } from "@/components/primitives/Buttons";
import Logo from "@/components/primitives/Logo";
import MobileMenu from "@/components/primitives/MobileMenu";
import { NAV, WHATSAPP_LABEL, WHATSAPP_URL } from "@/content/site";

/* ==========================================================================
   BANDE 1 sur 13 — l'en-tête

   Deux relevés se recoupent ici :

   — celui de la page longue donne la bande : `header.framer-r2wtb`, fond
     Nuit à 80 %, hauteur 64px, padding vertical 4px ;
   — celui de `div.framer-y3542b` donne son contenu, nœud par nœud, sur
     28 nœuds mesurés.

   Le second apporte une information que le premier n'avait pas : le
   conteneur ancêtre de la barre est en `position: fixed`. L'en-tête suit
   donc le défilement. C'est cohérent avec deux autres mesures — le fond à
   80 % d'opacité, qui n'a de sens que si du contenu passe dessous, et les
   100px de padding haut du bloc d'accroche, qui compensent la barre.

   La structure mesurée est reproduite telle quelle :

     racine  [flex row, gap 32, padding-inline 16]
       marge de marque  [flex row, gap 10]  → logo
       bloc de droite   [flex row, gap 16]
         nav            [flex row, gap 8]   → 4 entrées
         bouton d'action                    → libellé seul (voir plus bas :
                                              l'icône WhatsApp mesurée est
                                              retirée sur demande)

   Les libellés viennent de `content/site.ts` — quatre entrées, ce qui tombe
   exactement sur le compte mesuré. Les mots du site relevé ne sont jamais
   repris.
   ========================================================================== */

/* Le bouton d'action, écrit une fois et employé deux fois : dans la barre au
   large, dans le panneau à l'étroit. C'est le même lien, pas une copie.

   L'ICÔNE WHATSAPP N'EST PAS REPRISE. Le relevé donne un SVG de 18 × 18 au
   nœud #26, dans le vert de marque `rgb(37, 211, 102)` — le seul de toute la
   page à ne relever ni du brandboard ni de sa transposition. Elle est retirée
   sur demande : le libellé dit déjà de quel service il s'agit, et le bouton
   retrouve les deux tons chauds de la charte. Le nœud #26 disparaît donc, et
   avec lui l'écart de 10px que `.btn-nav` posait entre l'icône et le libellé —
   sans icône, il n'y a plus rien à écarter. Voir MISSING.md. */
function WhatsAppCta() {
  /* Le bouton est celui de tous les appels à l'action du site (`btn-primary`,
     comme « Découvrir nos services » ou « Réserver mon appel ») : même
     capsule, même Châtaigne, même corps de libellé. Il n'a plus de gabarit
     propre — l'ancien `btn-nav` (12/14, 14px) le faisait paraître d'une autre
     famille. */
  return (
    <ButtonPrimary href={WHATSAPP_URL} labelClassName="t-label">
      {WHATSAPP_LABEL}
    </ButtonPrimary>
  );
}

/* La barre est FIXE : elle reste en haut de l'écran en permanence, elle ne
   s'escamote pas quand on descend. Elle l'a fait un temps (masquée en
   descendant, réaffichée en remontant) ; c'est retiré sur demande — voir
   `.band-header` dans header.css, `position: fixed`. */

export default function SiteHeader() {
  return (
    <header className="band-header">
      {/* #1 */}
      <div className="header">
        {/* #2 — le bloc de marque, qui prend toute la place restante. */}
        <div className="header__brand">
          {/* #3 — 150px de large donnent 82px de haut avec le rapport 313/171
              du fichier fourni. C'est ce qui a demandé de porter la bande de
              64px à 96px (voir header.css). */}
          <Link className="header__logo" href="/" aria-label="Accueil">
            <Logo width={150} priority />
          </Link>
        </div>

        {/* #6 */}
        <div className="header__right">
          {/* #7 — quatre entrées, comme mesuré. */}
          <nav className="header__nav" aria-label="Navigation principale">
            {NAV.map((item) => (
              /* #8, #12, #16, #20 */
              <div className="header__nav-item" key={item.href}>
                {/* #9, #13, #17, #21 */}
                <a className="header__nav-link" href={item.href}>
                  {/* #10, #14, #18, #22 */}
                  <div className="header__nav-label">
                    {/* #11, #15, #19, #23 — 16px / 24px / graisse 500 /
                        approche -1px : exactement le rôle « paragraphe »
                        déjà mesuré sur la page longue. */}
                    <p className="t-body">{item.label}</p>
                  </div>
                </a>
              </div>
            ))}
          </nav>

          {/* #24 */}
          <div className="header__cta-slot">
            <WhatsAppCta />
          </div>
        </div>

        {/* Sous 810px, la barre mesurée ne tient plus : le menu passe dans un
            panneau plein écran. Rien de tout ça n'est mesuré — aucun relevé
            ne contient de variante étroite de la barre. Voir MISSING.md. */}
        <MobileMenu items={NAV} cta={<WhatsAppCta />} />
      </div>
    </header>
  );
}
