import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import type { PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: '/',
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }) as PluginOption,
      isProduction && visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption
    ].filter(Boolean) as PluginOption[],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      port: 5173,
      strictPort: true,
      open: true,
    },

    preview: {
      port: 4173,
      strictPort: true,
    },

    build: {
      outDir: 'dist',
      sourcemap: isProduction,
      minify: isProduction ? 'terser' : false,
      cssMinify: isProduction,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (id.includes('@supabase')) return 'vendor-supabase';
              if (id.includes('react')) return 'vendor-react';
              if (id.includes('recharts')) return 'vendor-recharts';
              if (id.includes('jspdf')) return 'vendor-pdf';
              return 'vendor-other';
            }
            return null;
          },
        },
      },
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      esbuildOptions: {
        target: 'es2020',
      },
    },

    define: {
      'process.env': {}
    }
  };
});