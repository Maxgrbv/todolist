import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./TaskList.module.css";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleComplete } from "../../store/todoSlice";

export function TaskList({ filteredTodos }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleSubmit = (event, todo) => {
    event.preventDefault();
    dispatch(editTodo({
      id: todo.id,
      task: value,
    }));
    setValue("");
  };

  const onDoneClick = (event, todo) => {
    event.stopPropagation();
    dispatch(toggleComplete({ id: todo.id }))
    setValue(todo.task);
  };


  const onEditClick = (event, todo) => {
    event.stopPropagation();
    dispatch(editTodo({ id: todo.id }));
    setValue(todo.task);
  };

  function onDeleteTodo(event, id) {
    event.stopPropagation();
    dispatch(deleteTodo({ id }))
  }

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
              className={`${styles.Todo} ${todo.completed ? styles.completed : ""
                }`}
              onClick={() => dispatch(toggleComplete({ id: todo.id }))}
            >
              <div className={styles.taskContent}>
                <p
                  className={`${styles.taskElement} ${todo.completed ? styles.completed : ""
                    }`}
                >
                  {todo.task}
                </p>
                <div className={styles.taskIconsContainer}>
                  <FontAwesomeIcon
                    className={`${styles["check-icon"]}`}
                    icon={faCheck}
                    onClick={(event) => onDoneClick(event, todo)}
                  />
                  <FontAwesomeIcon
                    className={`${styles["edit-icon"]}`}
                    icon={faPenToSquare}
                    onClick={(event) => onEditClick(event, todo)}
                  />
                  <FontAwesomeIcon
                    className={`${styles["delete-icon"]}`}
                    icon={faTrash}
                    onClick={(event) => onDeleteTodo(event, todo.id)}
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
