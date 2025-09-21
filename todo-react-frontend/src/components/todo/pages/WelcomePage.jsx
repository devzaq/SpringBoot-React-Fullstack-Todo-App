import { useState } from "react";
import { Link } from "react-router-dom";
import { retrieveHelloWorldBean } from "../api/HelloWorldApiService";
import { useAuthContext } from "../security/AuthContext";

function WelcomePage() {
  const { username } = useAuthContext();
  const [message, setMessage] = useState("");
  async function callHelloWorldRestApi(e) {
    e.preventDefault();
    retrieveHelloWorldBean(username)
      .then((e) => setMessage(e.data.message))
      .catch((e) => setMessage(e.response.data.message));
  }
  return (
    <div>
      <h1>Welcome {username || "to TodoApp"}!</h1>
      <Link type="button" to="/todos">
        Todos
      </Link>

      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
          Hello World
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomePage;
