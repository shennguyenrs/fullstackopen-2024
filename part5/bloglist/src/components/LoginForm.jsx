import { useState } from "react";

import blogService from "../services/blogs";
import loginService from "../services/login";

const LoginForm = ({ setUser, setMessage, setMessageVariant }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputUsername = (e) => setUsername(e.target.value);
  const handleInputPassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await loginService.login({ username, password });

    if (user) {
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
    } else {
      setMessage("Wrong username or password");
      setMessageVariant("error");
      setTimeout(() => {
        setMessage("");
        setMessageVariant("");
      }, 5000);
    }
  };

  return (
    <form>
      <div>
        <label>username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputUsername}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputPassword}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        login
      </button>
    </form>
  );
};

export default LoginForm;
