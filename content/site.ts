/* ==========================================================================
   content/site.ts — tout le texte du site, en un seul endroit

   Source : le document « Site internet The Trace Agency » (10 sections +
   pied de page). Il remplace intégralement le kit média : c'est lui qui fait
   foi. Les seules données conservées du kit sont les chiffres des deux cas
   clients, que le nouveau texte ne reprend pas mais qui restent vrais.

   Le texte est séparé des composants pour une raison simple : il change
   souvent, la structure presque jamais. Corriger une formule ou un chiffre
   se fait ici, sans ouvrir un seul fichier de mise en page.

   ---------------------------------------------------------------------------
   RÉPARTITION SUR LES 13 BANDES MESURÉES

     bande  2  → S2  Le constat
     bande  3  → S3  Manifeste founder-led
     bande  4  → S4  Pour qui          (4 cartes)
     bande  5  → S5  La méthode Trace  (4 tuiles)
     bande  6  → S6  Focus UGC         (4 chiffres + bandeau logos + lien)
     bande  7  → S7  Les expertises    (5)
     bande  8  → S8  Signature fondatrice
     bande  9  → S9a Bandeau logos clients
     bande 10  → S9b Repères + « Qui veut être mon associé ? »
     bande 11  → S9c Réalisations, sur fond noir
     bande 12  → S10 Appel à l'action final
     bande 13  → Pied de page

   L'ordre des sections du document est respecté. Aucune bande n'est ajoutée
   ni retirée : c'est leur RÔLE qui a été attribué, pas leur place.
   ---------------------------------------------------------------------------

   Les points à faire confirmer sont signalés par un commentaire À FOURNIR ou
   À VÉRIFIER, et repris dans MISSING.md.
   ========================================================================== */

export const BRAND = {
  name: "The Trace Agency",
  tagline: "Faire trace, depuis Marseille",
  founder: "Manon Ferrandino",
} as const;

/* --------------------------------------------------------------------------
   En-tête — quatre entrées, ce qui tombe sur le compte mesuré
   -------------------------------------------------------------------------- */

export const NAV = [
  { label: "Nos expertises", href: "#expertises" },
  { label: "L'UGC", href: "#ugc" },
  { label: "Réalisations", href: "#realisations" },
  { label: "L'agence", href: "#agence" },
] as const;

export const WHATSAPP_LABEL = "Discuter sur WhatsApp";

/* --------------------------------------------------------------------------
   Bloc d'accroche — SECTION 1
   -------------------------------------------------------------------------- */

export const HERO = {
  titleLine1: "Vos concurrents font du contenu.",
  titleLine2Before: "Vous, vous allez faire la ",
  titleLine2Emphasis: "différence",
  kicker: "Sur les réseaux, tout passe. Seule la trace reste.",
  lede:
    "The Trace Agency — l'agence des marques qui marquent. " +
    "Wellness, hospitality, entrepreneurs. De Marseille à Marrakech.",
  ctaLabel: "Découvrir nos services",
  webmarkLabel: "98 % de clients satisfaits, plus de 500 clients accompagnés",
} as const;

/* --------------------------------------------------------------------------
   Bande 2 — SECTION 2, le constat
   -------------------------------------------------------------------------- */

export const CONSTAT = {
  badge: "Le constat",
  title: "Le contenu, ce n'est pas le sujet.",
  lines: [
    "Tout le monde sait poster.",
    "Tout le monde sait filmer.",
    "Tout le monde a un community manager, un graphiste, une IA.",
  ],
  pivot: "Le vrai sujet, c'est ce qui reste.",
  closing:
    "Ce que votre marque a inscrit dans la mémoire de ses clients. Ce qu'on " +
    "retient de vous, quand on vous a quitté. Ce qu'on appelle, ici, ",
  closingEmphasis: "une trace.",

} as const;

/* Les deux visuels superposés et pivotés de la bande — voir ConstatBand. Le
   premier est posé derrière, le second devant.

   ⚠ PHOTOS PROVISOIRES, comme les visages des repères : deux images Unsplash
   qui tiennent le rôle en attendant les vrais visuels de l'agence. Crédits
   dans `public/brand/visuels/CREDITS.md`.

   Le type est écrit à la main, et ce n'est pas une coquetterie : sous
   `as const`, `src` serait une chaîne littérale, donc jamais nulle, et
   TypeScript déclarerait le repli « cadre étiqueté » inatteignable. Avec
   `string | null`, mettre `src: null` reste possible sans rien casser — la
   boîte redevient alors un cadre étiqueté, au même encombrement. */
