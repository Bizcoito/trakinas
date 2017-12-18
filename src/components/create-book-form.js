import React, { Component } from 'react';
import FirebaseManager from '../firebase-manager';

class CreateBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      thumbnail: '',
      description: '',
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
    alert(`The book ${this.state.name} was created!`);
    event.preventDefault();
    FirebaseManager.writeBookData(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="book-name">Name:</label>
          <input type="text"
                 className="form-control"
                 id="book-name"
                 name="name"
                 placeholder="Book name"
                 onChange={this.handleInputChange} />
        </div>

        <div className="form-group">
          <label for="book-thumbnail">Thumbnail:</label>
          <input type="text"
                 className="form-control"
                 id="book-thumbnail"
                 name="thumbnail"
                 placeholder="Book thumbnail"
                 onChange={this.handleInputChange} />
        </div>

        <div className="form-group">
          <label for="book-description">Description:</label>
          <input type="text"
                 className="form-control"
                 id="book-description"
                 name="description"
                 placeholder="Book description"
                 onChange={this.handleInputChange} />
        </div>

        <button type="submit" className="btn btn-primary" value="Submit">
          Cadastrar
        </button>
      </form>
    );
  }
}

export default CreateBookForm;
