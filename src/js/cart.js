import { getLocalStorage, setLocalStorage } from "./utils.mjs"; // Assuming you have these functions in utils.mjs

// Function to load the books from localStorage and display them in the cart
function loadCart() {
  // Retrieve cart contents from localStorage
  let cartContents = getLocalStorage("book-cart");

  // If cart is empty or doesn't exist, display a message
  if (!cartContents || cartContents.length === 0) {
    document.getElementById("cart-items").innerHTML =
      "<p>Your cart is empty.</p>";
    document.getElementById("checkout-button").style.display = "none"; // Hide checkout button if cart is empty
    document.getElementById("total-price").innerHTML = "Total Price: $0.00";
    return;
  }

  // If there are items in the cart, display them
  const cartElement = document.getElementById("cart-items");
  cartElement.innerHTML = ""; // Clear any previous content

  let totalPrice = 0; // Initialize total price

  cartContents.forEach((book) => {
    const pricePerBook = 100; // Default price for each book is $100
    const totalBookPrice = pricePerBook * (book.quantity || 1); // Total price for the book based on quantity
    totalPrice += totalBookPrice; // Add this book's total price to the cart's total price

    // Create a list item or a div to display the book information
    const bookElement = document.createElement("div");
    bookElement.classList.add("cart-item");
    bookElement.innerHTML = `
      <div class="cart-item-details">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.publisher}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Quantity:</strong> ${book.quantity || 1}</p>
        <p><strong>Price per Item:</strong> $${pricePerBook}</p>
        <p><strong>Total Price:</strong> $${totalBookPrice.toFixed(2)}</p>
      </div>
      <button class="remove-from-cart" data-id="${book.id}">Remove</button>
    `;

    // Append each book element to the cart
    cartElement.appendChild(bookElement);
  });

  // Update total price in the DOM
  document.getElementById(
    "total-price"
  ).innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;

  // Add remove item functionality
  addRemoveFunctionality();

  // Display the total quantity
  displayTotal();
}

// Function to remove a book from the cart and update localStorage
function removeFromCart(bookId) {
  let cartContents = getLocalStorage("book-cart");

  if (!cartContents) return;

  const bookIndex = cartContents.findIndex((book) => book.id === bookId);

  if (bookIndex > -1) {
    if (cartContents[bookIndex].quantity > 1) {
      cartContents[bookIndex].quantity -= 1; // Decrease quantity by 1
    } else {
      cartContents.splice(bookIndex, 1); // Remove book if quantity is 1
    }
  }

  setLocalStorage("book-cart", cartContents);
  loadCart();
}

// Function to add remove button functionality
function addRemoveFunctionality() {
  const removeButtons = document.querySelectorAll(".remove-from-cart");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const bookId = event.target.dataset.id;
      removeFromCart(bookId);
    });
  });
}

// Function to calculate and display the total quantity of items in the cart
function displayTotal() {
  let cartContents = getLocalStorage("book-cart");

  if (!cartContents || cartContents.length === 0) {
    document.getElementById("total-price").innerHTML = "Total Quantity: 0";
    return;
  }

  const totalQuantity = cartContents.reduce((total, book) => {
    return total + (book.quantity || 1);
  }, 0);

  document.getElementById(
    "total-price"
  ).innerHTML = `Total Quantity: ${totalQuantity}`;

  // Save the total quantity in localStorage for use on the checkout page
  localStorage.setItem("checkout-total", totalQuantity);
}

// Function to handle checkout button click
document.getElementById("checkout-button").addEventListener("click", () => {
  // Optionally, check if the cart is not empty before proceeding
  let cartContents = getLocalStorage("book-cart");
  if (cartContents && cartContents.length > 0) {
    window.location.href = "checkout.html"; // Redirect to checkout page
  } else {
    alert(
      "Your cart is empty. Please add some items before proceeding to checkout."
    );
  }
});

// Function to add a book to the cart
function addToCart(book) {
  let cartContents = getLocalStorage("book-cart"); // Get current cart contents

  if (!cartContents) {
    cartContents = []; // If there's nothing in the cart, start with an empty array
  }

  // Check if the book already exists in the cart by its ID
  const existingBookIndex = cartContents.findIndex(
    (item) => item.id === book.id
  );

  if (existingBookIndex === -1) {
    // If the book is not in the cart, add it as a new book
    book.quantity = 1; // Ensure the new book has a quantity of 1
    cartContents.push(book); // Add the book to the cart
    alert("Book added to Reading!");
  } else {
    // If the book is already in the cart, increase its quantity
    cartContents[existingBookIndex].quantity += 1;
    alert("Book quantity increased in the Reading!");
  }

  // Save the updated cart back to localStorage
  setLocalStorage("book-cart", cartContents);
  loadCart(); // Reload the cart after adding/updating
}

// Call loadCart when the page is ready
document.addEventListener("DOMContentLoaded", loadCart);
