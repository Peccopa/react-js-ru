import { Component } from 'react';
import './PostListItem.scss';

class PostListItem extends Component {
  // constructor({ id, label, like, important }) {
  //   super();

  //   this.state = {
  //     id: id || null,
  //     label: label || '',
  //     like: like || false,
  //     important: important || false,
  //   };
  // }

  // onLike(id) {
  //   this.setState(({ like }) => ({
  //     like: !like,
  //   }));
  //   this.props.onToggleLiked(id);
  // }

  // onImportant(id) {
  //   this.setState(({ important }) => ({
  //     important: !important,
  //   }));
  //   this.props.onToggleImportant(id);
  // }

  render() {
    const { id, label, like, important, onToggleImportant, onToggleLiked } =
      this.props;
    let classNames = 'app-list-item d-flex justify-content-between';
    if (important) classNames += ' important';
    if (like) classNames += ' like';

    return (
      <li className={classNames}>
        <span className="app-list-item-label" onClick={() => onToggleLiked(id)}>
          {label}
        </span>
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-star btn-sm"
            onClick={() => onToggleImportant(id)}
          >
            <i className="fa fa-star"></i>
          </button>
          <button
            type="button"
            className="btn-trash btn-sm"
            onClick={() => {
              this.props.deletePost(id);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
          <i
            className="fa fa-heart"
            style={{ cursor: 'pointer' }}
            onClick={() => onToggleLiked(id)}
          ></i>
        </div>
      </li>
    );
  }
}

export default PostListItem;
