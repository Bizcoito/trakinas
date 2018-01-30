import BooksRepository from '../books-repository';

class databaseInterface {
  constructor(books = []) {
    this.books = books;
  }

  createBook(book) {
    if (!book['id']) {
      book['id'] = Math.floor(Math.random() * 100);
    }
    this.books.push(book);
  }

  getBooks() {
    return Promise.resolve(this.books);
  }

  searchBook(searchTerm) {
    let searchResults = [];
    let searchTermRegexp;

    searchResults = this.books.filter((book) => {
      searchTermRegexp = new RegExp(searchTerm, 'i');
      return book.name.match(searchTermRegexp) || book.description.match(searchTermRegexp);
    });

    return Promise.resolve(searchResults);
  }
}

describe('BooksRepository', () => {
  describe('createBook', () => {
    let dbInterface = new databaseInterface;
    let booksRepository = new BooksRepository(dbInterface);
    const thumbnailUrl = 'http://blog.coachseye.com/wp-content/themes/anew/img/thumb-small.png';

    describe('throws an exception if any parameter is wrong', () => {
      it('when book is not an Object', () => {
        const book = 'This should be an Object';
        const expectedError = new TypeError('Book should be an Object.');

        expect(() => booksRepository.createBook(book)).toThrow(expectedError);
      });

      it('when name is missing', () => {
        const book = {
          description: 'some description',
          thumbnail: thumbnailUrl,
        }
        const expectedError = new TypeError('Book Object must have a name parameter with type String.');

        expect(() => booksRepository.createBook(book)).toThrow(expectedError);
      });

      it('when name is not a string', () => {
        const book = {
          name: 123,
          description: 'some description',
          thumbnail: thumbnailUrl,
        }
        const expectedError = new TypeError('Book Object must have a name parameter with type String.');

        expect(() => booksRepository.createBook(book)).toThrow(expectedError);
      });
    });

    const book = {
      name: 'Some book',
      description: 'Some description',
      thumbnail: thumbnailUrl,
    }


    it('creates it through its database interface', () => {
      /**
       * Initializing the dbInterface and booksRepository again to be sure that the book instance
       * returned is not an existing book on the database.
       */
      let dbInterface = new databaseInterface;
      let booksRepository = new BooksRepository(dbInterface);

      booksRepository.createBook(book);
      booksRepository.getBooks().then((books) => {
        expect(books[0]).toEqual(book);
      })
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
      booksRepository.searchBook('Clean').then((books) => {
        expect(books).toHaveLength(2);
      })
      booksRepository.searchBook('Bob').then((books) => {
        expect(books).toHaveLength(2);
      })
      booksRepository.searchBook('Architecture').then((books) => {
        expect(books).toHaveLength(1);
      })
      booksRepository.searchBook('Popcorn').then((books) => {
        expect(books).toHaveLength(0);
      });
    });
  });
});