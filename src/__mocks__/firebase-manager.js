class FirebaseManager {
  static updateBookAttribute(book, field, value) {
    return new Promise((resolve, reject) => {
      const responseBook = book;
      responseBook.available = value;
      resolve(responseBook);
    });
  }
}

export default FirebaseManager;
