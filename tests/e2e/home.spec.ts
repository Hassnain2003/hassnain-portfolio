import { chromium, test, expect } from "@playwright/test";

const BASE = "http://127.0.0.1:3000";
const SKIP_BOOT = "?__skip_boot=true";

test("home renders static HTML with name, role, and contact buttons", async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE}/${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("Hassnain Abbas");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.locator("#hero").getByText("I build LLM agents and the infrastructure they run on.")
    ).toBeVisible();
    // Contact buttons scoped to hero section
    await expect(
      page.locator("#hero").getByRole("link", { name: "View Work" })
    ).toBeVisible();
    await expect(
      page.locator("#hero").getByRole("link", { name: "Resume" })
    ).toBeVisible();
  } finally {
    await page.close();
    await browser.close();
  }
});
