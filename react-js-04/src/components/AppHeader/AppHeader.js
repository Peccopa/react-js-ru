import './AppHeader.css';

const AppHeader = ({ posts = 0, likedPosts = 0, importantPosts = 0 }) => {
  return (
    <div className="app-header d-flex">
      <h1>John Silver</h1>
      <h2>
        Записей {posts} · Понравилось {likedPosts} · Важных {importantPosts}
      </h2>
    </div>
  );
};

export default AppHeader;
