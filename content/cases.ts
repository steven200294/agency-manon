/* ==========================================================================
   content/cases.ts — les cas clients détaillés (une page chacun)

   Source : les deux documents « Cas client » fournis par l'agence. Le texte
   est repris tel qu'écrit ; seuls ont été ajoutés les libellés d'emplacement.

   Ce fichier est distinct de `CASES` dans content/site.ts : celui-là nourrit
   la piste de chiffres de la home, celui-ci nourrit les pages `/cas/[slug]`.

   ORDRE IMPOSÉ SUR CHAQUE BLOC : le problème → le concept → la vidéo → ce
   que ça produit. Les champs de `Concept` sont écrits dans cet ordre et le
   composant les rend dans cet ordre, y compris sur mobile. Ne pas les
   réarranger : c'est l'argument de la page (voir components/cases/).

   Les images et vidéos sont dans `public/` ; un visuel manquant s'affiche
   comme emplacement déclaré, jamais comme faux visuel.
   ========================================================================== */

export type Concept = {
  number: string;
  name: string;
  /** Sous-titre en italique, à droite du nom. */
  tagline: string;
  /** Le problème que le concept résout, quand le texte source le pose. */
  problem?: string;
  /** Le concept lui-même. */
  concept: string;
  /** Lien vers la vidéo (Instagram). */
  videoUrl: string;
  videoLabel: string;
  /** Ce que ça produit — rendu après la vidéo. */
  effects: string[];
};

export type Pillar = {
  number: string;
  name: string;
  tagline: string;
  concepts: Concept[];
};

/* --------------------------------------------------------------------------
   Cas client 1 — ZinAmara
   -------------------------------------------------------------------------- */

