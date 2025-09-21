import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoDetails from "../components/TodoDetails";
import {
  deleteTodoForUsernameById,
  retrieveAllTodosForUsername,
  updateDone,
} from "../api/TodoApiService";
import { useAuthContext } from "../security/AuthContext";

function ListTodoPage() {
  // const today = new Date("2027", "01", "05");
  const [todos, setTodos] = useState([]);
  const { username } = useAuthContext();
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTodos = async () => {
      const response = await retrieveAllTodosForUsername(username);
      setTodos(response.data);
    };
    getTodos();
  }, [username, updateTrigger]);

  async function handleDeleteTodo(id) {
    await deleteTodoForUsernameById(username, id);
    setUpdateTrigger((e) => !e);
    setMessage("Todo Deleted with the ID: " + id);
  }

  async function handleUpdateTodo(id) {
    navigate(`/todo/${id}`);
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
            {todos.map(({ id, description, done, targetDate }) => (
              <TodoDetails
                setUpdateTrigger={setUpdateTrigger}
                key={id}
                id={id}
                description={description}
                isDone={done}
                handleIsDoneChange={handleIsDoneChange}
                handleDeleteTodo={handleDeleteTodo}
                targetDate={targetDate}
                handleUpdateTodo={handleUpdateTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTodoPage;
