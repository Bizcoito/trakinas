import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  onInputChange(searchTerm) {
    this.setState({ searchTerm });
    this.props.onSearchTermChange(searchTerm);
  }

  render() {
    return (
      <input
        className="search-bar-input"
        placeholder="The book is on the table..."
        value={this.state.searchTerm}
        onChange={event => this.onInputChange(event.target.value)}
      />
    );
  }
}

export default SearchBar;
