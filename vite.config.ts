import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Load environment variables
const port = Number(process.env.PORT) || 3000
const outDir = process.env.OUT_DIR || 'build'

// Helper function to determine if we are in production
const isProduction = process.env.NODE_ENV === 'production'

// Plugins array for conditionally including plugins
const plugins = [react()]

// Example: Add more plugins conditionally
// if (isProduction) {
//   plugins.push(someProductionOnlyPlugin());
// }

const config: UserConfig = {
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port,
    open: true,
    // Example: configure proxy if needed
    // proxy: {
    //   '/api': 'http://localhost:5000'
    // }
  },
  build: {
    outDir,
    sourcemap: !isProduction, // Sourcemaps only in development for faster production builds
    minify: isProduction ? 'terser' : false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Example: assets inline limit, customize as needed
    assetsInlineLimit: 4096,
    // Example: Enable brotli compression if needed
    // brotliSize: true,
    // Example: Generate manifest file for integration with backend frameworks
    // manifest: true,
  },
  // Example: Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  // Example: Add JSON or SVG loader if needed
  // json: {
  //   namedExports: true,
  //   stringify: false
  // },
}

export default defineConfig(config)
