import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: '.env.local', override: true })
const backendEnv = { ...process.env } as { [key: string]: string }

const config: PlaywrightTestConfig = {
  globalSetup: './global-setup',
  testDir: './',
  testMatch: '**/*.spec.ts',
  /* Run tests in files in parallel */
  // fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    actionTimeout: 20000,
    trace: 'on-first-retry',
    storageState: './LoginAuth.json',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],

  webServer: {
    command: 'npm run preview',
    port: 4173,
    env: backendEnv,
  },
}

export default config
