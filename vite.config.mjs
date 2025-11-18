import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'react-core';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('lucide-react') || id.includes('class-variance-authority') || id.includes('tailwind-merge') || id.includes('framer-motion') || id.includes('clsx')) return 'ui';
            if (id.includes('react-helmet')) return 'head';
          }
          if (id.includes('/src/pages/') || id.includes('/src/routes/')) return 'routes';
          return undefined;
        },
      }
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    ...(process.env.NODE_ENV !== 'production' ? [tagger()] : []),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Mate cu succes',
        short_name: 'Mate cu succes',
        description: 'Platformă educațională modernă pentru matematică: lecții, fișe și pregătire pentru examene.',
        theme_color: '#1CA37B',
        background_color: '#ffffff',
        lang: 'ro',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/assets/images/logo-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/assets/images/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        navigateFallback: '/offline.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'asset-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
    // Bundle analyzer (enable by setting VITE_ANALYZE=1)
    (process.env.VITE_ANALYZE === '1' || process.env.VITE_ANALYZE === 'true') &&
      visualizer({
        filename: 'build/stats.html',
        template: 'treemap',
        gzipSize: true,
        brotliSize: true,
      }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.js'],
    css: true,
  },
  server: {
    // Changed dev server port from 4028 to 4173 per user request
    port: "4173",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  }
});