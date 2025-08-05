import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    format: ['es'],
    platform: 'browser',
    outDir: 'dist/es',
    unbundle: true,
    dts: {
      sourcemap: true,
    },
    fixedExtension: false,
  },
  {
    format: ['cjs'],
    platform: 'neutral',
    outDir: 'dist/lib',
    unbundle: true,
    exports: false,
  },
]);
