import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  // This helps the IDE realize this is a browser project
  server: {
    port: 5173,
    strictPort: true,
  }
})
