import BooksRepository from '../books-repository';

class databaseInterface {
  constructor(books = []) {
    this.books = books;
  }

  init() { };

  createBook(book) {
    this.books.push(book);
  }

  getBooks() {
    return this.books;
  }

  searchBook(searchTerm) {
    let searchResults = [];
    let searchTermRegexp;

    searchResults = this.books.filter((book) => {
      searchTermRegexp = new RegExp(searchTerm, 'i');
      return book.name.match(searchTermRegexp) || book.description.match(searchTermRegexp);
    });

    return searchResults;
  }
}

describe('BooksRepository', () => {
  describe('createBook', () => {
    const dbInterface = new databaseInterface;
    const booksRepository = new BooksRepository(dbInterface);

    describe('throws an exception if any parameter is wrong', () => {
      it('when book is not an Object', () => {
        const book = 'This should be an Object';
        const expectedError = new TypeError('Book should be an Object.');

        expect(() => booksRepository.createBook(book)).toThrow(expectedError);
      });

      it('when name is missing', () => {
        const book = {
          description: 'some description',
          thumbnail: 'http://blog.coachseye.com/wp-content/themes/anew/img/thumb-small.png',
        }
        const expectedError = new TypeError('Book Object must have a name parameter with type String.');

        expect(() => booksRepository.createBook(book)).toThrow(expectedError);
      });

      it('when name is not a string', () => {
        const book = {
          name: 123,
          description: 'some description',
          thumbnail: 'http://blog.coachseye.com/wp-content/themes/anew/img/thumb-small.png',
        }
        const expectedError = new TypeError('Book Object must have a name parameter with type String.');

        expect(() => booksRepository.createBook(book)).toThrow(expectedError);
      });
    });

    const book = {
      name: 'Some book',
      description: 'Some description',
      thumbnail: 'http://blog.coachseye.com/wp-content/themes/anew/img/thumb-small.png',
    }

    it('creates it through its database interface', () => {
      const originalBooksLength = booksRepository.getBooks().length;

      booksRepository.createBook(book);

      const newBooksLength = booksRepository.getBooks().length;
      expect(newBooksLength).toEqual(originalBooksLength + 1);
    });
  });

  describe('searchBook', () => {
    const books = [
      {
        id: 'asdf',
        name: 'Clean Architecture',
        description: "A nice uncle bob's book",
      },
      {
        id: 'qwer',
        name: 'Clean Code',
        description: "An older uncle bob's book",
      }
    ]
    const dbInterface = new databaseInterface(books);
    const booksRepository = new BooksRepository(dbInterface);

    it('search for term in book name or description', () => {
      expect(booksRepository.searchBook('Clean')).toHaveLength(2);
      expect(booksRepository.searchBook('Bob')).toHaveLength(2);
      expect(booksRepository.searchBook('Architecture')).toHaveLength(1);
      expect(booksRepository.searchBook('Popcorn')).toHaveLength(0);
    });
  });
});