export const CONSTAT_CARDS: { label: string; src: string | null }[] = [
  { label: "Ambiance — restaurant-bar", src: "/brand/visuels/bar-ambiance.jpg" },
  { label: "Tournage sur site", src: "/brand/visuels/tournage.jpg" },
];

/* --------------------------------------------------------------------------
   Bande 3 — SECTION 3, manifeste founder-led
   -------------------------------------------------------------------------- */

export const MANIFESTO = {
  title: "J'ai quitté la finance pour cette raison-là.",
  intro: "Parce que je voyais trop de marques formidables se rendre invisibles.",
  griefs: [
    "Trop de feeds qui se copient.",
    "Trop de « stratégies de communication » qui n'en sont pas.",
    "Trop d'argent dépensé sans qu'on sache jamais ce qu'il rapporte.",
  ],
  turn:
    "Aujourd'hui, je construis ce que j'aurais voulu trouver à l'époque : " +
    "une agence qui pense votre marque comme un investissement. Pas comme " +
    "une production.",
  principles: [
    "Stratégie avant esthétique.",
    "Intention avant publication.",
    "Résultats avant likes.",
  ],
  signature: "— Manon, fondatrice",
} as const;

/* --------------------------------------------------------------------------
   Bande 4 — SECTION 4, pour qui

   Quatre publics. Le relevé mesure une rangée de trois cartes : elle se
   replie en 2 + 2. Voir MISSING.md.
   -------------------------------------------------------------------------- */

export const AUDIENCE = {
  title: "On ne travaille pas avec tout le monde.",
  subtitle: "Et c'est volontaire.",
  ctaLead: "On parle de votre projet ?",
  ctaLabel: "Réserver un appel découverte",
} as const;

export const AUDIENCES = [
  {
    title: "Les entrepreneurs ambitieux",
    body:
      "Ceux qui veulent devenir la référence de leur secteur, et qui savent " +
      "qu'une marque personnelle, ça se construit.",
  },
  {
    title: "Les marques wellness",
    body:
      "Celles qui refusent la communication interchangeable. Studios, " +
      "instituts, méthodes — celles qui veulent qu'on les reconnaisse au " +
      "premier coup d'œil.",
  },
  {
    title: "Les lieux d'exception",
    body:
      "Restaurants, hôtels, tables, refuges d'altitude. Ceux dont on parle. " +
      "Ceux qu'on recommande.",
  },
  {
    title: "Les PME qui voient plus loin que leur site internet",
    body: "Parce qu'une marque, c'est un actif. Pas une ligne budgétaire.",
  },
] as const;

/* --------------------------------------------------------------------------
   Bande 5 — SECTION 5, la méthode Trace
   -------------------------------------------------------------------------- */

export const METHOD = {
  title: "La méthode Trace.",
  subtitle: "Quatre étapes. Une trajectoire.",
  closing: "Comme en finance.",
} as const;

export const METHOD_STEPS = [
  {
    number: "01",
    title: "Cartographie",
    body:
      "On commence par regarder. Votre marque, votre marché, vos " +
      "concurrents. Pour identifier le levier qui va vraiment bouger " +
      "l'aiguille — pas dix, un seul.",
  },
  {
    number: "02",
    title: "Direction",
    body:
      "Positionnement, ligne éditoriale, signature visuelle, scripts UGC. " +
      "On construit une marque que vos concurrents ne pourront pas copier.",
  },
  {
    number: "03",
    title: "Exécution",
    body:
      "Production premium. Tournages, posts, reels, campagnes. Du rythme, " +
      "de la cohérence, de la qualité — chaque semaine, chaque mois.",
  },
  {
    number: "04",
    title: "Empreinte",
    body:
      "Vues, leads, réservations, conversions. Vous savez exactement ce que " +
      "chaque euro investi vous rapporte.",
  },
] as const;

/* --------------------------------------------------------------------------
   Bande 6 — SECTION 6, focus UGC
   -------------------------------------------------------------------------- */

