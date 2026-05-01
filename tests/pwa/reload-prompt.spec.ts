import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { waitForHydration, waitForServiceWorker } from "../helpers";

// File-system writes must not race; run these tests serially in one worker.
test.describe.configure({ mode: "serial" });

const SW_BUILD_PATH = path.join(process.cwd(), "build", "sw.js");

// Key used by ReloadPrompt.svelte to decide whether to call reg.update() on load.
// Pre-setting it prevents the automatic check from racing with our explicit one.
const SW_TS_KEY = "unit-converter-pwa-sw-last-updated";

test.describe("reload prompt", () => {
  let originalSwContent: string;

  test.beforeEach(async ({ page }) => {
    originalSwContent = fs.readFileSync(SW_BUILD_PATH, "utf-8");

    // Suppress the automatic checkForUpdate call that fires on first load
    // so that reg.update() only runs when we explicitly trigger it.
    await page.addInitScript(
      ({ key }) => {
        localStorage.setItem(key, String(Date.now()));
      },
      { key: SW_TS_KEY },
    );
  });

  test.afterEach(() => {
    fs.writeFileSync(SW_BUILD_PATH, originalSwContent);
  });

  test("shows update notification when a new version is available", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    // Write a byte-different sw.js to disk so the browser detects a new version.
    // registration.update() always fetches with cache:"no-store", so it reads
    // the file fresh; the preview server has no in-memory cache.
    fs.writeFileSync(SW_BUILD_PATH, originalSwContent + "\n");
    await page.evaluate(() =>
      navigator.serviceWorker.getRegistration().then((reg) => reg?.update()),
    );

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("alert")).toContainText(
      "A new version is available",
    );
  });

  test("dismiss button hides the update notification", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    fs.writeFileSync(SW_BUILD_PATH, originalSwContent + "\n");
    await page.evaluate(() =>
      navigator.serviceWorker.getRegistration().then((reg) => reg?.update()),
    );

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "Dismiss" }).click();
    await expect(page.getByRole("alert")).not.toBeAttached();
  });
});
