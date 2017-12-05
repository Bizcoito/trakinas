import React, { Component } from 'react';
import FirebaseManager from '../firebase-manager';

class BookActionButton extends Component {
  constructor(props) {
    super(props)
    this.state = { book: props.book };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.updateAvailableAttribute(!this.state.book.available);
  }

  updateAvailableAttribute(status) {
    FirebaseManager.updateBookAttribute(this.state.book, 'available', status).then((response) => {
      this.setState({ book: response });
    });
  }

  render() {
    return (
     <button className="btn btn-info" onClick={this.onButtonClick}>
       {this.state.book.available ? 'Pegar emprestado' : 'Devolver'}
     </button>
   );
 };
}

export default BookActionButton;
