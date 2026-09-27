import { useState } from "react";
import { eventConfig } from "../config/eventConfig";

export function Cake() {
  const [lit, setLit] = useState([false, false]);
  const celebrate = lit.every(Boolean);
  const toggle = (index: number) =>
    setLit((current) =>
      current.map((value, i) => (i === index ? !value : value)),
    );
  return (
    <section
      id="cake"
      className={`cake-section section-pad ${celebrate ? "celebrating" : ""}`}
    >
      <div className="section-heading">
        <span className="act-number">ACT II / THE SWEET FINALE</span>
        <p className="eyebrow">A wish for each little star</p>
        <h2>
          Make a little <em>wish</em>
        </h2>
        <p>Tap both candles to light up their {eventConfig.occasion}.</p>
      </div>
      <div className="cake-stage">
        <div className="cake-stars" aria-hidden="true">
          ✦ <span>✳</span> ✦
        </div>
        <div className="cake-illustration">
          <div className="candles">
            {[0, 1].map((index) => (
              <button
                key={index}
                type="button"
                className={`candle-button candle-${index} ${lit[index] ? "lit" : ""}`}
                onClick={() => toggle(index)}
                aria-label={`${lit[index] ? "Extinguish" : "Light"} candle ${index + 1}`}
                aria-pressed={lit[index]}
              >
                <span className="flame" />
                <span className="wick" />
                <span className="candle-body" />
              </button>
            ))}
          </div>
          <div className="cake-tier tier-top">
            <span>✦ &nbsp; ✦ &nbsp; ✦</span>
          </div>
          <div className="cake-tier tier-bottom">
            <span>♡ &nbsp; ♡ &nbsp; ♡ &nbsp; ♡</span>
          </div>
          <div className="cake-plate" />
        </div>
        {celebrate && (
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        )}
      </div>
      <div className="cake-message" aria-live="polite">
        {celebrate ? (
          <>
            <p className="eyebrow">The wish has been made</p>
            <h3>
              {eventConfig.twins[0]} & {eventConfig.twins[1]}
              <br />
              turn <em>{eventConfig.milestoneWord}!</em>
            </h3>
            <a href="#details" className="button button-dark">
              Your invitation ↓
            </a>
            <button
              type="button"
              className="text-button"
              onClick={() => setLit([false, false])}
            >
              Light them again ↺
            </button>
          </>
        ) : (
          <p>
            Two candles. Twice the magic. <span>✦</span>
          </p>
        )}
      </div>
    </section>
  );
}
