import React from 'react';
import BookItem from '../components/book-item';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('BookItem', () => {
  const book = {
    bookId: '123qwe',
    name: 'Xunda',
    description: 'Damironga',
    thumbnail: 'http://pix.toile-libre.org/upload/original/1499647888.png',
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(<BookItem key={book.bookId} book={book} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders props on html', () => {
    const component = mount(<BookItem key={book.bookId} book={book} />);
    expect(component.find('img.media-object').props().src).toEqual(book.thumbnail);
    expect(component.find('h4').text()).toEqual(book.name);
    expect(component.find('p').text()).toEqual(book.description);
    expect(component.find('BookActionButton').props().book).not.toBeNull();
  });
});
