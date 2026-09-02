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

export default function MethodBand() {
  return (
    <section className="band-fit">
      <div className="band-head">
        <h2 className="t-h2">{METHOD.title}</h2>
        <p className="band-head__lede">{METHOD.subtitle}</p>
      </div>

      {/* Les quatre étapes en relevé. Les tuiles sont abandonnées : sur le
          fond Dentelle, une tuile `--color-surface-raised` ne se détachait
          pas, et le numéro en italique posé à droite se lisait comme une
          décoration alors qu'il porte l'ORDRE des étapes.

          Ici le numéro ouvre sa ligne, à gauche, où l'œil le trouve avant le
          titre — c'est une séquence, elle se lit dans le sens de la lecture. */}
      <div className="ledger ledger--steps">
        {METHOD_STEPS.map((step) => (
          <div key={step.number} className="ledger__row">
            <span className="ledger__mark">{step.number}</span>
            <h3 className="ledger__title">{step.title}</h3>
            <p className="ledger__body">{step.body}</p>
          </div>
        ))}
      </div>

      {/* « Comme en finance. » — le total en bas de colonne. */}
      <p className="ledger__close">{METHOD.closing}</p>
    </section>
  );
}
