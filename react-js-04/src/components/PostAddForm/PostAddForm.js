import React, { Component } from 'react';
import './PostAddForm.css';

class PostAddForm extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
    };

    this.inputRef = React.createRef();
  }

  onValueChange(event) {
    this.setState(({ text }) => ({ text: event.target.value }));
  }

  onSubmit(event) {
    event.preventDefault();

    const { text } = this.state;
    if (!text.length) return;

    this.props.addPost(text);
    this.setState(({ text }) => ({ text: '' }));

    this.inputRef.current.blur();
  }

  render() {
    return (
      <form
        className="bottom-panel d-flex"
        onSubmit={(event) => this.onSubmit(event)}
      >
        <input
          ref={this.inputRef}
          type="text"
          placeholder="О чём вы думаете сейчас?"
          className="form-control new-post-label"
          onChange={(event) => this.onValueChange(event)}
          value={this.state.text}
        />
        <button type="submit" className="btn btn-outline-secondary">
          Добавить
        </button>
      </form>
    );
  }
}

export default PostAddForm;
