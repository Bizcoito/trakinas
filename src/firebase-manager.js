import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB2EahiG5p4IF3aYbg6hpQN2PNWMaAKXgs',
  authDomain: 'bizcoitera.firebaseapp.com',
  databaseURL: 'https://bizcoitera.firebaseio.com',
  projectId: 'bizcoitera',
  storageBucket: 'bizcoitera.appspot.com',
  messagingSenderId: '976257491287'
};

class FirebaseManager {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  static init() {
    firebase.initializeApp(config);
  }

  static updateBookAttribute(book, field, value) {
    const updates = {};
    const bookData = book;

    bookData[field] = value;
    updates['/books/' + book.bookId] = bookData;
    firebase.database().ref().update(updates);

    return FirebaseManager.getBookData(bookData.bookId).then(response => response);
  }

  static getBooks() {
    return firebase.database().ref('/books')
      .orderByChild('name')
      .once('value')
      .then(response => response);
  }

  static getBookData(bookId) {
    return firebase.database()
      .ref('/books/' + bookId)
      .once('value')
      .then(response => response.val());
  }

  getBook(bookId) {
    return firebase.database()
      .ref('/books/' + bookId)
      .once('value')
      .then(response => response.val());
  }

  createBook(bookData) {
    const newBookKey = firebase.database().ref().child('books').push().key;
    const bookId = { bookId: newBookKey };
    const firebaseBookData = { ...bookId, ...bookData };
    const updates = {};

    updates['/books/' + newBookKey] = firebaseBookData;

    firebase.database().ref().update(updates);
  }

  getBooks() {
    return firebase.database().ref('/books')
      .orderByChild('name')
      .once('value')
      .then(response => response);
  }

  searchBook(searchTerm) {
    const booksPromise = this.getBooks();
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

export default FirebaseManager;
