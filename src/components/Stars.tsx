import { useState } from "react";
import { eventConfig } from "../config/eventConfig";
import { scrollBehavior } from "../utils/scroll";

function Motif({ variant }: { variant: "sun" | "moon" }) {
  return variant === "sun" ? (
    <svg className="star-motif" viewBox="0 0 210 210" aria-hidden="true">
      <circle
        cx="105"
        cy="105"
        r="57"
        fill="#f1c962"
        stroke="#18333a"
        strokeWidth="2"
      />
      <circle cx="105" cy="105" r="42" fill="#ffe3a5" />
      <path
        d="M105 4v28M105 178v28M4 105h28M178 105h28M33 33l20 20m104 104 20 20M177 33l-20 20M53 157l-20 20"
        stroke="#ea806a"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="83" cy="102" r="3" fill="#18333a" />
      <circle cx="126" cy="102" r="3" fill="#18333a" />
      <path
        d="M91 122q14 12 28 0"
        fill="none"
        stroke="#18333a"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg className="star-motif" viewBox="0 0 210 210" aria-hidden="true">
      <path
        d="M139 30c-28 6-48 31-48 61 0 34 28 62 62 62 10 0 19-2 27-6-13 21-37 35-65 35-42 0-76-34-76-76s34-76 76-76c8 0 16 0 24 0Z"
        fill="#f1c962"
        stroke="#18333a"
        strokeWidth="2"
      />
      <path
        d="m159 23 4 11 11 4-11 4-4 11-4-11-11-4 11-4Zm20 76 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"
        fill="#ea806a"
      />
      <circle cx="94" cy="108" r="3" fill="#18333a" />
      <circle cx="132" cy="108" r="3" fill="#18333a" />
      <path
        d="M100 127q14 12 27 0"
        fill="none"
        stroke="#18333a"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Stars() {
  const [active, setActive] = useState(0);
  const [together, setTogether] = useState(false);
  const [photoFailed, setPhotoFailed] = useState([false, false]);
  return (
    <section id="stars" className="stars-section section-pad">
      <div className="section-heading light-heading">
        <span className="act-number">ACT I / THE CAST</span>
        <p className="eyebrow">Two little people, one very big love</p>
        <h2>
          Meet the <em>stars</em>
        </h2>
      </div>
      <div className="star-tabs" role="group" aria-label="Choose a star">
        {eventConfig.twins.map((name, index) => (
          <button
            key={name}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
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
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            aria-label={`Spotlight on ${name}`}
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
                <Motif variant={index === 0 ? "sun" : "moon"} />
              )}
            </span>
            <span className="spotlight-number">0{index + 1} / THE STAR</span>
            <span className="spotlight-name">{name}</span>
            <span className="spotlight-caption">
              {index === 0
                ? "A pocketful of sunshine"
                : "A little moonbeam of joy"}
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
        <p>Different little lights. A shared first trip around the sun.</p>
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
