import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BookList from './components/book-list';
import SearchBar from './components/search-bar';
import axios from 'axios';
import FirebaseManager from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    FirebaseManager.init();

    this.googleBooksEndpoint = 'https://www.googleapis.com/books/v1/volumes'
    this.googleApiKey = 'AIzaSyCdJvgLdKZHXr_59YEyRv4H1z1La2uzvk0';
    this.state = {
      books: []
    };

    this.bookSearch('flowers');
    FirebaseManager.writeBookData('12hhshax123123d', null, 1);
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
    const bookSearch = _.debounce((term) => { this.bookSearch(term) }, 300);

    return (
      <div>
        <div className="row trakinas-navbar">
          <div className="input-group">
            <span className="input-group-addon">
              <img className="trakinas-logo" src="http://icon-icons.com/icons2/529/PNG/128/Cake_with_biscuit_1_icon-icons.com_52568.png" />
            </span>
            <SearchBar
              placeholder="Search"
              onSearchTermChange={bookSearch} />
          </div>
        </div>
        <div className="row">
          <BookList
            books={this.state.books} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('.container'));
