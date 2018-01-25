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

  static writeBookData(bookData) {
    const newBookKey = firebase.database().ref().child('books').push().key;
    const bookId = { bookId: newBookKey };
    const firebaseBookData = { ...bookId, ...bookData };
    const updates = {};

    updates['/books/' + newBookKey] = firebaseBookData;

    firebase.database().ref().update(updates);
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
}

export default FirebaseManager;
