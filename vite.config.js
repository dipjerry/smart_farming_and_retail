import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import ssr from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    loader: 'jsx',
    include: [
      // Business as usual for .jsx and .tsx files
      'src/**/*.jsx',
      'src/**/*.tsx',
      'src/**/**/**/*.jsx',
      'node_modules/**/*.jsx',
      'node_modules/**/*.tsx',
    ],
    exclude: [],
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
