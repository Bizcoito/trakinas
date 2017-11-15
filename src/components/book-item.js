import React from 'react';
import FirebaseManager from '../firebase-manager';

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
                    // ^ same thing that : const book = props.book;
  const imageUrl = mainThumbnail(book.volumeInfo.imageLinks);
  const bookData = {
    userId: null,
    name: book.volumeInfo.title,
    thumbnail: imageUrl,
    description: 'testing description'
  }

  return (
    <div className="book-list media">
      <div className="media-left">
        <img className="media-object" src={imageUrl} />
      </div>

      <div className="media-body">
        <div className="media-heading">
          {book.volumeInfo.title}
        </div>
        <button className="btn btn-info" onClick={ () => FirebaseManager.writeBookData(bookData) }>
          Adicionar ao acervo
        </button>
      </div>
    </div>
  );
};

export default BookItem;
