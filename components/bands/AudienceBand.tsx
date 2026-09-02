import Image from "next/image";
import { ButtonPrimary } from "@/components/primitives/Buttons";
import { AUDIENCE, AUDIENCES } from "@/content/site";

/* ==========================================================================
   BANDE 4 sur 13 — `div.framer-35fqpn`  ·  SECTION 4, pour qui

   Aucun fond propre. Même gabarit que la bande 3, sans `overflow: hidden`.

   ---------------------------------------------------------------------------
   RECOMPOSÉE. Le relevé mesure une rangée de TROIS cartes — padding 32px,
   rayon 28px, fond de carte, ombre portée — et le document décrit QUATRE
   publics.

   Les cartes sont abandonnées. Sur le fond Dentelle, une carte au fond
   `--color-surface-card` est du beige sur du beige : elle ne se lit pas comme
   un objet, et quatre de ces taches côte à côte donnaient la section la plus
   faible de la page.

   À la place, une galerie de quatre colonnes : une image, un titre, un
   paragraphe. C'est le gabarit du bloc d'accroche appliqué ici — ses huit
   cadres ne portent pas de carte non plus, et c'est ce qui les fait tenir.

   Chaque public reçoit l'image de son monde : un lieu de travail partagé, un
   studio, une terrasse du soir, un atelier. Voir `.gallery` dans
   lower-bands.css et les crédits dans public/brand/sections/CREDITS.md.

   ⚠ PHOTOS PROVISOIRES — à remplacer par les réalisations de l'agence.
   ========================================================================== */

/* L'image de chaque public. L'ordre suit celui de `AUDIENCES` dans
   content/site.ts ; la clé est le titre, pour qu'un réagencement du contenu
   n'aille pas décrocher les images de leur texte. */
const MEDIA: Record<string, { src: string; alt: string }> = {
  "Les entrepreneurs ambitieux": {
    src: "/brand/sections/entrepreneurs.jpg",
    alt: "Une fondatrice dans son espace de travail",
  },
  "Les marques wellness": {
    src: "/brand/sections/wellness.jpg",
    alt: "Un studio de pilates aux grandes baies vitrées",
  },
  "Les lieux d'exception": {
    src: "/brand/sections/hospitality.jpg",
    alt: "Une terrasse de restaurant éclairée à la tombée du jour",
  },
  "Les PME qui voient plus loin que leur site internet": {
    src: "/brand/sections/pme.jpg",
    alt: "Un atelier d'artisan, mains au travail",
  },
};

export default function AudienceBand() {
  return (
    <section className="band-solutions">
      <div className="band-head">
        <h2 className="t-h2">{AUDIENCE.title}</h2>
        <p className="band-head__lede">{AUDIENCE.subtitle}</p>
      </div>

      <div className="gallery">
        {AUDIENCES.map((item) => {
          const media = MEDIA[item.title];

          return (
            <article key={item.title} className="gallery__item">
              <div className="gallery__media">
                {media ? (
                  /* `sizes` évite de servir 1400px de large à une colonne qui
                     n'en fait que 280 : quatre colonnes à 1200px et au-delà,
                     deux au palier moyen, une seule sous 810px. */
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 25vw"
                  />
                ) : null}
              </div>

              <h3 className="gallery__title">{item.title}</h3>
              <p className="gallery__body">{item.body}</p>
            </article>
          );
        })}
      </div>

      <div className="band-foot">
        <p className="band-foot__lead">{AUDIENCE.ctaLead}</p>
        <ButtonPrimary labelClassName="t-label">
          {AUDIENCE.ctaLabel}
        </ButtonPrimary>
      </div>
    </section>
  );
}
