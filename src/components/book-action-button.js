import React, { Component } from 'react';
import FirebaseManager from '../firebase-manager';

class BookActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = { book: props.book };
    this.buttonActionsNames = {
      borrow: 'Borrow book',
      return: 'Return book',
      save: 'Save book'
    }

    this.buttonClassesNames = {
      borrow: 'btn btn-info',
      return: 'btn btn-warning',
      save: 'btn btn-info'
    }

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  getAction(action) {
    return this.buttonActionsNames[action];
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


  buttonClass() {
    const actionName = this.state.book.action;
    return this.buttonClassesNames[actionName];
  }

  render() {
    return (
      <button className={this.buttonClass()} onClick={this.onButtonClick}>
        {this.getAction(this.state.book.action)}
      </button>
    );
  };
}

export default BookActionButton;
