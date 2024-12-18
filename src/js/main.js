// Import the loadHeaderFooter function from utils.mjs
import { loadHeaderFooter } from './utils.mjs'; 

// Call the loadHeaderFooter function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter(); // This will dynamically load and insert the header and footer
});
