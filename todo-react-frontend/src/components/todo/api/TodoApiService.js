import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export async function retrieveAllTodosForUsername(username) {
  return await apiClient.get(`/users/${username}/todos`);
}

export async function deleteTodoForUsernameById(username, id) {
  await apiClient.delete(`/users/${username}/todos/${id}`);
}

export async function retrieveTodo(username, id) {
  return await apiClient.get(`/users/${username}/todos/${id}`);
}

export async function updateDone(username, todo) {
  await apiClient.put(`/users/${username}/todos/${todo.id}/done`, todo);
}

export async function updateTodo(username, todo) {
  return await apiClient.put(`/users/${username}/todos/${todo.id}`, todo);
}

export async function createNewTodo(username, todo) {
  return await apiClient.post(`/users/${username}/todos`, todo);
}
