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

type PropId = (typeof props)[number]["id"];

export function PropGame() {
  const [found, setFound] = useState<PropId[]>([]);
  const [hinted, setHinted] = useState<PropId | null>(null);
  const [skipped, setSkipped] = useState(false);
  const complete = found.length === props.length;
  const reveal = (id: PropId) => {
    setFound((current) => (current.includes(id) ? current : [...current, id]));
    setHinted(null);
    setSkipped(false);
  };
  const showHint = () => {
    const item = props.find((item) => !found.includes(item.id));
    if (item) setHinted(item.id);
  };
  const reset = () => {
    setFound([]);
    setHinted(null);
    setSkipped(false);
  };
  const latest = props.find((item) => item.id === found.at(-1));
  const hintedProp = props.find((item) => item.id === hinted);
  const status = complete
    ? "All three props caught. The stage is ready!"
    : hintedProp
      ? `Look for the glowing ${hintedProp.label}.`
      : latest
        ? `${latest.label} caught! ${props.length - found.length} to go.`
        : "Catch all three props to set the stage.";

  return (
    <section id="game" className="game-section section-pad">
      <div className="game-copy">
        <span className="act-number">INTERMISSION / A LITTLE GAME</span>
        <h2>
          Find the party <em>props</em>
        </h2>
        <p>
          The party hat, balloon, and candle are floating around the stage. Tap
          or click each one to catch it before the cake scene.
        </p>
        <div className="game-progress" role="status" aria-live="polite">
          <strong>
            {found.length}
            <small>/{props.length}</small>
          </strong>
          <span>
            props caught
            <small>{status}</small>
          </span>
        </div>
        <ol className="prop-inventory" aria-label="Party props">
          {props.map((item) => {
            const isFound = found.includes(item.id);
            return (
              <li key={item.id} className={isFound ? "collected" : ""}>
                <span>{item.label}</span>
                <span className="inventory-mark" aria-hidden="true">
                  {isFound ? "✓" : "✦"}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="game-actions">
          <button
            type="button"
            className="text-button"
            onClick={showHint}
            disabled={complete}
          >
            Need a hint? ↗
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setSkipped(true);
              setHinted(null);
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
        role="group"
        aria-label="Find the party props game"
      >
        <div className="prop-stage-sign">
          THE PROP ROOM <span aria-hidden="true">✦</span>
        </div>
        <span className="prop-stage-number" aria-hidden="true">
          0{found.length} / 03
        </span>
        <div className="prop-playfield">
          <div className="stage-garland" aria-hidden="true">
            ✦ ───── ✳ ───── ✦
          </div>
          <span className="prop-stage-spark spark-one" aria-hidden="true">
            ✦
          </span>
          <span className="prop-stage-spark spark-two" aria-hidden="true">
            ✧
          </span>
          {props.map((item) => {
            const isFound = found.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                className={`game-prop prop-${item.id} ${isFound ? "found" : ""} ${hinted === item.id ? "hinted" : ""}`}
                onClick={() => reveal(item.id)}
                aria-label={
                  isFound ? `${item.label} caught` : `Catch the ${item.label}`
                }
                disabled={isFound}
              >
                <span className="prop-art">{item.icon}</span>
                <span className="prop-tag">
                  {isFound ? "Caught!" : item.label}
                </span>
              </button>
            );
          })}
          <div className="prop-shelf" aria-hidden="true" />
        </div>
        <div className="game-result">
          {complete ? (
            <>
              <span className="result-sparkle" aria-hidden="true">
                ✦ ✳ ✦
              </span>
              <strong>All set for the party!</strong>
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
            <span className="prop-hint">
              {found.length === 0
                ? "Psst... catch the moving props!"
                : `${props.length - found.length} more to go ✦`}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
