/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// viteSingleFile gera um único dist/index.html (JS, CSS, imagem e fontes embutidos),
// que abre direto no navegador da TV, sem servidor e sem internet.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  test: { environment: 'node' },
});
