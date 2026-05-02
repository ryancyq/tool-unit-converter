import { test, expect, type Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import {
  waitForHydration,
  waitForServiceWorker,
  seedOfflineConsent,
} from "../helpers";

// .svelte-kit/output is the build output for `npm run preview` (vite preview serves from here),
// whereas `npm run build` writes to the `build/` directory used for production deployment.
const SW_BUILD_PATH = path.join(
  process.cwd(),
  ".svelte-kit",
  "output",
  "client",
  "sw.js",
);

// File-system writes must not race; run these tests serially in one worker.
test.describe.configure({ mode: "serial" });

test.describe("reload prompt", () => {
  let originalSwContent: string;

  // Writes a byte-different sw.js so the browser detects a new version.
  // registration.update() always fetches with cache:"no-store", so it reads
  // the file fresh; the preview server has no in-memory cache.
  const triggerSwUpdate = async (page: Page) => {
    fs.writeFileSync(SW_BUILD_PATH, originalSwContent + "\n");
    await page.evaluate(() =>
      navigator.serviceWorker.getRegistration().then((reg) => reg?.update()),
    );
  };

  test.beforeEach(async ({ page }) => {
    originalSwContent = fs.readFileSync(SW_BUILD_PATH, "utf-8");
    await seedOfflineConsent(page);
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
    await triggerSwUpdate(page);
    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("alert")).toContainText(
      "A new version is available",
    );
  });

  test("update button activates the new service worker and reloads", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);

    // workbox bug: SW update event not working as expected after first install of SW
    // https://github.com/vite-pwa/vite-plugin-pwa/issues/789
    await page.reload();
    await waitForHydration(page);
    await waitForServiceWorker(page);

    await triggerSwUpdate(page);
    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });

    // Delay the SKIP_WAITING postMessage so the SW doesn't activate (and
    // trigger window.location.reload) until after the button state assertions.
    await page.evaluate(() => {
      const orig = ServiceWorker.prototype.postMessage as (
        this: ServiceWorker,
        data: unknown,
        ...args: unknown[]
      ) => void;
      ServiceWorker.prototype.postMessage = function (data, ...args) {
        const delay =
          data && typeof data === "object" && data.type === "SKIP_WAITING"
            ? 500
            : 0;
        setTimeout(() => orig.call(this, data, ...args), delay);
      };
    });

    const updateButton = page.getByRole("button", { name: "Update" });
    await updateButton.click({ noWaitAfter: true });
    await expect(updateButton).toBeDisabled();
    await expect(updateButton.locator(".animate-spin")).toBeVisible();

    await page.waitForNavigation();

    await waitForServiceWorker(page);
    const isControlled = await page.evaluate(
      () => !!navigator.serviceWorker.controller,
    );
    expect(isControlled).toBe(true);
    await expect(page.getByRole("alert")).not.toBeAttached();
  });

  test("dismiss button hides the update notification", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);
    await waitForServiceWorker(page);
    await triggerSwUpdate(page);
    await expect(page.getByRole("alert")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "Dismiss" }).click();
    await expect(page.getByRole("alert")).not.toBeAttached();
  });
});