export const UGC = {
  title: "L'UGC, ce n'est pas une tendance.",
  subtitle: "C'est devenu le format de référence.",

  whatTitle: "D'abord, c'est quoi ?",
  what:
    "UGC, pour User Generated Content — du contenu qui ressemble à celui " +
    "d'un vrai client. Filmé caméra à la main, monté brut, sans le lustre " +
    "publicitaire. Authentique. Crédible. Conversationnel.",
  whatLines: [
    "Pas une pub. Une recommandation.",
    "Pas une marque qui parle d'elle. Quelqu'un qui parle d'elle pour elle.",
  ],

  whyTitle: "Pourquoi ça fonctionne.",
  why:
    "Parce qu'en 2026, vos clients ont développé un radar à publicité. " +
    "L'UGC, lui, passe ce filtre. Il ne ressemble pas à une marque qui " +
    "vend — il ressemble à une amie qui recommande.",
  whyClosing: "Et une amie qui recommande, ça convertit.",

  figuresTitle: "Les chiffres parlent d'eux-mêmes.",

  valueTitle: "Notre valeur ajoutée.",
  value:
    "J'ai été créatrice UGC avant de fonder cette agence. Plus de 30 marques " +
    "accompagnées en first line. Aujourd'hui, je ne livre pas du contenu " +
    "UGC. Je construis des stratégies UGC.",
  valueClosing:
    "C'est la différence entre une agence qui produit, et une agence qui pense.",


  /* Ferme la section : les marques accompagnées, en toutes lettres. */
  brandsLead:
    "Respire, Cimalp, et une trentaine d'autres marques accompagnées.",
  ctaLabel: "En savoir plus sur notre offre UGC",
} as const;

export const UGC_FIGURES = [
  {
    value: "× 10,38",
    label: "les posts UGC convertissent dix fois plus que les posts non-UGC",
    source: "Emplifi, Q3 2025",
  },
  {
    value: "× 6,9",
    label: "l'UGC génère près de 7 fois plus d'engagement qu'un contenu de marque",
    source: null,
  },
  {
    value: "92 %",
    label: "des consommateurs font davantage confiance à un pair qu'à une marque",
    source: null,
  },
  {
    value: "− 50 %",
    label: "de coût par clic sur les publicités UGC",
    source: null,
  },
] as const;

/* À FOURNIR — le document ne nomme que deux marques du portfolio UGC et
   renvoie à ugcwith-manon.my.canva.site pour les autres. */
/* Les marques UGC nommées dans le document. Elles étaient affichées en
   médaillons — deux logos fournis, trois emplacements vides à côté, ce qui
   donnait une rangée de cadres beiges sur fond beige. Elles reviennent ici en
   une phrase, où elles se lisent.

   Le « une trentaine d'autres » n'est pas inventé : c'est le « +30 marques
   accompagnées en création UGC » des repères de la bande 10. */
export const UGC_BRANDS = ["Respire", "Cimalp"] as const;

/* --------------------------------------------------------------------------
   Bande 7 — SECTION 7, les expertises
   -------------------------------------------------------------------------- */

export const EXPERTISES_INTRO = {
  title: "Ce qu'on construit avec vous.",
  lede: "Cinq expertises. Une obsession commune : faire de votre marque un actif.",
  ctaLabel: "Explorer toutes nos expertises",
} as const;

export const EXPERTISES = [
  {
    number: "01",
    title: "Personal Branding pour entrepreneurs",
    tag: "notre signature",
    body:
      "Devenir la référence de son secteur. Construire une marque " +
      "personnelle qui dure au-delà de l'entreprise.",
  },
  {
    number: "02",
    title: "Stratégie de marque & social media",
    tag: null,
    body:
      "Avant de produire, on cadre. Positionnement, ligne éditoriale, " +
      "calendrier — la fondation de tout le reste.",
  },
  {
    number: "03",
    title: "UGC & production de contenu premium",
    tag: null,
    body: "Du contenu qui ressemble à votre marque. Pas à celle des autres.",
  },
  {
    number: "04",
    title: "Direction artistique & identité visuelle",
    tag: null,
    body:
      "Une marque qui se reconnaît au premier coup d'œil. Avant même de " +
      "voir le logo.",
  },
  {
    number: "05",
    title: "Communication wellness & hospitality",
    tag: "notre verticale",
    body: "Vos codes, vos saisons, vos clients. On les connaît.",
  },
] as const;

