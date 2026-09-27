import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import {
  dateParts,
  eventConfig,
  eventDateLabel,
  eventTimeLabel,
} from "./src/config/eventConfig";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");

export default defineConfig(({ mode }) => {
  // This build-time setting keeps crawlers and WhatsApp independent of React.
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (
    env.PUBLIC_SITE_URL || "https://YOUR-PRODUCTION-DOMAIN.vercel.app"
  ).replace(/\/$/, "");
  const parsedSiteUrl = new URL(siteUrl);
  if (
    parsedSiteUrl.protocol !== "https:" ||
    parsedSiteUrl.pathname !== "/" ||
    parsedSiteUrl.search ||
    parsedSiteUrl.hash
  ) {
    throw new Error(
      "PUBLIC_SITE_URL must be an HTTPS site root URL without a path, query, or fragment.",
    );
  }
  const names = `${eventConfig.twins[0]} & ${eventConfig.twins[1]}`;
  const title = `${names} turn ${eventConfig.milestoneWord}!`;
  const shortDate = `${dateParts.weekday}, ${dateParts.day} ${dateParts.month}`;
  const description = `Join us ${shortDate} at ${eventTimeLabel} · ${eventConfig.venueName}, ${eventConfig.venueShortLabel}.`;
  const tokens: Record<string, string> = {
    __PUBLIC_SITE_URL__: siteUrl,
    __PAGE_TITLE__: `${title} — Birthday invitation`,
    __PAGE_DESCRIPTION__: `Join us ${eventDateLabel} at ${eventTimeLabel} for ${names}'s ${eventConfig.occasion} at ${eventConfig.venueName}, ${eventConfig.venueShortLabel}.`,
    __OG_TITLE__: title,
    __OG_DESCRIPTION__: description,
    __OG_IMAGE_ALT__: `A theatre invitation card for ${names}'s ${eventConfig.occasion}, ${eventDateLabel} at ${eventConfig.venueName}.`,
  };
  return {
    plugins: [
      react(),
      {
        name: "static-social-metadata",
        transformIndexHtml(html: string) {
          return Object.entries(tokens).reduce(
            (result, [token, value]) =>
              result.replaceAll(token, escapeHtml(value)),
            html,
          );
        },
      },
    ],
  };
});
