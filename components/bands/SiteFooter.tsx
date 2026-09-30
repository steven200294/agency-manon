"use client";

import Logo from "@/components/primitives/Logo";
import Link from "next/link";
import { BRAND, FOOTER, NAV } from "@/content/site";

/* ==========================================================================
   BANDE 13 sur 13 — le pied de page

   ÉCART ASSUMÉ. La bande mesurée est une colonne de 495px de large, écart
   36px, padding 120px / 63px, sans fond propre. Ce pied de page-ci est en
   Nuit et sur trois colonnes : la colonne mesurée ne portait qu'un bloc de
   texte, et le contenu réel du document en demande quatre (marque,
   navigation, réseaux, mentions).

   ---------------------------------------------------------------------------
   IL EST « NORMAL », ET C'EST DEMANDÉ — POUR L'INSTANT

   La version précédente était un rideau : un conteneur d'un écran de haut
   portant un `clip-path`, et à l'intérieur un pied de page en
   `position: fixed; bottom: 0` que la page découvrait progressivement en
   remontant devant lui. Elle portait aussi un halo animé, une grille, un mot
   géant en fond, un ruban défilant incliné et des pastilles aimantées au
   curseur.

   Tout cela est retiré sur demande, au profit d'un pied de page en FLUX
   NORMAL : il arrive au bout de la page, il défile avec elle, et rien n'y
   bouge. Le contenu, lui, est conservé en entier — les deux actions, les
   réseaux, les mentions, l'adresse, le retour en haut.

   Le rideau n'est pas perdu : il est dans l'historique, au commit qui a
   publié le site (`git show b89759d -- components/bands/SiteFooter.tsx
   app/styles/footer.css`). Le rétablir ne demande que de reprendre ces deux
   fichiers.

   Une conséquence à connaître : `.page-content` porte un fond OPAQUE et un
   `z-index` qui n'existaient que pour masquer le pied de page fixe pendant la
   lecture. Ils sont désormais inutiles mais restent en place — ils ne coûtent
   rien, et ils redeviendront nécessaires le jour où le rideau reviendra.
   Voir canvas.css et footer.css.
   ---------------------------------------------------------------------------

   Ce qui est traité, parce qu'un pied de page qui ne le fait pas est bancal :
     — les trois listes sont de vraies listes, dans de vrais `<nav>` nommés ;
     — le retour en haut respecte `prefers-reduced-motion` ;
     — les liens encore inconnus valent `#` et sont signalés À FOURNIR dans
       `content/site.ts`, pas ici.
   ========================================================================== */

function ArrowUp() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export default function SiteFooter() {
  /* Le défilement fluide est une animation : sous `prefers-reduced-motion`, le
     saut est immédiat. La requête est lue à l'appel et non une fois pour
     toutes — la préférence système peut changer pendant la visite. */
  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* La colonne de marque. Le logo est en variante beige : le pied de
            page est la seule surface sombre de la page avec la bande des cas
            clients. */}
        <div className="site-footer__brand">
          <Link href="/" aria-label="Accueil">
            <Logo width={180} variant="beige" />
          </Link>

          <p className="site-footer__baseline">{FOOTER.heading}</p>

          {/* Les deux actions principales restent des boutons pleins : ce sont
              les seuls liens du pied de page qui appellent un geste. */}
          <div className="site-footer__actions">
            {FOOTER.primary.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="site-footer__action"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        {/* Les trois colonnes de liens. Les entrées de navigation sont celles
            de la barre, reprises telles quelles : deux listes différentes pour
            la même page seraient une occasion de divergence. */}
        <nav className="site-footer__column" aria-label="Navigation du site">
          <h2 className="site-footer__column-title">{BRAND.name}</h2>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="site-footer__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__column" aria-label="Réseaux sociaux">
          <h2 className="site-footer__column-title">{FOOTER.social.label}</h2>
          <ul>
            {FOOTER.social.links.map((link) => (
              <li key={link}>
                {/* À FOURNIR : les trois URL. Voir content/site.ts. */}
                <a className="site-footer__link" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__column" aria-label="Informations légales">
          <h2 className="site-footer__column-title">Informations</h2>
          <ul>
            {FOOTER.legal.map((item) => (
              <li key={item}>
                <a className="site-footer__link" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <p className="site-footer__agency">
            <span className="site-footer__agency-label">
              {FOOTER.agency.label}
            </span>
            {FOOTER.agency.value}
          </p>
        </nav>
      </div>

      {/* La barre du bas, séparée par un filet : mention de droits d'un côté,
          retour en haut de l'autre. */}
      <div className="site-footer__bar">
        <p className="site-footer__copyright">{FOOTER.copyright}</p>

        <button
          type="button"
          className="site-footer__top"
          onClick={scrollToTop}
        >
          <span>{FOOTER.backToTop}</span>
          <ArrowUp />
        </button>
      </div>
    </footer>
  );
}
