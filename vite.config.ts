import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: '/',
    plugins: [
      react(),
      isProduction && visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
      })
    ].filter(Boolean),
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    
    server: {
      port: 5173,
      strictPort: true,
      open: !isProduction,
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: !isProduction,
      minify: isProduction ? 'terser' : false,
      cssMinify: isProduction,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
              if (id.includes('react')) {
                return 'vendor-react';
              }
              if (id.includes('recharts')) {
                return 'vendor-recharts';
              }
              if (id.includes('jspdf')) {
                return 'vendor-pdf';
              }
              return 'vendor-other';
            }
          },
        },
        external: [
          'react-to-print',
          'neon',
        ],
      },
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        'recharts',
        'jspdf',
        'jspdf-autotable'
      ],
      exclude: ['js-big-decimal']
    },
    
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
  };
});
