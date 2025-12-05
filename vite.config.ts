import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.ASPNETCORE_HTTPS_PORT 
          ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}`
          : process.env.ASPNETCORE_URLS 
          ? process.env.ASPNETCORE_URLS.split(';')[0]
          : 'https://localhost:7198',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
