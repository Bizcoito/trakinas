import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BookList from './components/book-list';
import SearchBar from './components/search-bar';
import axios from 'axios';
import FirebaseManager from './firebase-manager';

class App extends Component {
  constructor(props) {
    super(props);
    FirebaseManager.init();

    this.googleBooksEndpoint = 'https://www.googleapis.com/books/v1/volumes';
    this.googleApiKey = 'AIzaSyCdJvgLdKZHXr_59YEyRv4H1z1La2uzvk0';
    this.state = {
      books: []
    };

    this.setBooks();
  }

  setBooks() {
    const response = FirebaseManager.getBooks();

    response.then((firebaseResponse) => {
      const books = [];
      const booksObject = firebaseResponse.val();

      Object.keys(booksObject).map((key) => {
        booksObject[key].bookId = key;
        books.push(booksObject[key]);
      })

      this.setState({ books });
    })
  }

  bookSearch(searchTerm) {
    axios.get(`${this.googleBooksEndpoint}?q=${searchTerm}&key=${this.googleApiKey}`)
         .then(response => {
           const books = response.data.items;
           this.setState({ books });
          })
         .catch((error) => {
           console.log(error);
          });
  }

  render() {
    const bookSearch = _.debounce((term) => { this.bookSearch(term) }, 300);
    const navbarInstance = (
      <nav className="navbar navbar-light bg-faded trakinas-navbar">
        <a className="navbar-brand" href="#">
          <img className="trakinas-logo" src="http://icon-icons.com/icons2/529/PNG/128/Cake_with_biscuit_1_icon-icons.com_52568.png" />
        </a>
        <button className="btn btn-info trakinas-navbar-btn" href="javascript:void(0)">Cadastrar livro</button>
        <form className="form-inline">
          <SearchBar
            placeholder="Search"
            onSearchTermChange={bookSearch} />
        </form>
      </nav>
    );

    return (
      <div className="container">
        {navbarInstance}
        <div className="row">
          <BookList
            books={this.state.books} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('.container'));
