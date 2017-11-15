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

  static writeBookData(googleBooksId, userId, quantity) {
    firebase.database().ref('books/' + googleBooksId).set({
      googleBooksId: googleBooksId,
      userId: userId,
      quantity : quantity
    });
  }
}

export default FirebaseManager;
