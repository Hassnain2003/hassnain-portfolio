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
      page.getByText("AI & Backend Engineer building LLM agents")
    ).toBeVisible();
    // Contact buttons scoped to hero section
    await expect(
      page.locator("#hero").getByRole("link", { name: "GitHub" })
    ).toHaveAttribute("href", "https://github.com/Hassnain2003");
    await expect(
      page.locator("#hero").getByRole("link", { name: "LinkedIn" })
    ).toHaveAttribute("href", "https://linkedin.com/in/hassnainzaidi");
    await expect(
      page.locator("#hero").getByRole("link", { name: "Email" })
    ).toHaveAttribute("href", "mailto:abbashussnain818@gmail.com");
  } finally {
    await page.close();
    await browser.close();
  }
});
