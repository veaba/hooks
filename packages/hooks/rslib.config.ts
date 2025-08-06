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
        sourceMap: true,
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
      index: ['./src/**/*.ts', '!src/**/*.(test|spec).ts', '!src/**/demo/*.tsx'],
    },
  },
  output: {
    target: 'web',
  },
});
