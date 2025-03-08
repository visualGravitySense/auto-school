import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  json: {
    namedExports: true,
    stringify: false
  },
  plugins: [react()],
})
