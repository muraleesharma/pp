import { useEffect, useState } from "react";
import {
  calendarUrl,
  dateParts,
  directionsUrl,
  eventConfig,
  eventDateLabel,
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
        <p className="ticket-intro-lead">
          Celebrate {eventConfig.twins[0]} &amp; {eventConfig.twins[1]} turning{" "}
          {eventConfig.milestoneWord}. Join us {eventDateLabel} from{" "}
          {eventTimeLabel} at {eventConfig.venueName},{" "}
          {eventConfig.venueShortLabel}.
        </p>
      </div>
      <div className="ticket-wrap">
        <div className="ticket-main">
          <div className="ticket-topline">
            <span>THE GRAND LITTLE THEATRE</span>
            <span>NO. 001 / {dateParts.year}</span>
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
            <div className="date-fact">
              <span className="fact-label">THE DATE</span>
              <strong>
                {dateParts.day} {dateParts.month}
              </strong>
              <span className="fact-detail">
                {dateParts.weekday}, {dateParts.year}
              </span>
            </div>
            <div className="time-fact">
              <span className="fact-label">THE TIME</span>
              <strong>{eventTimeLabel}</strong>
              <span className="fact-detail">onwards · IST</span>
            </div>
            <div className="venue-fact">
              <span className="fact-label">THE VENUE</span>
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
      <div className="venue-guide">
        <div className="venue-guide-art" aria-hidden="true">
          <svg viewBox="0 0 420 300" focusable="false">
            <path
              d="M-10 76 121 115 204 64 315 97 432 52M-16 220 98 172 184 226 311 178 432 222M72-12 106 64 85 178 132 312M260-10 226 85 286 196 254 312"
              fill="none"
              stroke="#fff4df"
              strokeWidth="18"
              opacity=".11"
            />
            <path
              d="M26 252C64 214 87 218 112 225s50-31 80-34 51 21 76-5 18-60 66-79"
              fill="none"
              stroke="#f1c962"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="3 12"
            />
            <circle
              cx="28"
              cy="250"
              r="12"
              fill="#fff4df"
              stroke="#f1c962"
              strokeWidth="5"
            />
            <path
              d="M335 41c-31 0-55 24-55 55 0 42 55 104 55 104s55-62 55-104c0-31-24-55-55-55Z"
              fill="#ea806a"
              stroke="#fff4df"
              strokeWidth="4"
            />
            <path
              d="m335 66 9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3Z"
              fill="#f1c962"
              stroke="#18333a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="m67 56 4 10 10 4-10 4-4 10-4-10-10-4 10-4Zm127 50 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"
              fill="#f1c962"
            />
          </svg>
        </div>
        <div className="venue-guide-copy">
          <span className="eyebrow">WHERE TO FIND THE PARTY</span>
          <h3>
            See you at <em>{eventConfig.venueName}</em>
          </h3>
          <p className="venue-locality">
            {eventConfig.venueShortLabel} · Tamil Nadu
          </p>
          <address>{eventConfig.venueAddress}</address>
          <div className="venue-guide-actions">
            <a
              className="button button-cream"
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions <span aria-hidden="true">↗</span>
            </a>
            <button
              className="button button-light-outline"
              type="button"
              onClick={share}
            >
              {shareLabel} <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>
      {(calendar || (rsvpNumber && /^\d{8,15}$/.test(rsvpNumber))) && (
        <div className="event-actions">
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
      )}
    </section>
  );
}
