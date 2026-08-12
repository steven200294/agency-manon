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
      <div className="flex w-full flex-col items-center" style={{ gap: "16px" }}>
        <h2 className="t-h2">{METHOD.title}</h2>
        <p className="t-intro">{METHOD.subtitle}</p>
      </div>

      <div className="flex w-full flex-col" style={{ gap: "16px" }}>
        {METHOD_STEPS.map((step) => (
          <div key={step.number} className="tile method-step">
            <div className="method-step__body">
              <h4
                className="t-h4"
                style={{ fontSize: "26px", lineHeight: "33.8px" }}
              >
                {step.title}
              </h4>
              <p className="t-body">{step.body}</p>
            </div>
            <span className="method-step__number">{step.number}</span>
          </div>
        ))}
      </div>

      <p className="method__closing">{METHOD.closing}</p>
    </section>
  );
}
