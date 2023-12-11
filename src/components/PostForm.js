import React, { useState } from 'react';

const PostForm = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    addPost(title, body);
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className='post-form'>
      <label>Title:</label><br/>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Body:</label><br/>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <br />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
