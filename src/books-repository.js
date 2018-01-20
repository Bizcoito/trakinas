import FirebaseManager from './firebase-manager';

class BooksRepository {
  static searchBook(searchTerm) {
    const booksPromise = FirebaseManager.getBooks();
    const books = [];
    let searchResults = [];

    return booksPromise.then((firebaseResponse) => {
      firebaseResponse.forEach((child) => {
        books.push(child.val());
      });

      searchResults = books.filter((book) => {
        const term = new RegExp(searchTerm, 'i');
        return book.name.match(term) || book.description.match(term);
      });

      return searchResults;
    });
  }
}

export default BooksRepository;
