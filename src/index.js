import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BookList from './components/book-list';
import SearchBar from './components/search-bar';
import Modal from './components/modal';
import CreateBookForm from './components/create-book-form';
import FirebaseManager from './firebase-manager';
import BooksRepository from './books-repository';
import FetchGoogleBooks from './components/fetch-google-books';

class App extends Component {
  constructor(props) {
    super(props);
    const dbInterface = new FirebaseManager;

    this.booksRepository = new BooksRepository(dbInterface);
    this.state = {
      books: [],
      isModalOpenAddBookManually: false,
      isModalOpenGoogleBooksAdd: false,
    };
    this.setBooks();
    this.toggleModal = this.toggleModal.bind(this);
    this.handleModalCallback = this.handleModalCallback.bind(this);
  }

  setBookAction(book) {
    return {
      ...book,
      action: book.available ? 'borrow' : 'return'
    }
  }

  setBooks() {
    const response = this.booksRepository.getBooks();

    response.then((firebaseResponse) => {
      const books = [];
      let book;

      firebaseResponse.forEach((child) => {
        book = this.setBookAction(child.val());
        books.push(book);
      });


      this.setState({ books });
    })
  }

  bookSearch(searchTerm) {
    const booksPromise = this.booksRepository.searchBook(searchTerm);
    let books;

    booksPromise.then(firebaseBooks => {
      books = firebaseBooks.map((book) => {
        return this.setBookAction(book);
      });

      this.setState({ books })
    });
  }

  handleModalCallback() {
    this.closeModal();
    this.setBooks();
  }

  toggleModal(identifier, visibilityState) {
    const modal = `isModalOpen${identifier}`;
    const state = {};
    state[modal] = visibilityState;
    this.setState(state);
  }

  render() {
    const bookSearch = _.debounce((searchTerm) => { this.bookSearch(searchTerm) }, 300);
    const navbarInstance = (
      <div className="row fake-navbar">
        <div className="col-3">
          <img className="trakinas-logo" src="https://avatars3.githubusercontent.com/u/29185183?s=200&v=4" />
          <button className="btn btn-info trakinas-navbar-btn"
            onClick={() => { this.toggleModal('AddBookManually', true) }}>
            New book
          </button>
        </div>

        <div className="col-3">
          <button className="btn btn-info trakinas-navbar-btn"
            onClick={() => { this.toggleModal('GoogleBooksAdd', true) }}>
            New book from Google
          </button>
        </div>

        <div className="col-6">
          <SearchBar placeholder="Search" onSearchTermChange={bookSearch} />
        </div>
      </div>
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
          id="add-book-manually"
          isModalOpen={this.state.isModalOpenAddBookManually}
          closeModal={() => { this.toggleModal('AddBookManually', false) }}
          style={modalStyle}>
          <h2>New book</h2>
          <CreateBookForm submitCallback={this.handleModalCallback} />
        </Modal>
        <Modal
          id="google-books-add"
          isModalOpen={this.state.isModalOpenGoogleBooksAdd}
          closeModal={() => { this.toggleModal('GoogleBooksAdd', false) }}
          style={modalStyle}>
          <h2>Google Books</h2>
          <FetchGoogleBooks />
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App></App>, document.querySelector('.container'));
