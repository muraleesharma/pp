import { eventConfig, whatsAppUrl } from "../config/eventConfig";

export function CreatorCard() {
  const { creator } = eventConfig;
  return (
    <section className="creator-section" aria-label="Invitation creator">
      <div className="creator-content">
        <div className="creator-card">
          <span
            className="creator-ornament creator-ornament-one twinkle-star"
            aria-hidden="true"
          >
            ✳
          </span>
          <span
            className="creator-ornament creator-ornament-two twinkle-star"
            aria-hidden="true"
          >
            ✦
          </span>
          <p className="creator-overline">
            YOUR STORY DESERVES ITS OWN BEAUTIFUL BEGINNING
          </p>
          <h2>
            Planning a <em>celebration?</em>
          </h2>
          <p className="creator-body">
            Turn your special occasion into an elegant digital experience your
            guests will remember.
          </p>
          <a
            className="button button-cream creator-button"
            href={whatsAppUrl(creator.whatsAppNumber, creator.message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to create your invitation{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="creator-credit">
          <span>Crafted by Muralee G — Founder, Viquantra Labs</span>
          <a href={creator.brandUrl} target="_blank" rel="noopener noreferrer">
            viquantra.com ↗
          </a>
        </div>
      </div>
    </section>
  );
}
