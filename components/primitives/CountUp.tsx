"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ==========================================================================
   Compteur animé

   Les chiffres du site ne sont pas des nombres nus : « +30 », « 79K »,
   « ×2 », « 7 622 », « × 10,38 », « − 50 % ». Ce composant sépare le nombre
   de ce qui l'entoure, anime le nombre seul, et remet le reste en place.

   ---------------------------------------------------------------------------
   TROIS PROBLÈMES, TROIS RÉPONSES

   1. LE DÉCALAGE DE MISE EN PAGE. Un compteur qui passe de « 0 » à « 400 »
      s'élargit de deux caractères en cours de route, et pousse tout ce qui
      l'entoure à chaque image. La valeur finale est donc rendue une seconde
      fois, invisible, dans la même case de grille : c'est ELLE qui donne sa
      taille au bloc, et le nombre animé se superpose par-dessus. Rien ne
      bouge, jamais.

      `font-variant-numeric: tabular-nums` complète le dispositif : sans lui,
      un « 1 » est plus étroit qu'un « 8 » et le nombre tremble en montant.

   2. QUAND DÉMARRER, ET QUAND RECOMMENCER. Un compteur qui a fini de compter
      avant qu'on arrive dessus n'a servi à rien. `IntersectionObserver`
      déclenche la montée quand l'élément entre dans l'écran — et l'observateur
      RESTE branché : chaque fois qu'on repasse devant, le compteur repart de
      zéro.

      Le remise à zéro se fait à la SORTIE de l'écran, pas à l'entrée. Sinon
      on verrait le nombre retomber à zéro sous les yeux avant de remonter.
      Un drapeau empêche par ailleurs qu'une montée en cours soit relancée
      par un franchissement de seuil au ras de la limite.

   3. LA COURBE. Une progression linéaire donne un défilement de compteur
      kilométrique. `easeOutExpo` couvre 90 % de la distance dans le premier
      tiers du temps puis ralentit longuement : on lit l'ordre de grandeur
      tout de suite, et l'arrivée sur la valeur exacte se fait en douceur.

   Et un garde-fou : sous `prefers-reduced-motion`, la valeur finale
   s'affiche directement. Un chiffre qui défile est exactement le genre de
   mouvement que cette préférence vise.
   ========================================================================== */

type Parsed = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  grouped: boolean;
};

/* Isole le premier nombre de la chaîne. Accepte l'espace comme séparateur de
   milliers et la virgule comme séparateur décimal — les deux conventions
   françaises employées dans le contenu. */
function parse(value: string): Parsed | null {
  const match = value.match(/(\d[\d\s  ]*(?:[.,]\d+)?)/);
  if (!match || match.index === undefined) return null;

  const raw = match[1];
  const normalized = raw.replace(/[\s  ]/g, "").replace(",", ".");
  const target = Number(normalized);
  if (!Number.isFinite(target)) return null;

  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + raw.length),
    target,
    decimals: (raw.split(/[.,]/)[1] ?? "").length,
    grouped: /[\s  ]/.test(raw),
  };
}

function format(value: number, parsed: Parsed) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
    useGrouping: parsed.grouped,
  }).format(value);
}

/* 1 − 2^(−10t) : 90 % de la distance parcourue au premier tiers du temps. */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

type CountUpProps = {
  /** La valeur telle qu'elle doit s'afficher, préfixe et suffixe compris. */
  value: string;
  className?: string;
  /** Durée de la montée, en millisecondes. */
  duration?: number;
};

export default function CountUp({
  value,
  className = "",
  duration = 1600,
}: CountUpProps) {
  /* `useMemo` n'est PAS une optimisation ici, c'est une correction.
     `parse()` renvoie un objet neuf à chaque rendu ; en dépendance d'effet,
     il rendait la comparaison toujours fausse, l'effet se rejouait à chaque
     rendu, son `setDisplay` provoquait un rendu, et ainsi de suite. */
  const parsed = useMemo(() => parse(value), [value]);

  const ref = useRef<HTMLSpanElement>(null);
  const running = useRef(false);
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (!parsed) return;
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(format(parsed.target * easeOutExpo(progress), parsed));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setDisplay(null); /* rendu final : on repasse sur la vraie chaîne */
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;

        if (visible) {
          /* Une montée déjà en cours ne se relance pas : sans ce drapeau, un
             défilement qui oscille autour du seuil la redémarrerait sans fin. */
          if (running.current) return;
          running.current = true;
          start = 0;
          frame = requestAnimationFrame(step);
          return;
        }

        /* Sorti de l'écran : on remet à zéro, prêt pour le prochain passage.
           Le faire ici et pas à l'entrée évite de voir le nombre retomber
           sous les yeux avant de remonter. */
        running.current = false;
        cancelAnimationFrame(frame);
        setDisplay(format(0, parsed));
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      running.current = false;
    };
  }, [parsed, duration]);

  /* Aucun nombre trouvé — « No. 1 », un mot, un symbole seul : la chaîne est
     rendue telle quelle, sans animation. */
  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={`countup ${className}`}>
      {/* La valeur finale, lue une seule fois par un lecteur d'écran. Sans
          elle, le nombre qui défile serait annoncé à chaque image — une
          soixantaine de fois par seconde. */}
      <span className="sr-only">{value}</span>

      {/* Le gabarit invisible : c'est lui qui fixe la largeur définitive. */}
      <span className="countup__sizer" aria-hidden="true">
        {value}
      </span>

      {/* La valeur animée, superposée. */}
      <span className="countup__value" aria-hidden="true">
        {display === null
          ? value
          : `${parsed.prefix}${display}${parsed.suffix}`}
      </span>
    </span>
  );
}
