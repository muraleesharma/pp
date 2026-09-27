import { useEffect, useState } from "react";
import {
  calendarUrl,
  dateParts,
  directionsUrl,
  eventConfig,
  eventTimeLabel,
  whatsAppUrl,
} from "../config/eventConfig";

function dateState(now: Date) {
  const localDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: eventConfig.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  if (localDate > eventConfig.date)
    return "The celebration was lovely. Thank you for being part of our story.";
  if (localDate === eventConfig.date)
    return "Today is the day — see you at the theatre!";
  const difference =
    new Date(
      `${eventConfig.date}T${eventConfig.startTime}:00+05:30`,
    ).getTime() - now.getTime();
  const days = Math.max(0, Math.floor(difference / 86_400_000));
  return days > 0
    ? `${days} ${days === 1 ? "day" : "days"} until the curtain rises`
    : "The curtain rises today!";
}

export function Ticket() {
  const [status, setStatus] = useState(() => dateState(new Date()));
  const [shareLabel, setShareLabel] = useState("Share invitation");
  useEffect(() => {
    const interval = window.setInterval(
      () => setStatus(dateState(new Date())),
      60_000,
    );
    return () => window.clearInterval(interval);
  }, []);
  const calendar = calendarUrl();
  const rsvpNumber = eventConfig.rsvpWhatsAppNumber?.replace(/\D/g, "");
  const share = async () => {
    const url = `${window.location.origin}/`;
    try {
      if (navigator.share)
        await navigator.share({
          title: `${eventConfig.twins[0]} & ${eventConfig.twins[1]} turn ${eventConfig.milestoneWord}!`,
          text: `Join us for their ${eventConfig.occasion} celebration!`,
          url,
        });
      else {
        await navigator.clipboard.writeText(url);
        setShareLabel("Link copied!");
        window.setTimeout(() => setShareLabel("Share invitation"), 3000);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(url);
        setShareLabel("Link copied!");
        window.setTimeout(() => setShareLabel("Share invitation"), 3000);
      } catch {
        setShareLabel("Copy link from address bar");
      }
    }
  };

  return (
    <section id="details" className="ticket-section section-pad">
      <div className="ticket-intro">
        <span className="act-number">YOUR INVITATION / ADMIT EVERYONE</span>
        <h2>
          Take your <em>seat</em>
        </h2>
        <p>We would love to celebrate this little milestone with you.</p>
      </div>
      <div className="ticket-wrap">
        <div className="ticket-main">
          <div className="ticket-topline">
            <span>THE GRAND LITTLE THEATRE</span>
            <span>NO. 001 / 2026</span>
          </div>
          <div className="ticket-title">
            <span className="eyebrow">
              With joy, we invite you to celebrate
            </span>
            <h3>
              {eventConfig.twins[0]} <span>&</span>
              <br />
              {eventConfig.twins[1]}
            </h3>
            <p>
              turning <strong>{eventConfig.milestoneWord}</strong> together!
            </p>
          </div>
          <div className="ticket-facts">
            <div>
              <span className="fact-label">THE DATE</span>
              <strong>
                {dateParts.weekday}
                <br />
                {dateParts.day} {dateParts.month} {dateParts.year}
              </strong>
            </div>
            <div>
              <span className="fact-label">THE TIME</span>
              <strong>
                {eventTimeLabel}
                <br />
                onwards
              </strong>
            </div>
            <div className="venue-fact">
              <span className="fact-label">THE PLACE</span>
              <strong>{eventConfig.venueName}</strong>
              <address>{eventConfig.venueAddress}</address>
            </div>
          </div>
          <div className="ticket-signoff">
            <span>Come for the cake. Stay for the memories.</span>
            <strong>With love, {eventConfig.hostNames}</strong>
          </div>
        </div>
        <div className="ticket-stub">
          <span className="stub-small">ADMIT ALL WHO LOVE THEM</span>
          <span className="stub-big">{dateParts.day.padStart(2, "0")}</span>
          <span className="stub-label">
            {dateParts.month.slice(0, 3).toUpperCase()} / {dateParts.year}
          </span>
          <span className="stub-stars" aria-hidden="true">
            ✦ ✦ ✦
          </span>
        </div>
      </div>
      <p className="event-status" role="status">
        ✦ {status}
      </p>
      <div className="event-actions">
        <a
          className="button button-dark"
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions <span aria-hidden="true">↗</span>
        </a>
        {calendar && (
          <a
            className="button button-outline"
            href={calendar}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add to calendar <span aria-hidden="true">↗</span>
          </a>
        )}
        <button className="button button-outline" type="button" onClick={share}>
          {shareLabel} <span aria-hidden="true">↗</span>
        </button>
        {rsvpNumber && /^\d{8,15}$/.test(rsvpNumber) && (
          <a
            className="button button-outline"
            href={whatsAppUrl(
              rsvpNumber,
              `Hello ${eventConfig.hostNames}, I'd like to RSVP for ${eventConfig.twins[0]} and ${eventConfig.twins[1]}'s ${eventConfig.occasion}. We will attend with __ guest(s).`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            RSVP on WhatsApp <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </section>
  );
}
