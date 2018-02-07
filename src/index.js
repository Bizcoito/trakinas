import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BookList from './components/book-list';
import SearchBar from './components/search-bar';
import Modal from './components/modal';
import CreateBookForm from './components/create-book-form';
import axios from 'axios';
import FirebaseManager from './firebase-manager';
import BooksRepository from './books-repository';

class App extends Component {
  constructor(props) {
    super(props);
    FirebaseManager.init();
    const dbInterface = new FirebaseManager;

    this.booksRepository = new BooksRepository(dbInterface);
    this.googleBooksEndpoint = 'https://www.googleapis.com/books/v1/volumes';
    this.googleApiKey = 'AIzaSyCdJvgLdKZHXr_59YEyRv4H1z1La2uzvk0';
    this.state = {
      books: [],
      isModalOpen: false,
      isInnerModalOpen: false,
    };

    this.setBooks();
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleModalCallback = this.handleModalCallback.bind(this);
  }

  setBooks() {
    const response = this.booksRepository.getBooks();

    response.then((firebaseResponse) => {
      const books = [];

      firebaseResponse.forEach((child) => {
        books.push(child.val());
      });

      this.setState({ books });
    })
  }

  bookSearch(searchTerm) {
    const booksPromise = this.booksRepository.searchBook(searchTerm);
    booksPromise.then(books => this.setState({ books }));
  }

  handleModalCallback() {
    this.closeModal();
    this.setBooks();
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  googleBooksSearch(searchTerm) {
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
    const bookSearch = _.debounce((searchTerm) => { this.bookSearch(searchTerm) }, 300);
    const navbarInstance = (
      <nav className="navbar navbar-light bg-faded trakinas-navbar">
        <a className="navbar-brand" href="javascript:void(0)">
          <img className="trakinas-logo" src="http://icon-icons.com/icons2/529/PNG/128/Cake_with_biscuit_1_icon-icons.com_52568.png" />
        </a>

        <button className="btn btn-info trakinas-navbar-btn" onClick={this.openModal}>New book</button>
        <form className="form-inline">
          <SearchBar placeholder="Search" onSearchTermChange={bookSearch} />
        </form>
      </nav>
    );

    const modalStyle = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0,0.5)'
      }
    };

    return (
      <div className="container">
        {navbarInstance}

        <BookList books={this.state.books} />

        <div className="text-center">
          Bizcoito Brothers LTDA - 2017/18
        </div>

        <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}>
          <h2>New book</h2>
          <CreateBookForm submitCallback={this.handleModalCallback} />
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('.container'));
