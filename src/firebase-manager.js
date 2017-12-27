import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyB2EahiG5p4IF3aYbg6hpQN2PNWMaAKXgs",
  authDomain: "bizcoitera.firebaseapp.com",
  databaseURL: "https://bizcoitera.firebaseio.com",
  projectId: "bizcoitera",
  storageBucket: "bizcoitera.appspot.com",
  messagingSenderId: "976257491287"
};

class FirebaseManager {
  static init() {
    firebase.initializeApp(config);
  }

  static writeBookData(bookData) {
    const newBookKey = firebase.database().ref().child('books').push().key;
    let updates = {};
    updates['/books/' + newBookKey] = bookData;
    firebase.database().ref().update(updates);
  }

  static getBooks() {
    return firebase.database().ref('/books')
                   .orderByChild("name")
                   .once("value")
                   .then(response => response);
  }

  static getBookData(bookId) {
    return firebase.database().ref('/books/' + bookId)
                   .once('value')
                   .then(response => response.val());
  }

  static updateBookAttribute(book, field, value) {
    let bookData = book;
    bookData[field] = value;
    let updates = {};
    updates['/books/' + book.bookId] = bookData;
    firebase.database().ref().update(updates);

    return FirebaseManager.getBookData(bookData.bookId).then(response => response);
  }
}

export default FirebaseManager;
