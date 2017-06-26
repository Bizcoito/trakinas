import React from 'react';

const BookItem = ({book}) => {
                    // ^ same thing that : const book = props.book;
  const imageUrl = "http://books.google.com/books/content?id=_oG_iTxP1pIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"

  return (
    <div className="book-list media">
      <div className="media-left">
        <img className="media-object" src={imageUrl} />
      </div>

      <div className="media-body">
        <div className="media-heading">
          {book.volumeInfo.title}
        </div>
      </div>
    </div>
  );
};

export default BookItem;
