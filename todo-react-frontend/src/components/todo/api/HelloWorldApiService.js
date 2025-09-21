import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export async function retrieveHelloWorldBean(username) {
  return await apiClient.get(`/hello-world/path-variable/${username}`);
}
