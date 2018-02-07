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
    this.booksFallback = {
      name: '',
      description: 'This book has not description',
      thumbnail: 'https://user-images.githubusercontent.com/6999140/35893855-ebd1eac6-0b7d-11e8-8019-83faf67bcb72.png',
    }
    this.state = {
      books: []
    }
  }

  parseGoogleBooksItems(books) {
    let googleBook;
    let thumbnail;

    return books.map(book => {
      googleBook = book.volumeInfo;
      thumbnail = googleBook.imageLinks ? googleBook.imageLinks.thumbnail : this.booksFallback.thumbnail;

      return {
        bookId: book.etag,
        name: googleBook.title || this.booksFallback.name,
        description: googleBook.description || this.booksFallback.description,
        thumbnail: thumbnail,
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
      let books = [];
      if (googleBooks) books = this.parseGoogleBooksItems(googleBooks);

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
