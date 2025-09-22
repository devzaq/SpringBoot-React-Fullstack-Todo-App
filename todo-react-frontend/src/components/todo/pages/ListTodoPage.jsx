import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TodoDetails from "../components/TodoDetails";
import {
  createNewTodo,
  deleteTodoForUsernameById,
  retrieveAllTodosForUsername,
  updateDone,
} from "../api/TodoApiService";
import { useAuthContext } from "../security/AuthContext";

function ListTodoPage() {
  const [todos, setTodos] = useState([]);
  const { username } = useAuthContext();
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const response = await retrieveAllTodosForUsername(username);
      const data = response.data;
      // data.sort((a, b) => b.id - a.id);
      setTodos(data);
    };
    getTodos();
  }, [username, updateTrigger]);

  async function handleDeleteTodo(id) {
    await deleteTodoForUsernameById(username, id);
    setUpdateTrigger((e) => !e);
    setMessage("Todo Deleted with the ID: " + id);
  }

  const handleIsDoneChange = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.done = !todo.done;
    await updateDone(username, todo);
    setUpdateTrigger((e) => !e);
  };

  return (
    <div className="container">
      <h1>List of Todos</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Target Date</th>
              <th>Done</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoDetails
                key={todo.id}
                todo={todo}
                setUpdateTrigger={setUpdateTrigger}
                handleIsDoneChange={handleIsDoneChange}
                handleDeleteTodo={handleDeleteTodo}
              />
            ))}
          </tbody>
        </table>
        <Link className="btn btn-success m-5" to="/todo">
          Add New Todo
        </Link>
      </div>
    </div>
  );
}

export default ListTodoPage;
