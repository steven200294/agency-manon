# Missing — ce que les mesures ne couvrent pas

## 0. Écarts demandés — la liste courte

Les décisions prises **contre** une mesure, sur demande explicite. Chacune est
aussi commentée à l'endroit où elle est écrite ; elles sont rassemblées ici
parce que ce sont les seules qu'un relevé ne pourra jamais expliquer.

| Écart | Mesuré | Retenu |
|---|---|---|
| Polarité de la page | fond noir, texte blanc | fond Dentelle, texte Nuit |
| Fonte | Satoshi (titres) + Inter (texte) | Satoshi partout — donc pas Tenez ni Range Sans du brandboard |
| Couleur des boutons | deux remplissages distincts (bleu nuit, rose) | **une seule** : Châtaigne, avec la même ombre interne creusée sur les deux |
| Emphase de titre | second accent, distinct des chiffres | Châtaigne, comme le reste — une seule couleur chaude |
| Hauteur de l'en-tête | 64px | 96px au large, 72px à l'étroit — le logo fourni est bien plus haut que celui du site relevé |
| Largeur de la barre | `max-width: 1680px` | 1180px, l'autre valeur du même relevé |
| Titre du bloc d'accroche, large | 72px puis 64px | 64px puis 56px |
| Titre du bloc d'accroche, étroit | 41px | 32px — deux lignes empilées se touchaient |
| Position des rubans | premier enfant, donc en haut | dernier enfant, donc en bas |
| Fond de page | plat, un `background-color` et rien d'autre | **trois lueurs radiales qui dérivent lentement** sur le fond Dentelle |
| Bande des cas clients | transparente, comme onze bandes sur treize | **noire**, structure reprise d'un second relevé (prsnl.io) |
| Ordre des bandes 3 et 7 | tel que mesuré | **échangées**, contenu ET géométrie — la section noire devait être pleine largeur |
| Pastille flottante | mesurée, `z-index: 2 147 483 000` | **retirée** — c'est le badge de l'éditeur, pas du design |
| Hauteur des bandes | 754, 768, 685, 1616px… dictées par leur contenu | **un écran plein chacune** (`min-height: 100svh`), contenu centré |
| Pied de page | colonne de 495px, écart 36px, sans fond | **rideau plein écran sur fond Nuit** — mécaniques reprises d'un composant apporté séparément |
| Bande 2 | colonne centrée de 1120px, écart 56px | **deux colonnes pleine largeur**, piste d'images collée au bord droit de l'écran et haute de toute la section |

### La bande 2 — ce qui a été décidé

Trois mécaniques, aucune mesurée :

- **La piste touche le bord droit.** La bande n'a plus ni largeur maximale ni
  padding droit : c'est son padding GAUCHE qui la raccorde à la grille de la
  page, avec `max(40px, calc(50vw - 620px))`. 620px est la moitié de la
  largeur commune du projet, donc au-delà de 1240px de viewport le texte
  s'aligne au pixel près sur celui des autres sections, et en dessous on
  retombe sur les 40px mesurés.
- **Les cadres font toute la hauteur de la section.** Le rapport 16/9 du
  modèle est abandonné : un rapport fixe ne peut pas remplir une hauteur
  imposée sans que la largeur suive. Il a fallu une chaîne de hauteurs
  continue — `grid-template-rows: minmax(0, 1fr)` + `align-content: stretch`
  sur la bande, puis `height: 100%` jusqu'au cadre. Un seul maillon à `auto`
  et tout retombe sur la hauteur du contenu.
- **Le titre monte à 64px** au lieu des 52px mesurés pour les titres de
  section : c'est le second temps fort de la page.

**Ni embla-carousel, ni shadcn, ni les quatre paquets qui vont avec.** Le
défilement horizontal natif avec `scroll-snap` donne gratuitement le
glissement au doigt, l'inertie du système, les flèches du clavier et le
respect de `prefers-reduced-motion`. Il ne restait à écrire que les deux
boutons et leur extinction en bout de course
(`components/primitives/Carousel.tsx`).

**Les cinq visuels sont à fournir.** Les cadres tiennent déjà leur place :
rien ne bougera quand les images arriveront.

### Le pied de page en rideau

La bande 13 mesurée n'existe plus. À sa place, les mécaniques d'un composant
apporté séparément, adaptées à la charte : révélation en rideau, ruban
défilant incliné, mot géant en fond, halo et grille, pastilles de verre
aimantées au curseur.

**Comment marche la révélation.** Un conteneur d'un écran de haut, en flux
normal, porte un `clip-path` ; le pied de page, à l'intérieur, est en
`position: fixed; bottom: 0`. Un `clip-path` découpe tout son sous-arbre —
**y compris les descendants en `position: fixed`**, ce qui est le seul moyen
simple de contraindre un élément fixe à une zone. Le pied de page ne bouge
donc jamais : c'est le conteneur qui remonte, et la fenêtre découpée le
révèle comme un rideau qui se lève.

