import React from 'react'
import { useState } from 'react'

export const TodoSearch = ({ searchTodo }) => {
  const [title, setTitle] = useState('');
  return (
    <form className='TodoSearch'>
      <input
        className='todo-input' 
        placeholder='Lets find your task'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button className='todo-btn' onClick={() => {
        /* setTitle(''); */
        searchTodo(title);
        
      }}>Find</button>
    </form>
  )
}