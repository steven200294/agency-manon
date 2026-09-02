import Image from "next/image";
import CountUp from "@/components/primitives/CountUp";
import { ButtonNav } from "@/components/primitives/Buttons";
import { UGC, UGC_FIGURES } from "@/content/site";

/* ==========================================================================
   BANDE 6 sur 13 — `div.framer-16jxr11`  ·  SECTION 6, focus UGC

   Aucun fond propre. Même gabarit que les bandes 3 à 5.

   C'est la bande que le squelette détaille le plus précisément :

     div.framer-16jxr11  [flex column, gap 56px, align-items: center]
       section  [flex row]
         ul.framer--carousel  [flex row, gap 32px, align-items: center]
       a  [flex row, gap 10px, center]

   Le carrousel mesuré reçoit ici le bandeau de logos UGC, et le lien final
   la sortie vers l'offre — exactement les deux rôles que la structure
   prévoit. Le reste de la section, plus long que ce que le relevé décrit,
   s'empile au-dessus dans la colonne à écart 56px.

   Le carrousel n'est PAS animé : la section « Motion engines » du relevé a
   été retirée du document. Voir motion.css.
   ========================================================================== */

export default function UgcBand() {
  return (
    <section className="band-team" id="ugc">
      {/* Le titre tenait sur deux `h2` de même niveau, le second en accent et
          centré. Ils forment une seule phrase — « L'UGC, ce n'est pas une
          tendance. C'est devenu le format de référence. » — et se lisent donc
          comme un titre et son chapô, pas comme deux titres.

          C'est aussi la section la plus haute de la page : c'est elle qui
          débordait par le haut et dont le titre passait sous la barre fixe.
          L'ancrage de lower-bands.css corrige ça pour les huit bandes. */}
      <div className="band-head">
        <h2 className="t-h2">{UGC.title}</h2>
        <p className="band-head__lede">{UGC.subtitle}</p>
      </div>

      {/* Les trois blocs d'explication, séparés par des filets verticaux
          plutôt que par du vide. */}
      <div className="ugc-cols">
        <div className="ugc-cols__block">
          <h3 className="ugc-cols__title">{UGC.whatTitle}</h3>
          <p className="ugc-cols__text">{UGC.what}</p>
          <div className="ugc-cols__lines">
            {UGC.whatLines.map((line) => (
              <p key={line} className="ugc-cols__line">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="ugc-cols__block">
          <h3 className="ugc-cols__title">{UGC.whyTitle}</h3>
          <p className="ugc-cols__text">{UGC.why}</p>
          <p className="ugc-cols__line">{UGC.whyClosing}</p>
        </div>

        <div className="ugc-cols__block">
          <h3 className="ugc-cols__title">{UGC.valueTitle}</h3>
          <p className="ugc-cols__text">{UGC.value}</p>
          <p className="ugc-cols__line">{UGC.valueClosing}</p>
        </div>
      </div>

      {/* LA PREUVE — une image et quatre chiffres.

          Les chiffres étaient posés à 30px au milieu d'un paragraphe : dans
          une section qui affirme que l'UGC convertit dix fois mieux, ce sont
          eux l'argument, et rien ne le montrait. Ils passent en corps
          d'affichage, en lignes réglées, avec leur source.

          ⚠ PHOTO PROVISOIRE. Voir public/brand/sections/CREDITS.md. */}
      <div className="ugc-proof">
        <div className="ugc-proof__media">
          <Image
            src="/brand/sections/ugc.jpg"
            alt="Un plat filmé au smartphone, en cours de tournage"
            fill
            sizes="(max-width: 1199px) 100vw, 40vw"
          />
        </div>

        <div className="ugc-proof__figures">
          <h3 className="ugc-cols__title">{UGC.figuresTitle}</h3>

          {UGC_FIGURES.map((figure) => (
            <div key={figure.value} className="ugc-figure">
              <CountUp value={figure.value} className="ugc-figure__value" />
              <div className="ugc-figure__text">
                <p className="ugc-figure__label">{figure.label}</p>
                {figure.source ? (
                  <p className="ugc-figure__source">{figure.source}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Les marques accompagnées. Deux sont nommées dans le document, le
          reste attend — mêmes noms composés que la liste des clients, plutôt
          que des médaillons vides. Voir MISSING.md. */}
      <div className="band-foot">
        <p className="band-foot__lead">{UGC.brandsLead}</p>
        <ButtonNav>{UGC.ctaLabel}</ButtonNav>
      </div>
    </section>
  );
}
