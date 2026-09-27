import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  eventConfig,
  eventDateLabel,
  eventTimeLabel,
} from "./src/config/eventConfig";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");

export default defineConfig(({ command, mode }) => {
  // Vercel supplies its public production domain on both production and preview builds.
  // Generated VERCEL_URL and VERCEL_BRANCH_URL addresses may require a login.
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (!productionHost && command === "build" && mode !== "local-preview") {
    throw new Error(
      "Enable 'Automatically expose System Environment Variables' in Vercel so the public invitation URL is available at build time.",
    );
  }
  const siteUrl = productionHost
    ? `https://${productionHost}`
    : "http://localhost:4173";
  const parsedSiteUrl = new URL(siteUrl);
  if (
    parsedSiteUrl.protocol !== (productionHost ? "https:" : "http:") ||
    parsedSiteUrl.pathname !== "/" ||
    parsedSiteUrl.search ||
    parsedSiteUrl.hash
  ) {
    throw new Error(
      "VERCEL_PROJECT_PRODUCTION_URL must be a domain name without a scheme, path, query, or fragment.",
    );
  }
  const names = `${eventConfig.twins[0]} & ${eventConfig.twins[1]}`;
  const title = `${names} turn ${eventConfig.milestoneWord}!`;
  const description = `Join us ${eventDateLabel} at ${eventTimeLabel} for ${names}'s ${eventConfig.occasion} at ${eventConfig.venueName}, ${eventConfig.venueShortLabel}.`;
  const tokens: Record<string, string> = {
    __PUBLIC_SITE_URL__: siteUrl,
    __PAGE_TITLE__: `${title} — Birthday invitation`,
    __PAGE_DESCRIPTION__: description,
    __OG_TITLE__: title,
    __OG_SITE_NAME__: `${names}'s birthday invitation`,
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
