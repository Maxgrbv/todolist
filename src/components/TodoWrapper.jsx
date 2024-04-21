import { useState } from 'react';
import { AddTask } from './AddTask';
import { Todo } from './Todo';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm';
import { TodoSearch } from './SearchBar/SearchTask';

export const TodoWrapper = () => {
    const [originalTodos, setOriginalTodos] = useState([
        { id: uuidv4(), task: "Drink a coffee", completed: false, isEditing: false },
        { id: uuidv4(), task: "Walk the dog", completed: false, isEditing: false },
    ]); // Оригинальный список задач

    const [filterButtons, setFilterButtons] = useState({
        all: true,
        done: false,
        undone: false
      });
    const [filter, setFilter] = useState('all'); // Состояние для хранения выбранного фильтра

    const [searchText, setSearchText] = useState(''); // Состояние для хранения текста поиска
    
    function findTodo(event) {
        setSearchText(event.target.value)
    }
 
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setFilterButtons({
          ...filterButtons,
          all: newFilter === 'all',
          done: newFilter === 'done',
          undone: newFilter === 'undone'
        });
      };

    
    const addTodo = todo => {
        if (todo.trim()) {
            const newTodo = { id: uuidv4(), task: todo.trim(), completed: false, isEditing: false };
            setOriginalTodos(prevTodos => [...prevTodos, newTodo]);
        }
    };
    

    const toggleComplete = id => {
        const updatedOriginalTodos = originalTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setOriginalTodos(updatedOriginalTodos);
    };
    

    const editTodo = id => {
        const updatedTodos = originalTodos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo);
        setOriginalTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedTodos = originalTodos.filter(todo => todo.id !== id);
        setOriginalTodos(updatedTodos);
    };

    const editTask = (task, id) => {
        const updatedTodos = originalTodos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setOriginalTodos(updatedTodos);
    };

    const clearTodos = () => {
        setOriginalTodos([]);
    };

    const filteredTodos = originalTodos.filter(task => {
        if (filter === 'all') {
          return true;
        } else if (filter === 'done') {
          return task.completed;
        } else if (filter === 'undone') {
          return !task.completed;
        }
      }).filter(task => task.task.startsWith(searchText) || task.task.toLowerCase().startsWith(searchText) );
    
    return (
        <section className='TodoWrapper'>
            <h1>Get Things Done</h1>
            <div className='InputsWrapper'>
                <AddTask addTodo={addTodo} />
                <TodoSearch searchText={searchText} onFindTodo={findTodo} clearTodos={clearTodos}  />
            </div>

            <div className='CreatedTasksContainer'>
                <div className='TaskFilterButtonsContainer'>
                    <h4 className='TasksHeader'>Your daily tasks:</h4>
                    <button type='button' onClick={() => handleFilterChange('all')} className={`filter-button ${filter === 'all' ? 'active' : ''}`}>All</button>
                    <button type='button' onClick={() => handleFilterChange('done')} className={`filter-button ${filter === 'done' ? 'active' : ''}`}>Done</button>
                    <button type='button' onClick={() => handleFilterChange('undone')} className={`filter-button ${filter === 'undone' ? 'active' : ''}`}>Undone</button>
                </div>

                {filteredTodos.map((todo, index) => (
                    todo.isEditing ? (
                        <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
                    ) : (
                        <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} editTodo={editTodo} deleteTodo={deleteTodo} />
                    )
                ))}
            </div>
        </section>
    );
};
