import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves 404.html for unknown paths. Copying index.html there
// lets deep links like /projects/some-slug load the SPA.
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const index = resolve(dist, 'index.html')
      if (existsSync(index)) copyFileSync(index, resolve(dist, '404.html'))
    },
  }
}

export default defineConfig(({ mode }) => ({
  // Set VITE_BASE=/ for a user site (username.github.io) or a custom domain.
  base: process.env.VITE_BASE ?? (mode === 'production' ? '/portfolio/' : '/'),
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion'],
        },
      },
    },
  },
}))
