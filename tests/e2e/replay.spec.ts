import { chromium, test, expect } from "@playwright/test";

const BASE = "http://127.0.0.1:3000";
const SKIP_BOOT = "?__skip_boot=true";

test("kube-triage replay renders trace, frames, and final report", async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE}/projects/kube-triage/replay/sample-001/0${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    // Page title
    await expect(page.locator("h1")).toContainText("Break-It Replay");

    // Sample label visible
    await expect(page.getByText("Illustrative sample")).toBeVisible();

    // Trace info
    await expect(page.getByText("sample-001")).toBeVisible();

    // Frame counter
    await expect(page.getByText(/Frame \d+ of \d+/)).toBeVisible();

    // Agent steps
    await expect(page.getByText(/kubectl get pods/)).toBeVisible();

    // Final report
    await expect(page.getByText("Final report")).toBeVisible();
    await expect(page.getByText("resource-exhaustion")).toBeVisible();

    // Permalink
    await expect(page.getByRole("link", { name: "Open permalink" })).toHaveAttribute(
      "href",
      /\/projects\/kube-triage\/replay\/sample-001\/0/
    );

    // Copy link button
    await expect(page.getByTitle("Copy link to this frame")).toBeVisible();

    // Navigate to next frame
    await expect(page.getByText(/Frame 1 of/)).toBeVisible();
    await page.getByRole("button", { name: "Next frame" }).click();
    await expect(page.getByText(/Frame 2 of/)).toBeVisible();
  } finally {
    await page.close();
    await browser.close();
  }
});

test("replay listing page shows available traces", async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE}/projects/kube-triage/replay${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("Break-It Replay");
    await expect(page.getByText("Available traces")).toBeVisible();
    await expect(page.getByText("CrashLoopBackOff on payment-worker pod")).toBeVisible();
    await expect(page.getByText("Illustrative sample")).toBeVisible();
  } finally {
    await page.close();
    await browser.close();
  }
});
