import { chromium, test, expect } from "@playwright/test";

const BASE = "http://127.0.0.1:3000";
const SKIP_BOOT = "?__skip_boot=true";

test.describe("Home page smoke", () => {
  test("renders static HTML with all sections", async ({ browserName }) => {
    const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    try {
      await page.goto(`${BASE}/${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");
      await new Promise((r) => setTimeout(r, 500));

      // Name, role
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

      // Telemetry line removed in new design

      // Project Galaxy section
      await expect(page.getByText("Project Galaxy")).toBeVisible();

      // Project cards scoped to projects section
      await expect(
        page.locator("#projects").getByText("AgentDine").first()
      ).toBeVisible();
      await expect(
        page.locator("#projects").getByText("kube-triage").first()
      ).toBeVisible();
      await expect(
        page.locator("#projects").getByText("OpenAI LLM Gateway").first()
      ).toBeVisible();

      // Experience, Skills, About, Contact sections
      await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Technical Stack" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();

      // Dock nav
      await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
      await expect(page.getByLabel("Open menu")).toBeVisible();

      // Chat widget toggle
      await expect(page.getByLabel("Open chat assistant")).toBeVisible();
    } finally {
      await page.close();
      await browser.close();
    }
  });
});

test.describe("Case study page smoke", () => {
  test("renders kube-triage case study", async () => {
    const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    try {
      await page.goto(`${BASE}/projects/kube-triage${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");

      await expect(page.locator("h1")).toContainText("kube-triage");
      await expect(page.getByText("Architecture")).toBeVisible();
      await expect(page.getByText("Key design decisions")).toBeVisible();
      await expect(page.getByText("What went wrong")).toBeVisible();
      await expect(page.getByRole("heading", { name: "Result" })).toBeVisible();
      await expect(page.getByText("Links")).toBeVisible();
    } finally {
      await page.close();
      await browser.close();
    }
  });

  test("renders this-site meta case study", async () => {
    const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    try {
      await page.goto(`${BASE}/projects/this-site${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");

      await expect(page.locator("h1")).toContainText("this-site");
      await expect(page.getByText("Architecture")).toBeVisible();
      await expect(page.getByRole("heading", { name: "Result" })).toBeVisible();
    } finally {
      await page.close();
      await browser.close();
    }
  });
});

test.describe("Command palette smoke", () => {
  test("chat widget toggle present on page", async () => {
    const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    try {
      await page.goto(`${BASE}/${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");

      // Chat widget toggle should be present
      await expect(page.getByLabel("Open chat assistant")).toBeVisible();
    } finally {
      await page.close();
      await browser.close();
    }
  });
});

test.describe("Keyboard navigation smoke", () => {
  test("keyboard-only navigation works", async () => {
    const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    try {
      await page.goto(`${BASE}/${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");

      // Tab through focusable elements: skip link, then nav items
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      // Focus should be on a nav item (skip link = Tab 1, home nav item = Tab 2)
      const focused = page.locator(":focus");
      await expect(focused).toHaveAttribute("href", "/");
    } finally {
      await page.close();
      await browser.close();
    }
  });
});

test.describe("404 page smoke", () => {
  test("shows system not found with palette hint", async () => {
    const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    try {
      await page.goto(`${BASE}/nonexistent-page${SKIP_BOOT}`, { timeout: 15000, waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");

      await expect(page.locator("h1")).toContainText("404");
      await expect(page.getByText(/SYSTEM NOT FOUND/)).toBeVisible();
      await expect(page.getByText(/⌘K/)).toBeVisible();
      await expect(page.getByRole("link", { name: "> reboot to home" })).toBeVisible();
    } finally {
      await page.close();
      await browser.close();
    }
  });
});
