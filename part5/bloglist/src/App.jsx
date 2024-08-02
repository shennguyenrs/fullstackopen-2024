import { useEffect, useState } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (!user) {
    return <LoginForm setUser={setUser} />;
  }

  return (
    <>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default App;
