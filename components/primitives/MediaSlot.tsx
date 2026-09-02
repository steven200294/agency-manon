/* ==========================================================================
   MediaSlot — un emplacement d'image en attente, composé

   ⚠ NON MESURÉ. C'est un objet de chantier, pas un objet de la page finie.

   ---------------------------------------------------------------------------
   POURQUOI IL EXISTE

   Plusieurs visuels du site ne sont pas fournis : le portrait de la
   fondatrice, les logos des quinze clients, les trois marques passées à la
   télévision. Jusqu'ici, chacun était traité différemment — un médaillon
   vide ici, une pastille beige là, du texte ailleurs — et aucun ne disait ce
   qu'on attendait à sa place.

   Un emplacement vide doit faire deux choses, et il n'en faisait aucune :

   1. TENIR SA PLACE. Il occupe déjà le rapport d'image et l'encombrement du
      visuel définitif, donc rien ne bougera dans la mise en page le jour du
      remplacement ;
   2. DIRE CE QU'IL ATTEND. Le sujet et le cadrage attendus sont écrits
      dedans. Sans ça, celui qui fournit les fichiers doit deviner.

   ---------------------------------------------------------------------------
   IL NE FAIT PAS SEMBLANT

   Il n'affiche pas une photo de banque d'images à la place du visuel manquant.
   Une image provisoire crédible se retrouve en production : personne ne la
   voit plus au bout de trois jours. Un emplacement qui dit « à fournir » ne
   peut pas être oublié.

   Le filet, le fond et l'encre s'adaptent à la surface qui le reçoit, claire
   ou sombre : `variant="dark"` sur les bandes en Nuit. Voir `.media-slot`
   dans lower-bands.css.
   ========================================================================== */

type MediaSlotProps = {
  /** Ce qu'on attend à cet endroit. Une phrase, pas un nom de fichier. */
  subject: string;
  /** Le cadrage attendu, pour que le fichier fourni tombe juste du premier coup. */
  format: string;
  /** Rapport d'image de l'emplacement, en notation CSS — « 4 / 5 » par défaut. */
  ratio?: string;
  /** `dark` pour les bandes en Nuit. */
  variant?: "light" | "dark";
  className?: string;
};

export default function MediaSlot({
  subject,
  format,
  ratio = "4 / 5",
  variant = "light",
  className = "",
}: MediaSlotProps) {
  return (
    <div
      className={`media-slot media-slot--${variant} ${className}`.trim()}
      style={{ aspectRatio: ratio }}
      /* `role="img"` + `aria-label` : pour un lecteur d'écran, c'est une image
         manquante annoncée comme telle, pas un bloc de texte décoratif. */
      role="img"
      aria-label={`Emplacement d'image à fournir : ${subject}`}
    >
      <span className="media-slot__subject">{subject}</span>
      <span className="media-slot__format">{format}</span>
    </div>
  );
}
