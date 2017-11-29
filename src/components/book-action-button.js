import React from 'react';
import FirebaseManager from '../firebase-manager';

const BookActionButton = ({ book }) => {
  return (
    <button className="btn btn-info" onClick={book.available ? FirebaseManager.borrowBook(book) : FirebaseManager.returnBook(book)}>
      {book.available ? 'Pegar emprestado' : 'Devolver'}
    </button>
  );
};

export default BookActionButton;
