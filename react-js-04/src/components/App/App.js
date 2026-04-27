import { Component } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import PostAddForm from '../PostAddForm/PostAddForm';
import PostList from '../PostList/PostList';
import PostStatusFilter from '../PostStatusFilter/PostStatusFilter';
import SearchPanel from '../SearchPanel/SearchPanel';
// import styled from 'styled-components';
import './App.css';

// const AppBlock = styled.div`
//   .app {
//     margin: 0 auto;
//     max-width: 800px;
//   }
// `;

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [
        { id: 1, label: 'Going to learn React', important: true, like: false },
        { id: 2, label: 'That is so good', important: false, like: false },
        { id: 3, label: 'I need a break...', important: false, like: false },
        { id: 4, label: 'Here we go again!', important: true, like: true },
      ],
      term: '',
      filter: 'all',
    };
  }

  addPost = (body) => {
    this.setState(({ data }) => {
      const newPost = {
        id: data.length + 1,
        label: body,
        important: false,
      };

      return {
        data: [...data, newPost],
      };
    });
  };

  deletePost = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((post) => post.id !== id),
    }));
  };

  searchPost(posts, term) {
    if (term.length === 0) return posts;

    return posts.filter((post) => {
      return post.label.indexOf(term) > -1;
    });
  }

  filterPost(posts, filter) {
    if (filter === 'like') {
      return posts.filter((post) => post.like);
    } else if (filter === 'important') {
      return posts.filter((post) => post.important);
    } else {
      return posts;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  toggleProperty(id, prop) {
    this.setState(({ data }) => ({
      data: data.map((post) =>
        post.id === id ? { ...post, [prop]: !post[prop] } : post,
      ),
    }));
  }

  onToggleImportant = (id) => {
    this.toggleProperty(id, 'important');
  };

  onToggleLiked = (id) => {
    this.toggleProperty(id, 'like');
  };

  render() {
    const { data, term, filter } = this.state;
    const posts = data.length;
    const likedPosts = data.filter((post) => post.like).length;
    const importantPosts = data.filter((post) => post.important).length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <div className="app">
        <AppHeader
          posts={posts}
          likedPosts={likedPosts}
          importantPosts={importantPosts}
        />
        <div className="search-panel d-flex">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList
          posts={visiblePosts}
          deletePost={this.deletePost}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm addPost={this.addPost} />
      </div>
    );
  }
}

export default App;
