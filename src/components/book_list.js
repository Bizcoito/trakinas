import React from 'react';
import BookListItem from './book_item'

const BookList = (props) => {
  const bookItems = props.books.map((book) => {
    return (
      <li key={book.etag} className="list-group-item">
        <BookListItem
          book={book} />
      </li>
    );
  });

  return (
    <ul className="col-md-4 list-group">
      {bookItems}
    </ul>
  );
};

export default BookList;