/* --------------------------------------------------------------------------
   Bande 8 — SECTION 8, signature fondatrice
   -------------------------------------------------------------------------- */

export const FOUNDER = {
  title: "La signature de l'agence.",
  quote:
    "Une marque n'est pas une dépense. C'est un actif. Et un actif, ça se " +
    "construit avec méthode, avec discipline, et avec une exigence absolue.",
  attribution: "— Manon Ferrandino, fondatrice",
  ctaLabel: "Découvrir le parcours de Manon",
  portraitLabel: "Portrait de Manon",
} as const;

/* --------------------------------------------------------------------------
   Bande 9 — SECTION 9a, le bandeau de logos clients

   Le relevé mesure treize médaillons. Le document en nomme quinze : les
   quinze sont affichés, la rangée se replie. Voir MISSING.md.
   -------------------------------------------------------------------------- */

export const CLIENTS_TITLE_BEFORE = "Ils nous ont confié ";
export const CLIENTS_TITLE_EMPHASIS = "leur trace.";

export const CLIENTS = [
  "ZinAmara",
  "La Bodega",
  "El Ristorante",
  "L'Alpina",
  "L'Expédition",
  "Le Petit Chaperon Rouge",
  "Le GEIQ",
  "Le Bonnet",
  "Le Social Media Lab",
  "Le Dos du Praz",
  "Inspire Potential",
  "Sweet Anomaly",
  "Marie Trani Créations",
  "Swella",
  "Cimalp",
] as const;

/* Les logos eux-mêmes ne sont pas fournis. Cette table est le SEUL endroit à
   remplir le jour où ils arrivent : une entrée par client, la clé étant son
   nom exact tel qu'il figure ci-dessus, la valeur le chemin du fichier depuis
   `public/` — par exemple :

     "La Bodega": "/brand/clients/la-bodega.svg",

   Un client absent de la table n'est pas une erreur : son nom s'affiche à la
   place de l'image, au même encombrement. La mise en page ne bougera pas. */
export const CLIENT_LOGOS: Record<string, string> = {};

/* --------------------------------------------------------------------------
   Bande 10 — SECTION 9b, les repères et « Qui veut être mon associé ? »
   -------------------------------------------------------------------------- */

export const MARKERS_TITLE = "Quelques repères.";

export const MARKERS = [
  { value: "+30", label: "clients en social media management" },
  { value: "+30", label: "marques accompagnées en création UGC" },
  { value: "2", label: "agences parisiennes nous référencent comme partenaire UGC" },
  { value: "3", label: "territoires — France, Corse, Maroc" },
] as const;

/* Les visages qui entourent les repères. Huit bulles rondes, réparties
   autour de la rangée de chiffres — voir FaceBubbles.

   ⚠ CE SONT DES PHOTOS PROVISOIRES. Huit portraits Unsplash, cadrés carré et
   recadrés sur le visage. Ce ne sont pas des clients de l'agence : à
   remplacer par de vraies photos avant la mise en ligne. Les crédits et le
   cadrage attendu sont dans `public/brand/faces/CREDITS.md`.

   L'ordre compte : c'est celui des bulles, de la première à la huitième. Une
   case vide n'est pas une erreur — la bulle affiche alors un visage souriant
   dessiné, au même encombrement. */
export const MARKER_FACES: string[] = [
  "/brand/faces/JQFHdpOKz2k.jpg",
  "/brand/faces/21ckukPU3qA.jpg",
  "/brand/faces/MTZTGvDsHFY.jpg",
  "/brand/faces/jhJBmwcrlLE.jpg",
  "/brand/faces/6IGd3-F3Cao.jpg",
  "/brand/faces/1w9I6H4aftw.jpg",
  "/brand/faces/dteDgdUXGMM.jpg",
  "/brand/faces/pVdYTPWeu8I.jpg",
];

export const MARKERS_FOOTNOTE = [
  "Wellness, hospitality, entrepreneurs, retail, B2B.",
  "De Marseille à Marrakech, de la Belle Plagne à Ajaccio.",
] as const;

