import BookData from './book-data.mjs'; // Assuming BookData is the data handler for fetching books
import { displayBookDetails } from './book-details.mjs'; // Assuming this function handles displaying the book details
// import { loadHTML } from './utils.mjs'; // Assuming loadHTML is the function to load HTML content dynamically

// Function to get the query parameters from the URL
function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name); // Fetch the parameter value
}

// Function to initialize the Book Details Page
async function initBookDetailsPage() {
  const category = getParam('category');
  const bookId = getParam('id');

  if (!category || !bookId) {
    console.error('Category or ID missing in the URL');
    return;
  }

  const bookData = new BookData(category); // Create an instance of BookData based on the category

  try {
    const book = await bookData.findBookById(bookId); // Fetch the book data by ID

    if (book) {
      displayBookDetails(book); // Display the book details on the page
    } else {
      console.error('Book not found');
      document.getElementById('book-details').innerHTML = '<p>Book not found</p>';
    }
  } catch (error) {
    console.error('Error loading book details:', error);
    document.getElementById('book-details').innerHTML = '<p>Error loading book details</p>';
  }
}

// Function to load the header and footer
function loadHeaderAndFooter() {
  loadHTML('/public/header.html', 'header'); // Load the header HTML into the 'header' element
  loadHTML('/public/footer.html', 'footer'); // Load the footer HTML into the 'footer' element
}

// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', () => {
  loadHeaderAndFooter(); // Load the header and footer first
  initBookDetailsPage(); // Then initialize the book details page with data
});
