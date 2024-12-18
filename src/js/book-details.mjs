import BookData from './book-data.mjs';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

// Function to get the query parameter from the URL
function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to load book details
async function loadBookDetails() {
  const category = getParam('category');
  const bookId = getParam('id');
  
  if (!category || !bookId) {
    console.error('Category or ID missing');
    return;
  }

  // Initialize the BookData with the category
  const bookData = new BookData(category);

  try {
    // Fetch the book details using the ID
    const book = await bookData.findBookById(bookId);
    
    if (book) {
      // Populate the book details on the page
      displayBookDetails(book);
    } else {
      console.error('Book not found');
      document.getElementById('book-details').innerHTML = '<p>Book not found</p>';
    }
  } catch (error) {
    console.error('Error loading book details:', error);
    document.getElementById('book-details').innerHTML = '<p>Error loading book details</p>';
  }
}

// Function to display the book details in HTML
// Function to display the book details
export function displayBookDetails(book) {
    const detailsElement = document.getElementById('book-details');
    
    // Use encodeURIComponent to safely encode the title and cover
    const encodedTitle = encodeURIComponent(book.title);
    const encodedCover = encodeURIComponent(book.cover);
  
    detailsElement.innerHTML = `
      <div id="header"></div>

      <h2>${book.title}</h2>
      <img src="${book.cover}" alt="${book.title}" class="book-image">
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Price:</strong> $${book.price}</p>
      <p><strong>Description:</strong> ${book.description}</p>
      <button class="add-to-cart-button" id="addToCart" data-id="${book.id}">Add to Cart</button>

        <div id="footer"></div>

    `;
  
    // Add event listener to the "Add to Cart" button
    document
      .getElementById('addToCart')
      .addEventListener('click', () => addToCart(book));
  }
  

// Call the function to load book details when the page loads
document.addEventListener('DOMContentLoaded', loadBookDetails);

function addToCart(book) {
    let cartContents = getLocalStorage('book-cart'); // Get current cart contents
  
    if (!cartContents) {
      cartContents = []; // If there's nothing in the cart, start with an empty array
    }
  
    // Check if the book already exists in the cart by its ID
    const existingBookIndex = cartContents.findIndex(item => item.id === book.id);
  
    if (existingBookIndex === -1) {
      // If the book is not in the cart, add it
      cartContents.push(book);
      alert('Book added to cart!');
    } else {
      // If the book is already in the cart, you could increase the quantity, for instance:
      alert('This book is already in the cart!');
      // Or you can just leave it as it is and not add it again
    }
  
    // Save the updated cart back to localStorage
    setLocalStorage('book-cart', cartContents);
}
