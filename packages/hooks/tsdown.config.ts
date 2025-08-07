import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    format: ['umd'],
    platform: 'browser',
    unbundle: false,
    outDir: 'dist-tsdown/dist',
    minify: true,
    outputOptions(outputOptions) {
      return {
        ...outputOptions,
        name: 'ahooks',
      };
    },
  },
  {
    format: ['es'],
    platform: 'browser',
    outDir: 'dist-tsdown/es',
    unbundle: true,
    exports: false,
    outExtensions: () => {
      return {
        js: '.js',
      };
    },
  },
  {
    format: ['cjs'],
    platform: 'browser',
    outDir: 'dist-tsdown/lib',
    unbundle: true,
    exports: false,
    dts: false,
    outExtensions: () => {
      return {
        js: '.js',
      };
    },
  },
]);
