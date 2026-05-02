import { test, expect, type Page } from "@playwright/test";
import {
  waitForHydration,
  waitForServiceWorker,
  seedOfflineConsent,
} from "../helpers";

test.beforeEach(async ({ page }) => {
  await seedOfflineConsent(page);
});

async function isCached(page: Page, url: string): Promise<boolean> {
  return page.evaluate(async (u) => {
    const names = await caches.keys();
    for (const name of names) {
      const cache = await caches.open(name);
      if (await cache.match(u, { ignoreSearch: true })) return true;
    }
    return false;
  }, url);
}

test.describe("precache", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);
  });

  test("all app pages are precached", async ({ page }) => {
    const pages = [
      "/",
      "length",
      "weight",
      "temperature",
      "area",
      "volume",
      "speed",
      "data",
      "screen-ppi",
      "settings",
      "tos",
      "not-found",
    ];

    for (const url of pages) {
      expect(await isCached(page, url), `${url} should be precached`).toBe(
        true,
      );
    }
  });

  test("static assets are precached", async ({ page }) => {
    const assets = [
      "favicon.svg",
      "icons/icon-192.png",
      "icons/icon-512.png",
      "manifest.webmanifest",
    ];

    for (const asset of assets) {
      expect(await isCached(page, asset), `${asset} should be precached`).toBe(
        true,
      );
    }
  });
});
