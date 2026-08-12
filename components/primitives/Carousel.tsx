"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* ==========================================================================
   Carrousel — sans bibliothèque

   Le composant de référence s'appuie sur `embla-carousel-react`, qui tire
   avec lui `class-variance-authority`, `lucide-react` et
   `@radix-ui/react-slot`. Rien de tout ça n'est installé : le défilement
   horizontal natif du navigateur, avec `scroll-snap`, fait le même travail.

   Ce que le natif donne gratuitement, et qu'une bibliothèque doit
   réimplémenter :

   — le glissement au doigt et au trackpad, avec l'inertie du système ;
   — le défilement au clavier quand la piste a le focus ;
   — la position de défilement correcte au retour arrière du navigateur ;
   — le respect de `prefers-reduced-motion` sur `scroll-behavior: smooth`.

   Il ne reste à écrire que les deux boutons, et leur seule subtilité est
   qu'ils doivent s'éteindre en bout de course.

   Ce composant est la version claire et générique. La bande des cas clients
   garde la sienne : sa structure vient d'un relevé précis (en-tête, contrôles
   et piste mesurés ensemble) et n'est pas interchangeable.
   ========================================================================== */

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
    >
      <path
        d={direction === "prev" ? "M10 3 L5 8 L10 13" : "M6 3 L11 8 L6 13"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CarouselProps = {
  children: ReactNode;
  /** Décrit la piste pour les lecteurs d'écran. */
  label: string;
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
};

export default function Carousel({
  children,
  label,
  className = "",
  prevLabel = "Élément précédent",
  nextLabel = "Élément suivant",
}: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const refresh = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const max = viewport.scrollWidth - viewport.clientWidth;
    setCanPrev(viewport.scrollLeft > 1);
    /* La tolérance d'un pixel évite que le bouton reste allumé sur un reste
       d'arrondi sub-pixel en fin de course. */
    setCanNext(viewport.scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    refresh();
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    return () => {
      viewport.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, [refresh]);

  /* Un clic fait défiler d'exactement une diapositive : la largeur est lue
     sur la première, ce qui reste juste à toutes les largeurs d'écran sans
     qu'aucune valeur ne soit écrite en dur. */
  const scrollByItem = (sign: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const item = viewport.querySelector<HTMLElement>(".carousel__item");
    const step = item ? item.offsetWidth + 16 : viewport.clientWidth;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    viewport.scrollBy({
      left: sign * step,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <div className={`carousel ${className}`}>
      <div
        className="carousel__viewport"
        ref={viewportRef}
        role="region"
        aria-roledescription="carrousel"
        aria-label={label}
        tabIndex={0}
      >
        <ul className="carousel__track">{children}</ul>
      </div>

      <div className="carousel__controls">
        <button
          type="button"
          className="carousel__control"
          aria-label={prevLabel}
          disabled={!canPrev}
          onClick={() => scrollByItem(-1)}
        >
          <Chevron direction="prev" />
        </button>

        <button
          type="button"
          className="carousel__control"
          aria-label={nextLabel}
          disabled={!canNext}
          onClick={() => scrollByItem(1)}
        >
          <Chevron direction="next" />
        </button>
      </div>
    </div>
  );
}
