import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // '/' for the live domain; the checking deploy passes a subpath in.
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  server: { port: 5173, open: true },
})
