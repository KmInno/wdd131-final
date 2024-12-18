import { getLocalStorage, setLocalStorage } from './utils.mjs'; // Assuming you have these functions in utils.mjs

// Function to load the books from localStorage and display them in the cart
function loadCart() {
  // Retrieve cart contents from localStorage
  let cartContents = getLocalStorage('book-cart');

  // If cart is empty or doesn't exist, display a message
  if (!cartContents || cartContents.length === 0) {
    document.getElementById('cart-items').innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('checkout-button').style.display = 'none'; // Hide checkout button if cart is empty
    return;
  }

  // If there are items in the cart, display them
  const cartElement = document.getElementById('cart-items');
  cartElement.innerHTML = ''; // Clear any previous content

  cartContents.forEach(book => {
    // Create a list item or a div to display the book information
    const bookElement = document.createElement('div');
    bookElement.classList.add('cart-item');
    bookElement.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Price:</strong> $${book.price}</p>
        <p><strong>Quantity:</strong> ${book.quantity || 1}</p>
      </div>
      <button class="remove-from-cart" data-id="${book.id}">Remove</button>
    `;

    // Append each book element to the cart
    cartElement.appendChild(bookElement);
  });

  // Add remove item functionality
  addRemoveFunctionality();

  // Display the total price
  displayTotal();
}

// Function to remove a book from the cart and update localStorage
function removeFromCart(bookId) {
  let cartContents = getLocalStorage('book-cart');

  if (!cartContents) return;

  const bookIndex = cartContents.findIndex(book => book.id === bookId);

  if (bookIndex > -1) {
    if (cartContents[bookIndex].quantity > 1) {
      cartContents[bookIndex].quantity -= 1; // Decrease quantity by 1
    } else {
      cartContents.splice(bookIndex, 1); // Remove book if quantity is 1
    }
  }

  setLocalStorage('book-cart', cartContents);
  loadCart();
}

// Function to add remove button functionality
function addRemoveFunctionality() {
  const removeButtons = document.querySelectorAll('.remove-from-cart');

  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const bookId = event.target.dataset.id;
      removeFromCart(bookId);
    });
  });
}

// Function to calculate and display the total price of the items in the cart
function displayTotal() {
  let cartContents = getLocalStorage('book-cart');

  if (!cartContents || cartContents.length === 0) {
    document.getElementById('total-price').innerHTML = 'Total: $0.00';
    return;
  }

  const totalPrice = cartContents.reduce((total, book) => {
    return total + (book.price * (book.quantity || 1));
  }, 0);

  document.getElementById('total-price').innerHTML = `Total: $${totalPrice.toFixed(2)}`;

  // Save the total price in localStorage for use on the checkout page
  localStorage.setItem('checkout-total', totalPrice.toFixed(2));
}

// Function to handle checkout button click
document.getElementById('checkout-button').addEventListener('click', () => {
  // Optionally, check if the cart is not empty before proceeding
  let cartContents = getLocalStorage('book-cart');
  if (cartContents && cartContents.length > 0) {
    window.location.href = 'checkout.html'; // Redirect to checkout page
  } else {
    alert('Your cart is empty. Please add some items before proceeding to checkout.');
  }
});

// Call loadCart when the page is ready
document.addEventListener('DOMContentLoaded', loadCart);
