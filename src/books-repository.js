import FirebaseManager from './firebase-manager';

class BooksRepository {
  static searchBook(searchTerm) {
    const booksPromise = FirebaseManager.getBooks();
    const books = [];
    let searchResults = [];
    let searchTermRegexp;

    return booksPromise.then((firebaseResponse) => {
      firebaseResponse.forEach(child => { books.push(child.val()); });

      searchResults = books.filter((book) => {
        searchTermRegexp = new RegExp(searchTerm, 'i');
        return book.name.match(searchTermRegexp) || book.description.match(searchTermRegexp);
      });

      return searchResults;
    });
  }
}

export default BooksRepository;
