import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BookList from './components/book_list';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyCdJvgLdKZHXr_59YEyRv4H1z1La2uzvk0')
      .then(response => {
        const books = response.data.items
        this.setState({ books });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <BookList
            books={this.state.books} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('.container'));
