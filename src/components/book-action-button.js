import React from 'react';
import FirebaseManager from '../firebase-manager';

const BookActionButton = ({ book }) => {
  const bookAction = () => {
    book.available ? FirebaseManager.borrowBook(book) : FirebaseManager.returnBook(book);
  }

  const actionName = () => {
    book.available ? 'Pegar emprestado' : 'Devolver'
  }

  return (
    <button className="btn btn-info" onClick={this.bookAction}>
      {this.actionName}
    </button>
  );
};

export default BookActionButton;
