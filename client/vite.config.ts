import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': 'http://localhost:8080'
    } : {}
  },
  plugins: [react()],
  build: {
    outDir: '../server/public',
  },
})
