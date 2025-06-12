import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000, // Ensure frontend runs on port 9000
    strictPort: true, // Fail if port 9000 is already in use
  },
  preview: {
    port: 9000, // Ensure preview also runs on port 9000
    strictPort: true,
  }
})
