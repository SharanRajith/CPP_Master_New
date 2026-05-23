import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/jdoodle': {
        target: 'https://api.jdoodle.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jdoodle/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@monaco-editor'))           return 'vendor-monaco';
          if (id.includes('framer-motion'))            return 'vendor-motion';
          if (id.includes('react-markdown') || id.includes('rehype') || id.includes('remark')) return 'vendor-markdown';
          if (id.includes('firebase'))                 return 'vendor-firebase';
          if (id.includes('react-dom') || id.includes('react-router') || (id.includes('node_modules/react/') )) return 'vendor-react';
        },
      },
    },
  },
})
