import { useState } from "react";
import { eventConfig } from "../config/eventConfig";
import { scrollBehavior } from "../utils/scroll";

function StarCharacter({
  variant,
  sparkling,
}: {
  variant: 0 | 1;
  sparkling: boolean;
}) {
  const isPravya = variant === 0;
  const starPath =
    "M110 16 136 72 198 79 151 120 165 184 110 150 55 184 69 120 22 79 84 72Z";

  return (
    <svg
      className={`star-motif ${sparkling ? "sparkling" : ""}`}
      viewBox="0 0 220 220"
      aria-hidden="true"
    >
      <path
        d={starPath}
        fill="#18333a"
        opacity=".16"
        transform="translate(0 8)"
      />
      <path
        d={starPath}
        fill={isPravya ? "#f1c962" : "#ee9785"}
        stroke="#18333a"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M110 24 122 78 110 91 99 79Z"
        fill={isPravya ? "#ffe6a5" : "#ffd5bb"}
        opacity=".9"
      />
      <path d="M31 82 83 79 101 101 67 111Z" fill="#fff4df" opacity=".32" />
      <path
        d="M153 121 158 173 117 147Z"
        fill={isPravya ? "#dca947" : "#cf6c70"}
        opacity=".5"
      />
      {isPravya ? (
        <>
          <circle cx="90" cy="110" r="3.5" fill="#18333a" />
          <circle cx="130" cy="110" r="3.5" fill="#18333a" />
          <path
            d="M96 128q14 14 28 0"
            fill="none"
            stroke="#18333a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="77" cy="124" r="6" fill="#ea806a" opacity=".65" />
          <circle cx="143" cy="124" r="6" fill="#ea806a" opacity=".65" />
        </>
      ) : (
        <>
          <path
            d="M82 111q9-8 18 0"
            fill="none"
            stroke="#18333a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="131" cy="109" r="3.5" fill="#18333a" />
          <path
            d="M96 128q15 12 29-2"
            fill="none"
            stroke="#18333a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="76" cy="124" r="6" fill="#f1c962" opacity=".7" />
          <circle cx="144" cy="123" r="6" fill="#f1c962" opacity=".7" />
        </>
      )}
      <path
        d={
          isPravya
            ? "m171 39 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"
            : "m43 29 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"
        }
        fill={isPravya ? "#ea806a" : "#f1c962"}
      />
    </svg>
  );
}

export function Stars() {
  const [active, setActive] = useState(0);
  const [together, setTogether] = useState(false);
  const [photoFailed, setPhotoFailed] = useState([false, false]);
  const [sparkle, setSparkle] = useState<{
    index: number;
    count: number;
  } | null>(null);
  const selectStar = (index: number) => {
    setActive(index);
    setSparkle((current) => ({ index, count: (current?.count ?? 0) + 1 }));
  };
  return (
    <section id="stars" className="stars-section section-pad">
      <div className="section-heading light-heading">
        <span className="act-number">ACT I / THE CAST</span>
        <p className="eyebrow">Two little people, one very big love</p>
        <h2>
          Meet the <em>stars</em>
        </h2>
        <p className="stars-instruction">
          Tap a star to see her sparkle <span aria-hidden="true">✦</span>
        </p>
      </div>
      <div className="star-tabs" role="group" aria-label="Choose a star">
        {eventConfig.twins.map((name, index) => (
          <button
            key={name}
            type="button"
            aria-pressed={active === index}
            onClick={() => selectStar(index)}
          >
            {name} <span aria-hidden="true">✦</span>
          </button>
        ))}
      </div>
      <div className="spotlight-stage">
        {eventConfig.twins.map((name, index) => (
          <button
            key={name}
            type="button"
            className={`spotlight spotlight-${index} ${active === index ? "active" : ""}`}
            onClick={() => selectStar(index)}
            aria-pressed={active === index}
            aria-label={`Make ${name}'s star sparkle`}
          >
            <span className="spotlight-beam" aria-hidden="true" />
            <span className="portrait-disc">
              {eventConfig.portraits[index] && !photoFailed[index] ? (
                <img
                  src={eventConfig.portraits[index]!}
                  alt={`${name}, one of the birthday twins`}
                  loading="lazy"
                  onError={() =>
                    setPhotoFailed((current) =>
                      current.map((failed, i) => (i === index ? true : failed)),
                    )
                  }
                />
              ) : (
                <StarCharacter
                  key={`star-${index}-${sparkle?.index === index ? sparkle.count : "rest"}`}
                  variant={index as 0 | 1}
                  sparkling={sparkle?.index === index}
                />
              )}
              {sparkle?.index === index && (
                <span
                  className="disc-sparkles"
                  key={`burst-${index}-${sparkle.count}`}
                  aria-hidden="true"
                >
                  {Array.from({ length: 7 }, (_, sparkleIndex) => (
                    <i key={sparkleIndex}>✦</i>
                  ))}
                </span>
              )}
            </span>
            <span className="spotlight-number">0{index + 1} / THE STAR</span>
            <span className="spotlight-name">{name}</span>
            <span className="spotlight-caption">
              {index === 0 ? "A bright little spark" : "A twinkle all her own"}
            </span>
          </button>
        ))}
        <div className="footlights" aria-hidden="true">
          {Array.from({ length: 13 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
      <div className="stars-action">
        <p>Two little lights. One brilliant first year.</p>
        <button
          type="button"
          className="button button-coral"
          onClick={() => {
            setTogether(true);
            document
              .getElementById("together")
              ?.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
          }}
        >
          {together ? "See them together again" : "Bring the stars together"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div
        id="together"
        className={`together-scene ${together ? "together-revealed" : ""}`}
        aria-live="polite"
      >
        <div className="together-orbit" aria-hidden="true">
          <span>✦</span>
          <span>✳</span>
          <span>✦</span>
        </div>
        <p className="eyebrow">And together, they are turning</p>
        <strong>
          {eventConfig.milestoneWord}
          <span>!</span>
        </strong>
        <p>Pravya & Pranavi</p>
      </div>
    </section>
  );
}
