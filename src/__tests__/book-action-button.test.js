jest.mock('../firebase-manager');

import React from 'react';
import BookActionButton from '../components/book-action-button';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('BookActionButton', () => {
  const book = {
    bookId: '1235asdf',
    name: 'ASDF',
    description: 'SistemasDeInformação',
    thumbnail: 'http://pix.toile-libre.org/upload/original/1499647888.png',
    available: true,
    xunda: 'xunda',
  }

  const bookLiteralStates = {
    available: 'Borrow book',
    rented: 'Return book',
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(<BookActionButton book={book} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows an available book', () => {
    const component = mount(<BookActionButton book={book} />);
    expect(component.state().book.available).toEqual(book.available);
    expect(component.find('button').text()).toEqual(bookLiteralStates.available);
  });

  it('changes book available and component state after click', () => {
    const component = mount(<BookActionButton book={book} />);
    const expectedAvailableStateAfterClick = !book.available;

    component.find('button').simulate('click');

    expect(component.state().book.available).toEqual(expectedAvailableStateAfterClick);
  });
});
