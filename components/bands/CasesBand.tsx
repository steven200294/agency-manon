"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CountUp from "@/components/primitives/CountUp";
import LogoTicker from "@/components/primitives/LogoTicker";
import { CASE_PAGES } from "@/content/cases";
import {
  CASES,
  CASES_TITLE,
  CLIENTS,
  CLIENT_LOGOS,
  CLIENTS_TITLE_BEFORE,
  CLIENTS_TITLE_EMPHASIS,
} from "@/content/site";

/* ==========================================================================
   BANDE 3 sur 13 — les cas clients

   Deux relevés se superposent ici :

   — celui de myroragency.com donne la BANDE : `div.framer-1qap9qf`, pleine
     largeur, padding 120px en haut, écart 72px, `overflow: clip`, et AUCUN
     fond propre. C'est la géométrie de la bande 7 ; elle a été amenée en
     3e position avec son contenu, la bande 3 partant en sens inverse. Une
     section noire pleine largeur ne peut pas s'arrêter à 1240px de large :
     les deux bandes ont donc échangé leur géométrie, pas seulement leur
     contenu ;
   — celui de prsnl.io (`section.framer-njK1w`, 293 nœuds) donne son
     CONTENU : une section noire, un en-tête titre + deux boutons, et une
     piste de grandes cartes.

   ÉCART ASSUMÉ. La bande mesurée ne peint aucun fond ; celle-ci est noire.
   C'est une demande explicite, et le second relevé la donne bien en
   `background-color: rgb(0, 0, 0)`. C'est, avec l'en-tête, la seule surface
   du projet qui peint un fond.

   L'autre écart tient à la piste. Le relevé la pose en `position: absolute`
   dans un cadre plus étroit qu'elle : les cartes débordent et l'`overflow`
   de la section les coupe. C'est l'état figé d'un carrousel au moment de la
   capture — pas un mécanisme. Elle est donc reconstruite en piste
   défilante, ce qui donne le même rendu au repos et rend surtout les deux
   boutons mesurés utilisables. Voir MISSING.md.
   ========================================================================== */

/* Le relevé donne la taille de l'icône (16 × 16) et sa couleur, mais la
   section « Icons and images » du document a été retirée : le DESSIN de la
   flèche n'est pas mesuré. Ce chevron est à moi.

   `down` sert au dépliage du détail, et suit le même tracé retourné d'un
   quart de tour : un seul dessin pour les trois directions, donc une seule
   épaisseur de trait et un seul rayon d'angle à l'écran. */
const CHEVRON_PATHS = {
  prev: "M10 3 L5 8 L10 13",
  next: "M6 3 L11 8 L6 13",
  down: "M3 6 L8 11 L13 6",
} as const;

