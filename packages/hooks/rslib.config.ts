import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      bundle: false,
      autoExtension: false,
      output: {
        distPath: {
          root: './dist-rslib/es',
        },
      },
    },
    {
      format: 'cjs',
      bundle: false,
      autoExtension: false,
      output: {
        distPath: {
          root: './dist-rslib/lib',
        },
      },
    },
  ],
  source: {
    entry: {
      index: ['./src/**/*.ts'],
    },
  },
  output: {
    target: 'web',
  },
});

