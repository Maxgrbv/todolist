import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { EditTodoForm } from './EditTodoForm'

export const Todo = ({ task, toggleComplete, editTodo, deleteTodo }) => {
  const handleEditClick = (event) => {
    console.log('Edit clicked for task:', task.id);
    event.stopPropagation(); // Предотвращаем всплытие события, чтобы не вызывался toggleComplete
    editTodo(task.id); // Вызываем editTodo с id задачи
  };

  const handleDeleteClick = (event) => {
    console.log('Delete clicked for task:', task.id);
    event.stopPropagation(); // Предотвращаем всплытие события, чтобы не вызывался toggleComplete
    deleteTodo(task.id); // Вызываем deleteTodo с id задачи
  };

  return (
    <div className={`Todo ${task.completed ? 'completed' : ''}`} onClick={() => toggleComplete(task.id)}>
      <div className='taskContent'>
        <p className={`taskElement ${task.completed ? 'completed' : ''}`}>
          {task.task}
        </p>
        <div className='taskIconsContainer'>
          <FontAwesomeIcon className='check-icon' icon={faCheck} onClick={() => toggleComplete(task.id)} />
          <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} onClick={handleEditClick} />
          <FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
};
