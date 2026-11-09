import { chromium, test, expect } from "@playwright/test";

test.describe("Home page smoke", () => {
  test("renders static HTML with all sections", async ({ browserName }) => {
    const browser = await chromium.connectOverCDP("http://localhost:9222");
    const page = await browser.newPage();
    try {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await new Promise((r) => setTimeout(r, 500));

      // Name, role, availability
      await expect(page.locator("h1")).toContainText("Hassnain Abbas");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(
        page.getByText("AI & Backend Engineer building LLM agents")
      ).toBeVisible();
      await expect(
        page.getByText("Available full-time from 4 January 2027")
      ).toBeVisible();

      // Contact buttons in header
      await expect(
        page.locator("header").getByRole("link", { name: "Resume" })
      ).toBeVisible();
      await expect(
        page.locator("header").getByRole("link", { name: "GitHub" })
      ).toBeVisible();
      await expect(
        page.locator("header").getByRole("link", { name: "LinkedIn" })
      ).toBeVisible();
      await expect(
        page.locator("header").getByRole("link", { name: "Email" })
      ).toBeVisible();

      // Telemetry line
      await expect(page.getByText(/This site: Lighthouse/)).toBeVisible();

      // System map
      await expect(page.getByText("System map")).toBeVisible();

      // Project cards
      await expect(page.getByText("AgentDine")).toBeVisible();
      await expect(page.getByText("kube-triage")).toBeVisible();
      await expect(page.getByText("OpenAI LLM Gateway")).toBeVisible();

      // Experience, Skills, About, Contact sections
      await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();

      // Theme toggle
      await expect(
        page.locator("header").getByLabel("Toggle theme")
      ).toBeVisible();

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
    const browser = await chromium.connectOverCDP("http://localhost:9222");
    const page = await browser.newPage();
    try {
      await page.goto("/projects/kube-triage");
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
    const browser = await chromium.connectOverCDP("http://localhost:9222");
    const page = await browser.newPage();
    try {
      await page.goto("/projects/this-site");
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

test.describe("Replay smoke", () => {
  test("replay page with permalink round-trip", async () => {
    const browser = await chromium.connectOverCDP("http://localhost:9222");
    const page = await browser.newPage();
    try {
      // Go to replay page
      await page.goto("/projects/kube-triage/replay/sample-001/0");
      await page.waitForLoadState("networkidle");
      await new Promise((r) => setTimeout(r, 500));

      await expect(page.locator("h1")).toContainText("Break-It Replay");
      await expect(page.getByText("Illustrative sample")).toBeVisible();
      await expect(page.getByText("sample-001")).toBeVisible();
      await expect(page.getByText(/Frame \d+ of \d+/)).toBeVisible();

      // Copy permalink and verify it matches current URL
      const permalink = await page
        .getByRole("link", { name: "Open permalink" })
        .getAttribute("href");
      expect(permalink).toContain("/projects/kube-triage/replay/sample-001/0");

      // Navigate to next frame
      await expect(page.getByText(/Frame 1 of/)).toBeVisible();
      await page.getByRole("button", { name: "Next frame" }).click();
      await expect(page.getByText(/Frame 2 of/)).toBeVisible();
    } finally {
      await page.close();
      await browser.close();
    }
  });

  test("replay listing page", async () => {
    const browser = await chromium.connectOverCDP("http://localhost:9222");
    const page = await browser.newPage();
    try {
      await page.goto("/projects/kube-triage/replay");
      await page.waitForLoadState("networkidle");

      await expect(page.locator("h1")).toContainText("Break-It Replay");
      await expect(page.getByText("Available traces")).toBeVisible();
      await expect(
        page.getByText("CrashLoopBackOff on payment-worker pod")
      ).toBeVisible();
    } finally {
      await page.close();
      await browser.close();
    }
  });
});

test.describe("Command palette smoke", () => {
  test("opens and closes with keyboard", async () => {
    const browser = await chromium.connectOverCDP("http://localhost:9222");
    const page = await browser.newPage();
    try {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Open palette with Cmd+K (or Ctrl+K)
      const modifier = process.platform === "darwin" ? "Meta" : "Control";
      await page.keyboard.down(modifier);
      await page.keyboard.press("k");
      await page.keyboard.up(modifier);

      // Palette should be open (dialog role)
      await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible();

      // Navigate with arrow keys
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");

      // Palette should close after selection
      await expect(
        page.getByRole("dialog", { name: "Command palette" })
      ).not.toBeVisible();

      // Close with Escape
      await page.keyboard.down(modifier);
      await page.keyboard.press("k");
      await page.keyboard.up(modifier);
      await expect(
        page.getByRole("dialog", { name: "Command palette" })
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("dialog", { name: "Command palette" })
      ).not.toBeVisible();
    } finally {
      await page.close();
      await browser.close();
    }
  });
});

test.describe("Keyboard navigation smoke", () => {
  test("keyboard-only navigation works", async () => {
    const browser = await chromium.connectOverCDP("http://localhost:9222");
    const page = await browser.newPage();
    try {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Tab through focusable elements: skip link, nav brand, email, theme toggle
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      // Theme toggle should be reachable
      await expect(
        page.locator("header").getByLabel("Toggle theme")
      ).toBeFocused();
    } finally {
      await page.close();
      await browser.close();
    }
  });
});

test.describe("404 page smoke", () => {
  test("shows Lost copy with palette hint", async () => {
    const browser = await chromium.connectOverCDP("http://localhost:9222");
    const page = await browser.newPage();
    try {
      await page.goto("/nonexistent-page");
      await page.waitForLoadState("networkidle");

      await expect(page.locator("h1")).toContainText("Lost.");
      await expect(page.getByText(/Try ⌘K/)).toBeVisible();
      await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
    } finally {
      await page.close();
      await browser.close();
    }
  });
});
