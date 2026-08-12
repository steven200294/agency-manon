import { MANIFESTO } from "@/content/site";

/* ==========================================================================
   BANDE 7 sur 13 — `div.framer-1ra32b7`  ·  SECTION 3, le manifeste

   Aucun fond propre. Colonne centrée alignée en haut, écart 56px,
   padding 120px en haut et 40px sur les côtés, largeur max 1240px,
   `overflow: hidden`.

   Cette géométrie est celle de la bande 3, amenée ici en 7e position : la
   section des cas clients, pleine largeur et sur fond noir, a pris sa place
   au 3e rang. Les deux ont échangé, contenu ET géométrie.

   Le relevé décrit dans cette bande une rangée de quatre chiffres. Le texte
   y met un manifeste — un bloc de prose à la première personne. La géométrie
   est conservée telle quelle ; c'est son contenu qui change de nature.
   Voir MISSING.md.

   Trois blocs de texte, dans l'ordre du document : l'intro, les trois
   griefs, le retournement, puis les trois principes et la signature.
   ========================================================================== */

export default function ManifestoBand() {
  return (
    <section className="band-stats">
      <h2 className="t-h2" style={{ maxWidth: "880px" }}>
        {MANIFESTO.title}
      </h2>

      <div className="manifesto">
        <p className="t-intro manifesto__intro">{MANIFESTO.intro}</p>

        {/* Les trois griefs, en anaphore : chacun commence par « Trop de ».
            Ils sont serrés pour que la répétition se voie. */}
        <div className="manifesto__griefs">
          {MANIFESTO.griefs.map((line) => (
            <p key={line} className="manifesto__grief">
              {line}
            </p>
          ))}
        </div>

        <p className="t-intro manifesto__turn">{MANIFESTO.turn}</p>

        {/* Les trois principes, chacun bâti sur « X avant Y ». Ce sont eux
            qui portent la promesse : ils prennent le rôle typographique le
            plus fort de la bande. */}
        <div className="manifesto__principles">
          {MANIFESTO.principles.map((line) => (
            <p key={line} className="manifesto__principle">
              {line}
            </p>
          ))}
        </div>

        <p className="manifesto__signature">{MANIFESTO.signature}</p>
      </div>
    </section>
  );
}
