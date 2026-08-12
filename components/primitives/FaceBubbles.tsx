"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/* ==========================================================================
   FaceBubbles — les visages qui entourent une bande

   NON MESURÉ. Rien de tout cela n'est dans un relevé : c'est une demande
   explicite pour la bande des repères. Huit bulles rondes disposées autour
   du contenu, qui apparaissent à l'entrée dans l'écran et dérivent au
   défilement.

   TROIS MOUVEMENTS, ET ILS NE SE MARCHENT PAS DESSUS

   Une bulle porte trois transformations en même temps, et une seule
   propriété `transform` par élément peut les exprimer. D'où trois couches
   emboîtées, une par mouvement :

     .face-bubble         la PARALLAXE — position dans la bande, et
                          déplacement vertical piloté par le défilement
       .face-bubble__float  la RESPIRATION — une oscillation lente et
                            continue, propre à chaque bulle
         .face-bubble__inner  l'APPARITION — une seule fois, à l'entrée
                              dans l'écran

   Fusionner deux de ces couches revient à ce que l'animation de respiration
   écrase la transformation de parallaxe à chaque image : c'est la raison de
   l'emboîtement, pas un excès de balises.

   LA PARALLAXE ne pose PAS un écouteur de défilement par bulle, et n'écrit
   pas non plus dans le style de chaque bulle. Le conteneur porte une seule
   variable CSS — la progression de la bande dans l'écran, de -1 à 1 — et
   chaque bulle la multiplie par sa propre profondeur. Une écriture par
   image, quel que soit le nombre de bulles.

   Le calcul est fait dans `requestAnimationFrame` : l'événement de
   défilement se contente d'armer un drapeau. Sans ça, un défilement au
   pavé tactile déclenche plusieurs fois par image un calcul qui force le
   navigateur à recalculer la mise en page.

   `prefers-reduced-motion` coupe TOUT : ni parallaxe (l'écouteur n'est même
   pas posé), ni respiration, ni apparition. Les bulles sont simplement là.
   ========================================================================== */

type Bubble = {
  /** Position, en pourcentage de la bande. */
  top: string;
  left?: string;
  right?: string;
  /** Diamètre au repos. */
  size: number;
  /** Amplitude de la parallaxe, en pixels. Négatif = la bulle remonte. */
  depth: number;
  /** Retard d'apparition, pour que les huit ne surgissent pas ensemble. */
  delay: number;
  /** Durée d'un aller de la respiration. Toutes différentes, à dessein :
      deux bulles synchronisées se lisent comme un mécanisme. */
  float: number;
  /**
   * `corner` — dans un angle de la bande, au-dessus du titre ou sous la
   *   note : le texte y est court et centré, la place est libre à toutes les
   *   largeurs.
   * `side` — dans la marge latérale, à côté de la rangée de chiffres. Cette
   *   marge n'existe qu'au-delà de 1440px ; en dessous, ces bulles sont
   *   retirées plutôt que posées sur les chiffres.
   */
  zone: "corner" | "side";
};

/* --------------------------------------------------------------------------
   LA DISPOSITION

   Les bulles encadrent le contenu et ne passent JAMAIS dessous. Deux façons
   de le garantir, une par zone :

   — les quatre bulles d'angle sont placées en pourcentage. Le titre et la
     note sont courts et centrés : les angles leur restent étrangers quelle
     que soit la largeur ;
   — les quatre bulles latérales sont placées en calcul par rapport au CENTRE
     de la page, pas en pourcentage : `calc(50% + 632px)` pose le bord de la
     bulle 12px à l'extérieur de la colonne de contenu, qui fait 1240px de
     large — soit 620px de demi-largeur. Un pourcentage, lui, se rapproche du
     texte à mesure que l'écran rétrécit, et finit par lui passer dessus.

   Les tailles, les retards et les durées sont réglés à l'œil : c'est une
   composition, pas une grille.
   -------------------------------------------------------------------------- */

/* La demi-largeur de la colonne de contenu (1240 / 2), plus 12px de jeu. */
const OUTSIDE = "calc(50% + 632px)";

