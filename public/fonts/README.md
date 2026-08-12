# Fontes

## Ce qui est en place

`Satoshi-Variable.woff2` — 42 Ko, une seule fonte variable de 300 à 900, qui
compose tout le projet. Titres, texte, libellés.

Ce n'est pas un substitut : c'est exactement la fonte sur laquelle les relevés
ont été mesurés. Le relevé du titre `h1` fournit l'URL de son fichier, et cette
URL est celle du poids 700 de Satoshi chez Fontshare. Chaque corps, interligne
et approche du projet a donc été mesuré sur ces formes de lettres — rien ne se
recomposera.

Licence ITF Free Font License, usage personnel et commercial autorisé.
Source : <https://www.fontshare.com/fonts/satoshi>

Auto-hébergée : aucune requête vers un domaine tiers, aucune dépendance à la
disponibilité d'un CDN.

## Pour passer aux fontes du brandboard

Le brandboard The Trace Agency prévoit **Tenez** pour les titres et
**Range Sans** pour le texte. Elles ne sont pas chargées.

Pour les remettre :

1. dépose leurs `.woff2` ici ;
2. ajoute leurs `@font-face` dans `app/styles/fonts.css` ;
3. repointe `--font-display` et `--font-text` dans `app/styles/theme.css`.

Les deux jetons sont restés distincts exprès : tu peux ne changer que les
titres et laisser le texte en Satoshi.

Attends-toi alors à ce que le texte se recompose — longueurs de lignes,
retours à la ligne, hauteurs de bandes. Les mesures viennent de Satoshi.
