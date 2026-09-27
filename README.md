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

- Event details, venue and map settings, optional approved portraits, optional client RSVP number, calendar end time, and creator contact are in [`src/config/eventConfig.ts`](src/config/eventConfig.ts). Times use `Asia/Kolkata` and 24-hour `HH:mm` values in config.
- `calendarEndTime` is currently `null`, because the family supplied no end time. Set a valid same-day end time later to show **Add to calendar**. Do not guess one.
- `rsvpWhatsAppNumber` is currently `null`, so no RSVP action appears. If provided, enter the **family’s** international phone number as digits. The creator WhatsApp button is only for new invitation enquiries.
- `approvedMapUrl` may replace the full-address Google Maps search once an exact pin is approved. Until then, the supplied address is used as the search query.
- `portraits` may contain paths to approved photos placed in `public/`. Leave both `null` to use the two original star illustrations. Label each portrait by the matching tuple position.
- The 1200×630 preview image is [`public/share-card.png`](public/share-card.png). Its editable design is [`design/share-card.svg`](design/share-card.svg). After editing event facts, run `npm run share-card` to regenerate the PNG from the config. This command needs a local Google Chrome installation. Review the resulting image before committing it.

## Fresh Vercel deployment, with no domain yet

1. Import `muraleesharma/ram` as a **new Vercel project**. Set the production branch to `main`, the framework to **Vite**, the build command to `npm run build`, and the output directory to `dist`.
2. In **Settings → Environment Variables**, enable **Automatically expose System Environment Variables**. The build reads `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel supplies even before you add a custom domain and even in preview builds. Do not set `PUBLIC_SITE_URL`.
3. In **Settings → Deployment Protection**, choose **Standard Protection** or **None**. **All Deployments** makes the production invitation inaccessible to guests and WhatsApp.
4. Deploy the latest `main` commit to **Production**. The public address is the project's `.vercel.app` domain in **Settings → Domains**. Copy that address; do not share a generated `*-git-main-*` or commit-specific deployment URL.
5. In a private browser window, open the public address and its `/share-card.png` image. View the public page source and confirm `og:url` and `og:image` use that same public domain. The image must load without signing in.
6. Use **Share invitation** and paste into a draft WhatsApp chat. The button uses the public domain with a distinct `?invitation=pravya-pranavi` URL, so WhatsApp can fetch fresh metadata. Confirm the theatre card, twins’ names, date, time, and venue appear before sending.

The social title, description, canonical URL, image URL, and Twitter fallbacks are inserted into Vite’s static `index.html` at build time, so link crawlers read them without executing React. The share button reads the canonical public address instead of the current page address, which may be a protected preview. In a local build, the metadata points to `http://localhost:4173`; Vercel replaces it with the project's public production domain.
