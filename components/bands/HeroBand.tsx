import type { ReactNode } from "react";
import { ButtonPrimary } from "@/components/primitives/Buttons";

/* ==========================================================================
   LE BLOC D'ACCROCHE

   Trois relevés :
     — `div.framer-EPg72.framer-lcxzy1`  à 1324px, 56 nœuds : le collage ;
     — `h1.framer-text` : le titre seul ;
     — `div.framer-EPg72.framer-v-1bcxazv` à 390px, 70 nœuds : la variante
       étroite, qui donne les points de rupture et l'animation.

   DEUX STRUCTURES, PAS UNE QUI SE RÉAGENCE.

   Au-dessus de 810px : huit cadres photo répartis en deux groupes qui
   encadrent le texte, chacun avec son rapport d'aspect et son liseré
   dégradé.

   En dessous : le collage disparaît et deux rubans verticaux le remplacent,
   au-dessus du texte. Rayon 10px, aucun liseré, six vignettes, défilement en
   boucle.

   Le relevé étroit ne contient AUCUN des huit cadres du collage, et le relevé
   large aucune des six vignettes : ce sont bien deux structures distinctes.
   Les deux sont donc écrites, et une requête média bascule de l'une à
   l'autre (voir hero.css). Les images des deux jeux ne sont pas les mêmes
   non plus.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Le collage — au-dessus de 810px
   -------------------------------------------------------------------------- */

type Frame = {
  /** Classe de rapport d'aspect, telle que mesurée sur ce cadre précis. */
  ratio: string;
  /** `sm` → cadre 8px / image 4px. `lg` → cadre 16px / image 12px. */
  size: "sm" | "lg";
  label: string;
  src?: string;
};

/* Les huit visuels du collage.

   ⚠ PHOTOS PROVISOIRES — huit images Unsplash, crédits et cadrage attendu
   dans `public/brand/hero/CREDITS.md`. Elles sont à remplacer par les vrais
   visuels de l'agence.

   Ce ne sont pas des images d'ambiance prises au hasard : chacune renvoie à
   une chose que l'agence dit faire. Hospitality (terrasse, cocktail,
   assiette), montagne (station), création de contenu (tournage au
   smartphone, poste de montage), territoires (Marrakech, Marseille). Un
   collage d'accroche est la première chose qu'on lit du métier — il doit
   dire le métier.

   L'ORDRE EST UNE COMPOSITION. Les deux cadres `lg` de la colonne 2 sont les
   plus grands du collage et les plus proches du titre : ils portent les deux
   images qui parlent le plus fort de près — l'assiette et le tournage. Les
   paysages, qui se lisent en petit, sont aux extrémités.

   Les libellés servent d'étiquette d'attente ET de repère de contenu ; ils
   ne sont pas affichés tant qu'une image est fournie. */
const IMG = "/brand/hero";

/* Groupe de gauche — colonne 1 puis colonne 2. */
const LEFT: Frame[][] = [
  [
    {
      ratio: "hero__frame--r1",
      size: "sm",
      label: "Station de montagne",
      src: `${IMG}/station.jpg`,
    },
    {
      ratio: "hero__frame--r2",
      size: "sm",
      label: "Terrasse au soir",
      src: `${IMG}/terrasse.jpg`,
    },
  ],
  [
    {
      ratio: "hero__frame--r3",
      size: "lg",
      label: "Dressage en cuisine",
      src: `${IMG}/assiette.jpg`,
    },
    {
      ratio: "hero__frame--r4",
      size: "lg",
      label: "Tournage sur site",
      src: `${IMG}/tournage-food.jpg`,
    },
  ],
];

/* Groupe de droite — colonne 3 puis colonne 4. */
const RIGHT: Frame[][] = [
  [
    {
      ratio: "hero__frame--r5",
      size: "sm",
      label: "Bar à cocktails",
      src: `${IMG}/cocktail.jpg`,
    },
    {
      ratio: "hero__frame--r6",
      size: "sm",
      label: "Montage et direction artistique",
      src: `${IMG}/studio.jpg`,
    },
  ],
  [
    {
      ratio: "hero__frame--r7",
      size: "sm",
      label: "Marrakech",
      src: `${IMG}/marrakech.jpg`,
    },
    {
      ratio: "hero__frame--r8",
      size: "sm",
      label: "Marseille",
      src: `${IMG}/marseille.jpg`,
    },
  ],
];

