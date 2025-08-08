import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    format: ['umd'],
    platform: 'browser',
    unbundle: false,
    outDir: 'dist-tsdown/dist',
    // minify: true,
    outputOptions(outputOptions) {
      return {
        ...outputOptions,
        // not working
        name: 'ahooks',
        globals: {
          'react': 'React',
          'lodash/debounce': '_.debounce',
          'lodash/throttle': '_.throttle',
          'dayjs': 'dayjs',
          'react-fast-compare': 'reactFastCompare',
          'screenfull': 'screenfull',
          'js-cookie': 'js-cookie',
          'intersection-observer': 'IntersectionObserver',
          'lodash/isPlainObject': '_.isPlainObject',
          'resize-observer-polyfill': 'ResizeObserver'
        },
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
