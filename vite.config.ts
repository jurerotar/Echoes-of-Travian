import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
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
      packages: path.resolve(__dirname, 'packages'),
      app: path.resolve(__dirname, 'src/app'),
      interfaces: path.resolve(__dirname, 'src/interfaces'),
      assets: path.resolve(__dirname, 'src/assets'),
      mocks: path.resolve(__dirname, '__mocks__'),
      'test-utils': path.resolve(__dirname, 'src/test-utils'),
    },
  },
  worker: {
    format: 'es',
  },
  test: {
    watch: false,
    globals: true,
    environment: 'happy-dom',
    setupFiles: './vitest-setup.ts',
  },
}) satisfies UserConfig;
