import { chromium, test, expect } from "@playwright/test";

const BASE = "http://127.0.0.1:3000";
const SKIP_BOOT = "?__skip_boot=true";

test("replay listing page shows no traces available", async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE}/projects/kube-triage/replay${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("Break-It Replay");
    await expect(page.getByText("No traces available")).toBeVisible();
  } finally {
    await page.close();
    await browser.close();
  }
});

test("replay page returns 404 for missing trace", async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE}/projects/kube-triage/replay/sample-001/0${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("404");
    await expect(page.getByText(/SYSTEM NOT FOUND/)).toBeVisible();
  } finally {
    await page.close();
    await browser.close();
  }
});
