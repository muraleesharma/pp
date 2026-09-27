import {
  eventConfig,
  eventDateLabel,
  eventTimeLabel,
} from "../config/eventConfig";

type Props = {
  open: boolean;
  skipped: boolean;
  onOpen: () => void;
  onSkip: () => void;
};

export function Opening({ open, skipped, onOpen, onSkip }: Props) {
  return (
    <section
      id="top"
      className={`opening stage-shell ${open ? "is-open" : ""} ${skipped ? "skip-animation" : ""}`}
      aria-label="Opening stage"
    >
      <div className="stage-stars" aria-hidden="true">
        <i>✦</i>
        <i>✳</i>
        <i>✦</i>
        <i>✳</i>
        <i>✦</i>
      </div>
      <div className="opening-inner">
        <div className="theatre-sign">
          THE GRAND LITTLE THEATRE <span>•</span> ONE NIGHT ONLY
        </div>
        <p className="eyebrow">A {eventConfig.occasion} invitation</p>
        <h1>
          <span>Two stars.</span>
          <br />
          <em>One grand</em>
          <br />
          celebration<span className="period">.</span>
        </h1>
        <div className="hero-rule">
          <span>✦</span>
        </div>
        <p className="hero-starring">
          Starring{" "}
          <strong>
            {eventConfig.twins[0]} & {eventConfig.twins[1]}
          </strong>
        </p>
        <p className="hero-date">
          {eventDateLabel} <span>·</span> {eventTimeLabel} onwards
        </p>
        <a className="hero-explore" href="#stars">
          Meet the stars <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="stage-floor" aria-hidden="true" />
      <div className="curtain-curtain curtain-left" aria-hidden="true" />
      <div className="curtain-curtain curtain-right" aria-hidden="true" />
      <div className="valance" aria-hidden="true" />
      {!open && (
        <div className="opening-cover">
          <div className="cover-ornament" aria-hidden="true">
            ✦ <span>✧</span> ✦
          </div>
          <p className="cover-kicker">The Grand Little Theatre presents</p>
          <h2>
            Pravya <span>&</span>
            <br />
            Pranavi
          </h2>
          <p className="cover-occasion">
            A {eventConfig.occasion.toUpperCase()} CELEBRATION
          </p>
          <button
            className="button button-cream raise-button"
            type="button"
            onClick={onOpen}
          >
            Raise the curtain <span aria-hidden="true">↗</span>
          </button>
          <button className="skip-intro" type="button" onClick={onSkip}>
            Skip introduction
          </button>
        </div>
      )}
      <span className="opening-side-label" aria-hidden="true">
        EST. 2025 · FIRST ACT
      </span>
    </section>
  );
}
