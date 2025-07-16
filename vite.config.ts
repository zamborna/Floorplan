import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Floorplan/public/index.html',
  plugins: [react()]
});
