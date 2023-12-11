import React, { useState } from 'react';
import Todo from './Todo';

function TodoList({ todos, deleteTodo, toggleCompleted }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const todosPerPage = 5;

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByStatus = filterOption === 'completed'
    ? filteredTodos.filter(todo => todo.completed)
    : filterOption === 'incomplete'
    ? filteredTodos.filter(todo => !todo.completed)
    : filteredTodos;

  const currentTodos = filteredByStatus.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(filteredByStatus.length / todosPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="post-list">
      <div className="filter-container">
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <div className='search-container'>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        </div>
        
      </div>

      {currentTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleCompleted={toggleCompleted}
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

export default TodoList;
