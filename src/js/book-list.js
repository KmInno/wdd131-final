import { BookList } from './book-listing.mjs';
import BookData from './book-data.mjs';
import { loadHTML } from './utils.mjs'; 

// Function to get the category parameter from the URL
function getCategoryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('category'); // Get the 'category' parameter from the URL
}

// Function to initialize and load books based on the category from the URL
function loadBooksFromCategory() {
  const category = getCategoryFromURL();
  if (!category) {
    console.error('No category found in URL');
    return;
  }

  const dataSource = new BookData(category); 
  const element = document.querySelector('#book-list'); // Use ID selector to match 'book-list'

  if (!element) {
    console.error('The #book-list element could not be found.');
    return;
  }

  const listing = new BookList(category, dataSource, element); // Create an instance of BookList
  listing.init(); // Initialize and load the books
}

// Function to load the header and footer
function loadHeaderAndFooter() {
  loadHTML('/header.html', 'header');
  loadHTML('/footer.html', 'footer');
}

// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', () => {
  loadBooksFromCategory(); // Load the books based on the URL category
  loadHeaderAndFooter(); // Load the header and footer
});
