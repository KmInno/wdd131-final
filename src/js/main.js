import { loadHTML } from './utils.mjs';


// Load the header and footer on all pages
document.addEventListener('DOMContentLoaded', () => {
  loadHTML('../header.html', 'header');
  loadHTML('../footer.html', 'footer');
});