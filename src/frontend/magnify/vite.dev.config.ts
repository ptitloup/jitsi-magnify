import { resolve } from 'path';
import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';
import postcss from 'rollup-plugin-postcss';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      fileName: () => 'index.js',
      formats: ['es'],
      name: 'index',
    },
    minify: false,
    rollupOptions: {
      external: [
        '@jitsi/react-sdk',
        'axios',
        'formik',
        'grommet',
        'grommet-icons',
        'polished',
        'react',
        'react-intl',
        'react-query',
        'react-router-dom',
        'styled-components',
        'validator',
        'yup',
      ],
      plugins: [
        postcss({
          modules: true,
        }),
      ],
      treeshake: false,
    },
    sourcemap: true,
    watch: {
      exclude: [resolve(__dirname, './src/tests'), resolve(__dirname, './src/**/*.spec.tsx?')],
      include: [resolve(__dirname, './src/**')],
    },
  },
  plugins: [
    react(),
    typescript({
      declaration: true,
      declarationDir: resolve(__dirname, './dist'),
      exclude: [
        resolve(__dirname, './dist'),
        resolve(__dirname, './node_modules/**'),
        // Ignore all test stuff
        resolve(__dirname, './src/tests'),
        resolve(__dirname, './src/**/*.spec.tsx?'),
      ],
      noEmitOnError: false,
      rootDir: resolve(__dirname, './src'),
      target: 'ESNext',
    }),
  ],
});
