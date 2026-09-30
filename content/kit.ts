/* ==========================================================================
   content/kit.ts — le texte du kit média, sur deux pages dédiées

   Source : « THE TRACE AGENCY Kit Média complet » (pages 3 à 13). Le texte
   est repris tel quel. Il vit sur `/expertises` et `/agence`, pas sur la
   home : la home suit le document « Site internet The Trace Agency », dont
   le positionnement (personal branding, wellness) diffère de celui du kit
   (établissements touristiques premium).

   NON REPRIS : les offres. Le PDF ne donne que deux prix isolés — 800 €
   (« Engagement 3 mois minimum ») et 1 200 € — sans nom d'offre ni contenu,
   et les pages qui décrivent l'Offre Essentielle sont vides. Voir MISSING.md.

   Les visuels du kit ne sont pas dans le dépôt : emplacements déclarés.
   ========================================================================== */

export const EXPERTISES_PAGE = {
  metaTitle: "Nos expertises et solutions",
  kicker: "Nos expertises",
  title: "Une gamme complète de services pour révéler tout le potentiel des établissements touristiques premium.",
  expertises: [
    {
      name: "Social media management",
      body: [
        "Gestion quotidienne, animation de communauté, modération et croissance ciblée.",
        "Nous assurons une présence digitale élégante, engageante et parfaitement alignée avec votre image de marque.",
      ],
    },
    {
      name: "Stratégie digitale",
      body: [
        "Élaboration de stratégies sur-mesure pour booster votre visibilité, votre attractivité et vos réservations.",
        "Chaque action est pensée pour maximiser votre impact et vous positionner en destination incontournable.",
      ],
    },
    {
      name: "Social ads (publicités sociales)",
      body: [
        "Création et gestion de campagnes publicitaires sur Instagram, Facebook et LinkedIn, pour toucher et convertir votre clientèle idéale.",
      ],
    },
    {
      name: "Création de contenu",
      body: [
        "Photos, vidéos, storytelling immersif : nous créons des contenus premium qui séduisent et fidélisent, en valorisant votre établissement sous son meilleur jour.",
      ],
    },
    {
      name: "UGC (user generated content)",
      body: [
        "Création de contenus authentiques et engageants réalisés par des créateurs de confiance, pour humaniser votre communication et amplifier votre notoriété.",
      ],
    },
    {
      name: "Influence marketing",
      body: [
        "Mise en place de campagnes d'influence sur-mesure : sélection rigoureuse, mise en relation avec des influenceurs ciblés (sport, outdoor, lifestyle, tourisme), suivi des collaborations pour maximiser le retour sur investissement.",
      ],
    },
    {
      name: "Affiches & événementiel",
      body: [
        "Création d'affiches et d'univers visuels pour vos événements et vos soirées, pensés pour annoncer, attirer et remplir.",
      ],
    },
  ],
  detail: {
    title: "Chez The Trace Agency, chaque détail compte.",
    body: "Nous vous offrons une approche sur-mesure, pensée pour refléter votre excellence et inscrire votre établissement dans l'esprit d'une clientèle qui recherche bien plus qu'une simple destination : une expérience inoubliable.",
  },
  solutionsTitle: "Nos solutions",
  solutionsIntro: "Nous ne nous contentons pas de suivre les tendances digitales. Nous façonnons pour chaque client une stratégie unique et visionnaire, conçue pour révéler toute la dimension émotionnelle et prestigieuse de son établissement. Voici comment nous transformons vos défis en leviers de croissance :",
  solutions: [
    {
      name: "Une stratégie digitale sur-mesure",
      body: [
        "Nous élaborons une architecture de contenu raffinée, pensée pour séduire, engager et convertir votre clientèle idéale.",
        "Chaque publication devient une invitation au voyage, chaque interaction, une émotion partagée.",
      ],
    },
    {
      name: "Une image de marque sublimée",
      body: [
        "Nous sculptons votre présence en ligne pour qu'elle soit le miroir fidèle de l'expérience que vous offrez : rare, inspirante, inoubliable.",
      ],
    },
    {
      name: "Des contenus immersifs à haute valeur ajoutée",
      body: [
        "Photographies d'exception, vidéos émotionnelles, storytelling digital… Nous créons des univers où l'audience peut s'imaginer avant même d'avoir franchi votre seuil.",
      ],
    },
    {
      name: "Un engagement amplifié",
      body: [
        "Nous bâtissons des communautés sincères et passionnées autour de votre établissement, en transformant vos réseaux sociaux en véritables vitrines d'aspiration.",
      ],
    },
    {
      name: "Des campagnes d'influence sélectives et impactantes",
      body: [
        "Grâce à un réseau d'influenceurs et de créateurs soigneusement sélectionnés, nous déployons des collaborations authentiques qui renforcent votre notoriété et votre désirabilité auprès d'un public affinitaire.",
      ],
    },
    {
      name: "Une approche globale et clé en main",
      body: [
        "De la stratégie à l'exécution, nous orchestrons chaque étape avec une précision artisanale pour vous permettre de vous concentrer pleinement sur l'expérience client, votre véritable cœur de métier.",
      ],
    },
  ],
};

export const AGENCE_PAGE = {
  metaTitle: "L'agence — Manon, fondatrice",
  kicker: "Qui sommes-nous ?",
  title: "Manon, fondatrice de The Trace Agency",
  portraits: ([
    {
      subject: "Portrait de Manon (1)",
      format: "Photo, 4 / 3",
      src: "/brand/manon.webp",
      alt: "Manon Ferrandino, souriante, devant un mur de briques blanches",
    },
    {
      subject: "Portrait de Manon (2)",
      format: "Photo, 4 / 3",
      src: "/brand/manon2.webp",
      alt: "Manon Ferrandino sur un balcon en bois, une montagne enneigée derrière elle, un ordinateur portable sous le bras",
    },
  ] as { subject: string; format: string; src?: string; alt?: string }[]),
  intro: [
    "Manon est community manager et créatrice de contenu UGC pour une trentaine de marques premium dans les univers du tourisme, du sport, de l'outdoor, de la beauté et de la mode.",
    "Après un parcours atypique (de la finance à l'entrepreneuriat créatif), Manon a tracé sa propre voie pour incarner pleinement ses valeurs : liberté, excellence et impact.",
    "Visionnaire, créative et stratège, elle accompagne aujourd'hui les établissements touristiques et les marques inspirantes en transformant leur présence digitale en moteur de désir et de conversion.",
  ],
  expertiseTitle: "Son expertise",
  expertise: [
    "Façonner des stratégies social media sur-mesure.",
    "Créer des contenus authentiques et immersifs qui résonnent avec les audiences.",
    "Transformer une simple présence en ligne en une destination ou une marque incontournable.",
  ],
  adnTitle: "Son ADN",
  adn: "Un subtil mélange entre créativité instinctive, maîtrise des codes du digital et vision business stratégique.",
};
