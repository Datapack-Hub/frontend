import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
    command: 'pnpm build && pnpm preview',
    url: "127.0.0.1:4173",
    reuseExistingServer: process.env.CI
  },

  testDir: 'tests'
};

export default config;
