class BooksRepository {
  constructor(databaseInterface) {
    this.db = databaseInterface;
  }

  createBook(book) {
    if (typeof book !== 'object') {
      throw new TypeError('Book should be an Object.');
    }

    if (typeof book.name !== 'string') {
      throw new TypeError('Book Object must have a name parameter with type String.');
    }

    this.db.createBook(book);
  }

  /**
   * Function that returns all books.
   *
   * @return {Promise} with all the books Objects
   */
  getBooks() {
    return this.db.getBooks();
  }

  searchBook(searchTerm) {
    return this.db.searchBook(searchTerm);
  }
}

export default BooksRepository;
