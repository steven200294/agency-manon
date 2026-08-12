"use client";

import Logo from "@/components/primitives/Logo";
import MagneticLink from "@/components/primitives/MagneticLink";
import { FOOTER } from "@/content/site";

/* ==========================================================================
   BANDE 13 sur 13 — le pied de page, en rideau

   ÉCART TOTAL. La bande mesurée est une colonne de 495px de large, écart
   36px, padding 120px / 63px, sans fond propre. Rien de tout ça ne subsiste :
   le pied de page reprend les mécaniques d'un composant apporté séparément
   (un « cinematic footer »), adapté à la charte du projet.

   ---------------------------------------------------------------------------
   COMMENT MARCHE LA RÉVÉLATION EN RIDEAU

   C'est la seule vraie astuce du composant, et elle tient en deux règles.

   1. Un conteneur d'un écran de haut, en flux normal, qui porte un
      `clip-path`. Un `clip-path` sur un parent découpe TOUT ce qu'il
      contient, y compris ce qui est en `position: fixed` — c'est le seul
      moyen simple de contraindre un élément fixe à une zone.

   2. À l'intérieur, le pied de page en `position: fixed; bottom: 0`, sur un
      écran plein. Il ne bouge donc jamais ; c'est le conteneur qui remonte
      avec le défilement, et la fenêtre découpée révèle progressivement le
      pied de page comme un rideau qui se lève.

   Conséquence indispensable : le contenu de la page doit être OPAQUE et
   passer devant, sinon on voit le pied de page à travers toutes les bandes.
   D'où le `.page-content` de `page.tsx`, qui porte le fond Dentelle et le
   `z-index: 1`. Voir canvas.css.
   ---------------------------------------------------------------------------

   ADAPTATION À LA CHARTE

   Le composant de référence est monochrome et suit les jetons de son thème.
   Ici :

   — le pied de page est en NUIT, pas en Dentelle. C'est un rideau : il doit
     trancher avec la page qu'il recouvre, et il répond à la section noire
     des cas clients ;
   — le halo et la grille reprennent Terre d'Ombre et Châtaigne ;
   — les pastilles de verre gardent leur principe (fond translucide,
     `backdrop-filter`, liseré interne clair) mais sur les tons du projet ;
   — le mot géant en fond est « TRACE ».

   GSAP N'EST PAS EMPLOYÉ. Le composant de référence s'en sert pour
   l'aimantation et une parallaxe au défilement. L'aimantation tient en
   trente lignes (voir MagneticLink), et la parallaxe est remplacée par la
   révélation en rideau, qui est déjà un effet de défilement — en superposer
   un second n'ajoutait rien.
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

/* Le ruban est dupliqué : quand la première série a défilé de sa propre
   largeur, la seconde occupe exactement sa place et la boucle se referme sans
   couture. Le duplicata est masqué aux lecteurs d'écran. */
function MarqueeRun({ hidden }: { hidden?: boolean }) {
  return (
    <div className="footer-marquee__run" aria-hidden={hidden}>
      {FOOTER.marquee.map((word) => (
        <span key={word} className="footer-marquee__item">
          {word}
          <span className="footer-marquee__sep" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function SiteFooter() {
  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    /* Le conteneur en flux : un écran de haut, et un `clip-path` qui découpe
       le pied de page fixe qu'il contient. */
    <div className="footer-curtain">
      <footer className="footer-panel">
        {/* Halo et grille. Purement décoratifs, donc hors du flux et hors du
            parcours au clavier. */}
        <div className="footer-panel__aurora" aria-hidden="true" />
        <div className="footer-panel__grid" aria-hidden="true" />

        {/* Le mot géant, découpé dans un dégradé. */}
        <div className="footer-panel__giant" aria-hidden="true">
          {FOOTER.giantWord}
        </div>

        {/* Le ruban, incliné et débordant des deux côtés. */}
        <div className="footer-marquee">
          <div className="footer-marquee__track">
            <MarqueeRun />
            <MarqueeRun hidden />
          </div>
        </div>

        <div className="footer-panel__center">
          <Logo width={240} variant="beige" />

          <h2 className="footer-panel__heading">{FOOTER.heading}</h2>

          {/* Les deux actions principales. */}
          <div className="footer-pills">
            {FOOTER.primary.map((action) => (
              <MagneticLink
                key={action.label}
                href={action.href}
                className="footer-pill footer-pill--primary"
              >
                {action.label}
              </MagneticLink>
            ))}
          </div>

          {/* Les réseaux, puis les mentions. Deux rangées de pastilles plus
              petites, moins accrochées au curseur que les principales. */}
          <div className="footer-pills footer-pills--small">
            {FOOTER.social.links.map((link) => (
              <MagneticLink
                key={link}
                href="#"
                className="footer-pill"
                strength={0.22}
              >
                {link}
              </MagneticLink>
            ))}
          </div>

          <div className="footer-pills footer-pills--small">
            {FOOTER.legal.map((item) => (
              <MagneticLink
                key={item}
                href="#"
                className="footer-pill footer-pill--quiet"
                strength={0.18}
              >
                {item}
              </MagneticLink>
            ))}
          </div>
        </div>

        {/* La barre du bas : mention légale, adresse, retour en haut. */}
        <div className="footer-bar">
          <p className="footer-bar__copyright">{FOOTER.copyright}</p>

          <div className="footer-pill footer-pill--static">
            <span className="footer-bar__label">{FOOTER.agency.label}</span>
            <span className="footer-bar__value">{FOOTER.agency.value}</span>
          </div>

          <MagneticLink
            as="button"
            type="button"
            onClick={scrollToTop}
            aria-label={FOOTER.backToTop}
            className="footer-pill footer-pill--round"
            strength={0.3}
          >
            <ArrowUp />
          </MagneticLink>
        </div>
      </footer>
    </div>
  );
}
