import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        originkitHero02: 'originkit-hero-02.html',
      },
    },
  },
  plugins: [react()],
});
