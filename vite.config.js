import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  // publicDir: 'src/public',  // Add this line

  build: {
    outDir: '../dist', // Output folder for build
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        book: resolve(__dirname, 'src/books/index.html'),
        booklist: resolve(__dirname, 'src/book_details/index.html'),
      },
    },
  },
});
