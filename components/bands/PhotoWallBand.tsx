import { ButtonPrimary } from "@/components/primitives/Buttons";
import { FINAL_CTA } from "@/content/site";

/* ==========================================================================
   BANDE 12 — le mur de photos et l'appel final

   Un grand mur de photos des clients de l'agence, en colonnes de hauteurs
   inégales (maçonnerie), plein écran. Le texte de l'appel final est posé
   DIRECTEMENT sur les photos, sur un voile sombre : il n'y a plus de boîte à
   dégradé au-dessus du pied de page.

   Le voile ne bloque pas les clics (`pointer-events: none`) ; seul le bouton
   reste cliquable.

   Les photos sont décoratives : elles ne se cliquent pas et ne s'agrandissent
   pas.

   Elle remplace `CtaBand`, qui reste dans le dépôt, inemployée. L'ancre
   `#contact` (visée par les boutons des pages de cas) est reprise ici.
   ========================================================================== */

const PHOTOS: { src: string; w: number; h: number }[] = [
  { src: "/brand/galerie/g01.webp", w: 619, h: 1100 },
  { src: "/brand/galerie/g02.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g03.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g04.webp", w: 619, h: 1100 },
  { src: "/brand/galerie/g05.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g06.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g07.webp", w: 733, h: 1100 },
  { src: "/brand/galerie/g08.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g09.webp", w: 733, h: 1100 },
  { src: "/brand/galerie/g10.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g11.webp", w: 619, h: 1100 },
  { src: "/brand/galerie/g12.webp", w: 733, h: 1100 },
  { src: "/brand/galerie/g13.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g14.webp", w: 733, h: 1100 },
  { src: "/brand/galerie/g15.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g16.webp", w: 733, h: 1100 },
  { src: "/brand/galerie/g17.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g18.webp", w: 619, h: 1100 },
  { src: "/brand/galerie/g19.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g20.webp", w: 826, h: 1100 },
  { src: "/brand/galerie/g21.webp", w: 619, h: 1100 },
  { src: "/brand/galerie/g22.webp", w: 733, h: 1100 },
];

/* Le mur n'est PAS une grille régulière : cinq colonnes, chacune décalée en
   hauteur et de largeur différente ; chaque photo a son propre rapport
   (portrait, carré, paysage) et une légère inclinaison une fois sur deux.
   Rien ne s'aligne : on lit un collage posé à la main, pas un catalogue.

   Les photos sont réparties en tourniquet dans les colonnes (0, 1, 2, 3, 4,
   0, 1…). L'indice d'origine est gardé pour l'agrandissement. */
const COLUMNS = 5;

/* Rapports d'image, en cycle : le motif est choisi pour qu'aucune colonne ne
   répète le même deux fois de suite. Les photos sont recadrées (`cover`). */
const RATIOS = ["3 / 4", "1 / 1", "4 / 5", "5 / 4", "2 / 3", "1 / 1", "3 / 4", "4 / 3"];

const TILTS = [-2.2, 1.4, 0, 2.4, -1.2, 0, 1.8, -2.6];

const wall = Array.from({ length: COLUMNS }, (_, c) =>
  PHOTOS.map((p, i) => ({ ...p, i })).filter((p) => p.i % COLUMNS === c),
);

export default function PhotoWallBand() {
  return (
    <section className="wall" id="contact">
      <div className="wall__grid">
        {wall.map((col, c) => (
          <ul key={c} className="wall__col" data-col={c}>
            {col.map((p) => (
              <li
                key={p.src}
                className="wall__cell"
                style={{
                  aspectRatio: RATIOS[(p.i * 3 + c) % RATIOS.length],
                  rotate: `${TILTS[(p.i + c * 2) % TILTS.length]}deg`,
                }}
              >
                <div className="wall__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt=""
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Le voile et le texte, par-dessus le mur. */}
      <div className="wall__veil">
        <div className="wall__text">
          <h2 className="wall__title">
            {FINAL_CTA.titleBefore}
            <span>{FINAL_CTA.titleEmphasis}</span>
            {FINAL_CTA.titleAfter}
          </h2>
          <p className="wall__subtitle">{FINAL_CTA.subtitle}</p>
          <p className="wall__body">{FINAL_CTA.body}</p>
          <p className="wall__reassurance">{FINAL_CTA.reassurance}</p>
          <ButtonPrimary labelClassName="t-label">
            {FINAL_CTA.ctaLabel}
          </ButtonPrimary>
        </div>
      </div>

    </section>
  );
}
