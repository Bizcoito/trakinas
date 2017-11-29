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
            .once("value")
            .then(response => response);
  }

  static readBookData(bookId) {
    let bookData;
    firebase.database().ref('/books/' + bookId).once('value').then(function(snapshot) {
      bookData = snapshot.val();
    });
    return bookData;
  }

  static borrowBook(book) {
    // emprestar livro significa atualizar a propriedade 'available' para false
  }

  static returnBook(book) {
    // devolver livro significa atualizar a propriedade 'available' para true 
  }
}

export default FirebaseManager;
