import { test as base } from "@playwright/test";
import path from "path";

type Fixture = {
  workerStorageState: string;
};

export const test = base.extend<{}, Fixture>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  workerStorageState: [
    async ({ browser }, use, testInfo) => {
      const id = testInfo.parallelIndex;
      const fileName = path.join(
        testInfo.project.outputDir,
        `.auth/${id}.json`
      );

      const page = await browser.newPage({ storageState: undefined });

      await page.goto("https://console-preview.neo4j.io");
      // await page.waitForURL(/[?&]state=[^&]+/);

      // do some login here //

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
