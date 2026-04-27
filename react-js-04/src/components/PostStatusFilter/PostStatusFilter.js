import { Component } from 'react';
import './PostStatusFilter.css';
// import { Button } from 'reactstrap';

class PostStatusFilter extends Component {
  constructor() {
    super();

    this.state = {};

    this.buttons = [
      { name: 'all', label: 'Все' },
      { name: 'like', label: 'Понравилось' },
      { name: 'important', label: 'Важные' },
    ];
  }

  render() {
    const buttons = this.buttons.map(({ name, label }) => {
      const active = this.props.filter === name;
      return (
        <button
          key={name}
          type="button"
          className={active ? 'btn btn-info' : 'btn btn-outline-secondary'}
          onClick={() => this.props.onFilterSelect(name)}
        >
          {label}
        </button>
      );
    });

    return <div className="btn-group">{buttons}</div>;
  }
}

export default PostStatusFilter;
