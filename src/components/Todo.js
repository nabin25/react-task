import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

function Todo({todo, deleteTodo,toggleCompleted}) {
    const todoClassName = todo.completed ? 'completed' : 'incomplete';

    const delTodo = () => {
    deleteTodo(todo.id);
  }

  const completeTodo = () => {
    toggleCompleted(todo.id)
  }
    return (
        <div className={'post-card ' + todoClassName}>
        <h3>{todo.title}</h3>
        <p>{todo.body}</p>
        <div className="post-actions">
          <button onClick={completeTodo}>{todo.completed===true?'Mark as incomplete':'Mark as complete'}</button>
          <button onClick={delTodo}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
  )
}

export default Todo