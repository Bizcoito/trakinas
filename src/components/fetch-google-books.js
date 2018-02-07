import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import SearchBar from './search-bar';
import BookList from './book-list';

class FetchGoogleBooks extends Component {
  constructor() {
    super();
    this.googleBooksEndpoint = 'https://www.googleapis.com/books/v1/volumes';
    this.googleApiKey = 'AIzaSyCdJvgLdKZHXr_59YEyRv4H1z1La2uzvk0';
    this.state = {
      books: []
    }
  }

  parseGoogleBooksItems(books) {
    let googleBook;

    return books.map(book => {
      googleBook = book.volumeInfo;
      return {
        bookId: book.etag,
        name: googleBook.title,
        description: googleBook.description,
        thumbnail: googleBook.imageLinks.thumbnail,
        action: 'save'
      }
    })
  }

  googleBooksSearch(searchTerm) {
    return axios.get(`${this.googleBooksEndpoint}?q=${searchTerm}&key=${this.googleApiKey}`)
      .then(response => {
        return response.data.items;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchBook(searchTerm) {
    const googleBooksPromise = this.googleBooksSearch(searchTerm);

    googleBooksPromise.then(googleBooks => {
      const books = this.parseGoogleBooksItems(googleBooks);

      this.setState({ books });
    });
  }

  render() {
    const fetchBook = _.debounce((searchTerm) => {
      this.fetchBook(searchTerm)
    }, 300);

    return (
      <div className="container">
        <div className="row">
          <form className="form-inline">
            <SearchBar placeholder="Search" onSearchTermChange={fetchBook} />
          </form>
        </div>
        <hr></hr>
        <div className="row">
          <BookList books={this.state.books} />
        </div>
      </div>
    );
  }
}

export default FetchGoogleBooks;
