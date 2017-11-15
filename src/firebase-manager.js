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
    debugger;
    const newBookKey = firebase.database().ref().child('books').push().key;
    var updates = {};
    updates['/books/' + newBookKey] = bookData;
    firebase.database().ref().update(updates);
  }

  static getBooks() {
    firebase.database().ref('/books')
      .once("value")
      .then(function(response) {
        console.log(response.val());
      });
  }

  static readBookData(bookId) {
    firebase.database().ref('/books/' + bookId).once('value').then(function(snapshot) {
      const book = (snapshot.val() || 'deu ruim');
    });
  }
}

export default FirebaseManager;
