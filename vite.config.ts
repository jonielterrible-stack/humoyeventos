import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  // Check if building in Vercel environment
  const isVercel = Boolean(
    process.env.VERCEL ||
    process.env.VERCEL_ENV ||
    process.env.NOW_BUILDER
  );

  // In dev server, always serve at root '/'.
  // In production builds:
  // - On Vercel: root '/'
  // - On GitHub Pages: '/humoyeventos/' (or process.env.BASE_PATH if overridden)
  const base =
    command === 'serve' || isVercel
      ? '/'
      : (process.env.BASE_PATH || '/humoyeventos/');

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
