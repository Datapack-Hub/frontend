import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: "http://127.0.0.1:4173"
  },
	webServer: {
    command: 'pnpm build && pnpm preview',
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI
  },

  testDir: 'tests'
};

export default config;
