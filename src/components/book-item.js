import React from 'react';
import FirebaseManager from '../firebase-manager';
import BookActionButton from './book-action-button';

const BookItem = ({ book }) => {
                 // ^ same thing that: const book = this.props.book;

  return (
    <div className="book-list media">
      <div className="media-left">
        <img className="media-object" src={book.thumbnail} />
      </div>
      <div className="media-body">
        <div className="media-heading">
          {book.name}
        </div><div className="media-heading">
          {book.description}
        </div>
        <BookActionButton book={book} />
      </div>
    </div>
  );
};

export default BookItem;
// description: "testing description"
// name: "Flowers and the flower garden"
// thumbnail: "http://books.google.com/books/conten