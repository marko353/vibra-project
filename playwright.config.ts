import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,  // Pokreni browser sa prikazom
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
  },
});