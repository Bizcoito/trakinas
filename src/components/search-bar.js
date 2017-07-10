import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: '' }; // this is the first and
                                     // only time we change state
                                     // like that!
                                     // Afterwards we will use
                                     //   this.setState({});
  }

  onInputChange(term) {
    this.setState({searchTerm: term});
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <input
        className="form-control"
        value = {this.state.searchTerm}
        onChange = {event => this.onInputChange(event.target.value)}
      />
    );
  }
}

export default SearchBar;
