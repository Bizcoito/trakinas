import React, { Component } from 'react';
import FirebaseManager from '../firebase-manager';

class BookActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = { book: props.book };

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  static getAction(action) {
    const actions = {
      borrow: 'Borrow book',
      return: 'Return book',
      save: 'Save book'
    }
    return actions[action];
  }

  updateAvailableAttribute(status) {
    FirebaseManager.updateBookAttribute(this.state.book, 'available', status).then((response) => {
      const action = response.available ? 'borrow' : 'return';
      const book = { ...response, action };

      this.setState({ book });
    });
  }

  onButtonClick() {
    this.updateAvailableAttribute(!this.state.book.available);
  }

  render() {
    return (
     <button className="btn btn-info" onClick={this.onButtonClick}>
        {BookActionButton.getAction(this.state.book.action)}
     </button>
   );
 };
}

export default BookActionButton;
