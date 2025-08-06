import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    format: ['es'],
    platform: 'browser',
    outDir: 'dist-tsdown/es',
    unbundle: true,
    dts: {
      sourcemap: true,
    },
    outExtensions: () => {
      return {
        js: '.js',
      };
    }
  },
  {
    format: ['cjs'],
    platform: 'browser',
    outDir: 'dist-tsdown/lib',
    unbundle: true,
    exports: false,
    outExtensions: () => {
      return {
        js: '.js',
      };
    }
  },
]);
