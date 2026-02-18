import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/meu-dashboard/',   // <--- Adicione esta linha
  plugins: [react()],
})