export const TV = {
  /* Le surtitre « Vues à la télévision » est retiré. Il coiffait un titre en
     capitales avec un autre texte en capitales : deux titres l'un sur
     l'autre, dont aucun ne dominait. Ce qu'il disait — que des clients de
     l'agence sont passés à la télévision — est déjà dans la ligne
     ci-dessous, où c'est une phrase et non une étiquette. */

  /* Le nom de l'émission prend sa majuscule : il était écrit en minuscules
     parce que le gabarit le passait en capitales par la feuille de style.
     Le gabarit a changé, la casse doit être juste dans le contenu. */
  title: "Qui veut être mon associé ?",
  lead:
    "Plusieurs entrepreneurs accompagnés par The Trace Agency sont passés " +
    "sur le plateau de l'émission.",
  /* À FOURNIR — le document laisse trois emplacements de marque en attente. */
  brands: ["Marque 1", "Marque 2", "Marque 3"] as const,
  statement:
    "Une marque qui marque, c'est une marque qu'on remarque — y compris par " +
    "les investisseurs les plus exigeants de France.",
  ctaLabel: "Découvrir toutes nos réalisations",
  imageLabel: "Visuel émission",
} as const;

/* --------------------------------------------------------------------------
   Bande 11 — SECTION 9c, les réalisations sur fond noir

   Le gabarit mesuré porte, par carte : un nom coupé en deux, trois chiffres
   et un paragraphe. Les listes `problems` et `approach` ne sont donc PAS
   affichées — elles restent ici parce que ce sont des informations réelles,
   qui auront besoin d'une page dédiée par cas client. Voir MISSING.md.
   -------------------------------------------------------------------------- */

export const CASES_TITLE = "Nos réalisations en chiffres";

export const CASES = [
  {
    /* Le nom est coupé en deux : première moitié alignée à droite, seconde à
       gauche, de part et d'autre de l'axe de la carte. C'est le gabarit
       mesuré, pensé pour un prénom et un nom — ici un article et un nom. */
    nameFirst: "La",
    nameLast: "Bodega",
    place: "Belle Plagne — 2 050 m",
    imageLabel: "La Bodega",
    stats: [
      { value: "79K", label: "comptes touchés en un mois" },
      { value: "+400", label: "abonnés de décembre à avril" },
      { value: "×2", label: "taux d'interaction en un trimestre" },
    ],
    summary:
      "Restaurant-bar-club iconique à 2 050 m, peu valorisé sur le digital " +
      "début 2024. Ligne éditoriale festive, 3 publications par semaine, " +
      "4 affiches événementielles par mois et refonte de la section " +
      "Événementiel du site.",
    quote:
      "Nous avons transformé La Bodega en un véritable lieu de rendez-vous " +
      "incontournable, en alignant parfaitement son expérience terrain et son " +
      "image digitale.",
    problems: [
      "Présence en ligne insuffisante malgré la notoriété locale",
      "Communication peu structurée : manque de storytelling, soirées peu mises en avant",
      "Site web statique, sans valorisation des événements en cours",
      "Difficulté à convertir les abonnés en réservations",
    ],
    approach: [
      "Ligne éditoriale claire et festive, centrée sur l'expérience client",
      "3 publications Instagram & Facebook par semaine",
      "4 affiches événementielles par mois pour annoncer les DJ sets",
      "Une vidéo publicitaire diffusée devant le restaurant",
      "Refonte de la section Événementiel du site et nouveaux boutons de réservation",
    ],
  },
  {
    nameFirst: "Le",
    nameLast: "Bonnet",
    place: "La Plagne",
    imageLabel: "Le Bonnet",
    stats: [
      { value: "7 622", label: "likes cumulés sur TikTok" },
      { value: "135K", label: "vues sur la meilleure vidéo" },
      { value: "3", label: "vidéos virales dès le lancement" },
    ],
    summary:
      "Mountain street food, bar et DJ sets. Compte TikTok créé de zéro et " +
      "lancé le 1er décembre 2024, accompagné d'affiches en vente pour la " +
      "promotion sur place.",
    quote: null,
    problems: [
      "Aucune présence sur TikTok, là où se trouve la clientèle jeune de la station",
      "Notoriété limitée au bouche-à-oreille sur place",
    ],
    approach: [
      "Création du compte TikTok et lancement de vidéos virales",
      "Création d'affiches en vente pour la promotion sur place et événementielle",
    ],
  },
  /* ⚠ CAS INVENTÉ — DONNÉES DE DÉMONSTRATION.
     Les deux cas ci-dessus viennent du document de la cliente. Celui-ci, non :
     il a été demandé pour éprouver la piste à trois cartes, et RIEN n'y est
     réel — ni les chiffres, ni les dates, ni le détail de la mission. Le nom
     est repris de la liste des clients pour rester plausible.
     À remplacer par un vrai cas, ou à retirer, avant toute mise en ligne.

     Une exception assumée : `quote` reste `null`. Inventer des chiffres pour
     une maquette est une chose, mettre une phrase dans la bouche d'un client
     qui existe en est une autre. */
  {
    nameFirst: "Le Dos",
    nameLast: "du Praz",
    place: "Courchevel Le Praz",
    imageLabel: "Le Dos du Praz",
    stats: [
      { value: "42K", label: "vues cumulées sur les Reels de février" },
      { value: "+260", label: "abonnés en six semaines" },
      { value: "×3", label: "demandes de réservation en message privé" },
    ],
    summary:
      "Table d'altitude au pied des pistes, très fréquentée l'hiver et " +
      "quasi absente en ligne le reste de l'année. Reportage photo mensuel, " +
      "4 Reels par mois et une ligne éditoriale qui fait durer la saison " +
      "au-delà de l'hiver.",
    quote: null,
    problems: [
      "Une notoriété entièrement saisonnière, qui retombe hors janvier-mars",
      "Aucune photographie exploitable de la salle et des plats",
      "Réservations reçues par téléphone uniquement, sans trace ni relance",
    ],
    approach: [
      "Reportage photo mensuel sur place, en service",
      "4 Reels par mois : la cuisine, la salle, l'équipe",
      "Ligne éditoriale d'intersaison pour tenir la présence toute l'année",
      "Mise en avant de la réservation en message privé et suivi des demandes",
    ],
  },
] as const;

