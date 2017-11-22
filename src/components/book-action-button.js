import React from 'react';
import FirebaseManager from '../firebase-manager';

const BookActionButton = () => {
  const bookAction = () => {
    this.props.book.available ? FirebaseManager.borrowBook(this.props.book) : FirebaseManager.returnBook(this.props.book);
  }

  const actionName = () => {
    this.props.book.available ? 'Pegar emprestado' : 'Devolver'
  }

  return (
    <button className="btn btn-info" onClick={this.bookAction}>
      {this.actionName}
    </button>
  );
};

export default BookActionButton;
