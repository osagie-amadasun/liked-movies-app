import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Pages: Set VITE_BASE_PATH environment variable to your repo name
// Example: VITE_BASE_PATH=/your-repo-name/ npm run build
// If not set, defaults to '/' for local development
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
})
