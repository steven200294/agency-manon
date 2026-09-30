"use client";

import { useState } from "react";
import { EXPERTISES } from "@/content/site";

/* Une photo par expertise, dans l'ordre de la liste. Ce sont des photos de
   clients de l'agence, sauf la quatrième ligne de production (banque
   d'images provisoire, à remplacer) :
   personal branding → portrait aux bijoux ; stratégie → le joueur qui
   réfléchit sur son banc ; UGC → le téléphone qui cadre un plat ; direction
   artistique → le collier sur la porte bleue ; wellness & hospitality → le
   chef sur sa terrasse d'altitude. */
const PHOTOS = [
  "/brand/hero/bijoux-chapeau.webp",
  "/brand/hero/tennis.webp",
  "/brand/sections/ugc.jpg",
  "/brand/hero/collier-bleu.webp",
  "/brand/hero/chef-altitude.webp",
] as const;

/* ==========================================================================
   L'accordéon d'expertises

   Cinq bandes photo côte à côte. Une seule est ouverte à la fois : elle prend
   la place, montre son titre en grand et son texte ; les quatre autres se
   referment en fines bandes verticales où le titre se lit de bas en haut.

   On l'ouvre au survol (souris), au focus (clavier) et au toucher. La
   première est ouverte au départ : la bande n'est jamais « fermée ».

   TOUT LE TEXTE EST TOUJOURS DANS LE DOM. Les bandes fermées le masquent
   visuellement, elles ne le retirent pas : un lecteur d'écran lit les cinq
   expertises en entier, et `aria-expanded` dit laquelle est ouverte.
   ========================================================================== */

export default function ExpertisesAccordion() {
  const [active, setActive] = useState(0);

  return (
    <ul className="fan">
      {EXPERTISES.map((item, i) => (
        <li key={item.number} className="fan__item" data-open={i === active}>
          <button
            type="button"
            className="fan__panel"
            aria-expanded={i === active}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            {/* Décorative : le titre dit déjà de quoi il s'agit. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTOS[i]} alt="" className="fan__photo" loading="lazy" />

            {item.tag ? <span className="fan__tag">{item.tag}</span> : null}

            {/* Fermée : le titre en vertical. */}
            <span className="fan__rail" aria-hidden="true">
              {item.title}
            </span>

            {/* Ouverte : titre et texte. */}
            <span className="fan__text">
              <span className="fan__title">{item.title}</span>
              <span className="fan__body">{item.body}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
