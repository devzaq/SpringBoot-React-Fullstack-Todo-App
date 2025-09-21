import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../security/AuthContext";
function LoginPage() {
  const { login } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("dummy");
  const [showPassword, setShowPassword] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (login(username, password)) {
      setShowErrorMessage(false);
      navigate(`/welcome`);
    } else {
      setShowErrorMessage(true);
    }
  }
  return (
    <div>
      <h1>Login here to Start!</h1>
      {showErrorMessage && (
        <div className="errorMessage">
          Authenticated Failed! Please check your credentials!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="username"
            name="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <button type="button" onClick={(e) => setShowPassword((e) => !e)}>
            {showPassword ? "hide" : "show"}
          </button>
        </div>
        <button type="submit" name="login">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
