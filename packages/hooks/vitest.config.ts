import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://cn.vitest.dev/guide/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'vitest.setup.ts',
    browser: {
      provider: 'playwright', // or 'webdriverio'
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
    testTimeout: 30_000,
    include: ['src/**/{tests,__tests__}/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
    },
  },
});
