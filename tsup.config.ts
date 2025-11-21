import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points - compile all source files to preserve granular exports
  entry: [
    'src/index.ts',
    'src/heapify.ts',
    'src/heapPop.ts',
    'src/heapPush.ts',
    'src/heapPushPop.ts',
    'src/heapReplace.ts',
    'src/types.ts',
  ],
  
  // Output format - ESM only (no CommonJS)
  format: ['esm'],

  // Output directory
  outDir: 'lib',

  // Generate TypeScript declaration files
  dts: true,

  // Enable source maps for better debugging
  sourcemap: true,

  // Clean output directory before build
  clean: true,

  // Minify for smaller bundle size
  minify: true,

  // Split into separate files (not bundled) to preserve tree-shaking
  splitting: false,

  // Target modern environments (ESNext)
  target: 'esnext',

  // Don't bundle dependencies (this is a library)
  external: [],

  // TypeScript configuration
  tsconfig: './tsconfig.json',

  // Tree-shaking optimizations
  treeshake: true,

  // Skip node_modules (library should not bundle dependencies)
  skipNodeModulesBundle: true,
});
