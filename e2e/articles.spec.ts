import { test, expect } from "@playwright/test";

test.describe("Spaceflight News App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays article cards with correct information", async ({ page }) => {
    const articleCards = page.locator('[data-testid="article-card"]');

    // Wait for articles to load using locator
    await articleCards.first().waitFor({ state: "visible" });

    // Check if multiple articles are displayed
    const articles = await articleCards.all();
    expect(articles.length).toBeGreaterThan(0);

    // Check first article card structure
    const firstArticle = articles[0];
    await expect(firstArticle.locator("img")).toBeVisible();
    await expect(firstArticle.locator("h3")).toBeVisible();
    await expect(
      firstArticle.locator('[data-testid="article-summary"]'),
    ).toBeVisible();
    await expect(
      firstArticle.locator('[data-testid="article-metadata"]'),
    ).toBeVisible();
  });

  test("search functionality works", async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    const articleCards = page.locator('[data-testid="article-card"]');
    const articleTitles = page.locator('[data-testid="article-title"]');

    // Get initial articles for comparison
    await articleCards.first().waitFor({ state: "visible" });
    const initialTitles = await articleTitles.allInnerTexts();

    // Type in search box
    await searchInput.fill("SpaceX");
    await page.keyboard.press("Enter");

    // Wait for UI to update with new results
    await expect(async () => {
      const currentTitles = await articleTitles.allInnerTexts();
      expect(currentTitles).not.toEqual(initialTitles);
    }).toPass();

    // Verify search results contain the search term
    const titles = await articleTitles.allInnerTexts();
    expect(titles.length).toBeGreaterThan(0);
    expect(
      titles.some((title) => title.toLowerCase().includes("spacex")),
    ).toBeTruthy();
  });

  test.describe("Spaceflight News App - Desktop", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test("sorting functionality works", async ({ page }) => {
      const sortSelect = page.locator('[data-testid="sort-select"]');
      const articleTitles = page.locator('[data-testid="article-title"]');

      await articleTitles.first().waitFor({ state: "visible" });
      const initialTitles = await articleTitles.allInnerTexts();

      // Test date sorting
      await sortSelect.click();
      await page.locator('[data-testid="sort-newest"]').click();

      await expect(async () => {
        const currentTitles = await articleTitles.allInnerTexts();
        expect(currentTitles.length).toBeGreaterThan(0);
      }).toPass();

      // Test title sorting
      await sortSelect.click();
      await page.locator('[data-testid="sort-title-az"]').click();

      await expect(async () => {
        const currentTitles = await articleTitles.allInnerTexts();
        expect(currentTitles).not.toEqual(initialTitles);
      }).toPass();
    });
  });

  test.describe("Spaceflight News App - Mobile", () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE dimensions

    test("sorting functionality works", async ({ page }) => {
      const sortSelect = page.locator("button", {
        has: page.locator('svg[data-testid="hamburger-icon"]'),
      });
      const articleTitles = page.locator('[data-testid="article-title"]');

      await articleTitles.first().waitFor({ state: "visible" });
      const initialTitles = await articleTitles.allInnerTexts();

      // Test date sorting
      await sortSelect.click();
      await page.getByRole("menuitem", { name: "Newest First" }).click();

      await expect(async () => {
        const currentTitles = await articleTitles.allInnerTexts();
        expect(currentTitles.length).toBeGreaterThan(0);
      }).toPass();

      // Test title sorting
      await sortSelect.click();
      await page.getByRole("menuitem", { name: "A–Z" }).click();

      await expect(async () => {
        const currentTitles = await articleTitles.allInnerTexts();
        expect(currentTitles).not.toEqual(initialTitles);
      }).toPass();
    });
  });

  test("article links open in new tab", async ({ page, context }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      page.click('[data-testid="article-card"] a'),
    ]);

    expect(newPage.url()).toBeTruthy();
  });

  test("infinite scroll loads more articles", async ({ page }) => {
    // Get initial article count
    const articleLocator = page.locator('[data-testid="article-card"]');
    await articleLocator.first().waitFor({ state: "visible" });
    const initialArticles = await articleLocator.count();

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for new articles to be loaded by waiting for the count to increase
    await page.waitForFunction((initialCount) => {
      const currentCount = document.querySelectorAll(
        '[data-testid="article-card"]',
      ).length;
      return currentCount > initialCount;
    }, initialArticles);

    // Get new article count
    const newArticles = await articleLocator.count();
    expect(newArticles).toBeGreaterThan(initialArticles);
  });
});
