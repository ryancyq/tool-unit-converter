import { test, expect, type Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { waitForHydration, waitForServiceWorker } from "../helpers";

// .svelte-kit/output is the build output for `npm run preview` (vite preview serves from here),
// whereas `npm run build` writes to the `build/` directory used for production deployment.
const SW_BUILD_PATH = path.join(process.cwd(), ".svelte-kit", 'output','client', "sw.js");

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
  }

  test.beforeEach(async ({ page }) => {
    originalSwContent = fs.readFileSync(SW_BUILD_PATH, "utf-8");
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