export const ZINAMARA = {
  slug: "zinamara",
  kicker: "Cas client 1",
  client: "ZinAmara — écosystème bien-être",
  title: "On ne produit pas du contenu, on crée des concepts.",
  metaDescription:
    "ZinAmara, écosystème bien-être : sept concepts, quatre piliers, un compte Instagram installé comme référence en massage, madérothérapie et drainage lymphatique.",

  stats: {
    title: "Statistiques Instagram — août 2026",
    /* Six captures : le profil, puis cinq publications avec leurs chiffres. */
    images: [
      {
        src: "/brand/zinamara/profil.webp",
        alt: "Profil Instagram ZinAmara : 745 publications, 25,7 K followers, 1,2 M de vues sur les 30 derniers jours",
        width: 900,
        height: 1485,
      },
      {
        src: "/brand/zinamara/stats-1.webp",
        alt: "Statistiques d'une publication : 129 541 vues, 22 862 spectateurs, 54 followers en plus",
        width: 900,
        height: 921,
      },
      {
        src: "/brand/zinamara/stats-2.webp",
        alt: "Statistiques d'une publication : 149 922 vues, 112 594 spectateurs, 209 followers en plus",
        width: 900,
        height: 876,
      },
      {
        src: "/brand/zinamara/stats-3.webp",
        alt: "Statistiques d'une publication : 333 899 vues, 178 271 spectateurs, 189 followers en plus",
        width: 900,
        height: 896,
      },
      {
        src: "/brand/zinamara/stats-4.webp",
        alt: "Statistiques d'une publication : 371 470 vues, 183 900 spectateurs, 502 followers en plus",
        width: 900,
        height: 915,
      },
      {
        src: "/brand/zinamara/stats-5.webp",
        alt: "Statistiques d'un reel : 382 617 vues, 187 900 spectateurs, 602 followers en plus",
        width: 900,
        height: 930,
      },
    ],
    body: [
      "Compte repris et tenu par l'agence depuis février 2026. Le travail ne consiste pas à publier : il consiste à installer Soulef comme experte de son domaine, à travers des concepts clés construits autour du massage, de la madérothérapie et du drainage lymphatique.",
      "Les statistiques d'août 2026 ci-dessus sont le résultat de ce positionnement, pas d'un volume de publications.",
    ],
    caption:
      "Statistiques Instagram — août 2026. Compte accompagné par The Trace Agency depuis février 2026.",
  },

  angle: {
    title: "On ne produit pas du contenu, on crée des concepts",
    order: ["Le problème", "Le concept", "La vidéo", "Ce que ça produit"],
    intro: [
      "Le drainage lymphatique se heurte à un obstacle simple : personne ne voit ce qui se passe sous la peau. La cliente sent, mais ne comprend pas. Et ce qu'on ne comprend pas, on ne le rachète pas, on ne le recommande pas, et on ne le paie pas au prix d'une expertise.",
      "S'ajoutent deux contraintes : on parle de corps, parfois de pathologie — chaque mot engage. Et deux publics cohabitent dans un même compte : des clientes qui réservent un soin, des professionnelles qui envisagent une formation.",
      "Aucune de ces contraintes ne se résout avec un beau tournage. Elles se résolvent avec des idées.",
    ],
  },

  conceptsTitle: "Sept concepts, quatre piliers",

  pillars: [
    {
      number: "1",
      name: "Découverte",
      tagline: "sortir de l'audience existante",
      concepts: [
        {
          number: "01",
          name: "Le slime",
          tagline: "Rendre visible l'invisible",
          concept:
            "Le mécanisme du drainage expliqué par une matière qu'on voit circuler, ralentir, se bloquer. Aucune anatomie, aucun jargon : une démonstration physique comprise en trois secondes.",
          videoUrl: "https://www.instagram.com/p/DZJzIzeob96/",
          videoLabel: "Vidéo 1 · slime",
          effects: [
            "L'idée n'est pas venue d'un brief client. Elle est venue d'une question : quel objet du quotidien se comporte comme la lymphe ?",
          ],
        },
      ],
    },
    {
      number: "2",
      name: "Expertise & Éducation",
      tagline: "installer l'autorité en enseignant",
      concepts: [
        {
          number: "02",
          name: "Le mot qu'elles cherchent",
          tagline: "Nommer précisément ce qui est vécu",
          problem:
            "Des femmes vivent un inconfort qui porte un nom qu'elles ignorent : le lipœdème.",
          concept:
            "Ce format le nomme, le reconnaît et accompagne — dans un cadre strictement bien-être, sans promesse thérapeutique, avec mention du recours médical.",
          videoUrl: "https://www.instagram.com/p/DbAT-vmojT9/",
          videoLabel: "Vidéo 2 · lipœdème",
          effects: [
            "Ce n'est pas de la portée, c'est de la portée qualifiée. Chaque vue vient d'une personne concernée, pas d'un scroll de passage.",
          ],
        },
        {
          number: "03",
          name: "Les fascias",
          tagline: "Enseigner ce que personne n'explique",
          problem:
            "Les fascias sont partout dans le corps et absents de toutes les conversations.",
          concept:
            "Ce format prend le sujet de front : ce que c'est, pourquoi ça se rétracte, ce que ça déclenche au quotidien.",
          videoUrl: "https://www.instagram.com/p/DcQSfFHoEW3/",
          videoLabel: "Vidéo 3 · fascias",
          effects: [
            "C'est le concept qui fait basculer le compte du registre du soin vers celui de l'enseignement. Une spectatrice qui apprend quelque chose qu'elle ignorait accorde à celle qui le lui a appris un statut différent : elle ne suit plus une praticienne, elle suit une référence.",
            "C'est aussi le format le plus directement rentable côté formation. Celles qui veulent aller plus loin après l'avoir vu ne cherchent plus un soin — elles cherchent à apprendre.",
          ],
        },
        {
          number: "04",
          name: "L'anatomie en 3D",
          tagline: "Faire de la production un argument de prix",
          concept:
            "Le réseau lymphatique modélisé, le geste rapporté à ce qu'il déclenche réellement dans le corps. Un niveau de production que les concurrents directs ne peuvent pas tenir.",
          videoUrl: "https://www.instagram.com/p/DcxsA1mI3em/",
          videoLabel: "Vidéo 4 · 3D",
          effects: [
            "Ce format ne cherche pas les vues. Il rend légitime un tarif d'expertise plutôt qu'un tarif de soin esthétique.",
          ],
        },
      ],
    },
    {
      number: "3",
      name: "Incarnation",
      tagline: "faire préférer la personne",
      concepts: [
        {
          number: "05",
          name: "Masse avec Soulef",
          tagline: "Faire vivre la formation avant de la vendre",
          concept:
            "La caméra prend la place de l'élève. On ne regarde pas Soulef travailler : on masse avec elle, le geste est décomposé, repris, corrigé, exactement comme en salle de formation.",
          videoUrl: "https://www.instagram.com/p/DYytLvkI26s/",
          videoLabel: "Vidéo 5 · masse avec Soulef",
          effects: [
            "C'est un concept d'immersion. Une future élève ne peut pas essayer une formation avant de la payer — ce format est ce qui s'en rapproche le plus. Elle ne se demande plus si la pédagogie lui conviendra : elle vient d'en faire l'expérience pendant trente secondes.",
            "C'est aussi le format qui justifie le présentiel. Plus l'aperçu est précis, plus il rend évident que le reste ne s'apprend pas par écran.",
          ],
        },
        {
          number: "06",
          name: "Le mindset",
          tagline: "La vision de Soulef",
          concept:
            "Soulef parle en son nom, sans geste technique, sans anatomie. Sa vision du métier, ce qu'elle attend d'une praticienne, ce qui l'a construite.",
          videoUrl: "https://www.instagram.com/p/DVLDxMUiBfx/",
          videoLabel: "Vidéo 6 · mindset",
          effects: [
            "Aucune information n'est transmise ici, et c'est volontaire. Ce format ne sert pas à convaincre qu'elle sait faire — les trois précédents s'en chargent. Il sert à créer de l'attachement.",
            "Sur une offre de formation à plusieurs milliers d'euros, la décision finale ne se prend jamais sur le contenu du programme. Elle se prend sur la personne. Une élève ne s'inscrit pas à une méthode : elle s'inscrit auprès de quelqu'un dont elle veut apprendre.",
          ],
        },
      ],
    },
    {
      number: "4",
      name: "Conversion",
      tagline: "déclencher la réservation ou l'inscription",
      concepts: [
        {
          number: "07",
          name: "La preuve par les paires",
          tagline: "Laisser vendre celles qui ont déjà acheté",
          concept:
            "Une praticienne formée à la méthode raconte sa situation avant, sa décision, ce que la formation a changé dans son activité.",
          videoUrl: "https://www.instagram.com/p/DbsKjmxI862/",
          videoLabel: "Vidéo 7 · témoignage d'élève",
          effects: [
            "Sur une offre à fort engagement, c'est le seul format qui convertit — parce que c'est le seul où l'argument ne vient pas de la marque.",
          ],
        },
      ],
    },
  ] satisfies Pillar[],

  method: {
    title: "Un concept ne sort pas d'une inspiration",
    intro:
      "Ces sept idées ne sont pas des trouvailles isolées. Elles sortent d'un cadre de travail appliqué à chaque client.",
    phases: [
      {
        number: "01",
        name: "Diagnostiquer",
        text: "Audit du compte, du positionnement, des concurrents. On identifie ce qui bloque la conversion avant de produire quoi que ce soit.",
      },
      {
        number: "02",
        name: "Structurer",
        text: "Ligne éditoriale, direction artistique, piliers de contenu, calendrier. Chaque format reçoit un rôle et un seul objectif de conversion.",
      },
      {
        number: "03",
        name: "Produire",
        text: "Écriture, tournage en batch, montage, publication orchestrée. Tout en interne.",
      },
      {
        number: "04",
        name: "Piloter",
        text: "Community management quotidien, reporting mensuel, ajustements continus.",
      },
    ],
    pillarsTitle: "Les quatre piliers",
    pillars: [
      {
        name: "Découverte",
        text: "Sortir de l'audience existante, capter du monde neuf.",
      },
      {
        name: "Expertise & Éducation",
        text: "Enseigner pour installer l'autorité. C'est le pilier le plus fourni du compte : on ne décrète pas une expertise, on la démontre en apprenant quelque chose à quelqu'un.",
      },
      {
        name: "Incarnation",
        text: "Faire préférer la personne, pas seulement la méthode.",
      },
      {
        name: "Conversion",
        text: "Déclencher la réservation ou l'inscription.",
      },
    ],
    link: "Chaque contenu publié sert l'un de ces trois rôles, jamais deux. Un compte qui ne fait que de la Découverte produit du volume sans revenus ; un compte qui ne fait que de la Vente s'épuise sur une audience qui ne se renouvelle plus.",
    recapTitle: "Reprise des sept concepts",
    recap: [
      ["Le slime", "Découverte"],
      ["Le mot qu'elles cherchent", "Expertise & Éducation"],
      ["Les fascias", "Expertise & Éducation"],
      ["L'anatomie en 3D", "Expertise & Éducation"],
      ["Masse avec Soulef", "Incarnation"],
      ["Le mindset", "Incarnation"],
      ["La preuve par les paires", "Conversion"],
    ] as const,
    recapNote:
      "Trois concepts sur sept servent l'Expertise & Éducation, et c'est délibéré. Sur une activité qui vend à la fois des soins et une formation, l'autorité ne se joue pas à un seul endroit : il faut nommer ce qui est vécu (le lipœdème), enseigner ce que personne n'explique (les fascias) et montrer ce que le geste déclenche vraiment (la 3D). C'est ce socle qui rend crédibles les trois derniers formats.",
  },

  closing: {
    title: "Ce qu'aucune de ces vidéos ne fait",
    body: [
      "Aucune ne livre la technique complète. Le geste montré est un aperçu ; la méthode reste en cabine ou en formation.",
      "C'est une règle stricte de notre travail : un contenu qui donne tout a tué la vente. Il crée de l'engagement et zéro revenu. Notre rôle est d'en donner assez pour créer le désir, jamais assez pour s'en passer.",
    ],
  },
};

