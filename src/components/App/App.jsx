import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ControlModule } from "../ControlModule/ControlModule";
import { TaskList } from "../TaskList/TaskList";
import styles from "./App.module.css";

const initialTodos = [
  { id: uuidv4(), task: "Drink a coffee", completed: false, isEditing: false },
  { id: uuidv4(), task: "Walk the dog", completed: false, isEditing: false },
];

const initialButtons = {
  all: true,
  done: false,
  undone: false,
};

export default function App() {
  const [originalTodos, setOriginalTodos] = useState(initialTodos);
  const [filterButtons, setFilterButtons] = useState(initialButtons);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  function findTodo(event) {
    setSearchText(event.target.value);
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setFilterButtons({
      ...filterButtons,
      all: newFilter === "all",
      done: newFilter === "done",
      undone: newFilter === "undone",
    });
  };

  const addTodo = (todo) => {
    if (todo.trim()) {
      const newTodo = {
        id: uuidv4(),
        task: todo.trim(),
        completed: false,
        isEditing: false,
      };
      setOriginalTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  const toggleComplete = (id) => {
    const updatedOriginalTodos = originalTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setOriginalTodos(updatedOriginalTodos);
  };

  const editTodo = (id) => {
    const updatedTodos = originalTodos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setOriginalTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = originalTodos.filter((todo) => todo.id !== id);
    setOriginalTodos(updatedTodos);
  };

  const editTask = (task, id) => {
    const updatedTodos = originalTodos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setOriginalTodos(updatedTodos);
  };

  const clearTodos = () => {
    setOriginalTodos([]);
  };

  const filteredTodos = originalTodos
    .filter((task) => {
      if (filter === "all") {
        return true;
      } else if (filter === "done") {
        return task.completed;
      } else if (filter === "undone") {
        return !task.completed;
      }
    })
    .filter(
      (task) =>
        task.task.startsWith(searchText) ||
        task.task.toLowerCase().startsWith(searchText)
    );

  return (
    <section className={styles.TodoWrapper}>
      <h1>Get Things Done</h1>
      <div className={styles.InputsWrapper}>
        <ControlModule
          addTodo={addTodo}
          searchText={searchText}
          onFindTodo={findTodo}
          clearTodos={clearTodos}
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
      </div>

      <TaskList
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        editTask={editTask}
        deleteTodo={deleteTodo}
        filteredTodos={filteredTodos}
      />
    </section>
  );
}
