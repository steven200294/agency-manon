"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "@/components/primitives/Logo";

/* ==========================================================================
   Menu étroit — RIEN ICI N'EST MESURÉ

   ⚠ Aucun des relevés ne contient de variante étroite de la barre de
   navigation. Le composant mesuré (`div.framer-y3542b`) n'existe qu'à une
   seule largeur, avec ses quatre entrées et son bouton alignés.

   Tout ce fichier est donc une DÉCISION, pas une reproduction : le principe
   du bouton hamburger, le panneau plein écran, la taille des entrées, la
   position du bouton de fermeture. Le seul emprunt aux mesures est
   l'habillage — couleurs, rayons et rôles typographiques du projet, pour que
   le panneau n'ait pas l'air d'un corps étranger.

   Voir MISSING.md § 9.

   Ce qui est traité, parce qu'un menu qui ne le fait pas est cassé :
     — fermeture à la touche Échap ;
     — défilement de la page bloqué tant que le panneau est ouvert ;
     — `aria-expanded` / `aria-controls` sur le bouton ;
     — fermeture au clic sur une entrée.
   ========================================================================== */

type MobileMenuProps = {
  items: readonly { label: string; href: string }[];
  /** Le bouton d'action, repris tel quel depuis la barre. */
  cta: ReactNode;
};

export default function MobileMenu({ items, cta }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    // Le défilement de la page est bloqué tant que le panneau couvre l'écran :
    // sans ça, la page glisse derrière lui au moindre geste.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="header__burger"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {/* Trois traits qui deviennent une croix. Les trois `span` sont
            nécessaires : le trait du milieu s'efface pendant que les deux
            autres pivotent. */}
        <span className="header__burger-line" />
        <span className="header__burger-line" />
        <span className="header__burger-line" />
      </button>

      <div
        id={panelId}
        className={`header__panel ${open ? "header__panel--open" : ""}`}
        // `inert` retire tout le panneau du parcours au clavier et de l'arbre
        // d'accessibilité quand il est fermé — plus fiable que de compter sur
        // `visibility` seul.
        inert={!open}
      >
        <div className="header__panel-top">
          <Link href="/" aria-label="Accueil" onClick={() => setOpen(false)}>
            <Logo width={130} />
          </Link>
        </div>

        <nav className="header__panel-nav" aria-label="Navigation principale">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="header__panel-link"
              onClick={() => setOpen(false)}
            >
              <span className="t-h4">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="header__panel-cta" onClick={() => setOpen(false)}>
          {cta}
        </div>
      </div>
    </>
  );
}
