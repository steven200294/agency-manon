import Image from "next/image";

import logoNoir from "@/public/brand/logo-noir.png";
import logoBeige from "@/public/brand/logo-beige.png";

/* ==========================================================================
   Logo The Trace Agency

   Deux fichiers fournis, 313 × 171 tous les deux :

     noir   — pour les surfaces claires. C'est le cas par défaut ici, la page
              étant en Dentelle.
     beige  — pour les surfaces sombres : le bloc dégradé de la bande 12, ou
              une éventuelle version sombre du site.

   Le logo est un fichier de marque, pas une mesure : ni sa taille ni son
   emplacement ne figurent dans les relevés. Les hauteurs passées en `width`
   par les appelants sont des décisions de mise en page.

   `next/image` reçoit l'import statique du PNG, ce qui lui donne les
   dimensions intrinsèques à la compilation : pas de saut de mise en page au
   chargement, et le ratio 313/171 est déduit du fichier plutôt qu'écrit à la
   main.
   ========================================================================== */

type LogoProps = {
  /** Largeur affichée, en pixels. La hauteur suit le rapport du fichier. */
  width: number;
  /** `noir` sur fond clair (défaut), `beige` sur fond sombre. */
  variant?: "noir" | "beige";
  /**
   * Laisse `false` quand le logo est déjà accompagné du nom de la marque en
   * texte : deux fois la même information n'aide personne à la lecture
   * vocale. Le logo devient alors décoratif.
   */
  labelled?: boolean;
  className?: string;
  priority?: boolean;
};

export default function Logo({
  width,
  variant = "noir",
  labelled = true,
  className,
  priority = false,
}: LogoProps) {
  return (
    <Image
      src={variant === "beige" ? logoBeige : logoNoir}
      alt={labelled ? "The Trace Agency — Prestige Digital" : ""}
      width={width}
      className={className}
      priority={priority}
      style={{ width: `${width}px`, height: "auto" }}
    />
  );
}
