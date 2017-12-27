import React from 'react';
import BookItem from './book-item'

const BookList = (props) => {
  const bookItems = props.books.map((book) => {
    return (
      <BookItem
        key={book.bookId}
        book={book} />
    );
  });

  return (
    <ul className="list-group">
      {bookItems}
    </ul>
  );
};

export default BookList;