function Chevron({
  direction,
  className,
}: {
  direction: keyof typeof CHEVRON_PATHS;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={CHEVRON_PATHS[direction]}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Les photos des trois cartes, par nom de client.

   ⚠ ATTRIBUTION À CONFIRMER AVEC MANON. Les photos viennent des dossiers
   WeTransfer reçus, dont l'étiquette client n'est pas certaine :
   — La Bodega et Le Bonnet (La Plagne) ← photos d'altitude, terrasse sur les
     pistes (dossier « expedition ») ;
   — Le Dos du Praz (Courchevel Le Praz) ← le chalet « Bar Restaurant »
     (dossier « dsc_0290 »).
   Une carte sans photo garde son emplacement déclaré. */
const CASE_PHOTOS: Record<string, string> = {
  Bodega: "/brand/galerie/g10.webp",
  Bonnet: "/brand/galerie/g13.webp",
  "du Praz": "/brand/galerie/g09.webp",
};

export default function CasesBand() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  /* Les deux boutons sont mesurés dans DEUX états — l'un inactif avec
     `cursor: default`, l'autre actif avec `cursor: pointer`. Ils ne sont donc
     pas décoratifs : ils s'éteignent quand il n'y a plus rien à faire
     défiler de ce côté. Avec deux cas clients qui tiennent dans la largeur,
     les deux restent éteints — et c'est le comportement juste. */
  const refreshControls = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const max = viewport.scrollWidth - viewport.clientWidth;
    setCanScrollPrev(viewport.scrollLeft > 1);
    setCanScrollNext(viewport.scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    refreshControls();
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.addEventListener("scroll", refreshControls, { passive: true });
    window.addEventListener("resize", refreshControls);
    return () => {
      viewport.removeEventListener("scroll", refreshControls);
      window.removeEventListener("resize", refreshControls);
    };
  }, [refreshControls]);

  /* Un clic fait défiler d'exactement une carte plus son écart — la largeur
     mesurée du gabarit, lue sur la première carte pour rester juste à toutes
     les largeurs. */
  const scrollByCard = (sign: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const card = viewport.querySelector<HTMLElement>(".case");
    const step = card ? card.offsetWidth + 16 : viewport.clientWidth;
    viewport.scrollBy({ left: sign * step, behavior: "smooth" });
  };

  return (
    <section className="band-client-words cases" id="cas-clients">
      {/* NON MESURÉ — ajout demandé. Le bandeau clients ouvre la bande noire :
          le titre, puis les quinze logos en piste défilante sans fin.

          Il est POSÉ AU-DESSUS des cas clients, pas à leur place : on montre
          d'abord à qui l'agence a affaire, ensuite ce que ça a donné en
          chiffres. Les logos ne sont pas encore fournis — chaque emplacement
          porte le nom du client en attendant, et gardera son encombrement.
          Voir `CLIENT_LOGOS` dans content/site.ts et LogoTicker. */}
      <div className="cases__clients">
        <h2 className="cases__clients-title">
          {CLIENTS_TITLE_BEFORE}
          <span className="cases__clients-emphasis">
            {CLIENTS_TITLE_EMPHASIS}
          </span>
        </h2>

        <LogoTicker items={CLIENTS} logos={CLIENT_LOGOS} />
      </div>

      {/* #2 — l'en-tête : titre à gauche, contrôles à droite. */}
      <div className="cases__header">
        {/* #4 */}
        <h2 className="cases__title">{CASES_TITLE}</h2>

        {/* #5 */}
        <div className="cases__controls">
          {/* #7 — l'état inactif était celui capturé sur le bouton précédent. */}
          <button
            type="button"
            className="cases__control"
            aria-label="Cas client précédent"
            disabled={!canScrollPrev}
            onClick={() => scrollByCard(-1)}
          >
            <Chevron direction="prev" />
          </button>

          {/* #10 — l'état actif. */}
          <button
            type="button"
            className="cases__control"
            aria-label="Cas client suivant"
            disabled={!canScrollNext}
            onClick={() => scrollByCard(1)}
          >
            <Chevron direction="next" />
          </button>
        </div>
      </div>

      {/* #12, #13 */}
      <div className="cases__viewport" ref={viewportRef}>
        <ul className="cases__rail">
          {CASES.map((study) => (
            <li key={study.nameLast} className="case">
              {/* #16 — le visuel et son dégradé d'assombrissement. */}
              <div className="case__media">
                {/* #17, #18 */}
                <div className="case__media-layer">
                  {CASE_PHOTOS[study.nameLast] ? (
                    // Décorative : le nom du client est écrit juste dessus.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={CASE_PHOTOS[study.nameLast]}
                      alt=""
                      className="case__image"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="case__image-slot"
                      role="img"
                      aria-label={`Emplacement d'image : ${study.imageLabel}`}
                    >
                      <span>{study.imageLabel}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* #20 — le nom, coupé en deux et posé sur le bas du visuel. */}
              <div className="case__name">
                {/* #21, #23 */}
                <div className="case__name-first">
                  <h3 className="case__name-text">{study.nameFirst}</h3>
                </div>
                {/* #24, #26 */}
                <div className="case__name-last">
                  <h3 className="case__name-text">{study.nameLast}</h3>
                </div>
              </div>

              {/* #27 — le panneau de chiffres. */}
              <div className="case__panel">
                {/* Le lieu. Il est dans le contenu depuis le début et n'était
                    affiché nulle part — or c'est lui qui situe le cas avant
                    même les chiffres : « Belle Plagne — 2 050 m » dit en cinq
                    mots de quel type d'établissement on parle. Il ouvre donc
                    le panneau, en surtitre. NON MESURÉ. */}
                <p className="case__place">{study.place}</p>

                {/* #28 — exactement trois colonnes, comme mesuré. */}
                <div className="case__stats">
                  {study.stats.map((stat) => (
                    <div key={stat.label} className="case__stat">
                      <CountUp value={stat.value} className="case__stat-value" />
                      <p className="case__stat-label">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* #47, #48 — le récit, REPLIÉ par défaut.

                    Les chiffres se lisent d'un coup d'œil, le récit demande
                    trente secondes : les deux ne peuvent pas occuper la carte
                    au même titre. Replié, le détail rend les trois cartes
                    comparables — trois panneaux de chiffres à la même hauteur,
                    ce que quatre lignes de texte de longueur différente
                    empêchaient.

                    `<details>` plutôt qu'un état React : l'ouverture, la
                    fermeture, le clavier (Entrée et Espace), le rôle ARIA et
                    la recherche dans la page (Cmd+F ouvre le panneau replié)
                    sont alors le travail du navigateur, pas le nôtre. Et le
                    détail reste lisible si le JavaScript ne charge pas.

                    Les deux libellés sont écrits tous les deux dans le
                    document ; c'est le CSS qui n'en montre qu'un, selon
                    l'attribut `open`. Un lecteur d'écran, lui, annonce déjà
                    l'état — d'où l'`aria-hidden` sur les deux. */}
                <details className="case__more">
                  <summary className="case__more-toggle">
                    <span className="case__more-label" aria-hidden="true">
                      <span className="case__more-label-closed">
                        Lire le détail
                      </span>
                      <span className="case__more-label-open">
                        Masquer le détail
                      </span>
                    </span>
                    <span className="sr-only">
                      Détail du cas {study.nameFirst} {study.nameLast}
                    </span>
                    <Chevron direction="down" className="case__more-chevron" />
                  </summary>

                  <div className="case__more-body">
                    <div className="case__summary">
                      <p>{study.summary}</p>
                    </div>

                    {study.quote ? (
                      <blockquote className="case__quote">
                        <p>« {study.quote} »</p>
                      </blockquote>
                    ) : null}
                  </div>
                </details>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Les cas détaillés : une page chacun, alimentée par
          content/cases.ts. Placés sous la piste de chiffres, pas dedans —
          ce ne sont pas des cartes de la piste. */}
      <nav className="cases__pages" aria-label="Cas clients détaillés">
        {CASE_PAGES.map((page) => (
          <a key={page.slug} className="cases__page" href={`/cas/${page.slug}`}>
            <span className="cases__page-kicker">{page.kicker}</span>
            <span className="cases__page-client">{page.client}</span>
            <span className="cases__page-teaser">{page.teaser}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
