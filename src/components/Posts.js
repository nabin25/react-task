import React, { useEffect, useState } from 'react';
import Post from './Post';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((response) => {
        const filteredPosts = response.filter((post) => post.userId === 1);
        setPosts(filteredPosts);
      });
  }, []);

  return (
    <div>
      <h2>Posts with userId 1</h2>
        {posts.map((post) => (
          <Post key={post.id} post={post}/>
        ))}
    </div>
  );
}

export default Posts;
