import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@repo/ui': path.resolve(
        __dirname,
        '../../packages/ui/src/index.ts'
      ),
      '@repo/design-tokens': path.resolve(
        __dirname,
        '../../packages/design-tokens/src/index.ts'
      ),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});