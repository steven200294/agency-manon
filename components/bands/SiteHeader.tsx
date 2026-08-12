"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/primitives/Logo";
import MobileMenu from "@/components/primitives/MobileMenu";
import { NAV, WHATSAPP_LABEL } from "@/content/site";

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
  return (
    /* #25 — même variante de lien que sur la page longue : mêmes paddings,
       même rayon 42px, mêmes ombres internes. */
    <a className="btn-nav" href="#">
      {/* #27 */}
      <div className="header__cta-label">
        {/* #28 */}
        <p className="header__cta-text">{WHATSAPP_LABEL}</p>
      </div>
    </a>
  );
}

/* La barre s'escamote quand on descend, revient quand on remonte.

   NON MESURÉ — demande explicite. Le relevé donne une barre fixe qui ne bouge
   jamais.

   Deux seuils, et ils ne font pas la même chose :

   — `REVEAL_AT` (96px, la hauteur de la barre) empêche l'escamotage tant qu'on
     est encore en haut de page. Sans lui, le moindre geste vers le bas dès le
     premier pixel ferait sauter la barre alors qu'elle n'a rien à céder ;
   — `DEADBAND` (6px) est la course morte. Un défilement n'est jamais une
     valeur propre : un trackpad, un rebond de fin de page ou une barre
     d'adresse mobile qui se rétracte produisent des allers-retours de deux ou
     trois pixels. Sans course morte, la barre clignote.

   La position de référence n'est PAS remise à jour sous le seuil : c'est
   volontaire. Un défilement lent de 2px vingt fois de suite doit finir par
   compter, sinon la barre ne réagit jamais aux gestes doux.

   Un seul `requestAnimationFrame` en vol à la fois : l'événement `scroll` peut
   partir cent fois par seconde, l'écran ne se repeint que soixante. */
const REVEAL_AT = 96;
const DEADBAND = 6;

function useHideOnScrollDown() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;

        const y = window.scrollY;
        const delta = y - last;
        if (Math.abs(delta) < DEADBAND) return;

        last = y;
        setHidden(delta > 0 && y > REVEAL_AT);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return hidden;
}

export default function SiteHeader() {
  const hidden = useHideOnScrollDown();

  return (
    <header
      className={`band-header ${hidden ? "band-header--hidden" : ""}`.trim()}
    >
      {/* #1 */}
      <div className="header">
        {/* #2 — le bloc de marque, qui prend toute la place restante. */}
        <div className="header__brand">
          {/* #3 — 150px de large donnent 82px de haut avec le rapport 313/171
              du fichier fourni. C'est ce qui a demandé de porter la bande de
              64px à 96px (voir header.css). */}
          <a className="header__logo" href="#" aria-label="Accueil">
            <Logo width={150} priority />
          </a>
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
