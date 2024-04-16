import React from 'react'
import { useState } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm';
import { TodoSearch } from './TodoSearch';



export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = todo => {
        setTodos([...todos, {id: uuidv4(), task: todo,  completed: false, isEditing: false}])
        console.log(todos)
    }

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo ))
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo ))
    }
    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {... todo, task, isEditing: !todo.isEditing} : todo ))
    }
/*
    const searchTodo = () => {
        setTodos(todos.filter(todo => todo.id !== todos.id))
    }
*/

    function searchTodo(task) {
        setTodos(todos.filter(todo => todo.task === task));
      }

   
  return (
    <div className='TodoWrapper'>
        <h1>Get Things Done</h1>
        <TodoSearch searchTodo={searchTodo} />
        <TodoForm addTodo={addTodo} />

        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
            <Todo task={todo} key={index} toggleComplete={toggleComplete} editTodo={editTodo} deleteTodo={deleteTodo} />
            )
        
        ))}
       
    </div>
  )
}
