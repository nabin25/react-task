import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='post-form'>
      <label>Title:</label><br/>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <button type="submit">Create Todo</button>
    </form>
  );
};

export default TodoForm;