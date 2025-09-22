import { Link } from "react-router-dom";

function TodoDetails({ todo, handleIsDoneChange, handleDeleteTodo }) {
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.description}</td>
      <td>{todo.targetDate}</td>
      <td>
        <input
          onChange={() => handleIsDoneChange(todo.id)}
          type="checkbox"
          checked={todo.isDone}
        />
      </td>
      <td>
        <Link to={`/todo/${todo.id}`} className="btn btn-primary">
          update
        </Link>
      </td>
      <td>
        <button
          onClick={() => handleDeleteTodo(todo.id)}
          className="btn btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  );
}

export default TodoDetails;
