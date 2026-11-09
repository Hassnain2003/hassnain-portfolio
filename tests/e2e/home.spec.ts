import { chromium, test, expect } from "@playwright/test";

test("home renders static HTML with name, role, availability, and contact buttons", async () => {
  const browser = await chromium.connectOverCDP("http://localhost:9222");
  const page = await browser.newPage();
  try {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Hassnain Abbas");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("AI & Backend Engineer building LLM agents")).toBeVisible();
    await expect(page.getByText("Available full-time from 4 January 2027")).toBeVisible();
    await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/Hassnain2003",
    );
    await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/hassnainzaidi",
    );
    await expect(page.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:abbashussnain818@gmail.com",
    );
  } finally {
    await page.close();
    await browser.close();
  }
});
