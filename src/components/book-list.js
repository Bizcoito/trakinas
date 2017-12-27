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
    <div className="list-group container">
      {bookItems}
    </div>
  );
};

export default BookList;
