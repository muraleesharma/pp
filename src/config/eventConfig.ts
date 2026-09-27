export type EventConfig = {
  twins: readonly [string, string];
  occasion: string;
  milestoneWord: string;
  date: string; // YYYY-MM-DD in Asia/Kolkata
  startTime: string; // HH:mm in Asia/Kolkata
  calendarEndTime: string | null; // HH:mm on the same day, only when approved
  timeZone: "Asia/Kolkata";
  venueName: string;
  venueAddress: string;
  venueShortLabel: string; // locality used in compact preview copy
  approvedMapUrl: string | null;
  hostNames: string;
  portraits: readonly [string | null, string | null];
  rsvpWhatsAppNumber: string | null; // international digits only, client number
  creator: {
    whatsAppNumber: string;
    message: string;
    brandUrl: string;
  };
};

export const eventConfig: EventConfig = {
  twins: ["Pravya", "Pranavi"],
  occasion: "first birthday",
  milestoneWord: "ONE",
  date: "2026-10-01",
  startTime: "18:00",
  calendarEndTime: null,
  timeZone: "Asia/Kolkata",
  venueName: "FPA Party Hall",
  venueAddress:
    "254, Bharatmata St, Vinayakarpuram, East Tambaram, Tambaram, Tamil Nadu 600059",
  venueShortLabel: "East Tambaram",
  approvedMapUrl: null,
  hostNames: "Sadhana & Ramprabu",
  portraits: [null, null],
  rsvpWhatsAppNumber: null,
  creator: {
    whatsAppNumber: "919940800470",
    message:
      "Hello Muralee, I saw Pravya and Pranavi’s birthday invitation. I’d like an interactive invitation for my celebration.",
    brandUrl: "https://viquantra.com",
  },
};

export const fullVenue = `${eventConfig.venueName}, ${eventConfig.venueAddress}`;
export const directionsUrl = eventConfig.approvedMapUrl?.startsWith("https://")
  ? eventConfig.approvedMapUrl
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullVenue)}`;
const eventDate = new Date(`${eventConfig.date}T12:00:00Z`);
export const dateParts = {
  weekday: new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  }).format(eventDate),
  day: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    timeZone: "UTC",
  }).format(eventDate),
  month: new Intl.DateTimeFormat("en-GB", {
    month: "long",
    timeZone: "UTC",
  }).format(eventDate),
  year: new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    timeZone: "UTC",
  }).format(eventDate),
};
export const eventDateLabel = `${dateParts.weekday}, ${dateParts.day} ${dateParts.month} ${dateParts.year}`;
const [hour, minute] = eventConfig.startTime.split(":").map(Number);
export const eventTimeLabel = `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;

export function whatsAppUrl(number: string, message: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function calendarUrl() {
  const { date, startTime, calendarEndTime, timeZone } = eventConfig;
  if (
    !calendarEndTime ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(calendarEndTime) ||
    calendarEndTime <= startTime
  )
    return null;
  const compactDate = date.replaceAll("-", "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${eventConfig.twins[0]} & ${eventConfig.twins[1]}’s ${eventConfig.occasion}`,
    dates: `${compactDate}T${startTime.replace(":", "")}00/${compactDate}T${calendarEndTime.replace(":", "")}00`,
    ctz: timeZone,
    details: `Celebrate with ${eventConfig.hostNames}!`,
    location: fullVenue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
