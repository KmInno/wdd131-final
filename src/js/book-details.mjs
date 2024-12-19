import BookData from "./book-data.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Function to get the query parameter from the URL
function getParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to load book details
async function loadBookDetails() {
  const category = getParam("category");
  const bookId = getParam("id");

  if (!category || !bookId) {
    console.error("Category or ID missing");
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
      console.error("Book not found");
      document.getElementById("book-details").innerHTML =
        "<p>Book not found</p>";
    }
  } catch (error) {
    console.error("Error loading book details:", error);
    document.getElementById("book-details").innerHTML =
      "<p>Error loading book details</p>";
  }
}

// Function to display the book details in HTML
// Function to display the book details
export function displayBookDetails(book) {
  const detailsElement = document.getElementById("book-details");

  // Use encodeURIComponent to safely encode the title and cover
  const encodedTitle = encodeURIComponent(book.title);
  const encodedCover = encodeURIComponent(book.cover);

  detailsElement.innerHTML = `
    <h2 class="book-title">${book.title}</h2>
    <div class="book-details-container">
      <img src="${book.imgUrl}" alt="${book.title}" class="book-image">
      <div class="book-details">
        <p><strong>Author:</strong> ${book.authors}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Publisher:</strong> ${book.publisher}</p>
        <p><strong>Description:</strong> ${book.description}</p>

        <button class="add-to-cart-button" id="addToCart" data-id="${book.bookId}">Add Books</button>
      </div>
    </div>

    `;

  // Add event listener to the "Add to Cart" button
  document
    .getElementById("addToCart")
    .addEventListener("click", () => addToCart(book));
}

// Call the function to load book details when the page loads
document.addEventListener("DOMContentLoaded", loadBookDetails);

function addToCart(book) {
  let cartContents = getLocalStorage("book-cart"); // Get current cart contents

  if (!cartContents) {
    cartContents = []; // If there's nothing in the cart, start with an empty array
  }

  // Add the book to the cart regardless of whether it's already there
  cartContents.push(book); // Add the book to the cart

  alert("Book added to Reading!");

  // Save the updated cart back to localStorage
  setLocalStorage("book-cart", cartContents);
}
