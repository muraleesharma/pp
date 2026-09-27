import { eventConfig, whatsAppUrl } from "../config/eventConfig";

export function CreatorCard() {
  const { creator } = eventConfig;
  return (
    <section
      className="creator-section section-pad"
      aria-label="Invitation creator"
    >
      <div className="creator-side-note">
        <span>THE FINAL ACT</span>
        <strong>Your story could be next.</strong>
        <i aria-hidden="true">✦</i>
      </div>
      <div className="creator-content">
        <div className="creator-card">
          <span
            className="creator-ornament creator-ornament-one"
            aria-hidden="true"
          >
            ✳
          </span>
          <span
            className="creator-ornament creator-ornament-two"
            aria-hidden="true"
          >
            ✦
          </span>
          <p className="creator-overline">
            YOUR STORY DESERVES ITS OWN BEAUTIFUL BEGINNING
          </p>
          <h2>
            Planning a<br />
            <em>celebration?</em>
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
