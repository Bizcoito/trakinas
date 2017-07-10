import React from 'react';
import BookItem from './book-item';

const BookListItem = ({book}) => {

  return (
    <li className="list-group-item">
      <BookItem
        book={book} />
    </li>
  );
};

export default BookListItem;
