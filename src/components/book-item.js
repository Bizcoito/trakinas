import React from 'react';
import FirebaseManager from '../firebase-manager';
import BookActionButton from './book-action-button';

const BookItem = ({ book }) => {
                 // ^ same thing that: const book = this.props.book;

  return (
    <div className="list-group-item media row">
      <div className="media-left book-thumbnail">
        <img className="media-object" src={book.thumbnail} />
      </div>
      <div className="media-body">
        <div className="media-heading">
          <h4>{book.name}</h4>
          <p>{book.description}</p>
          <div><BookActionButton book={book} /></div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