/* --------------------------------------------------------------------------
   Bande 12 — SECTION 10, appel à l'action final
   -------------------------------------------------------------------------- */

export const FINAL_CTA = {
  titleBefore: "Laissez une ",
  titleEmphasis: "trace",
  titleAfter: ".",
  subtitle: "Pas une impression.",
  body:
    "Le premier appel est offert. 30 minutes pour cartographier votre " +
    "marque, identifier votre vrai levier, et décider si on construit " +
    "ensemble.",
  reassurance: "Sans engagement. Sans pression. Juste du concret.",
  ctaLabel: "Réserver mon appel stratégique",
} as const;

/* --------------------------------------------------------------------------
   Bande 13 — pied de page

   À FOURNIR — adresse e-mail, téléphone et liens vers les réseaux.
   -------------------------------------------------------------------------- */

export const FOOTER = {
  /* Le mot géant en fond. Un seul mot, celui que toute la marque porte. */
  giantWord: "TRACE",

  /* Le ruban défilant. Les termes viennent des verticales et des territoires
     annoncés dans le document — rien d'inventé. */
  marquee: [
    "Wellness",
    "Hospitality",
    "Entrepreneurs",
    "Personal branding",
    "UGC",
    "Direction artistique",
    "De Marseille à Marrakech",
  ],

  heading: "Faire trace, depuis Marseille.",

  /* Les deux actions principales. À FOURNIR : l'adresse e-mail et le numéro
     WhatsApp — les deux `href` valent `#`. */
  primary: [
    { label: "Écrire à l'agence", href: "#" },
    { label: "Discuter sur WhatsApp", href: "#" },
  ],

  /* À FOURNIR — les trois liens de réseaux. */
  social: { label: "Suivez notre piste", links: ["Instagram", "LinkedIn", "TikTok"] },

  legal: ["Mentions légales", "CGV", "Politique de confidentialité"],

  agency: { label: "Agence", value: "Plan de Campagne" },
  copyright: "© 2026 The Trace Agency — Production Ferrandino",
  backToTop: "Revenir en haut",
} as const;
