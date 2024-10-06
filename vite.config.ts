import path from 'node:path';
import react from '@vitejs/plugin-react';
import { type UserConfig, defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteTsconfigPaths(),
    svgrPlugin({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: { exportType: 'default', svgo: false, expandProps: 'end' },
    }),
    VitePWA({ registerType: 'autoUpdate' }),
  ],
  server: {
    open: true,
  },
  optimizeDeps: {
    include: [
      // Game data
      // 'assets/buildings',
      // 'assets/units',
      // Third-party deps
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'esm-seedrandom',
      'react-tabs',
      'react-hook-form',
      'react-modal',
      'usehooks-ts',
      'moderndash',
      'clsx',
      'react-icons/gi',
      'react-icons/lu',
      'react-icons/lia',
      'react-icons/gr',
      'react-icons/ti',
      'react-icons/tb',
      'react-icons/si',
      'react-icons/cg',
      'i18next',
      'react-i18next',
      'react-window',
      'react-tooltip',
      '@tanstack/react-query',
      'dayjs',
      'dayjs/plugin/relativeTime',
      'dayjs/plugin/duration',
    ],
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'app'),
      graphics: path.resolve(__dirname, 'graphics'),
    },
  },
  worker: {
    format: 'es',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiled',
        additionalData: '@use "./app/styles/_globals.scss" as *;',
      },
    },
  },
  test: {
    root: './',
    watch: false,
    globals: true,
    environment: 'happy-dom',
    setupFiles: './vitest-setup.ts',
    reporters: ['default'],
  },
}) satisfies UserConfig;
