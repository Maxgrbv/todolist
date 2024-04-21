import React, { useState } from 'react';

export const TodoSearch = ({ searchText, onFindTodo, clearTodos }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className='search-container'>
      <input
        className='search-input' 
        placeholder={isFocused ? '' : 'Search...'}
        value={searchText}
        onChange={onFindTodo}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button 
        onClick={clearTodos}
        type='button' 
        className='clear-btn'>Clear</button>
    </div>
  )
}