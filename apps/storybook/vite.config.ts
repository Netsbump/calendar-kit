import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@calendar/core': resolve(__dirname, '../../packages/core/dist'),
      '@calendar/react': resolve(__dirname, '../../packages/react/dist'),
    },
  },
}); 