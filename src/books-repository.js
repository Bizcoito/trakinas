
class BooksRepository {
  /**
  * Creates an instance of BooksRepository.
  *
  * @param {any} databaseInterface
  */
  constructor(databaseInterface) {
    this.db = databaseInterface;
  }

  /**
   * Function that creates a book on the database
   *
   * @param {Object} book
   * @property {string} book.name
   * @property {string} book.description
   * @property {string} book.thumbnail
   * @return nothing
   */
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
   * @return {Promise<Array<Object>>}
   * @property {string} name
   * @property {string} description
   * @property {string} thumbnail
   */
  getBooks() {
    return this.db.getBooks();
  }

  /**
   * Function that search books with the given search term on their names or descriptions.
   *
   * @param {string} searchTerm The word to search for.
   *
   * @return {Promise<Array<Object>>}
   * @property {string} name
   * @property {string} description
   * @property {string} thumbnail
   */
  searchBook(searchTerm) {
    return this.db.searchBook(searchTerm);
  }
}

export default BooksRepository;
