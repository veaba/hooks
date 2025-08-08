import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    /**
     * @TODO it is correct?
     * @see npm https://www.npmjs.com/package/ahooks?activeTab=code
     *
     */
    {
      format: 'umd',
      umdName: 'ahooks',
      bundle: true,
      dts: false,
      output: {
        filename: {
          js: 'ahooks.js',
        },
        externals: ['react', 'dayjs', 'intersection-observer', 'lodash'],
        distPath: {
          root: './dist-rslib/dist',
        },
        // minify: {
        //   // js: true
        // }
      },
    },
    {
      format: 'esm',
      outBase: './src',
      dts: true,
      bundle: false,
      autoExtension: false,
      output: {
        distPath: {
          root: './dist-rslib/es',
        },
      },
      source: {
        entry: {
          index: [
            './src/**/*.ts',
            '!src/**/__test{,s}__/*.ts',
            '!src/**/tests/*.ts',
            '!src/**/*.tsx',
          ],
        },
      },
    },
    {
      format: 'cjs',
      outBase: './src',
      dts: true,
      bundle: false,
      autoExtension: false,
      output: {
        distPath: {
          root: './dist-rslib/lib',
        },
      },
      source: {
        entry: {
          index: [
            './src/**/*.ts',
            '!src/**/__test{,s}__/*.ts',
            '!src/**/tests/*.ts',
            '!src/**/*.tsx',
          ],
        },
      },
    },
  ],
  output: {
    target: 'web',
  },
});
