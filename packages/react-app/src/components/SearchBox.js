import React, { Component } from 'react';

import { debounce } from 'lodash';

/**
 * SearchBox component
 */
class SearchBox extends Component {
  /**
   * Handle text change with treatment to avoid multiple api calls
   */
  handleTextChange = debounce(this.props.onChange, this.props.debounceWait);

  /**
   * Input text change handler
   */
  handleChange = event => this.handleTextChange(event.target.value);

  render() {
    return (
      <div className="input-field col s12">
        <input type="text" onChange={this.handleChange} />
        <label>Search a movie</label>
      </div>
    );
  }
}

export default SearchBox;
