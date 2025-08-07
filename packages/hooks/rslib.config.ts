import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      // dts: {
      //   // distPath: './dist-rslib/es',
      //   build: true,
      // },
      dts:true,
      bundle: false,
      autoExtension: false,
      output: {
        distPath: {
          root: './dist-rslib/es',
        },
      },

    },
    // {
    //   format: 'cjs',
    //   bundle: false,
    //   autoExtension: false,
    //   output: {
    //     distPath: {
    //       root: './dist-rslib/lib',
    //     },
    //   },
    // },
  ],
  source: {
    entry: {
      index: [
        './src/**/*.ts',
        '!src/**/*.(test|spec).ts',
        '!src/**/*.tsx',
      ],
    },
    // exclude: ['src/**/(demo|doc)/*.(ts|tsx)','src/**/__test__/*.ts'],
  },
  output: {
    target: 'web',
  },
});
