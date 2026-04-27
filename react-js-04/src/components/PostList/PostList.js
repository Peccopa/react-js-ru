import PostListItem from '../PostListItem/PostListItem';
import './PostList.css';

const PostList = (props) => {
  const { posts, deletePost, onToggleImportant, onToggleLiked } = props;

  const elements = posts.map(({ id, label, important, like }) => {
    return (
      <PostListItem
        key={id}
        id={id}
        label={label}
        important={important}
        like={like}
        deletePost={deletePost}
        onToggleImportant={onToggleImportant}
        onToggleLiked={onToggleLiked}
      />
    );
  });

  return <ul className="app-list list group">{elements}</ul>;
};

export default PostList;