**Ce que ça a demandé de changer dans la page.** Le contenu devait devenir
opaque et passer devant, sinon on voyait le pied de page à travers les douze
bandes, qui sont transparentes. D'où la couche `.page-content` : elle empile
et centre les bandes, porte le fond Dentelle et le `z-index: 1`, et c'est
elle qui porte désormais les lueurs du fond animé. `.page-canvas` ne fait
plus que contenir l'en-tête fixe, cette couche, et le rideau.

**GSAP n'est pas installé.** Le composant de référence s'en sert pour
l'aimantation et une parallaxe au défilement. L'aimantation tient en trente
lignes de `requestAnimationFrame` (`components/primitives/MagneticLink.tsx`),
avec trois garde-fous que la version d'origine n'a pas : désactivée sur écran
tactile — sans survol, l'élément fuirait sous le doigt —, désactivée sous
`prefers-reduced-motion`, et étranglée à un calcul par image. La parallaxe est
remplacée par le rideau, qui est déjà un effet de défilement.

**Écarts de charte** par rapport au composant d'origine : fond Nuit et non la
couleur de page, halo en Terre d'Ombre et Châtaigne, mot géant « TRACE »,
police du projet au lieu de Plus Jakarta Sans, et pas d'emoji « crafted with
❤ » — cette signature appartient à l'agence qui a produit le composant, pas à
celle-ci.

**À fournir pour ce bloc :** l'adresse e-mail, le numéro WhatsApp et les trois
liens de réseaux. Tous les `href` valent `#`.

### Une section par écran — ce que ça a coûté

Mesuré sur le viewport le plus court capturable (813px, la fenêtre minimale
que macOS impose à Chrome) : **dix sections sur treize tiennent pile**, à
781px. Trois dépassent encore :

| Section | Avant | Après deux tours | Tient à partir de |
|---|---|---|---|
| Focus UGC | 1199px | 905px | ~940px de viewport |
| Repères + émission | 982px | 887px | ~920px |
| Cas clients | 895px | 852px | ~885px |

Autrement dit : elles tiennent sur un écran d'ordinateur portable ou de
bureau, pas sur une fenêtre volontairement écrasée.

Les compressions sont toutes dans `app/styles/fullscreen.css`, avec leur
raison. Les deux plus lourdes de conséquence :

- le bloc « valeur ajoutée » du focus UGC est passé en **troisième colonne**
  au lieu d'être empilé sous les deux autres ;
- le surtitre de la bande 10, mesuré à 30px de corps pour **70px
  d'interligne**, redescend à 44px. C'était 40px de vide pour une seule
  ligne — exactement le genre de valeur qu'une contrainte de hauteur ne
  pardonne pas.

**Sous 810px la contrainte est levée** : les sections reprennent la hauteur de
leur contenu. Forcer un écran plein sur un téléphone produit soit du texte
illisible, soit de grands vides.

Si le texte s'allonge, ces trois sections redéborderont. **Le raccourcir est
une décision éditoriale, pas technique.**

Et une décision qui n'est **pas** un écart, contrairement aux apparences : le
bloc d'accroche occupe un écran plein (`100svh`). Le relevé lui donne
`height: 977px`, soit exactement la hauteur du viewport de capture, et sa
règle CSS annonce `height: 800px` — une hauteur imposée, pas dictée par le
contenu.

---

## 0 bis. Le contenu — ce qui manque encore

Le site est écrit avec le texte du document « Site internet The Trace
Agency », qui remplace intégralement le kit média. Tout est dans
`content/site.ts`. Ce qui reste à fournir :

- **Les photos.** Huit pour le collage du bloc d'accroche, six pour les
  rubans mobiles, deux pour les cartes de cas clients, le portrait de Manon,
  le visuel de marque. Aucune n'est en place.
- **Les logos clients.** Quinze marques sont nommées, aucun fichier n'est
  fourni : chaque médaillon porte le nom en texte, ce qui reste lisible en
  attendant.
- **Les trois marques « Qui veut être mon associé ? »** — le document laisse
  les emplacements ouverts.
- **Le portfolio UGC.** Deux marques nommées (Respire, Cimalp), le document
  renvoie à `ugcwith-manon.my.canva.site` pour les autres.
- **Le contact.** Adresse e-mail, téléphone et liens Instagram / LinkedIn /
  TikTok sont des placeholders dans le pied de page.
- **Le numéro WhatsApp.** Tous les `href` valent `#`, y compris le bouton
  principal, qui a besoin d'un `https://wa.me/33XXXXXXXXX`.

Deux détails de contenu à trancher :

- **Le sceau de la hero** annonce « 98 % de clients satisfaits, +500 clients
  accompagnés ». Ces chiffres viennent de l'image fournie, pas d'un texte, et
  le nouveau document parle de « +30 clients ». **Les deux ne se recoupent
  pas.**
- **Le détail des cas clients** (contexte, problème, approche complète)
  existe dans `content/site.ts` mais n'est plus affiché : le gabarit noir ne
  porte qu'un nom, trois chiffres et un paragraphe. Ce contenu appelle une
  page par cas client.


Ce fichier recense tout ce que le relevé de `myroragency.com` ne dit pas, et
tout ce qui a dû être décidé plutôt que mesuré. Chaque entrée est soit une
question à trancher, soit un choix déjà fait et signalé comme tel.

