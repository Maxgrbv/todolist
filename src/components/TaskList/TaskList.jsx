import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./TaskList.module.css";

export function TaskList({
  filteredTodos,
  toggleComplete,
  editTodo,
  editTask,
  deleteTodo,
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (event, todo) => {
    event.preventDefault();
    editTask(value, todo.id);
    setValue("");
  };

  const handleEditClick = (event, todo) => {
    event.stopPropagation();
    editTodo(todo.id);
    setValue(todo.task);
  };

  const handleDeleteClick = (event, todo) => {
    event.stopPropagation();
    deleteTodo(todo.id);
  };

  return (
    <div className={styles.CreatedTasksContainer}>
      {filteredTodos.map((todo) => (
        <div key={todo.id}>
          {todo.isEditing ? (
            <form
              className={styles.TodoForm}
              onSubmit={(event) => handleSubmit(event, todo)}
            >
              <input
                type="text"
                className={`${styles["todo-input"]}`}
                value={value}
                placeholder="Update task"
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit" className={`${styles["update-btn"]}`}>
                Update task
              </button>
            </form>
          ) : (
            <div
              className={`${styles.Todo} ${
                todo.completed ? styles.completed : ""
              }`}
              onClick={() => toggleComplete(todo.id)}
            >
              <div className={styles.taskContent}>
                <p
                  className={`${styles.taskElement} ${
                    todo.completed ? styles.completed : ""
                  }`}
                >
                  {todo.task}
                </p>
                <div className={styles.taskIconsContainer}>
                  <FontAwesomeIcon
                    className={`${styles["check-icon"]}`}
                    icon={faCheck}
                    onClick={() => toggleComplete(todo.id)}
                  />
                  <FontAwesomeIcon
                    className={`${styles["edit-icon"]}`}
                    icon={faPenToSquare}
                    onClick={(event) => handleEditClick(event, todo)}
                  />
                  <FontAwesomeIcon
                    className={`${styles["delete-icon"]}`}
                    icon={faTrash}
                    onClick={(event) => handleDeleteClick(event, todo)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
