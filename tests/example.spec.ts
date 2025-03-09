import { test } from "../fixtures";

test("redirect not in worker scoped fixture", async ({ page }) => {
  await page.goto("https://console-preview.neo4j.io");
  await page.waitForURL(/[?&]state=[^&]+/);
});