const BUBBLES: Bubble[] = [
  { zone: "corner", top: "2%", left: "3%", size: 104, depth: -46, delay: 0, float: 7.5 },
  { zone: "corner", top: "0%", right: "5%", size: 80, depth: 38, delay: 120, float: 6.8 },
  { zone: "corner", top: "84%", left: "6%", size: 92, depth: -28, delay: 90, float: 8.4 },
  { zone: "corner", top: "88%", right: "4%", size: 68, depth: 30, delay: 220, float: 7.1 },
  { zone: "side", top: "26%", right: OUTSIDE, size: 116, depth: -40, delay: 40, float: 9.1 },
  { zone: "side", top: "58%", right: OUTSIDE, size: 72, depth: 34, delay: 180, float: 6.2 },
  { zone: "side", top: "30%", left: OUTSIDE, size: 64, depth: 40, delay: 260, float: 5.6 },
  { zone: "side", top: "56%", left: OUTSIDE, size: 108, depth: -34, delay: 300, float: 6.4 },
];

/* Le visage dessiné, tant qu'aucune photo n'est fournie. Deux yeux et un
   sourire — c'est ce que la bulle est censée montrer, et un cadre vide au
   milieu d'une composition ronde se lirait comme un trou. */
function SmilingFace() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <circle cx="18" cy="20" r="2.4" fill="currentColor" />
      <circle cx="30" cy="20" r="2.4" fill="currentColor" />
      <path
        d="M16 28c2.2 3.4 4.9 5.1 8 5.1s5.8-1.7 8-5.1"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

type FaceBubblesProps = {
  /** Les photos, dans l'ordre des bulles. Une case vide → visage dessiné. */
  sources?: readonly string[];
  /** Ce que les bulles montrent, pour les lecteurs d'écran. */
  label?: string;
};

export default function FaceBubbles({
  sources = [],
  label = "Clientes et clients de l'agence",
}: FaceBubblesProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    /* L'apparition. Un seul déclenchement : une fois les bulles entrées,
       l'observateur n'a plus rien à faire. */
    const reveal = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        root.classList.add("is-in");
        reveal.disconnect();
      },
      { threshold: 0.15 },
    );
    reveal.observe(root);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => reveal.disconnect();
    }

    /* La parallaxe. `progress` vaut 0 quand la bande est centrée dans
       l'écran, -1 quand elle arrive par le bas, +1 quand elle sort par le
       haut. C'est cette valeur, et elle seule, qui est écrite dans le DOM. */
    let queued = false;

    const update = () => {
      queued = false;
      const box = root.getBoundingClientRect();
      const centre = box.top + box.height / 2;
      const progress = (window.innerHeight / 2 - centre) / window.innerHeight;
      root.style.setProperty("--p", progress.toFixed(4));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      reveal.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    /* `aria-hidden` : ces visages sont une composition, pas une information.
       Le rôle d'image porte le tout en une seule annonce. */
    <div className="face-bubbles" ref={ref} role="img" aria-label={label}>
      {BUBBLES.map((bubble, index) => {
        const src = sources[index];

        /* Les positions passent par des VARIABLES, pas par les propriétés
           `top`/`left`/`right` : un style en ligne bat toutes les règles de
           feuille, et les positions de repli sous 810px n'auraient jamais
           pris. La feuille lit les variables, elle peut donc les réécrire. */
        const style: CSSProperties = {
          ["--top" as string]: bubble.top,
          ...(bubble.left ? { ["--left" as string]: bubble.left } : null),
          ...(bubble.right ? { ["--right" as string]: bubble.right } : null),
          ["--size" as string]: `${bubble.size}px`,
          ["--depth" as string]: `${bubble.depth}px`,
          ["--delay" as string]: `${bubble.delay}ms`,
          ["--float" as string]: `${bubble.float}s`,
        };

        return (
          <div
            key={`${bubble.zone}-${index}`}
            className={`face-bubble face-bubble--${bubble.zone}`}
            style={style}
            aria-hidden="true"
          >
            <div className="face-bubble__float">
              <div className="face-bubble__inner">
                {src ? (
                  // Image nue, comme partout dans le projet : next/image
                  // poserait son propre wrapper par-dessus le cadrage rond.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt="" className="face-bubble__photo" loading="lazy" />
                ) : (
                  <SmilingFace />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
