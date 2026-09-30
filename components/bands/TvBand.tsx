import { ButtonNav } from "@/components/primitives/Buttons";
import { TV } from "@/content/site";

/* ==========================================================================
   BANDE 10 — l'émission « Qui veut être mon associé ? »

   Un poste de télévision à gauche, le texte à droite. Sur l'écran : le logo
   de l'émission.

   LE LOGO EST CELUI DE L'ÉMISSION, RECADRÉ. Le fichier du site officiel
   (quiveutetremonassocie.com) porte aussi la marque « Amplify », le programme
   d'accompagnement ; on ne garde que le titre de l'émission, parce que les
   clients de l'agence sont passés à l'antenne, pas dans ce programme. C'est
   une MARQUE DÉPOSÉE (M6 / éditeur de l'émission) : elle est employée ici
   pour nommer l'émission où des clients sont passés. Son emploi doit être
   confirmé avec Manon avant la mise en ligne. Fichier : public/brand/qvema.svg.

   Les trois marques passées dans l'émission ne sont pas affichées : leurs
   noms n'ont jamais été fournis. Les données restent dans `TV.brands`.
   ========================================================================== */

export default function TvBand() {
  return (
    <section className="tv-band">
      <div className="tv-band__inner">
        {/* Le poste : purement décoratif. */}
        <div className="tvset" aria-hidden="true">
          <div className="tvset__body">
            <div className="tvset__screen">
              {/* Le logo est blanc sur transparent : il se lit sur l'écran
                  sombre. Décoratif, le titre de la bande dit déjà le nom. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/qvema.svg"
                alt=""
                className="tvset__logo"
                width={2120}
                height={560}
              />
              <div className="tvset__scan" />
            </div>
            <div className="tvset__panel">
              <span className="tvset__led" />
              <span className="tvset__knob" />
              <span className="tvset__knob" />
            </div>
          </div>
          <div className="tvset__feet">
            <span />
            <span />
          </div>
        </div>

        <div className="tv-band__text">
          <h2 className="tv-band__title">
            Qui veut être mon <span>associé ?</span>
          </h2>

          <p className="tv-band__lead">{TV.lead}</p>

          <blockquote className="tv-band__quote">
            <span className="tv-band__mark" aria-hidden="true">
              “
            </span>
            {TV.statement}
          </blockquote>

          <ButtonNav>{TV.ctaLabel}</ButtonNav>
        </div>
      </div>
    </section>
  );
}
