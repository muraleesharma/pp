import { useEffect, useState } from "react";
import { Opening } from "./components/Opening";
import { Stars } from "./components/Stars";
import { PropGame } from "./components/PropGame";
import { Cake } from "./components/Cake";
import { Ticket } from "./components/Ticket";
import { CreatorCard } from "./components/CreatorCard";
import { eventConfig } from "./config/eventConfig";
import { scrollBehavior } from "./utils/scroll";

function introSeenThisSession() {
  try {
    return sessionStorage.getItem("theatre-intro-seen") === "yes";
  } catch {
    return false;
  }
}

export default function App() {
  const [introOpen, setIntroOpen] = useState(introSeenThisSession);
  const [introSkipped, setIntroSkipped] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (introOpen) {
      try {
        sessionStorage.setItem("theatre-intro-seen", "yes");
      } catch {
        // The invitation still works if a browser blocks session storage.
      }
    }
  }, [introOpen]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const openIntro = () => setIntroOpen(true);
  const skipIntro = () => {
    setIntroSkipped(true);
    setIntroOpen(true);
  };
  const replayIntro = () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
    setIntroOpen(false);
    setIntroSkipped(false);
    setReplayKey((key) => key + 1);
  };

  return (
    <>
      <a className="skip-to-content" href="#details">
        Skip to party details
      </a>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <a className="monogram" href="#top" aria-label="Back to the beginning">
          P<span>&</span>P
        </a>
        <span className="header-caption">
          A little theatre for a very big day
        </span>
        <a className="header-details" href="#details" onClick={skipIntro}>
          Party details <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main>
        <Opening
          key={replayKey}
          open={introOpen}
          skipped={introSkipped}
          onOpen={openIntro}
          onSkip={skipIntro}
        />
        <Stars />
        <Ticket />
        <PropGame />
        <Cake />
        <section className="family-signoff" aria-label="A note from the family">
          <span>With love, {eventConfig.hostNames}</span>
          <button type="button" className="text-button" onClick={replayIntro}>
            Replay the opening ↑
          </button>
        </section>
        <CreatorCard />
      </main>
    </>
  );
}
