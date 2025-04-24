import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    includeAssets: ['vite.svg'], // Ensures vite.svg is included in the build
    manifest: {
      name: 'My Vite PWA App',
      short_name: 'VitePWA',
      description: 'A Progressive Web App built with Vite',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone',
      icons: [
        {
          src: 'vite.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        }
      ]
    }
  })],
})
