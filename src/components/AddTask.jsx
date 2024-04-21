import React from 'react'
import { useState } from 'react'

export const AddTask = ({addTodo}) => {
    const [value, setValue] = useState ('')
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };
    
    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (value.trim() !== '') {
          addTodo(value)
          setValue('')
        }
    }

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') { // Проверяем, нажата ли клавиша Enter
          handleSubmit(e);
      }
  };

  return (
    <div className='AddTask'>
        <input 
        type="text" 
        className='todo-input' 
        value={value}
        placeholder={isFocused ? '' : "What's your tasks today?"}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress} 
        />
        <button 
        onClick={handleSubmit}
        type='button' 
        className='add-btn'>Add Task</button>
    </div>
  )
}
