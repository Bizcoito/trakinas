import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BookList from './components/book-list';
import SearchBar from './components/search-bar';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.googleBooksEndpoint = 'https://www.googleapis.com/books/v1/volumes'
    this.googleApiKey = 'AIzaSyCdJvgLdKZHXr_59YEyRv4H1z1La2uzvk0';
    this.state = {
      books: []
    };

    this.bookSearch('flowers');
  }

  bookSearch(searchTerm) {
    axios.get(`${this.googleBooksEndpoint}?q=${searchTerm}&key=${this.googleApiKey}`)
      .then(response => {
        const books = response.data.items
        this.setState({ books });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const bookSearch = (term) => { this.bookSearch(term); }

    return (
      <div>
        <SearchBar onSearchTermChange={bookSearch} />
        <div className="row">
          <BookList
            books={this.state.books} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('.container'));
