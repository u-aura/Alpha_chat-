import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// Optional: Uncomment if you want to load .env automatically
// import dotenv from 'dotenv';
// dotenv.config();

// Load environment variables with fallbacks
const port = Number(process.env.PORT) || 3000;
const outDir = process.env.OUT_DIR || 'build';
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

// Plugins array for conditionally including plugins
const plugins = [react()];

// Example: Add more plugins conditionally
// if (isProduction) {
//   plugins.push(require('vite-plugin-some-production-plugin')());
// }

const config: UserConfig = {
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Add more aliases as needed:
      // '@components': path.resolve(__dirname, 'src/components'),
      // '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    port,
    open: true,
    allowedHosts: [
      '2cj97c-3000.csb.app', // add any additional hosts as needed
      // 'localhost',
    ],
    // Example: configure proxy if needed
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
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
    assetsInlineLimit: 4096,
    brotliSize: true, // enable brotli compression
    manifest: true,   // generate manifest file for backend integration
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __API_BASE_URL__: JSON.stringify(process.env.API_BASE_URL || ''),
  },
  // Example: Add JSON or SVG loader if needed
  // json: {
  //   namedExports: true,
  //   stringify: false
  // },
};

export default defineConfig(config);
