import type { ReactNode } from "react";
import MediaSlot from "@/components/primitives/MediaSlot";
import { ButtonPrimary } from "@/components/primitives/Buttons";
import { CASE_CTA_LABEL, type Concept } from "@/content/cases";

/* ==========================================================================
   Pièces communes aux pages de cas client

   Aucune n'est propre à un client : ZinAmara et BNI les assemblent
   différemment, c'est tout.
   ========================================================================== */

export function CaseHero({
  kicker,
  client,
  title,
}: {
  kicker: string;
  client: string;
  title: string;
}) {
  return (
    <header className="case-hero">
      <p className="case-hero__kicker">{kicker}</p>
      {/* Le nom du client est petit exprès : le produit, c'est le concept,
          et il est composé plus gros partout ailleurs sur la page. */}
      <p className="case-hero__client">{client}</p>
      <h1 className="case-hero__title">{title}</h1>
    </header>
  );
}

export function CaseSection({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`case-section ${className}`.trim()}>
      {title ? <h2 className="case-section__title">{title}</h2> : null}
      {children}
    </section>
  );
}

/** « Lead en gras. Suite du texte. » */
export function Lead({ lead, text }: { lead: string; text: string }) {
  return (
    <p className="case-lead">
      <strong>{lead}</strong> {text}
    </p>
  );
}

/** La vidéo dans son cadre vertical. Un lien Instagram `/p/…` ou `/reel/…`
    est lu sur place via l'iframe officielle `/embed` : pas de script ajouté au
    site, mais Instagram y dépose ses propres cookies. Chargée à la demande
    (`loading="lazy"`). Sans lien, l'emplacement déclaré reste. */
export function VideoFrame({
  href,
  src,
  poster,
  label,
  subject,
}: {
  href?: string;
  /** Fichier vidéo hébergé sur le site : lu sur place, prioritaire sur `href`. */
  src?: string;
  poster?: string;
  label: string;
  subject: string;
}) {
  const embed = href?.match(/^https:\/\/www\.instagram\.com\/(p|reel)\/([\w-]+)/);
  return (
    <figure className="video-frame">
      {src ? (
        <video
          className="video-frame__embed"
          src={src}
          poster={poster}
          title={label}
          controls
          playsInline
          preload="metadata"
        />
      ) : embed ? (
        <iframe
          className="video-frame__embed"
          src={`https://www.instagram.com/${embed[1]}/${embed[2]}/embed`}
          title={label}
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <MediaSlot
          subject={subject}
          format="Vidéo verticale, 9 / 16"
          ratio="9 / 16"
        />
      )}
      {href ? (
        <figcaption>
          <a
            className="video-frame__link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label} — voir sur Instagram
            <span className="sr-only">{" (s'ouvre dans un nouvel onglet)"}</span>
          </a>
        </figcaption>
      ) : (
        <figcaption className="video-frame__link video-frame__link--pending">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

/** Un concept : problème → concept → vidéo → ce que ça produit.
    L'ordre du DOM EST l'ordre imposé ; la grille ne fait que placer la vidéo
    dans la colonne de droite au large. Ne pas réordonner en CSS
    (`order`), ni en mobile. */
export function ConceptBlock({ item }: { item: Concept }) {
  return (
    <article className="concept">
      <header className="concept__head">
        <span className="concept__number">{item.number}</span>
        <h3 className="concept__name">{item.name}</h3>
        <p className="concept__tagline">{item.tagline}</p>
      </header>
      {item.problem ? (
        <p className="concept__problem">{item.problem}</p>
      ) : null}
      <p className="concept__concept">{item.concept}</p>
      <VideoFrame
        href={item.videoUrl}
        label={item.videoLabel}
        subject={item.videoLabel}
      />
      <div className="concept__effects">
        {item.effects.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </article>
  );
}

export function RecapTable({
  head,
  rows,
}: {
  head: [string, string];
  rows: readonly (readonly [string, string])[];
}) {
  return (
    <table className="recap">
      <thead>
        <tr>
          <th scope="col">{head[0]}</th>
          <th scope="col">{head[1]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([a, b]) => (
          <tr key={a}>
            <td>{a}</td>
            <td>{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Encadré de clôture : Châtaigne, texte Dentelle. */
export function ClosingBlock({
  title,
  body,
}: {
  title: string;
  body: string[];
}) {
  return (
    <section className="case-closing">
      <h2 className="case-closing__title">{title}</h2>
      {body.map((text) => (
        <p key={text}>{text}</p>
      ))}
      <CaseCta />
    </section>
  );
}

/** L'appel de fin de page, seul, quand le cas n'a pas de bloc de clôture. */
export function CaseCta() {
  return (
    <div className="case-cta">
      <ButtonPrimary href="/#contact" labelClassName="t-label">
        {CASE_CTA_LABEL}
      </ButtonPrimary>
    </div>
  );
}
