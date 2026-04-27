import { Component } from 'react';
import './SearchPanel.css';

class SearchPanel extends Component {
  constructor() {
    super();

    this.state = {
      term: '',
    };
  }

  onUpdateSearch(event) {
    this.setState(({ term }) => ({ term: event.target.value }));
    this.props.onUpdateSearch(this.state.term);
  }

  render() {
    return (
      <input
        className="form-control search-input"
        type="text"
        placeholder="Поиск по записям"
        onChange={(event) => {
          this.onUpdateSearch(event);
        }}
        value={this.state.term}
      />
    );
  }
}

export default SearchPanel;