function ImageSlot({ label }: { label: string }) {
  return (
    <div
      className="hero__image-slot"
      role="img"
      aria-label={`Emplacement d'image : ${label}`}
    >
      <span>{label}</span>
    </div>
  );
}

/* Un cadre : liseré dégradé → conteneur relatif → couche absolue → image.
   Les quatre niveaux du relevé sont conservés ; les aplatir changerait le
   comportement du rayon et du recadrage. */
function HeroFrame({ frame }: { frame: Frame }) {
  return (
    <div className={`hero__frame hero__frame--${frame.size} ${frame.ratio}`}>
      <div className="hero__frame-inner">
        <div className="hero__frame-layer">
          {frame.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={frame.src} alt="" className="hero__image" />
          ) : (
            <ImageSlot label={frame.label} />
          )}
        </div>
      </div>
    </div>
  );
}

function HeroCluster({ columns }: { columns: Frame[][] }) {
  return (
    <div className="hero__cluster">
      {columns.map((column, i) => (
        <div className="hero__column" key={i}>
          {column.map((frame) => (
            <HeroFrame key={frame.label} frame={frame} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Les rubans — en dessous de 810px
   -------------------------------------------------------------------------- */

type TickerFrame = {
  ratio: string;
  label: string;
  src?: string;
};

/* Trois vignettes par ruban, comme mesuré. Ce compte n'est pas indifférent :
   c'est lui qui fixe la distance d'un cycle de la boucle.

   Le relevé donne bien deux jeux d'images DISTINCTS entre le collage et les
   rubans. Ici, les six vignettes puisent dans les mêmes huit fichiers — les
   deux structures ne sont jamais visibles en même temps, une requête média
   bascule de l'une à l'autre, et faire télécharger six visuels de plus pour
   un jeu qu'on ne verra pas serait payer deux fois la même page. Le jour où
   l'agence fournit ses propres visuels, rien n'empêche d'y mettre six autres
   fichiers : la structure ne change pas. */
const TICKER_A: TickerFrame[] = [
  {
    ratio: "hero__ticker-frame--t1",
    label: "Dressage en cuisine",
    src: `${IMG}/assiette.jpg`,
  },
  {
    ratio: "hero__ticker-frame--t2",
    label: "Station de montagne",
    src: `${IMG}/station.jpg`,
  },
  {
    ratio: "hero__ticker-frame--t3",
    label: "Bar à cocktails",
    src: `${IMG}/cocktail.jpg`,
  },
];

const TICKER_B: TickerFrame[] = [
  {
    ratio: "hero__ticker-frame--t4",
    label: "Tournage sur site",
    src: `${IMG}/tournage-food.jpg`,
  },
  {
    ratio: "hero__ticker-frame--t5",
    label: "Marrakech",
    src: `${IMG}/marrakech.jpg`,
  },
  {
    ratio: "hero__ticker-frame--t6",
    label: "Terrasse au soir",
    src: `${IMG}/terrasse.jpg`,
  },
];

function TickerItem({
  frame,
  clone,
}: {
  frame: TickerFrame;
  clone: boolean;
}) {
  return (
    /* `aria-hidden` est mesuré : "false" sur les originaux, "true" sur les
       clones. Un lecteur d'écran ne doit entendre les vignettes qu'une fois,
       même si le DOM les contient deux fois. */
    <li
      className={`hero__ticker-item ${clone ? "clone-item" : "ticker-item"}`}
      aria-hidden={clone}
    >
      <div className={`hero__ticker-frame ${frame.ratio}`}>
        <div className="hero__ticker-layer">
          {frame.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={frame.src} alt="" className="hero__image" />
          ) : (
            <ImageSlot label={frame.label} />
          )}
        </div>
      </div>
    </li>
  );
}

/* Un ruban : trois vignettes suivies de leurs trois clones. Quand la liste a
   défilé de la hauteur des trois premières, le premier clone occupe
   exactement la place de la première vignette — la boucle se referme sans
   que l'œil le voie. */
function HeroTicker({
  frames,
  offset,
}: {
  frames: TickerFrame[];
  offset?: boolean;
}) {
  return (
    <div className={`hero__ticker ${offset ? "hero__ticker--offset" : ""}`}>
      <ul className="hero__ticker-list">
        {frames.map((frame) => (
          <TickerItem key={frame.label} frame={frame} clone={false} />
        ))}
        {frames.map((frame) => (
          <TickerItem key={`clone-${frame.label}`} frame={frame} clone />
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Le composant
   -------------------------------------------------------------------------- */

type HeroBandProps = {
  /** Première ligne, 72px au-dessus de 810px, 41px en dessous. */
  title: ReactNode;
  /** Seconde ligne, 64px puis 41px — celle qui porte l'accent. */
  subtitle: ReactNode;
  /** Ligne courte et détachée, entre le titre et le chapô. */
  kicker: string;
  lede: string;
  ctaLabel: string;
  ctaHref?: string;
  /** Texte du sceau de confiance, pour les lecteurs d'écran. */
  webmarkLabel: string;
};

export default function HeroBand({
  title,
  subtitle,
  kicker,
  lede,
  ctaLabel,
  ctaHref = "#",
  webmarkLabel,
}: HeroBandProps) {
  return (
    <section className="hero">
      {/* Au-dessus de 810px : le groupe de gauche. */}
      <HeroCluster columns={LEFT} />

      <div className="hero__center">
        <div className="hero__stack">
          <div className="hero__text">
            <div className="hero__headings">
              <h1 className="hero__title">{title}</h1>
              <h1 className="hero__title--secondary">{subtitle}</h1>
            </div>

            <div className="hero__lede">
              {/* La ligne détachée, en italique : c'est la formule que le
                  reste de la page reprend. Elle n'est pas dans le relevé —
                  celui-ci ne mesure qu'un chapô — mais elle réutilise
                  l'italique déjà chargée pour les cas clients. */}
              <p className="hero__kicker">{kicker}</p>
              <p className="t-intro">{lede}</p>
            </div>
          </div>

          {/* Le libellé de ce bouton est mesuré au rôle « texte 3/4 »
              (20px/24px, graisse 600, approche -0,4px), pas au rôle 4/4 des
              liens de la page longue. Et il est enveloppé — `white-space: pre`
              sur l'enveloppe : le libellé ne se coupe jamais.
              Le bouton fait 262,57 × 56 dans les DEUX variantes : il ne
              rétrécit pas sur mobile. */}
          <div className="hero__cta">
            <ButtonPrimary
              href={ctaHref}
              labelClassName="t-label"
              labelWrapperClassName="hero__cta-label"
            >
              {ctaLabel}
            </ButtonPrimary>
          </div>

          {/* Le sceau de confiance — 300 × 60, identique dans les deux
              variantes. Le fichier fourni est blanc sur transparent : il sert
              de masque et la couleur vient de la charte (voir hero.css).
              `role="img"` + `aria-label` parce qu'un masque CSS n'est qu'un
              fond décoratif : sans ça, le texte du sceau serait perdu pour
              un lecteur d'écran. */}
          <div className="hero__webmark" role="img" aria-label={webmarkLabel} />
        </div>
      </div>

      {/* Au-dessus de 810px : le groupe de droite. */}
      <HeroCluster columns={RIGHT} />

      {/* En dessous de 810px : les deux rubans, EN BAS du bloc d'accroche.

         ÉCART ASSUMÉ. Le relevé étroit place ce bloc en PREMIER enfant de la
         racine, donc au-dessus du texte. Il est ici en dernier, sur demande :
         les rubans passent sous le titre, le chapô, le bouton et le sceau.
         C'est le seul écart de la variante étroite ; tout le reste — écarts,
         rayons, rapports d'aspect, déphasage — vient des mesures. */}
      <div className="hero__tickers">
        <HeroTicker frames={TICKER_A} />
        <HeroTicker frames={TICKER_B} offset />
      </div>
    </section>
  );
}
