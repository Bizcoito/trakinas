import React from 'react';
import BookItem from '../../src/components/book-item';
import renderer from 'react-test-renderer';

describe('BookItem', () => {
  let book = {
    bookId: '123qwe',
    name: 'Xunda',
    description: 'Damironga'
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(<BookItem key={book.bookId} book={book} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