/* --------------------------------------------------------------------------
   Cas client 2 — BNI Aix Avenir
   -------------------------------------------------------------------------- */

export const BNI = {
  slug: "bni-aix-avenir",
  kicker: "Cas client 2",
  client: "BNI Aix Avenir",
  concept: "Le Micro du mercredi",
  title: "Un concept peut résoudre un problème d'organisation, pas seulement un problème de marque.",
  metaDescription:
    "BNI Aix Avenir : Le Micro du mercredi, un format vidéo récurrent qui fait sortir la salle de la salle — trois épisodes, un seul habillage, trois piliers.",

  proof: [
    "Le cas ZinAmara démontre qu'on sait rendre désirable un savoir-faire. Celui-ci démontre autre chose : un concept peut résoudre un problème d'organisation, pas seulement un problème de marque.",
    "Il n'y a ici ni produit à filmer, ni lieu à sublimer, ni geste technique. Juste un groupe d'entrepreneurs, une salle, un mercredi matin. C'est le cas qui prouve que la valeur est dans l'idée, pas dans le sujet.",
  ],

  problem: {
    title: "Le point de départ",
    body: [
      "Un groupe d'affaires vit sur deux moteurs : la dynamique interne de ses membres et le renouvellement par de nouvelles inscriptions. Les deux se grippent pour la même raison.",
      "Ce qui se passe le mercredi matin ne sort pas de la salle. Les membres vivent quelque chose d'engageant chaque semaine et n'ont rien à en montrer. Les entrepreneurs de la région, eux, entendent parler du réseau sans jamais en voir la couleur — et on ne rejoint pas un groupe sur la foi d'un argumentaire, on le rejoint parce qu'on a envie d'en être.",
    ],
    verdict:
      "Le problème n'est pas un manque de communication. C'est qu'un groupe qui ne se montre pas ne recrute pas.",
  },

  concept_block: {
    title: "Le concept",
    name: "Le Micro du mercredi",
    tagline: "Faire sortir la salle de la salle",
    body: [
      "Chaque mercredi, un micro circule. Un membre, une question, une réponse courte. Format vertical, 20 à 50 secondes, identique d'une semaine à l'autre.",
    ],
    brand: {
      lead: "Le format a sa propre marque.",
      text: "Logo « Le Micro du Mercredi » incrusté en haut à droite sur chaque plan, bandeau-titre rouge en ouverture qui pose la question de l'épisode, carton de fin identique à chaque fois. Ce n'est pas une rubrique : c'est un objet éditorial autonome, reconnaissable en une seconde dans un fil d'actualité, y compris par quelqu'un qui n'a jamais entendu parler du groupe.",
    },
    constraint: {
      lead: "L'idée tient en une contrainte : ne rien ajouter à l'agenda de personne.",
      text: "Pas de tournage à organiser, pas de disponibilité à trouver — le contenu se produit pendant la réunion qui a lieu de toute façon. C'est ce qui fait qu'un format récurrent tient dans la durée là où la plupart s'arrêtent au troisième épisode.",
    },
  },

  mechanics: {
    title: "Les trois mécaniques",
    items: [
      {
        lead: "La récurrence nommée crée un rendez-vous.",
        text: "Le format porte un jour dans son nom. Ce n'est pas cosmétique : une audience qui sait quand attendre un contenu revient le chercher. Un contenu isolé se consomme, un rendez-vous se suit.",
      },
      {
        lead: "Chaque membre devient diffuseur.",
        text: "La vidéo où il apparaît, il la partage sur son propre réseau — parce qu'elle le met en valeur, pas parce qu'on le lui a demandé. Le groupe gagne ainsi une portée qu'aucune page ne peut acheter : celle des réseaux professionnels cumulés de ses membres, semaine après semaine.",
      },
      {
        lead: "Le visiteur potentiel voit l'ambiance avant de venir.",
        text: "Il ne découvre pas un concept de réseau d'affaires : il découvre des visages, un ton, une énergie. La décision de venir un mercredi matin ne se prend pas sur un argument de rentabilité, elle se prend sur l'envie d'en être.",
      },
    ],
    invitation: {
      lead: "Et l'invitation est dans le format, pas à côté.",
      text: "Chaque épisode se termine sur le même carton : Venez nous rendre visite — BNI Aix Avenir, Stade Maurice David, de 7h à 9h. Le lieu, le jour, l'horaire. Aucune campagne de recrutement séparée à produire : l'appel à venir est répété chaque semaine sans jamais peser, parce qu'il est la signature du format.",
    },
  },

  episodes: {
    title: "Un format, trois rôles",
    intro:
      "Trois épisodes qui se ressemblent à l'œil — même habillage, même micro, même carton de fin — et trois intentions complètement différentes. C'est exactement ce qu'on appelle un concept : une forme unique capable de porter plusieurs rôles sans se déformer.",
    items: [
      {
        letter: "A",
        video: "/video/bni/episode-a.mp4",
        poster: "/video/bni/episode-a.jpg",
        pillar: "Découverte",
        speaker: "Bastien Faivre",
        title: "« Combien d'argent perdez-vous à cause de votre site internet ? »",
        text: [
          "Une question posée face caméra, en extérieur, vingt secondes. Elle ne parle pas du réseau : elle parle du portefeuille de celui qui regarde.",
          "C'est l'épisode qui sort du cercle. Un dirigeant qui n'a jamais entendu parler du groupe s'arrête parce que la question le concerne, et découvre le réseau par la bande. La portée ne vient pas du sujet « BNI » — elle vient d'un problème que tout le monde a.",
        ],
      },
      {
        letter: "B",
        video: "/video/bni/episode-b.mp4",
        poster: "/video/bni/episode-b.jpg",
        pillar: "Expertise & Éducation",
        speaker: "Axel Larmagnac",
        title: "« Fiscalité 2026 : le TIPS à connaître »",
        text: [
          "Un membre en position d'expert, filmé pendant sa conférence, slides à l'appui. Le bandeau le désigne explicitement : notre expert nous répond.",
          "Deux effets en un seul plan. Le membre reçoit une vitrine qu'il n'aurait pas produite seul — c'est un bénéfice concret d'appartenance, donc un argument de rétention. Et le groupe cesse d'être perçu comme un club de mise en relation pour devenir un endroit où l'on apprend quelque chose le mercredi matin.",
        ],
      },
      {
        letter: "C",
        video: "/video/bni/episode-c.mp4",
        poster: "/video/bni/episode-c.jpg",
        pillar: "Conversion",
        speaker: "La journée portes ouvertes",
        title: "Le président et les invités",
        text: [
          "Cinquante secondes, la salle pleine, les invités, les membres, le président. C'est le seul épisode qui montre l'intérieur plutôt qu'un visage isolé.",
          "Il répond à la seule vraie objection d'un entrepreneur invité : dans quoi je mets les pieds à 7h du matin ? On ne lui explique pas, on le lui montre. Après cet épisode, venir un mercredi n'est plus un saut dans le vide.",
        ],
      },
    ],
    recapTitle: "Le rattachement aux piliers",
    recap: [
      ["A · Bastien Faivre — la question qui interpelle", "Découverte"],
      ["B · Axel Larmagnac — l'expert qui enseigne", "Expertise & Éducation"],
      ["C · Portes ouvertes — la salle et le président", "Conversion"],
    ] as const,
    note: "Trois épisodes, un seul habillage, trois piliers différents. C'est la définition d'un concept : une forme unique capable de porter plusieurs rôles sans se déformer. Ce qu'un prestataire produirait comme trois vidéos séparées tient ici dans un seul objet éditorial — donc dans un seul effort de production, et une seule habitude pour l'audience.",
  },
};

export const CASE_CTA_LABEL = "Réserver un Diagnostic Trace";

/** Les pages, dans l'ordre où la home les liste. */
export const CASE_PAGES = [
  {
    slug: ZINAMARA.slug,
    kicker: ZINAMARA.kicker,
    client: "ZinAmara",
    place: "Écosystème bien-être",
    teaser: "Sept concepts pour installer une experte du drainage lymphatique.",
  },
  {
    slug: BNI.slug,
    kicker: BNI.kicker,
    client: "BNI Aix Avenir",
    place: "Réseau d'affaires",
    teaser: "Le Micro du mercredi : un format, trois rôles.",
  },
] as const;
