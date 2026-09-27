import { readFile } from "node:fs/promises";
import { chromium } from "playwright";
import ts from "typescript";

const configSource = await readFile(
  new URL("../src/config/eventConfig.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(configSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
});
const { eventConfig, dateParts, eventTimeLabel } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const replacements = {
  __CARD_NAMES__: `${eventConfig.twins[0]} & ${eventConfig.twins[1]}`,
  __CARD_MILESTONE__: eventConfig.milestoneWord,
  __CARD_DATE__:
    `${dateParts.weekday}, ${dateParts.day} ${dateParts.month} ${dateParts.year}`.toUpperCase(),
  __CARD_TIME_VENUE__: `${eventTimeLabel}  ·  ${eventConfig.venueName}, ${eventConfig.venueShortLabel}`,
};
let svg = await readFile(
  new URL("../design/share-card.svg", import.meta.url),
  "utf8",
);
for (const [token, value] of Object.entries(replacements))
  svg = svg.replaceAll(token, escapeXml(value));
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<style>html,body{margin:0;width:1200px;height:630px;overflow:hidden}</style>${svg}`,
  );
  await page.locator("svg").screenshot({
    path: new URL("../public/share-card.png", import.meta.url).pathname,
  });
  console.log("Wrote public/share-card.png (1200×630)");
} finally {
  await browser.close();
}
