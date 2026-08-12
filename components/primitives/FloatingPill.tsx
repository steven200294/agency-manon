import ImageBox from "@/components/primitives/ImageBox";

/* ==========================================================================
   Pastille flottante — boîte variante 1 sur 4, UNE occurrence sur la page

   C'est l'élément le plus singulier du relevé : le seul en `position: fixed`,
   le seul à porter une bordure, le seul flouté (`backdrop-filter: blur(10px)`),
   et il monte à `z-index: 2147483000` — c'est-à-dire au-dessus de tout.

   Un z-index à quelques unités du maximum entier signé sur 32 bits n'est pas
   une décision de mise en page : c'est le badge de l'éditeur de site, posé
   par-dessus la page. Il est reproduit parce qu'il est mesuré, mais sa place
   exacte à l'écran (coin, décalage) ne l'est pas : le relevé donne
   `position: fixed` sans `top`, `right`, `bottom` ni `left`.

   Le calage retenu ci-dessous est donc un choix, pas une mesure.
   Voir MISSING.md.
   ========================================================================== */

export default function FloatingPill() {
  return (
    <div className="pill" style={{ bottom: "16px", left: "16px" }}>
      <ImageBox label="Badge" width="28px" variant="media-sm" />
    </div>
  );
}
