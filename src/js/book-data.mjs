const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY; // Get the Google API key from environment variables
const baseURL = import.meta.env.VITE_GOOGLE_BOOKS_API_URL; // Get the base URL for Google Books API

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class BooksData {
  // Fetch books by category or search term
  async getData(query) {
    const response = await fetch(`${baseURL}?q=${query}&key=${apiKey}`);
    const data = await convertToJson(response);

    // Map over the results and structure them
    return data.items.map((book) => ({
      bookId: book.id,
      title: book.volumeInfo.title,
      imgUrl: book.volumeInfo.imageLinks?.thumbnail || "defaultImageUrl.jpg",
      pages: book.volumeInfo.pageCount,
      size: book.volumeInfo.fileSize || "N/A",
      year: book.volumeInfo.publishedDate || "Unknown",
      publisher: book.volumeInfo.publisher || "Unknown",
      language: book.volumeInfo.language || "Unknown",
      type: "N/A", // The API doesn't directly give this, you can infer based on other data
      authors: book.volumeInfo.authors?.join(", ") || "Unknown",
    }));
  }

  // Fetch a specific book by its ID
  async findBookById(bookId) {
    const response = await fetch(`${baseURL}/${bookId}?key=${apiKey}`);
    const data = await convertToJson(response);

    return {
      bookId: data.id,
      title: data.volumeInfo.title,
      imgUrl: data.volumeInfo.imageLinks?.thumbnail || "defaultImageUrl.jpg",
      pages: data.volumeInfo.pageCount,
      size: data.volumeInfo.fileSize || "N/A",
      year: data.volumeInfo.publishedDate || "Unknown",
      publisher: data.volumeInfo.publisher || "Unknown",
      language: data.volumeInfo.language || "Unknown",
      type: "N/A",
      authors: data.volumeInfo.authors?.join(", ") || "Unknown",
    };
  }
}
