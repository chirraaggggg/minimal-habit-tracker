import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // eslint-disable-next-line no-undef
      '/api': (typeof process !== 'undefined' && process.env?.VITE_API_URL) || 'http://localhost:3000',
    },
  },
})
