import React, { useState } from 'react';
import { Todo } from './Todo';

export const TodoList = ({ todos }) => {
  const [filter, setFilter] = useState('all'); // Изначально показываем все задачи

    const filteredTodos = todos.filter((todo) => {
      if (filter === "done") {
        return todo.completed;
      } else if (filter === "undone") {
        return !todo.completed;
      } else if (filter === 'all') {
        return true
      }
    });

  return (
    <div>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('done')}>Done</button>
      <button onClick={() => setFilter('undone')}>Undone</button>
      {/* Добавляем кнопки "Done", "Undone" и "All" */}
      {filteredTodos.map(todo => (
        <Todo key={todo.id} task={todo} />
      ))}
    </div>
  );
};
