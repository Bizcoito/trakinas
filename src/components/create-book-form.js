import React, { Component } from 'react';
import FirebaseManager from '../firebase-manager';
import BooksRepository from '../books-repository';

class CreateBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      thumbnail: '',
      description: '',
      available: true
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    alert(`The book ${this.state.name} was created in the records!`);
    event.preventDefault();

    const dbInterface = new FirebaseManager;
    const booksRepository = new BooksRepository(dbInterface);
    booksRepository.createBook(this.state);

    this.props.submitCallback();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="book-name">Name:</label>
          <input type="text"
            className="form-control"
            id="book-name"
            name="name"
            placeholder="Book name"
            required="true"
            onChange={this.handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="book-thumbnail">Thumbnail:</label>
          <input type="url"
            className="form-control"
            id="book-thumbnail"
            name="thumbnail"
            placeholder="Book thumbnail"
            required="true"
            onChange={this.handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="book-description">Description:</label>
          <textarea type="text-area"
            className="form-control"
            id="book-description"
            name="description"
            placeholder="Book description"
            required="true"
            onChange={this.handleInputChange} />
        </div>

        <button type="submit" className="btn btn-primary" value="Submit">
          Save book
        </button>
      </form>
    );
  }
}

export default CreateBookForm;