Rien n'a été comblé par une « valeur qui va bien ». Ce qui manque est ici,
pas dans le CSS.

---

## 1. La transposition de charte n'est pas une mesure

Les relevés mesurent les couleurs de MYROR. Le brandboard The Trace Agency en
impose d'autres. Le passage des unes aux autres est un travail de design, et
aucune mesure ne le couvre. Toutes les correspondances retenues sont listées
en commentaire dans `app/styles/theme.css`. Les non triviales :

### 1.0 La page est claire — et le site mesuré est sombre

C'est **l'écart le plus important de tout le projet**. MYROR peint un fond
noir avec du texte blanc ; ce projet peint Dentelle avec du texte Nuit. Cette
inversion n'est mesurée nulle part.

Ce qu'elle entraîne, au-delà d'un simple échange de deux couleurs :

- les deux **ombres internes claires** des relevés (un liseré blanc sur fond
  noir) deviennent des ombres internes sombres — un liseré clair ne dessine
  plus rien sur une page claire. La géométrie est conservée au pixel près,
  seule la couleur change ;
- l'opacité de l'**ombre portée** de la pastille passe de 0,45 à 0,18 : une
  ombre noire à 45 % sur du crème est beaucoup plus lourde que sur du noir ;
- le **bloc dégradé** devient la seule surface sombre de la page, donc le
  texte qu'il porte s'inverse (règle explicite dans `primitives.css`) ;
- la **puce pleine** (`.chip-solid`), claire sur fond sombre chez MYROR,
  devient sombre sur fond clair : elle garde son rôle de contraste maximal,
  mais en négatif.

Rien de tout cela n'est mesurable. Tout est signalé en commentaire à
l'endroit où c'est écrit.

### 1.1 Sur fond clair, les deux accents survivent

MYROR emploie deux accents : un bleu clair `#86B1D5` et un rose `#BA7C79`.
Sur fond Nuit, Châtaigne `#77402A` ne passait pas le contraste (**1,9:1**) et
les deux accents devaient fusionner sur Terre d'Ombre.

Sur Dentelle, les deux tiennent :

| | sur Dentelle | usage retenu |
|---|---|---|
| Châtaigne `#77402A` | **8,3:1** | chiffres, liens, titres accentués, bouton de navigation |
| Terre d'Ombre `#A87655` | **3,3:1** | emphase de très grand titre (≥24px), bouton d'action, dégradés |

Le passage au fond clair a donc **résolu** la question ouverte de la version
sombre : il n'y a plus besoin d'une cinquième couleur.

Reste une contrainte : Terre d'Ombre ne peut pas porter de petit texte. Le
rôle « emphase dans un titre » est à 64px, il passe ; toute réutilisation en
dessous de 24px serait fautive.

### 1.2 Deux tons intermédiaires ont été fabriqués

MYROR pose deux surfaces entre son fond et son texte : `rgb(25,25,25)` pour
les cartes et `rgb(64,64,64)` pour les tuiles. Le brandboard ne donne aucune
échelle entre Dentelle et Terre d'Ombre.

Retenu : `#F1E4D2` (cartes) et `#E5D5BF` (tuiles), obtenus en assombrissant
Dentelle vers Terre d'Ombre à des écarts comparables à ceux de MYROR. **Ce
sont des valeurs inventées.** Si le brandboard complet contient une échelle,
elles doivent être remplacées.

### 1.3 Une ombre verte sans origine

L'ombre portée de la carte 28px est `rgba(56, 112, 67, 0.1)` chez MYROR —
un vert qui n'appartient à aucune de ses couleurs visibles. Impossible de
savoir s'il est intentionnel ou résiduel. Transposé sur Châtaigne à la même
opacité.

### 1.4 Contraste du bloc dégradé

Le titre posé sur le bloc dégradé garde la couleur mesurée de son rôle,
c'est-à-dire clair sur un fond clair. Le contraste est faible — il l'était
déjà chez MYROR (blanc sur bleu ciel). Non corrigé, parce que le corriger
serait changer une mesure. **À trancher.**

---

## 2. Typographie

### 2.1 Ce n'est pas un substitut — mais ce n'est pas le brandboard non plus

Le projet est composé en **Satoshi**, la fonte des relevés, auto-hébergée en
variable 300–900 (`public/fonts/Satoshi-Variable.woff2`, 42 Ko). Le relevé du
titre `h1` fournit l'URL de son fichier ; cette URL est celle du poids 700 de
Satoshi chez Fontshare, vérifiée identique.

Conséquence : **tous les corps, interlignes et approches de ce projet rendent
exactement ce qui a été mesuré.** Aucune recomposition, aucune coupure de
ligne décalée. C'est la meilleure situation possible pour une reproduction.

Le prix : le brandboard The Trace Agency prévoit **Tenez** (titres) et
**Range Sans** (texte), et **ni l'une ni l'autre n'est employée**. C'est un
écart délibéré et il est réversible — la marche à suivre est dans
`public/fonts/README.md`. Les deux jetons `--font-display` et `--font-text`
sont restés distincts précisément pour permettre de ne rebasculer que les
titres.

