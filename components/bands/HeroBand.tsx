import type { ReactNode } from "react";
import { ButtonPrimary } from "@/components/primitives/Buttons";

/* ==========================================================================
   LE BLOC D'ACCROCHE

   Le texte est centré ; en bas de l'écran, un ruban de photos inclinées
   défile en boucle. Composition reprise d'un modèle fourni.

   Elle remplace le collage de huit cadres et les deux rubans verticaux de la
   variante étroite : une seule structure sert toutes les largeurs (voir
   hero.css).

   Le défilement est en CSS pur : pas de dépendance ajoutée, et
   `prefers-reduced-motion` l'arrête proprement.
   ========================================================================== */

/* Les dix photos du ruban : les vraies photos des clients de l'agence
   (restauration, bijoux, sport), en portrait — elles remplissent le cadre 3/4
   sans recadrage brutal. Elles remplacent les images Unsplash provisoires.

   L'ORDRE EST UNE COMPOSITION : deux images voisines ne se ressemblent pas,
   pour que le ruban alterne les ambiances, les couleurs et les cadrages. */
const IMG = "/brand/hero";

const MARQUEE: { src: string; label: string }[] = [
  { src: `${IMG}/saumon.webp`, label: "Assiette de saumon mariné" },
  { src: `${IMG}/bijoux-chapeau.webp`, label: "Bijoux portés, chapeau de paille" },
  { src: `${IMG}/chef-altitude.webp`, label: "Le chef sur la terrasse d'altitude" },
  { src: `${IMG}/spritz.webp`, label: "Deux spritz au coucher du soleil" },
  { src: `${IMG}/collier-bleu.webp`, label: "Collier de perles sur porte bleue" },
  { src: `${IMG}/tennis.webp`, label: "Joueur de tennis sur un banc" },
  { src: `${IMG}/dessert-rouge.webp`, label: "Dessert rouge servi sur les pistes" },
  { src: `${IMG}/chapeau-vert.webp`, label: "Bijoux et chapeau vert" },
  { src: `${IMG}/rose.webp`, label: "Dessert en forme de rose" },
  { src: `${IMG}/planche.webp`, label: "Planche et verre de vin blanc" },
];

/* La liste est écrite deux fois dans la piste : c'est ce qui permet à la
   boucle de se refermer (voir `.hero__marquee-track`). Les copies sont
   `aria-hidden` : un lecteur d'écran ne doit lire les photos qu'une fois.
   Les photos sont décoratives, d'où `alt=""`. */
function HeroMarquee() {
  return (
    <div className="hero__marquee" aria-hidden="true">
      <div className="hero__marquee-track">
        {[...MARQUEE, ...MARQUEE].map((photo, i) => (
          <div className="hero__marquee-item" key={`${photo.src}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt="" className="hero__image" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Le composant
   -------------------------------------------------------------------------- */

type HeroBandProps = {
  /** Première ligne du titre. */
  title: ReactNode;
  /** Seconde ligne du titre — celle qui porte l'accent. */
  subtitle: ReactNode;
  /** Description sous le titre. */
  lede: string;
  ctaLabel: string;
  ctaHref?: string;
};

export default function HeroBand({
  title,
  subtitle,
  lede,
  ctaLabel,
  ctaHref = "#",
}: HeroBandProps) {
  return (
    <section className="hero">
      <div className="hero__stack">
        {/* Deux `h1`, une ligne chacun : le saut ne dépend pas de la largeur
            de l'écran, et chaque ligne garde son propre corps. */}
        <div className="hero__headings">
          <h1 className="hero__title">{title}</h1>
          <h1 className="hero__title--secondary">{subtitle}</h1>
        </div>

        <p className="hero__description">{lede}</p>

        <div className="hero__cta">
          <ButtonPrimary href={ctaHref} labelClassName="t-label">
            {ctaLabel}
          </ButtonPrimary>
        </div>
      </div>

      <HeroMarquee />
    </section>
  );
}
