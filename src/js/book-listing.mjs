import { loadHTML } from './utils.mjs';
import { renderListWithTemplate } from './utils.mjs';

function bookTemplate(book, category) {
  return `
    <div class="book-card">
      <img src="${book.cover}" alt="${book.title}" class="book-image">
      <div class="book-details">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">Author: ${book.author}</p>
        <p class="book-price">Price: $${book.price}</p>
        <button class="view-button" onclick="viewBook('${category}', '${book.id}')">View</button>
      </div>
    </div>
  `;
}





export class BookList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  // Initialize method to fetch and render books
  async init() {
    try {
      const books = await this.dataSource.getData(); // Fetch the data using BookData
      if (books) {
        // Pass the category to the template to generate the correct link
        renderListWithTemplate((book) => bookTemplate(book, this.category), this.listElement, books, 'beforeend', true); // Render the books
      } else {
        throw new Error('No books available');
      }
    } catch (error) {
      this.listElement.innerHTML = `<p>Error loading books: ${error.message}</p>`;
      console.error(error);
    }
  }
}


// Function to handle the "View" button click
window.viewBook = function (category, bookId) {
  if (!category || !bookId) {
    console.error("Category or book ID is missing");
    return;
  }
  window.location.href = `/book_details/index.html?category=${category}&id=${bookId}`;
};