### 2.2 Le premier relevé était partiellement faussé

Le relevé de la page longue signale que sa propre capture a été faite avec
une fonte de repli pour `Edu VIC WA NT Hand` — donc certaines de ses mesures
de largeur étaient déjà décalées à la source. Cela ne concerne pas les rôles
Satoshi ni Inter, tous deux disponibles à la capture.

### 2.3 Graisses non mesurées par variante

Les variantes 2, 3 et 4 de `h2`, les deux de `h1` et les trois de `h4` ne
portent pas de `font-weight` dans la section « variantes visuelles ». La
graisse 700 des rôles typographiques leur a été appliquée. Si l'une d'elles
était plus légère, la mesure ne le dit pas.

### 2.4 Le rôle « lien en ligne » a un corps suspect

`link` variante 2 sur 10 est mesuré à `font-size: 12px` avec
`line-height: 40px`. 12px est exactement le corps hérité du `body` : il est
probable que ce lien n'ait pas de corps propre et hérite de son parent. Repris
tel quel, mais **à vérifier**.

---

## 3. Mouvement — la plus grosse lacune du relevé

La section « Motion engines on the page » a été **retirée du document pour
tenir dans son budget**. Ce n'est pas « rien n'a été mesuré » : c'est « la
mesure existe et ne m'a pas été transmise ».

Ce qui manque, concrètement :

- **Aucune durée de transition.** Seules `transition-property: all` et
  `transition-timing-function: ease` ont été relevées. Sans durée, une
  transition ne produit rien. `--duration-transition` vaut `0s` dans
  `app/styles/motion.css` : c'est le comportement réel, pas un oubli.
- **Aucun état `:hover`, `:focus` ou `:active`.** Le relevé ne capture que
  l'état de repos du DOM. Les boutons, les liens et les puces n'ont donc
  aucun retour visuel au survol.
- **L'animation du carrousel de la bande 6.** `ul.framer--carousel` et son
  bouton de contrôle sont en place, immobiles.
- **L'animation du ruban de la bande 7.** Les 14 `ticker-item` et leurs 14
  `clone-item` sont posés bout à bout — le balisage exact d'un défilement en
  boucle — mais rien ne les fait bouger. La direction, la vitesse et le sens
  ne sont pas mesurés.
- **Toute animation déclenchée au scroll.** Le relevé est une capture
  statique.

---

## 4. Structure non mesurée

### 4.1 Les structures de composants ont été retirées du document

La section « Component structures, measured » ne figure pas dans le relevé
reçu. Les composants de ce projet sont donc reconstruits à partir du
**squelette de page** et du **plan de la page**, qui sont plus grossiers :
ils donnent les agencements et les écarts, pas le détail élément par élément.

Les bandes que le squelette détaille réellement (6, 8, 9, et les rangées de
statistiques et de solutions) sont fidèles. Les autres sont composées à
partir des primitives mesurées, ce qui est une reconstruction.

### 4.2 Le bloc d'accroche vient d'un second relevé

`HeroBand` n'est **pas** une des 13 bandes. Il provient d'un relevé distinct,
celui de `div.framer-EPg72.framer-lcxzy1` (56 nœuds), beaucoup plus détaillé
que le squelette de la page longue. Sa structure est donc fidèle nœud par
nœud. Ce qui manque le concernant est regroupé au § 8.

Le premier relevé, lui, plaçait deux `<h1>` entre l'en-tête et la bande 2
sans qu'aucune surface de bande ne leur corresponde. Le second relevé
explique pourquoi : cette zone est un composant à part, avec ses propres
paddings (100px / 24px / 80px), qui n'entre pas dans la liste des bandes.

### 4.3 L'en-tête a son propre relevé

Voir § 9. Le premier relevé ne donnait que la bande ; le relevé de
`div.framer-y3542b` donne ses 28 nœuds, et corrige au passage une lecture du
premier : la barre est **fixe**, pas relative.

### 4.4 Proportion des deux colonnes de la bande 11

La seule bande en rangée du document. Son écart (48px) et sa largeur (1240px)
sont mesurés ; **la répartition entre ses deux enfants ne l'est pas**.
`flex: 1` retenu pour les deux — le partage neutre. Toute autre proportion
serait un chiffre inventé.

### 4.5 Où se trouve le bloc dégradé ?

`div.framer-rfpz8s` est mesuré (dégradé, rayon 32px, padding latéral 80px,
écart 10px) mais le relevé ne dit pas dans quelle bande il vit. Il a été placé
dans la bande 12, dont l'écart mesuré (10px) est exactement le sien et qui est
une rangée centrée sans autre contenu relevé. **Déduction, pas mesure.**

Corollaire : le bloc ne porte **aucun padding vertical mesuré**. Sa hauteur
est entièrement donnée par son contenu. C'est probablement faux à l'écran,
mais la valeur manque.

### 4.6 Calage de la pastille flottante

`position: fixed` est mesuré, `top` / `right` / `bottom` / `left` ne le sont
pas. Placée en bas à gauche — choix arbitraire.

