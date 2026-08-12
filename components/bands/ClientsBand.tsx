import ImageBox from "@/components/primitives/ImageBox";
import {
  CLIENTS,
  CLIENTS_TITLE_BEFORE,
  CLIENTS_TITLE_EMPHASIS,
} from "@/content/site";

/* ==========================================================================
   BANDE 9 sur 13 — `div.framer-1m2b514`  ·  SECTION 9a, le bandeau clients

   Aucun fond propre. Pleine largeur, sans padding latéral, sans largeur
   maximale, padding 120px en haut, écart 72px.

   Structure mesurée dans le squelette :

     div.framer-5p5zia  [flex column, gap 56px, center]
       div.framer-1wfyehu  [flex column, gap 16px, center]
         ul  [flex row, gap 16px, align-items: center]
           13 × médaillon → image

   ÉCART : le relevé mesure treize médaillons, le document en nomme quinze.
   Les quinze sont affichés — retirer deux clients pour tenir dans un compte
   mesuré serait absurde. La rangée se replie. Voir MISSING.md.

   Les logos ne sont pas fournis : chaque médaillon porte pour l'instant le
   nom du client, ce qui a l'avantage de rester lisible en attendant.
   ========================================================================== */

export default function ClientsBand() {
  return (
    <section className="band-creators">
      <h2 className="t-h2">
        {CLIENTS_TITLE_BEFORE}
        <span className="t-em-heading">{CLIENTS_TITLE_EMPHASIS}</span>
      </h2>

      {/* `div.framer-5p5zia [flex column, gap 56px, center]` */}
      <div
        className="flex w-full flex-col items-center justify-center px-10"
        style={{ gap: "56px" }}
      >
        {/* `div.framer-1wfyehu [flex column, gap 16px, center]` */}
        <div
          className="flex w-full flex-col items-center justify-center"
          style={{ gap: "16px" }}
        >
          {/* `ul [flex row, gap 16px, align-items: center]` */}
          <ul
            className="flex flex-row flex-wrap items-center justify-center"
            style={{ gap: "16px", maxWidth: "1240px" }}
          >
            {CLIENTS.map((client) => (
              <li key={client} className="medallion client-logo">
                <ImageBox label={client} width="104px" variant="media-sm" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
