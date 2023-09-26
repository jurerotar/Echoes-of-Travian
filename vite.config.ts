import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    open: true
  },
  optimizeDeps: {
    include: ['react', 'esm-seedrandom', 'uuid', 'dexie', 'formik', 'sha1-uint8array']
  }
}) satisfies UserConfig;