import type { CSSProperties } from "react";

/* ==========================================================================
   LogoTicker — une piste de logos qui défile en boucle, sans fin

   NON MESURÉ. Aucun relevé du projet ne capture ce mécanisme : c'est une
   demande explicite pour la bande noire des cas clients. Le principe et les
   réglages viennent du ruban qui défilait dans le pied de page, retiré depuis
   avec le rideau (voir footer.css) : c'était le même mouvement, il devait se
   régler de la même façon.

   LE PRINCIPE

   La piste contient DEUX séries identiques posées côte à côte, et se déplace
   d'exactement la moitié de sa largeur avant de repartir à zéro. À l'instant
   où elle revient, la seconde série se trouve pixel pour pixel là où était la
   première : la coupure est invisible et la boucle n'a pas de fin. Écrire le
   déplacement en pourcentage (`-50%`) plutôt qu'en pixels fait tenir la règle
   quel que soit le nombre de logos et quelle que soit leur largeur.

   La seconde série est un doublon PUREMENT VISUEL : elle est masquée aux
   lecteurs d'écran, qui ne doivent entendre la liste des clients qu'une fois.

   L'ANIMATION est portée par le CSS seul — pas de `useEffect`, pas de
   `requestAnimationFrame`, pas de rendu client. Ce composant reste un
   composant serveur, et la piste tourne même avant l'hydratation.

   LES LOGOS ne sont pas encore fournis. Tant qu'une source manque pour un
   client, l'emplacement affiche son NOM : la piste garde exactement la même
   hauteur et le même rythme le jour où les images arriveront. Il suffira de
   renseigner `CLIENT_LOGOS` dans `content/site.ts`.
   ========================================================================== */

type LogoTickerProps = {
  /** Les noms à faire défiler, dans l'ordre d'affichage. */
  items: readonly string[];
  /**
   * Chemin du logo pour chaque nom. Une entrée manquante n'est pas une
   * erreur : le nom prend la place de l'image.
   */
  logos?: Readonly<Record<string, string>>;
  /**
   * Durée d'un cycle complet, en notation CSS. CHOISIE, comme tout le reste
   * ici. Elle se règle au ressenti : trop court, la piste distrait ; trop
   * long, elle a l'air figée.
   */
  duration?: string;
  /** Écart entre deux logos, en notation CSS. */
  gap?: string;
  className?: string;
};

/* Les deux séries. Un tableau plutôt que deux blocs recopiés : le jour où le
   nombre de séries doit changer (une piste très courte peut en demander
   trois pour couvrir la largeur), c'est la seule ligne à toucher. */
const RUNS = [0, 1] as const;

export default function LogoTicker({
  items,
  logos,
  duration,
  gap,
  className = "",
}: LogoTickerProps) {
  const style: CSSProperties = {
    ...(duration ? { ["--ticker-duration" as string]: duration } : null),
    ...(gap ? { ["--ticker-gap" as string]: gap } : null),
  };

  return (
    <div className={`logo-ticker ${className}`.trim()} style={style}>
      <div className="logo-ticker__track">
        {RUNS.map((run) => (
          <ul
            key={run}
            className="logo-ticker__run"
            /* La seconde série n'existe que pour la boucle : elle est retirée
               de l'arbre d'accessibilité pour ne pas dicter deux fois les
               quinze noms. */
            aria-hidden={run === 1 || undefined}
          >
            {items.map((name) => {
              const src = logos?.[name];

              return (
                <li key={name} className="logo-ticker__item">
                  {src ? (
                    // Le logo est une image nue, comme partout dans le projet :
                    // next/image poserait son propre wrapper et ses styles
                    // par-dessus le cadrage de la piste.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt={name}
                      className="logo-ticker__logo"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="logo-ticker__name">{name}</span>
                  )}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
