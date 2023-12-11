import React, { useState } from 'react';
import Post from './Post';

function PostList({ posts, deletePost, editPost }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCommentPostId, setOpenCommentPostId] = useState(null); 
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
    setOpenCommentPostId(null); 
  };

  const handleCommentToggle = (postId) => {
    setOpenCommentPostId(openCommentPostId === postId ? null : postId);
  };

  return (
    <div className="post-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {currentPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          deletePost={deletePost}
          editPost={editPost}
          toggleComments={() => handleCommentToggle(post.id)}
          isCommentsOpen={openCommentPostId === post.id}
        />
      ))}

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PostList;
