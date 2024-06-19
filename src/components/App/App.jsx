import { ControlModule } from "../ControlModule/ControlModule";
import { TaskList } from "../TaskList/TaskList";
import styles from "./App.module.css";

export default function App() {

  return (
    <section className={styles.TodoWrapper}>
      <h1>Get Things Done</h1>
      <div className={styles.InputsWrapper}>
        <ControlModule />
      </div>
      <TaskList />
    </section>
  );
}
