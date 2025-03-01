import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CalendarKitReact',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@calendar/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@calendar/core': 'CalendarKitCore',
        },
      },
    },
    sourcemap: true,
    outDir: 'dist',
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['node_modules', 'dist'],
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
  resolve: {
    alias: {
      '@calendar/core': resolve(__dirname, '../core/src'),
      '@calendar/react': resolve(__dirname, './src'),
    },
  },
}); 