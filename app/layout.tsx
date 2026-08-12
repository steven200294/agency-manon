import type { Metadata } from "next";
import "./globals.css";

/* ==========================================================================
   Racine du document

   Aucune fonte n'est chargée ici : le projet est composé en Satoshi, qui est
   auto-hébergée dans `public/fonts/` et déclarée dans `app/styles/fonts.css`.
   Pas de `next/font`, donc pas de requête vers un service tiers — le fichier
   est servi depuis le même domaine que la page.

   `lang="fr"` : tout le contenu est en français, et le navigateur en a besoin
   pour la césure, la coupure de mots et la synthèse vocale.
   ========================================================================== */

export const metadata: Metadata = {
  title: "The Trace Agency — Prestige Digital",
  description:
    "Une empreinte, un sillage, une marque indélébile. L'élégance d'un tracé visionnaire, la force d'une identité inoubliable.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
