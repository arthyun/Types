import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@/api', replacement: resolve(__dirname, 'src/api') },
      { find: '@/assets', replacement: resolve(__dirname, 'src/assets') },
      { find: '@/common', replacement: resolve(__dirname, 'src/common') },
      { find: '@/contexts', replacement: resolve(__dirname, 'src/contexts') },
      { find: '@/hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@/pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@/utils', replacement: resolve(__dirname, 'src/utils') },
    ],
    // {
    //   '@': path.resolve(__dirname, './src'),
    // },
  },
});
