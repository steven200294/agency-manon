import { CONSTAT } from "@/content/site";

/* ==========================================================================
   BANDE 2 — le constat

   Trois grandes photos verticales, une par évidence, décalées en hauteur
   comme une planche-contact posée de travers ; puis le pivot en très grand.
   Les photos disent « ce que tout le monde fait » — le pivot dit « et ce
   n'est pas le sujet ».

   Une photo par phrase, dans l'ordre :
   poster → le verre qu'on photographie au coucher du soleil ;
   filmer → les mains et le téléphone ;
   community manager, graphiste, IA → le poste de montage.
   ========================================================================== */

const PHOTOS = [
  "/brand/hero/spritz.webp",
  "/brand/hero/tournage-food.jpg",
  "/brand/hero/studio.jpg",
] as const;

export default function ConstatBand() {
  return (
    <section className="band-constat">
      <div className="band-constat__inner">
        <div className="band-constat__head">
          <span className="badge">{CONSTAT.badge}</span>
          <h2 className="band-constat__title">{CONSTAT.title}</h2>
        </div>

        <ul className="band-constat__tall">
          {CONSTAT.lines.map((line, i) => (
            <li key={line} className="band-constat__panel">
              {/* Décorative : la phrase dit déjà tout. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS[i]}
                alt=""
                className="band-constat__photo"
                loading="lazy"
              />
              <p>{line}</p>
            </li>
          ))}
        </ul>

        <div className="band-constat__pivot">
          <p className="band-constat__pivot-line">{CONSTAT.pivot}</p>
          <p className="band-constat__closing">
            {CONSTAT.closing}
            <em>{CONSTAT.closingEmphasis}</em>
          </p>
        </div>
      </div>
    </section>
  );
}
