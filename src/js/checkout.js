document.addEventListener("DOMContentLoaded", () => {
  // Retrieve cart data and calculate totals
  const cartData = JSON.parse(localStorage.getItem("book-cart")) || []; // Default to empty array if no cart data
  const numItemsElement = document.getElementById("num-items");
  const cartTotalElement = document.getElementById("cartTotal");
  const shippingElement = document.getElementById("Shipping");
  const taxElement = document.getElementById("tax");
  const orderTotalElement = document.getElementById("orderTotal");

  // If the cart is empty, handle gracefully
  if (cartData.length === 0) {
    numItemsElement.textContent = "0";
    cartTotalElement.textContent = "$0.00";
    shippingElement.textContent = "$0.00";
    taxElement.textContent = "$0.00";
    orderTotalElement.textContent = "$0.00";
    alert("No items in the cart. Please add some items to your cart first.");
    return;
  }

  // Calculate subtotal with a fixed price of $100 per item, multiplied by quantity
  let subtotal = cartData.reduce(
    (total, item) => total + 100 * (item.quantity || 1),
    0
  );

  // Define shipping and tax rates
  const shipping = subtotal > 0 ? 5.0 : 0; // Flat rate shipping
  const tax = subtotal * 0.1; // 10% tax rate

  // Calculate total order
  const orderTotal = subtotal + shipping + tax;

  // Populate values in the DOM
  numItemsElement.textContent = cartData.length;
  cartTotalElement.textContent = `$${subtotal.toFixed(2)}`;
  shippingElement.textContent = `$${shipping.toFixed(2)}`;
  taxElement.textContent = `$${tax.toFixed(2)}`;
  orderTotalElement.textContent = `$${orderTotal.toFixed(2)}`;

  // Save the final order total to localStorage (optional)
  localStorage.setItem("checkout-total", orderTotal.toFixed(2));
});
