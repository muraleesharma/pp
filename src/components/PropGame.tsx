import { useState } from "react";
import { scrollBehavior } from "../utils/scroll";

const props = [
  {
    id: "hat",
    label: "party hat",
    icon: (
      <svg viewBox="0 0 92 104" aria-hidden="true">
        <path
          d="M15 88 57 12l22 76Z"
          fill="#ea806a"
          stroke="#18333a"
          strokeWidth="3"
        />
        <path
          d="M34 52 51 60m-7-26 17 8M15 88q32 10 64 0"
          fill="none"
          stroke="#fff4df"
          strokeWidth="6"
        />
        <circle
          cx="57"
          cy="10"
          r="8"
          fill="#f1c962"
          stroke="#18333a"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "balloon",
    label: "balloon",
    icon: (
      <svg viewBox="0 0 92 104" aria-hidden="true">
        <path
          d="M50 65c20-16 27-30 24-45C71 7 61 3 50 4 35 5 27 17 30 32c2 13 9 24 20 33Z"
          fill="#f1c962"
          stroke="#18333a"
          strokeWidth="3"
        />
        <path
          d="m49 66-4 8h10l-5-8Zm1 8q-15 12-5 26"
          fill="none"
          stroke="#18333a"
          strokeWidth="2"
        />
        <path
          d="M39 22q3-8 9-9"
          fill="none"
          stroke="#fff4df"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "candle",
    label: "candle",
    icon: (
      <svg viewBox="0 0 92 104" aria-hidden="true">
        <path
          d="M46 9c-13 14-3 21 0 23 13-7 10-15 0-23Z"
          fill="#f1c962"
          stroke="#18333a"
          strokeWidth="2"
        />
        <rect
          x="37"
          y="37"
          width="20"
          height="57"
          rx="3"
          fill="#ea806a"
          stroke="#18333a"
          strokeWidth="3"
        />
        <path
          d="M38 55 56 45m-18 30 18-10m-18 27 18-10"
          stroke="#fff4df"
          strokeWidth="5"
        />
      </svg>
    ),
  },
] as const;

export function PropGame() {
  const [found, setFound] = useState<string[]>([]);
  const [skipped, setSkipped] = useState(false);
  const complete = found.length === 3;
  const reveal = (id: string) =>
    setFound((current) => (current.includes(id) ? current : [...current, id]));
  const next = () => {
    const item = props.find((item) => !found.includes(item.id));
    if (item) reveal(item.id);
  };
  const reset = () => {
    setFound([]);
    setSkipped(false);
  };
  return (
    <section id="game" className="game-section section-pad">
      <div className="game-copy">
        <span className="act-number">INTERMISSION / A LITTLE GAME</span>
        <h2>
          Find the party <em>props</em>
        </h2>
        <p>
          Three little surprises are hiding in plain sight. Give each one a tap
          to get the stage ready.
        </p>
        <div className="game-progress" role="status" aria-live="polite">
          <span>
            {found.length}
            <small>/3</small>
          </span>{" "}
          props found
        </div>
        <div className="game-actions">
          <button
            type="button"
            className="text-button"
            onClick={next}
            disabled={complete}
          >
            Reveal next prop ↗
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setSkipped(true);
              document
                .getElementById("cake")
                ?.scrollIntoView({ behavior: scrollBehavior() });
            }}
          >
            Skip game ↓
          </button>
          <button type="button" className="text-button" onClick={reset}>
            Replay ↺
          </button>
        </div>
      </div>
      <div
        className={`prop-stage ${complete ? "complete" : ""}`}
        aria-label="Find the party props game"
      >
        <div className="prop-stage-sign">
          THE PROP ROOM <span>✦</span>
        </div>
        <div className="stage-garland" aria-hidden="true">
          ✦ ───── ✳ ───── ✦
        </div>
        {props.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`game-prop prop-${item.id} ${found.includes(item.id) ? "found" : ""}`}
            onClick={() => reveal(item.id)}
            aria-label={`${found.includes(item.id) ? "Found" : "Find"} the ${item.label}`}
            aria-pressed={found.includes(item.id)}
          >
            {item.icon}
            <span>{found.includes(item.id) ? "Found!" : item.label}</span>
          </button>
        ))}
        <div className="prop-shelf" aria-hidden="true" />
        <div className="game-result" aria-live="polite">
          {complete ? (
            <>
              <span className="result-sparkle" aria-hidden="true">
                ✦ ✳ ✦
              </span>
              <strong>All set for the party!</strong>
              <span>On to the sweetest scene.</span>
              <a href="#cake" className="button button-cream">
                See the cake ↓
              </a>
            </>
          ) : skipped ? (
            <>
              <strong>Meet you at the cake!</strong>
              <a href="#cake" className="button button-cream">
                Continue ↓
              </a>
            </>
          ) : (
            <span className="prop-hint">Psst... look around the stage.</span>
          )}
        </div>
        <span className="prop-stage-number">
          0{indexSafe(found.length)} / 03
        </span>
      </div>
    </section>
  );
}

function indexSafe(value: number) {
  return Math.min(value, 3);
}
