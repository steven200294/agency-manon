"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

/* ==========================================================================
   Aimantation au curseur — sans bibliothèque

   Le composant de référence emploie GSAP pour cet effet. Ce n'est pas repris :
   GSAP pèse 23 Ko compressés, ScrollTrigger 11 de plus, et tout ce dont on a
   besoin ici tient en une trentaine de lignes.

   Ce que fait le crochet : à chaque mouvement du pointeur au-dessus de
   l'élément, il calcule l'écart au centre et déplace l'élément d'une fraction
   de cet écart. Le retour au repos est confié à une transition CSS.

   Trois garde-fous, tous nécessaires :

   1. `matchMedia("(hover: hover)")` — sur un écran tactile, il n'y a pas de
      survol : le pointeur touche, et l'élément partirait de travers sous le
      doigt. L'effet est simplement désactivé.

   2. `prefers-reduced-motion` — un élément qui fuit le curseur est
      exactement le genre de mouvement que cette préférence vise.

   3. `requestAnimationFrame` — `pointermove` se déclenche bien plus souvent
      que le navigateur ne repeint. Sans l'étranglement, on calcule des
      positions qui ne seront jamais affichées.

   Seul `transform` est animé : le navigateur ne recalcule jamais la mise en
   page, et l'élément garde exactement sa place dans le flux.
   ========================================================================== */

type MagneticLinkProps = {
  children: ReactNode;
  className?: string;
  /** Fraction de l'écart au centre. 0,3 = discret, 0,6 = très accroché. */
  strength?: number;
  as?: ElementType;
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
  type?: "button";
};

export default function MagneticLink({
  children,
  className = "",
  strength = 0.35,
  as: Component = "a",
  ...rest
}: MagneticLinkProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const noHover = !window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || reduced) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${dx * strength}px, ${
          dy * strength
        }px, 0)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      element.style.transform = "";
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <Component ref={ref} className={`magnetic ${className}`} {...rest}>
      {children}
    </Component>
  );
}
