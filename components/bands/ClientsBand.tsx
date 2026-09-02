import {
  CLIENTS,
  CLIENTS_TITLE_BEFORE,
  CLIENTS_TITLE_EMPHASIS,
} from "@/content/site";

/* ==========================================================================
   ⚠ COMPOSANT INEMPLOYÉ — retiré de la page.

   Son contenu faisait doublon : le même titre et la même liste `CLIENTS`
   ouvrent la bande noire des cas clients, en bandeau défilant. Voir le
   commentaire dans app/page.tsx.

   Il reste ici parce qu'il tient debout et qu'il redeviendra utile si les
   références doivent un jour occuper une section à elles seules — avec les
   vrais logos, par exemple.
   ==========================================================================

   ==========================================================================
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
      <div className="band-head">
        <h2 className="t-h2">
          {CLIENTS_TITLE_BEFORE}
          <span className="t-em-heading">{CLIENTS_TITLE_EMPHASIS}</span>
        </h2>
      </div>

      {/* Quinze noms, en grille réglée.

          Les médaillons sont abandonnés : aucun logo n'étant fourni, la
          section affichait quinze contours beiges sur fond beige avec un nom
          minuscule dedans — ça se lisait comme un bug d'affichage, pas comme
          une liste de références.

          Un nom composé pour lui-même tient debout tout seul. Et le jour où
          les logos arrivent, ils prennent la place du texte dans la même
          grille, sans rien changer d'autre. */}
      <ul className="roster">
        {CLIENTS.map((client) => (
          <li key={client} className="roster__name">
            {client}
          </li>
        ))}
      </ul>
    </section>
  );
}
