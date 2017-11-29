import React from 'react';
import BookListItem from './book-list-item'

const BookList = (props) => {
  const bookItems = props.books.map((book) => {
    return (
      <BookListItem
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
