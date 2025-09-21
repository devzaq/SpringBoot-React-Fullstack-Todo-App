function TodoDetails({
  id,
  description,
  isDone,
  handleIsDoneChange,
  handleDeleteTodo,
  targetDate,
  handleUpdateTodo,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{description}</td>
      <td>{targetDate}</td>
      <td>
        <input
          onChange={() => handleIsDoneChange(id)}
          type="checkbox"
          checked={isDone}
        />
      </td>
      <td>
        <button
          onClick={() => handleUpdateTodo(id)}
          className="btn btn-primary"
        >
          update
        </button>
      </td>
      <td>
        <button onClick={() => handleDeleteTodo(id)} className="btn btn-danger">
          delete
        </button>
      </td>
    </tr>
  );
}

export default TodoDetails;
