import { loadHTML } from './utils.mjs';


// Load the header and footer on all pages
document.addEventListener('DOMContentLoaded', () => {
  loadHTML('/public/header.html', 'header');
  loadHTML('/public/footer.html', 'footer');
});