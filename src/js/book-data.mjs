

// Function to convert the fetch response to JSON
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class BookData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  // Fetch the list of books in the category
  async getData() {
    try {
      const response = await fetch(this.path);
      return await convertToJson(response);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  // Fetch a book by its ID from the category
  async findBookById(id) {
    try {
      const books = await this.getData(); // Fetch all books first
      if (!books) {
        console.error("No books available");
        return null;
      }
      // Ensure both `id` and book id are numbers (or parse as needed)
      const book = books.find((book) => book.id === parseInt(id)); // Compare parsed integer ID
      if (!book) {
        console.error(`No book found with id: ${id}`);
      }
      return book;
    } catch (error) {
      console.error("Error finding book:", error);
      return null; // In case of an error, return null
    }
  }
}