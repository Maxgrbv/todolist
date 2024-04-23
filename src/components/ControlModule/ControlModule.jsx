import { useState } from "react";
import styles from "./ControlModule.module.css";

export function ControlModule({
  addTodo,
  searchText,
  onFindTodo,
  clearTodos,
  filter,
  handleFilterChange,
}) {
  const [value, setValue] = useState("");
  const [isFocusedTask, setIsFocusedTask] = useState(false);
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);

  const handleFocusTask = () => {
    setIsFocusedTask(true);
  };

  const handleBlurTask = () => {
    setIsFocusedTask(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      addTodo(value);
      setValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleFocusSearch = () => {
    setIsFocusedSearch(true);
  };

  const handleBlurSearch = () => {
    setIsFocusedSearch(false);
  };

  return (
    <div>
      <div className={styles.AddTask}>
        <input
          type="text"
          className={`${styles["todo-input"]}`}
          value={value}
          placeholder={isFocusedTask ? "" : "What's your tasks today?"}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocusTask}
          onBlur={handleBlurTask}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSubmit}
          type="button"
          className={`${styles["add-btn"]}`}
        >
          Add Task
        </button>
      </div>

      <div className={`${styles["search-container"]}`}>
        <input
          className={`${styles["search-input"]}`}
          placeholder={isFocusedSearch ? "" : "Search..."}
          value={searchText}
          onChange={onFindTodo}
          onFocus={handleFocusSearch}
          onBlur={handleBlurSearch}
        />
        <button
          onClick={clearTodos}
          type="button"
          className={`${styles["clear-btn"]}`}
        >
          Clear
        </button>
      </div>

      <div className={styles.TaskFilterButtonsContainer}>
        <h4 className={styles.TasksHeader}>Your daily tasks:</h4>
        <button
          type="button"
          onClick={() => handleFilterChange("all")}
          className={`${styles["filter-buttons"]} ${
            filter === "all" ? styles["active"] : ""
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange("done")}
          className={`${styles["filter-buttons"]} ${
            filter === "done" ? styles["active"] : ""
          }`}
        >
          Done
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange("undone")}
          className={`${styles["filter-buttons"]} ${
            filter === "undone" ? styles["active"] : ""
          }`}
        >
          Undone
        </button>
      </div>
    </div>
  );
}
