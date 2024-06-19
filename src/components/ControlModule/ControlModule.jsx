import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, clearAllTodos, setFilter, setFilters, setSearchText } from "../../store/todoSlice";
import styles from "./ControlModule.module.css";

export function ControlModule() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.todos.searchText);
  const filter = useSelector((state) => state.todos.filter);
  const [value, setValue] = useState("");
  const [isFocusedTask, setIsFocusedTask] = useState(false);
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);

  function onFindTodo(event) {
    const search = event.target.value;
    dispatch(setSearchText({ search }));
  }

  function onAddTodo() {
    dispatch(addTodo({ value }));
  }

  function onClearTodos() {
    dispatch(clearAllTodos())
  }

  function onFilterChange(filterData) {
    dispatch(setFilter({ filterData }));
    dispatch(setFilters({ filterData }));
  }

  const handleFocusTask = () => {
    setIsFocusedTask(true);
  };

  const handleBlurTask = () => {
    setIsFocusedTask(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      onAddTodo();
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
          name="addTaskInput"
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
          name="addTaskInput12123123123"
          className={`${styles["search-input"]}`}
          placeholder={isFocusedSearch ? "" : "Search..."}
          value={searchText}
          onChange={onFindTodo}
          onFocus={handleFocusSearch}
          onBlur={handleBlurSearch}
        />
        <button
          onClick={onClearTodos}
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
          onClick={() => onFilterChange("all")}
          className={`${styles["filter-buttons"]} ${filter === "all" ? styles["active"] : ""
            }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("done")}
          className={`${styles["filter-buttons"]} ${filter === "done" ? styles["active"] : ""
            }`}
        >
          Done
        </button>
        <button
          type="button"
          onClick={() => onFilterChange("undone")}
          className={`${styles["filter-buttons"]} ${filter === "undone" ? styles["active"] : ""
            }`}
        >
          Undone
        </button>
      </div>
    </div>
  );
}
