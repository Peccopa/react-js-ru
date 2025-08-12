import Todo from './Todo';
import styles from './Todo.module.css';

function TodoList({ todos, deleteTodo }) {
  return (
    <div className={styles.TodoListContainer}>
      {!todos.length && <h2>Todo list is empty</h2>}
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} index={index} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default TodoList;
