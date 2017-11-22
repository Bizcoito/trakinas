import React from 'react';
import FirebaseManager from '../firebase-manager';
import BookActionButton from './book-action-button';

const mainThumbnail = (thumbnailInfo) => {
  let thumbnail = thumbnailInfo;
  if (!thumbnail) {
    thumbnail = "http://pix.toile-libre.org/upload/original/1499647888.png";
  } else {
    thumbnail = thumbnailInfo.smallThumbnail;
  }

  return thumbnail;
};

const BookItem = ({book}) => {
                 // ^ same thing that: const book = this.props.book;

  const imageUrl = mainThumbnail(book.volumeInfo.imageLinks);

  return (
    <div className="book-list media">
      <div className="media-left">
        <img className="media-object" src={imageUrl} />
      </div>
      <div className="media-body">
        <div className="media-heading">
          {book.volumeInfo.title}
        </div>
        <BookActionButton book={book} />
      </div>
    </div>
  );
};

export default BookItem;
