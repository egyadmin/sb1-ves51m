import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          i18n: ['i18next', 'react-i18next'],
          utils: ['date-fns', 'qrcode.react', 'jspdf', 'jspdf-autotable'],
          ui: ['lucide-react', 'react-viewer', 'react-dropzone']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['lucide-react']
  },
  server: {
    port: 5173,
    host: true
  }
});