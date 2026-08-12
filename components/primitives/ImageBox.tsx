import type { CSSProperties } from "react";

/* ==========================================================================
   ImageBox — emplacement d'image

   Toutes les images du site passent par ce composant. Tant qu'aucune source
   ne lui est donnée, il dessine un cadre étiqueté qui occupe EXACTEMENT la
   place de l'image finale : même rapport, même rayon, même largeur. Rien ne
   bougera dans la mise en page le jour où les visuels arriveront — il
   suffira d'ajouter la prop `src`.

   Le relevé ne donne que deux cadrages d'image, et un seul rapport :

     variante 1 sur 2 — rayon 14px, rapport 1254/1254 (28 occurrences)
     variante 2 sur 2 — rayon  4px, rapport 1254/1254 ( 2 occurrences)

   1254/1254 est un carré strict. Aucun autre rapport n'a été mesuré : les
   emplacements non carrés de ce projet reçoivent leur rapport en prop, et
   ce rapport est un choix de mise en page, pas une mesure.
   ========================================================================== */

type ImageBoxProps = {
  /** Ce que l'emplacement attend. Affiché au centre du cadre vide. */
  label: string;
  /** Largeur de l'emplacement. Accepte n'importe quelle longueur CSS. */
  width?: string;
  /**
   * Rapport d'aspect. Par défaut 1254/1254, le seul mesuré.
   * Toute autre valeur est une décision de mise en page, pas une mesure.
   */
  ratio?: string;
  /** `media` → rayon 14px (défaut). `media-sm` → rayon 4px. */
  variant?: "media" | "media-sm";
  /** Renseigne-la pour remplacer le cadre par la vraie image. */
  src?: string;
  alt?: string;
  className?: string;
};

export default function ImageBox({
  label,
  width,
  ratio,
  variant = "media",
  src,
  alt,
  className = "",
}: ImageBoxProps) {
  const style: CSSProperties = {
    width,
    // Le rapport mesuré est déjà porté par la classe CSS ; on ne le
    // surcharge que si l'appelant en demande explicitement un autre.
    ...(ratio ? { aspectRatio: ratio } : null),
  };

  if (src) {
    return (
      // Le relevé mesure un `<img>` nu : next/image injecterait un wrapper et
      // ses propres styles par-dessus le cadrage mesuré.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? label}
        className={`${variant === "media-sm" ? "media-sm" : "media"} ${className}`}
        style={style}
      />
    );
  }

  return (
    <div
      className={`media-slot ${variant === "media-sm" ? "media-slot--sm" : ""} ${className}`}
      style={style}
      role="img"
      aria-label={`Emplacement d'image : ${label}`}
    >
      <span className="media-slot__label">{label}</span>
    </div>
  );
}
