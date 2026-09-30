import { METHOD, METHOD_STEPS } from "@/content/site";

/* ==========================================================================
   BANDE 5 sur 13 — `div.framer-mmoxxx`  ·  SECTION 5, la méthode Trace

   Aucun fond propre. Même gabarit que les bandes 3 et 4.

   Les quatre étapes sont portées par la tuile mesurée — boîte 3 sur 4 :
   rangée, `space-between`, padding 20px, rayon 20px, fond surélevé, double
   ombre interne. C'est le seul gabarit mesuré qui pousse un contenu à gauche
   et un repère à droite, ce qu'une étape numérotée demande exactement.

   Le numéro est à droite, comme le repère du gabarit — pas à gauche. C'est
   ce que la tuile mesure, et ça se lit très bien : l'œil suit les intitulés
   en colonne, les numéros ponctuent la marge.
   ========================================================================== */

/* Une photo par étape, dans l'ordre :
   cartographie → la côte vue d'en haut, comme une carte ; direction → le
   portrait composé, chapeau et tenue choisis ; exécution → le tournage sur
   site ; empreinte → la neige fraîche, là où l'on laisse une trace. */
const PHOTOS = [
  "/brand/hero/marseille.jpg",
  "/brand/hero/chapeau-vert.webp",
  "/brand/hero/tournage-food.jpg",
  "/brand/hero/station.jpg",
] as const;

export default function MethodBand() {
  return (
    <section className="band-fit method-band">
      <div className="band-head">
        <h2 className="t-h2">{METHOD.title}</h2>
        <p className="band-head__lede">{METHOD.subtitle}</p>
      </div>

      {/* Sur fond Nuit : quatre colonnes, chacune ouverte par une photo en
          bandeau, puis un numéro géant, le titre et le texte. Le numéro est le
          repère de la séquence — il prend la place, comme un chiffre dans un
          relevé. Les photos sont tenues fines (16 / 9) pour que la rangée
          tienne d'un coup d'œil. */}
      <ol className="method">
        {METHOD_STEPS.map((step, i) => (
          <li key={step.number} className="method__step">
            {/* Décorative : le titre dit déjà de quoi il s'agit. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTOS[i]}
              alt=""
              className="method__photo"
              loading="lazy"
            />
            <span className="method__number">{step.number}</span>
            <h3 className="method__title">{step.title}</h3>
            <p className="method__body">{step.body}</p>
          </li>
        ))}
      </ol>

      {/* « Comme en finance. » — le total en bas de colonne. */}
      <p className="ledger__close">{METHOD.closing}</p>
    </section>
  );
}
