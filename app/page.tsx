import SiteHeader from "@/components/bands/SiteHeader";
import HeroBand from "@/components/bands/HeroBand";
import ConstatBand from "@/components/bands/ConstatBand";
import ManifestoBand from "@/components/bands/ManifestoBand";
import AudienceBand from "@/components/bands/AudienceBand";
import MethodBand from "@/components/bands/MethodBand";
import UgcBand from "@/components/bands/UgcBand";
import ExpertisesBand from "@/components/bands/ExpertisesBand";
import MarkersBand from "@/components/bands/MarkersBand";
import TvBand from "@/components/bands/TvBand";
import CasesBand from "@/components/bands/CasesBand";
import PhotoWallBand from "@/components/bands/PhotoWallBand";
import SiteFooter from "@/components/bands/SiteFooter";
import { HERO } from "@/content/site";

/* ==========================================================================
   La page — les bandes mesurées, dans l'ordre mesuré

   Le relevé donne TREIZE bandes, et leur enchaînement est une mesure, pas un
   choix éditorial. Aucune n'est ajoutée, aucune n'est déplacée.

   UNE est retirée : la bande des clients, dont le contenu faisait doublon
   avec l'ouverture de la bande noire — même titre, même liste. La numérotation
   ci-dessous suit donc la page telle qu'elle est rendue, pas le relevé ; le
   détail est au commentaire qui prend sa place.

   Les bandes qui ne peignent aucun fond restent des bandes : elles laissent
   simplement voir le canevas. Elles sont dix, depuis que le manifeste est
   passé en Nuit pour répondre à la bande noire (voir lower-bands.css).

   Ce qui a changé avec l'arrivée du kit média, c'est le RÔLE de chaque
   bande, pas sa place. Le relevé donne des gabarits — une rangée de quatre
   chiffres, une rangée de trois cartes, un carrousel de neuf, deux colonnes
   alignées en haut — et le contenu réel s'y est réparti selon ce que chaque
   gabarit sait porter. Le détail est en tête de chaque composant.

   Le canevas lui-même (`div.framer-U6Cb5.framer-pHLhK`) est un wrapper
   pleine largeur qui repeint le fond par-dessus le body et centre tout.

   Une seule exception, signalée : `HeroBand` n'est pas une bande. Il vient
   d'un relevé distinct, celui du composant d'accroche.
   ========================================================================== */

export default function Home() {
  return (
    <div className="page-canvas">
      {/* La pastille flottante mesurée (boîte 1 sur 4) n'est PAS reprise.
          Son `z-index` de 2 147 483 000 et son unique occurrence la
          désignent pour ce qu'elle est : le badge de l'éditeur de site posé
          par-dessus la page relevée, pas un élément de design. Le composant
          reste dans le dépôt, inemployé. Voir MISSING.md. */}
      {/*  1 */} <SiteHeader />
      {/* `.page-content` est OPAQUE et passe devant le pied de page, qui est
          en `position: fixed` derrière lui. C'est ce qui fait la révélation
          en rideau : sans cette couche, on verrait le pied de page à travers
          toutes les bandes, qui sont transparentes. C'est aussi elle qui
          porte les deux couches de lueur du fond animé. Voir footer.css. */}
      <div className="page-content">
        {/*  — */}{" "}
        <HeroBand
          title={
            <>
              {HERO.titleLine1Before}
              <span className="hero__serif">{HERO.titleLine1Emphasis}</span>
              {HERO.titleLine1After}
            </>
          }
          subtitle={
            <>
              {HERO.titleLine2Before}
              <span className="hero__emphasis">{HERO.titleLine2Emphasis}</span>
            </>
          }
          lede={HERO.lede}
          ctaLabel={HERO.ctaLabel}
        />
        {/*  2 */} <ConstatBand />
        {/* L'EMPILEMENT AU DÉFILEMENT — bandes 3 et 4.

            La bande noire des cas clients ne défile pas avec la page : elle
            GLISSE PAR-DESSUS celle des repères, qui reste immobile derrière
            elle. C'est une demande explicite, et c'est aussi la seule
            superposition de la page.

            L'enveloppe n'est pas décorative, elle est nécessaire : un élément
            `sticky` ne se décolle qu'à la fin de son BLOC CONTENEUR. Sans
            elle, la bande des repères resterait épinglée jusqu'au bas de
            `.page-content` et réapparaîtrait derrière toutes les bandes
            suivantes, qui sont transparentes. L'enveloppe borne l'effet aux
            deux bandes concernées, et à elles seules.

            Aucun JavaScript, aucune dépendance : `position: sticky` suffit.
            Voir `.stack-cases` dans cases.css. */}
        <div className="stack-cases">
          {/*  3 */} <MarkersBand />
          {/*  4 */} <CasesBand />
        </div>
        {/*  5 */} <AudienceBand />
        {/*  6 */} <MethodBand />
        {/*  7 */} <UgcBand />
        {/*  8 */} <ManifestoBand />
        {/* La bande des clients est RETIRÉE : c'était un doublon.

            Le même titre — « Ils nous ont confié leur trace. » — et la même
            liste de quinze noms ouvrent déjà la bande noire des cas clients,
            en bandeau défilant (voir `.cases__clients` dans CasesBand). Les
            deux blocs lisaient la même source, `CLIENTS` dans
            content/site.ts : la page annonçait donc ses références deux fois,
            à trois sections d'intervalle.

            Celle du haut est gardée, parce qu'elle est à sa place : on montre
            à qui l'agence a affaire juste avant de montrer ce que ça a donné
            en chiffres. Le composant reste dans le dépôt, inemployé. */}
        {/* 10 */} <TvBand />
        {/* 11 */} <ExpertisesBand />
        {/* 12 */} <PhotoWallBand />
      </div>
      {/* 13 */} <SiteFooter />
    </div>
  );
}
