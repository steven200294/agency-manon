import type { ReactNode } from "react";

/* ==========================================================================
   Boutons et liens — un composant par variante mesurée

   Le relevé distingue quatre variantes de lien et deux de bouton. Elles sont
   toutes ici, aucune n'est fondue dans une autre.

   Le libellé n'est pas porté par l'ancre : le squelette le place dans un `p`
   enfant portant le rôle « texte 4/4 » (`.t-action`). C'est reproduit tel
   quel — c'est aussi ce qui explique la couleur `rgb(0,0,238)` relevée sur
   les ancres, qui est le bleu par défaut du navigateur et ne peint jamais
   rien.
   ========================================================================== */

type LinkProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  /**
   * Rôle typographique du libellé. Par défaut « texte 4/4 » (`.t-action`),
   * celui que le squelette de la page longue place dans les liens. Le relevé
   * de la hero mesure un autre rôle sur le même bouton — « texte 3/4 »
   * (`.t-label`, 20px/24px, graisse 600) — d'où ce point d'entrée.
   */
  labelClassName?: string;
  /**
   * Conteneur enveloppant le libellé, si le relevé en pose un.
   * La hero en a un, avec `white-space: pre`.
   */
  labelWrapperClassName?: string;
};

/** Lien variante 1 sur 4 — 11 occurrences (en-tête, corps, bande 10). */
/* Les appels de SECTION portent `.btn-outline`, pas `.btn-nav`.

   Les deux classes existaient parce que le relevé ne donne qu'un bouton, la
   capsule pleine de la barre de navigation, réemployée partout. Une capsule
   Châtaigne pleine, avec son ombre, ne tient plus au milieu d'une page
   composée aux filets : elle vient d'un autre système.

   La barre, elle, GARDE sa capsule — c'est le seul appel permanent de la
   page, et elle l'écrit en clair dans SiteHeader plutôt que par ce composant.
   Changer ce qui suit ne la touche donc pas. Voir primitives.css. */
export function ButtonNav({ children, href = "#", className = "" }: LinkProps) {
  return (
    <a href={href} className={`btn-outline ${className}`}>
      <p className="t-action">{children}</p>
    </a>
  );
}

/** Lien variante 2 sur 4 — l'appel à l'action principal, 2 occurrences. */
export function ButtonPrimary({
  children,
  href = "#",
  className = "",
  labelClassName = "t-action",
  labelWrapperClassName,
}: LinkProps) {
  const label = <p className={labelClassName}>{children}</p>;

  return (
    <a href={href} className={`btn-primary ${className}`}>
      {labelWrapperClassName ? (
        <div className={labelWrapperClassName}>{label}</div>
      ) : (
        label
      )}
    </a>
  );
}

/** Lien variante 3 sur 4 — puce pleine sur fond clair, 1 occurrence. */
export function ChipSolid({ children, href = "#", className = "" }: LinkProps) {
  return (
    <a href={href} className={`chip-solid ${className}`}>
      {children}
    </a>
  );
}

/** Lien variante 4 sur 4 — la même puce sans remplissage, 1 occurrence. */
export function ChipGhost({ children, href = "#", className = "" }: LinkProps) {
  return (
    <a href={href} className={`chip-ghost ${className}`}>
      {children}
    </a>
  );
}

/** `a.framer-VmzXy.framer-POJK0` — lien de navigation, 4 occurrences. */
export function LinkNav({ children, href = "#", className = "" }: LinkProps) {
  return (
    <a href={href} className={`link-nav ${className}`}>
      <span className="t-link">{children}</span>
    </a>
  );
}

/* --------------------------------------------------------------------------
   Boutons — deux variantes qui ne diffèrent QUE par le curseur.
   `button 1/2` porte `cursor: default`, `button 2/2` porte `cursor: pointer`.
   Toutes leurs autres valeurs sont identiques. C'est une décision du site,
   pas un doublon : elle est conservée.
   -------------------------------------------------------------------------- */

type ControlProps = {
  children: ReactNode;
  label: string;
  /** `false` → variante 1 sur 2 (curseur par défaut, contrôle inactif). */
  interactive?: boolean;
  className?: string;
};

export function ButtonControl({
  children,
  label,
  interactive = true,
  className = "",
}: ControlProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={!interactive}
      className={`${interactive ? "btn-control-active" : "btn-control"} ${className}`}
    >
      {children}
    </button>
  );
}