Son `z-index` de `2147483000` et son unique occurrence indiquent un badge
d'éditeur plutôt qu'un élément de design. **À supprimer probablement.**

### 4.7 Le squelette pointe vers la boîte 1 sur 4 là où c'est impossible

Le squelette montre `div → box 1/4` à quatorze endroits (portrait de la
fondatrice, logos de créateurs), alors que la section des variantes déclare
cette boîte présente **une seule fois** sur la page — et en `position: fixed`.
Contradiction dans le relevé.

Retenu : le médaillon (boîte 2 sur 4) pour tous les cadres ronds de contenu,
et la pastille pour le seul badge fixe. **À vérifier.**

### 4.8 Répartition des tuiles et des cartes entre les bandes

Le relevé compte 5 tuiles (boîte 3 sur 4) et 3 cartes (boîte 4 sur 4) sur la
page, sans dire lesquelles vont où. Réparties selon la lecture la plus
cohérente des titres : cartes en bande 4, tuiles en bandes 5 et 11.

### 4.9 Contenu de la bande 13

Le plan de la page s'arrête au titre de la bande 12. La bande 13 a une
géométrie mesurée (colonne, 495px, écart 36px, padding 120/63) et **aucun
contenu relevé**. Les deux dernières variantes de lien inemployées — puce
pleine et puce fantôme, une occurrence chacune — y ont été placées. Déduction.

### 4.10 Nombre de vignettes de la bande 2

Le relevé ne détaille pas les enfants de cette bande. Quatre emplacements
carrés en rangée : choix de mise en page.

---

## 5. Médias

### 5.1 Un seul rapport d'aspect mesuré

