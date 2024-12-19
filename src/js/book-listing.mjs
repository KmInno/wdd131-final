import { loadHTML } from './utils.mjs';
import { renderListWithTemplate } from './utils.mjs';

function bookTemplate(book, category) {
  return `
    <div class="book-card">
      <img src="${book.imgUrl}" alt="${book.title}" class="book-image">
      <div class="book-details">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">Author: ${book.authors}</p>
        <p class="book-year">Year: ${book.year}</p>
        <p class="book-language">Language: ${book.language}</p>
        <p class="book-pages">Pages: ${book.pages}</p>
        <p class="book-size">File Size: ${Math.round(book.size / 1024)} KB</p>
        <p class="book-type">Format: ${book.type}</p>
        <button class="view-button" onclick="viewBook('${category}', '${book.bookId}')">View</button>
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
      const books = await this.dataSource.getData(this.category); // Fetch data based on category
      if (books && books.length > 0) {
        renderListWithTemplate(
          (book) => bookTemplate(book, this.category),
          this.listElement,
          books,
          'beforeend',
          true
        );
      } else {
        this.listElement.innerHTML = `<p>No books available for the ${this.category} category.</p>`;
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
    console.error('Category or book ID is missing');
    return;
  }
  window.location.href = `/book_details/index.html?category=${category}&id=${bookId}`;
};
