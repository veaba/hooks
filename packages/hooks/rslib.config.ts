import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      bundle: false,
      autoExtension: false,
      output: {
        distPath: {
          root: './dist/es',
        },
      },
    },
    {
      format: 'cjs',
      bundle: false,
      autoExtension: false,
      output: {
        distPath: {
          root: './dist/lib',
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
    // copy: [{ from: './dist', globOptions: { ignore: ['**/__tests/**'] } }],
    // filename: {
    //   js: "[name].js"
    // },
    target: 'web',
  },
});

// dist\lib\useInfiniteScroll\__tests__\index.test.js