`1254 / 1254`, soit un carré strict, sur les 30 images de la page. Aucun
format paysage, portrait ou bannière n'a été mesuré. Les emplacements non
carrés de ce projet (logo d'en-tête, logo de pied de page) reçoivent leur
rapport en prop — ce sont des choix.

### 5.2 Aucune taille d'image mesurée

Le relevé donne les rayons et le rapport, jamais une largeur. Toutes les
largeurs passées à `ImageBox` sont des choix de mise en page.

### 5.3 Le compte des variantes de média contredit le squelette

La section des variantes déclare 28 images à rayon 14px et 2 à rayon 4px. Le
squelette, lui, ne montre que la variante à 4px. Contradiction non résolue.

---

## 6. Responsive — partiellement résolu

Le relevé de la variante étroite du bloc d'accroche
(`div.framer-EPg72.framer-v-1bcxazv`, 70 nœuds à 390px) a levé une bonne
partie de cette lacune. Ce qui est désormais **mesuré** :

### 6.1 Les points de rupture

Ils viennent de la feuille de style du site, pas d'une convention :

```
(min-width: 1200px)                        → large
(max-width: 1199px) and (min-width: 810px) → moyen
(max-width: 809px)  and (min-width: 0)     → étroit
```

Ce sont les seuls du projet. Ils sont posés en jetons dans `theme.css`
(`--breakpoint-medium`, `--breakpoint-large`), ce qui aligne aussi les
variantes Tailwind. Attention : une règle `@media` ne peut pas lire une
custom property, donc les valeurs sont réécrites en toutes lettres partout.

### 6.2 Le bloc d'accroche, aux deux extrémités

Relevé en entier à 1324px **et** à 390px. Tout est reproduit :

| | ≥ 810px | < 810px |
|---|---|---|
| direction | rangée | colonne |
| écart racine | 32px | 61px |
| padding haut | 100px | 50px |
| photos | 8 cadres, liseré dégradé, rayons 8/16px | 6 vignettes en 2 rubans, rayon 10px, **sans liseré** |
| titre (2ᵉ ligne) | 64px / 70,4px | 41px / 45,1px |
| chapô | 18px / 28,8px | 16px / 25,6px |
| bouton | 262,57 × 56 | **identique** |
| sceau | 300 × 60 | **identique** |

### 6.3 Le titre de section

Le préréglage `1x8i0c5` est mesuré aux trois paliers : **52 / 40 / 32px**,
interligne 110 % partout. Appliqué dans `type.css` aux quatre variantes de h2.

---

### Ce qui reste NON mesuré

- **Les onze autres bandes.** Mesurées à 1324px et nulle part ailleurs.
  Leurs rangées de 3 ou 4 colonnes, leurs cartes à largeur fixe et leurs
  blocs à deux colonnes n'ont aucune règle en dessous.
- **Le bloc d'accroche au palier moyen** (810–1199px). Relevé à 1324px et à
  390px, jamais entre les deux. Les corps de 72px et 64px y restent donc
  inchangés, et le titre se répand sur trois lignes vers 1000px.
- **Les autres corps de titre.** 72px, 64px, 50px, 40px, 32px : aucun n'est
  mesuré à un autre palier que le large.
- **La barre de navigation étroite.** Aucune variante relevée. Le menu, le
  logo et le bouton WhatsApp ne tiennent pas ensemble sous 1200px.

**Ces manques sont couverts par `app/styles/responsive-stopgap.css`**, le seul
fichier du projet dont aucune valeur n'est mesurée. Il ne dessine rien : il
empêche le débordement, pour que ce qui EST mesuré reste consultable. Son
en-tête dit quoi en faire. À supprimer dès que les vraies règles seront
décidées.

Trois décisions y sont particulièrement arbitraires et à reprendre en
priorité :

1. **Le menu disparaît sous 1200px.** Menu déroulant ? Panneau plein écran ?
   Menu réduit à deux entrées ? Rien ne tranche.
2. **Les corps de titre non mesurés** y sont ramenés à des valeurs simplement
   lisibles (36px, 32px, 30px, 24px).
3. **Le dégagement sous la barre fixe** passe à 64px sous 810px, faute de
   quoi le logo recouvrait le titre.

---

## 7. Autres absences

- **Le logo.** Les deux fichiers fournis (noir et beige, 313 × 171) sont en
  place dans `public/brand/`. Le noir est employé en en-tête et en pied de
  page ; **le beige n'est utilisé nulle part** — il attend une surface sombre,
  par exemple le bloc dégradé de la bande 12. Ni la taille ni l'emplacement du
  logo ne sont mesurés : ce sont des décisions. Celle qui a eu le plus de
  conséquences est la **hauteur de l'en-tête, portée de 64px mesurés à 96px**
  parce que le logo, au rapport 313/171, est beaucoup plus haut qu'un logotype
  horizontal. C'est le seul écart de géométrie de bande du projet, signalé
  dans `sections.css`.
- **Favicon et images de partage.** Le logo pourrait les fournir ; rien n'est
  en place. À décider.
- **Icônes.** La section « Icons and images » a été retirée du document.
  Aucun jeu d'icônes n'est mesuré ; les emplacements sont des `ImageBox`.
- **Pseudo-éléments.** La section « CSS as written — pseudo-elements and
  toggles » a été retirée. Un `::before` ou un `::after` porteur de décor
  serait invisible dans ce relevé.
- **Épaisseurs de bordure.** Une seule bordure mesurée sur toute la page
  (celle de la pastille). Rien pour les cartes, les tuiles ou les champs.
- **Formulaires.** Aucun champ, aucune case, aucun `select` mesuré. Le site
  a un appel à l'action « travaillons ensemble » mais le formulaire n'est pas
  dans la capture.
- **Focus clavier.** Aucun style de focus mesuré. Les styles par défaut du
  navigateur s'appliquent, ce qui est fonctionnel mais pas dessiné.
- **Couleur du `body`.** Mesurée à `rgb(0,0,0)` sur un fond `rgb(0,0,0)` :
  noir sur noir. Remplacée par la couleur de texte principale, parce que
  reproduire ce piège n'apporte rien. Écart signalé dans `app/globals.css`.
- **Sélection de texte, barres de défilement, favicon, méta-images.**
  Non mesurés.
- **Les hauteurs de bande** relevées (754px, 768px, 1616px…) n'ont pas été
  reprises : ce sont des résultats de contenu au moment de la capture, pas
  des décisions. Si l'une d'elles était une hauteur fixée, l'information est
  perdue.

---

## 8. Le bloc d'accroche — ce que son relevé ne dit pas

Le second relevé est le plus complet des deux, mais il partage les mêmes
angles morts.

### 8.1 Ni survol, ni focus, ni état actif

Le bouton d'action et les huit cadres photo n'ont **aucun retour visuel**.
Le relevé est une capture au repos. Un collage de photos cliquables sans
état de survol se remarque tout de suite — **à décider**.

### 8.2 Aucune règle responsive

Le composant a été mesuré à **1324px**, une seule fois. Les proportions sont
écrites en `flex-grow` plutôt qu'en pixels, donc rien ne déborde ; mais :

- les deux groupes de photos ne passent jamais sous le texte ;
- le titre reste à 72px puis 64px à toute largeur ;
- les paddings de 100px et 80px ne diminuent jamais.

En dessous d'environ 900px, les cadres deviennent trop étroits pour être
lisibles. **Le point de rupture doit être décidé**, il n'est pas mesurable.

### 8.3 L'animation existe — mais pas sa vitesse

Le relevé étroit montre deux rubans verticaux qui remplacent le collage sous
810px : trois vignettes suivies de leurs trois clones, la forme canonique
d'une boucle sans couture.

Ce qui est **mesuré** et reproduit :

- la structure (3 `ticker-item` + 3 `clone-item`, écart 10px) ;
- `aria-hidden="false"` sur les originaux, `"true"` sur les clones — un
  lecteur d'écran n'entend les vignettes qu'une fois ;
- le **sens** : les deux décalages relevés sont négatifs, donc vers le haut ;
- le **déphasage**. Les deux décalages ne sont pas proportionnels aux hauteurs
  de liste : `−157,054 / 670,415 = 23,4 %` du cycle pour le premier ruban,
  `−443,946 / 646,227 = 68,7 %` pour le second. Les 45,3 points d'écart sont
  reproduits par un `animation-delay` négatif, valable quelle que soit la
  durée retenue ;
- la **distance d'un cycle**, écrite sans aucun pixel en dur :
  `(hauteur de liste + un écart) / 2`. Vérification sur le premier ruban :
  `(1330,83 + 10) / 2 = 670,415px`, la valeur calculée à partir des trois
  hauteurs de vignette.

Ce qui **n'est pas mesuré** :

- **la durée.** `--hero-ticker-duration: 44s` est une valeur **choisie**.
  C'est la seule invention de l'animation, et elle est isolée dans un jeton :
  une ligne à changer.
- **la courbe.** `linear` est retenu parce qu'un défilement en boucle qui
  accélère et ralentit se voit à chaque tour ; ce n'est pas une mesure.
- **le comportement au survol.** Beaucoup de rubans s'arrêtent au survol.
  Aucun état de survol n'a été capturé.

Le collage large, lui, n'est animé nulle part dans les relevés.

### 8.2 bis Le titre étroit est plus petit que mesuré

Le relevé donne **41px / 45,1px** (110 %) pour le titre sous 810px. Retenu :
**32px / 35,2px** — même rapport de 110 %, et même corps que celui mesuré
pour le titre de section au même palier. Ce n'est donc pas un chiffre sorti
de nulle part, mais ce n'est pas la mesure du bloc d'accroche.

Pourquoi : à 41px, avec une approche de −2px et 110 % d'interligne, deux
lignes de titre se touchent presque — les accents d'une ligne butent sur les
jambages de celle du dessus. Le relevé étroit n'a qu'**un seul** titre
visible (le premier `h1` du relevé large ne contient qu'un `<br>`), donc la
question ne s'y posait pas. Ici il y en a deux empilés.

**À trancher :** revenir à 41px en n'affichant qu'une seule ligne de titre
sur mobile serait plus fidèle au relevé. Cela suppose de décider ce que
devient la première ligne à cette largeur.

### 8.3 bis Les rubans sont EN BAS, contre la mesure

Le relevé étroit place le bloc des rubans en **premier** enfant de la racine,
donc au-dessus du texte. Il est ici en **dernier** : les rubans passent sous
le titre, le chapô, le bouton et le sceau. C'est une demande explicite, et
c'est le seul écart de la variante étroite — tout le reste vient des mesures.

### 8.4 Les largeurs et la hauteur ne sont pas des décisions

Le relevé donne 280,719px pour un groupe photo, 650,562px pour la colonne
centrale, 136,359px pour un cadre, 977px de hauteur. Aucune de ces valeurs
n'est écrite dans le CSS : ce sont des largeurs distribuées à 1324px, et 977px
est la hauteur du viewport de capture. Seules leurs **proportions** sont
reprises (`flex-grow: 280.719 / 650.562 / 280.719`), plus les deux vraies
décisions : `max-width: 600px` sur un groupe et `max-width: 550px` sur le
chapô.

### 8.5 bis Le sceau de confiance est en place, mais repeint

Le fichier fourni (`public/brand/webmark.avif`, 1024 × 205) correspond
exactement au rapport de l'emplacement mesuré (`aspect-ratio: auto 1024/205`,
rendu 300 × 60). C'est bien celui-là.

Il est **blanc sur transparent** — dessiné pour le site d'origine, qui est
noir. La page étant claire, il n'est pas affiché mais utilisé comme **masque
CSS** : seule sa couche alpha est lue, la couleur vient d'un aplat Châtaigne
peint derrière. Le dessin reste au pixel près celui du fichier ; aucun filtre,
aucune perte. Changer `--webmark-color` suffit à le repeindre, y compris en
Dentelle sur une surface sombre (classe `.hero__webmark--on-dark`, prête mais
inemployée).

**À décider :** si tu préfères une vraie version sombre du fichier, elle
remplacera le masque sans rien changer d'autre.

Le texte du sceau — « 98 % de clients satisfaits, +500 clients accompagnés » —
est repris dans l'`aria-label`, sans quoi il serait perdu pour un lecteur
d'écran : un masque CSS n'est qu'un fond décoratif. **Ces deux chiffres sont
à confirmer avec la cliente**, ils viennent d'une image et pas d'une source
écrite.

### 8.5 Les images du site mesuré ne sont pas reprises

Le relevé fournit neuf URL `framerusercontent.com`. Elles pointent vers le
serveur du site mesuré et ses photos ne nous appartiennent pas : **aucune
n'est utilisée**. Les neuf emplacements sont des cadres étiquetés, aux
rapports d'aspect mesurés.

Les rapports en question sont ceux des photos d'origine, pas des décisions de
gabarit : `0.672043`, `0.675781`, `0.765487`, `0.675824`, `0.798701`,
`0.675676` et deux carrés. Tes propres photos auront les leurs. Si tu veux
garder le collage exactement tel quel, il faudra recadrer aux mêmes rapports ;
sinon, ces valeurs sont à remplacer par les tiennes.

### 8.6 Le premier titre était vide

Le relevé mesure un `h1` de 72px dont le contenu est un simple `<br>`, suivi
d'un `h1` de 64px portant le texte. Deux lectures possibles : une ligne
volontairement vide pour l'espacement, ou un reste d'édition. Le composant
prend deux titres pleins — **à vérifier**.

### 8.7 Trois décisions prises seules — hero

Le relevé ne dit rien de l'intégration ; ces trois choix sont les miens :

- **Les props.** `HeroBand` reçoit `title`, `subtitle`, `lede`, `ctaLabel` et
  `ctaHref`. Les huit cadres photo sont en dur dans le fichier, parce que
  leurs rapports d'aspect sont mesurés et non interchangeables — si tu veux
  les passer en props, il faudra décider ce qui arrive quand une photo a un
  autre rapport.
- **La place dans l'application.** Placé juste après l'en-tête, avant la
  bande 2, conformément au plan de la page longue.
- **Le comportement aux autres largeurs.** Aucun — voir § 8.2.

---

## 9. L'en-tête — ce que son relevé ne dit pas

Le relevé de `div.framer-y3542b` (28 nœuds) donne la structure complète de la
barre. Ce qu'il ne donne pas :

### 9.1 Le survol des entrées de menu — et il en manque visiblement un

Trois mesures pointent toutes dans la même direction sur les liens du menu :

- le lien occupe **toute la hauteur** de la barre (56px) alors que son
  libellé n'en fait que 24 ;
- il porte `overflow: hidden` ;
- le conteneur du libellé porte `z-index: 1`.

Une zone pleine hauteur qui masque son débordement, avec un libellé placé
volontairement au-dessus : c'est la forme d'un **remplissage qui monte au
survol**. Mais aucun état de survol n'a été capturé, donc **rien n'est
écrit** — ni couleur, ni sens, ni durée. C'est le manque le plus visible du
composant : les liens sont inertes.

### 9.2 Le `z-index` de la barre fixe

`position: fixed` est mesuré sur le conteneur ancêtre. Son `z-index` ne l'est
pas. **100 est une valeur choisie** — au-dessus du contenu, très en dessous
de la pastille flottante (2 147 483 000).

### 9.3 Aucun flou d'arrière-plan

Le fond est à 80 % d'opacité et la barre est fixe : du contenu défile donc
dessous, en clair et lisible à travers. Un `backdrop-filter` réglerait ça,
mais aucun n'a été mesuré sur l'en-tête — le seul du document est sur la
pastille flottante. **À décider.**

### 9.4 Deux écarts de géométrie, tous les deux assumés

- **Hauteur.** Bande 64px → 96px, contenu 56px → 88px, pour loger le logo.
  Le padding de 4px et tous les écarts internes (32 / 16 / 8px) sont intacts.
  Le canevas reçoit en compensation 32px de padding haut, dérivé : la barre a
  grandi de 32px, le titre doit descendre d'autant pour rester à la même
  distance sous elle.
- **Largeur.** Le relevé donne `max-width: 1680px` et `width: 1180px`. C'est
  1180px qui sert de plafond : à 1680px le logo et le menu se retrouvent aux
  deux extrémités de l'écran. 1180px reste une valeur mesurée.

### 9.5 L'emplacement du logo ne correspond pas au fichier

Le relevé donne `width: 120px; aspect-ratio: 3.07692 / 1` — un logotype
horizontal de 120 × 39. Le logo fourni est au rapport 313/171. Ni la largeur
ni le rapport mesurés ne s'appliquent : le composant `Logo` pose sa propre
largeur (150px) et déduit sa hauteur du fichier.

### 9.6 Le vert WhatsApp n'est pas transposé

L'icône est collée telle quelle depuis le relevé, avec son
`fill="rgb(37, 211, 102)"`. C'est la couleur de marque de WhatsApp, pas une
couleur de la charte : la repeindre en Châtaigne rendrait le service
méconnaissable. Elle est donc laissée intacte — c'est le seul endroit du
projet où une couleur hors charte est employée volontairement.

### 9.7 La barre étroite est entièrement inventée

Aucun relevé ne contient de variante étroite de la barre : le composant
mesuré n'existe qu'à une seule largeur. Tout ce qui suit est une **décision**,
écrite dans `header.css` et `MobileMenu.tsx` :

- **810px – 1199px** : la barre mesurée tient encore, mais tout juste. Le logo
  descend à 110px pour lui laisser la place — 110 + 32 + 394 + 16 + 210 =
  762px, contre 778px disponibles à 810px de viewport.
- **< 810px** : logo à gauche, bouton hamburger à droite, et un panneau plein
  écran qui reprend les quatre entrées et le bouton WhatsApp. Le logo tombe à
  104px et la bande à 72px.

Sont traités parce qu'un menu qui ne le fait pas est cassé : fermeture à
Échap, défilement de la page bloqué, `aria-expanded` / `aria-controls`,
fermeture au clic sur une entrée, panneau `inert` quand il est fermé.

Les seules durées d'animation du projet sont ici (200ms sur le panneau et le
hamburger). Elles ne sont pas mesurées non plus — aucune durée ne l'est nulle
part.

### 9.8 Les libellés sont des placeholders

Les quatre entrées de menu et le libellé du bouton attendent le contenu de la
cliente. Les mots du site mesuré ne sont pas repris. Tous les `href` valent
`#`, y compris celui du bouton WhatsApp — **il faudra le vrai numéro**, sous
la forme `https://wa.me/33XXXXXXXXX`.
