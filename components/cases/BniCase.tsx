import { BNI as B } from "@/content/cases";
import {
  CaseHero,
  CaseSection,
  CaseCta,
  Lead,
  RecapTable,
  VideoFrame,
} from "./CaseParts";

export default function BniCase() {
  return (
    <>
      <CaseHero kicker={B.kicker} client={B.client} title={B.title} />

      <CaseSection>
        {B.proof.map((text) => (
          <p key={text} className="case-body case-body--intro">
            {text}
          </p>
        ))}
      </CaseSection>

      {/* Problème → concept → vidéos → effets : même ordre que ZinAmara. */}
      <CaseSection title={B.problem.title}>
        {B.problem.body.map((text) => (
          <p key={text} className="case-body">
            {text}
          </p>
        ))}
        <p className="case-verdict">{B.problem.verdict}</p>
      </CaseSection>

      <CaseSection title={B.concept_block.title}>
        <p className="concept-name">
          {B.concept_block.name}
          <em>{B.concept_block.tagline}</em>
        </p>
        {B.concept_block.body.map((text) => (
          <p key={text} className="case-body">
            {text}
          </p>
        ))}
        <Lead {...B.concept_block.brand} />
        <Lead {...B.concept_block.constraint} />
      </CaseSection>

      <CaseSection title={B.mechanics.title}>
        {B.mechanics.items.map((item) => (
          <Lead key={item.lead} {...item} />
        ))}
        <Lead {...B.mechanics.invitation} />
      </CaseSection>

      <CaseSection title={B.episodes.title}>
        <p className="case-body case-body--intro">{B.episodes.intro}</p>
        {/* Trois épisodes côte à côte au large : c'est la juxtaposition qui
            fait lire la mécanique. Le pilier est AU-DESSUS de chaque
            épisode. Le logo du format est déjà incrusté dans les vidéos. */}
        <div className="episodes">
          {B.episodes.items.map((ep) => (
            <article key={ep.letter} className="episode">
              <p className="episode__pillar">{ep.pillar}</p>
              <div className="episode__thumb">
                <VideoFrame
                  src={ep.video}
                  poster={ep.poster}
                  label={`Vidéo ${ep.letter}`}
                  subject={`Épisode ${ep.letter} — ${ep.speaker}`}
                />
              </div>
              <h3 className="episode__title">
                Épisode {ep.letter} · {ep.speaker}
              </h3>
              <p className="episode__quote">{ep.title}</p>
              {ep.text.map((t) => (
                <p key={t} className="episode__text">
                  {t}
                </p>
              ))}
            </article>
          ))}
        </div>

        <h3 className="case-subtitle">{B.episodes.recapTitle}</h3>
        <RecapTable head={["Épisode", "Pilier"]} rows={B.episodes.recap} />
        <p className="case-body">{B.episodes.note}</p>
      </CaseSection>

      <CaseCta />
    </>
  );
}
