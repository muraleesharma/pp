# Pravya & Pranavi’s first birthday invitation

A static, illustrated paper theatre invitation built with React, Vite, and TypeScript. It includes the curtain opening, twin spotlights, event ticket and location guide, a moving prop game, candle finale, sharing, and a separate creator credit. No guest data is stored.

The DM Sans and Fraunces fonts are self-hosted through Fontsource; their SIL Open Font License texts are in [`licenses/`](licenses/).

## Local development

```bash
npm ci
npm run dev
```

Open the local URL shown by Vite. Check the production build with `npm run build` and serve it with `npm run preview`.

## Edit invitation content

- All event details, venue and map settings, optional approved portraits, optional client RSVP number, calendar end time, and creator contact are in [`src/config/eventConfig.ts`](src/config/eventConfig.ts). Times use `Asia/Kolkata` and 24-hour `HH:mm` values in config.
- `calendarEndTime` is currently `null`, because the family supplied no end time. Set a valid same-day end time later to show **Add to calendar**. Do not guess one.
- `rsvpWhatsAppNumber` is currently `null`, so no RSVP action appears. If provided, enter the **family’s** international phone number as digits. The creator WhatsApp button is only for new invitation enquiries.
- `approvedMapUrl` may replace the full-address Google Maps search once an exact pin is approved. Until then, the supplied address is used as the search query.
- `portraits` may contain paths to approved photos placed in `public/`. Leave both `null` to use the two original star illustrations. Label each portrait by the matching tuple position.
- The 1200×630 preview image is [`public/share-card.png`](public/share-card.png). Its editable design is [`design/share-card.svg`](design/share-card.svg). After editing event facts, run `npm run share-card` to regenerate the PNG from the config. This command needs a local Google Chrome installation. Review the resulting image before committing it.

## Deploy with Git and Vercel

1. Commit this repository and push it to your Git host.
2. In Vercel, import the Git repository. Choose the **Vite** framework preset and **dist** output directory. The build command is `npm run build`.
3. The build defaults to the public invitation URL, `https://ram-five-xi.vercel.app`. If the public domain changes, set `PUBLIC_SITE_URL` to its new **HTTPS** root URL, without a trailing slash, and redeploy.
4. Open the deployed page and `/share-card.png` directly. Both must load publicly. The image must return PNG content.
5. Use **Share invitation** and paste into a draft WhatsApp chat. Check that the preview displays the theatre card, twins’ names, and event summary **before sending**. The button uses a distinct `?invitation=pravya-pranavi` URL so WhatsApp can fetch the corrected preview after the earlier plain URL was cached. If the preview does not appear, inspect the deployed HTML for `og:*` tags and the public image URL. WhatsApp preview caching and the recipient’s link-preview setting are outside the site’s control.

The social title, description, canonical URL, image URL, and Twitter fallbacks are inserted into Vite’s static `index.html` at build time, so link crawlers read them without executing React. The share button uses the Web Share API when available and otherwise copies the event summary with the invitation URL.
