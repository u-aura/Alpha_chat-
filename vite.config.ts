// Vite configuration with improvements

import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Use environment variables for flexibility
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
const outDir = process.env.OUT_DIR || 'build'

// Final Vite config object
const config: UserConfig = {
  // React plugin for Vite
  plugins: [react()],
  resolve: {
    // Alias for cleaner imports
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    // Server port and auto-open browser
    port,
    open: true,
  },
  build: {
    // Output directory for builds
    outDir,
    sourcemap: true, // Enables sourcemaps for debugging
    minify: 'terser', // Use terser for minification
    rollupOptions: {
      output: {
        // Split vendor libraries for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
}

export default defineConfig(config)
