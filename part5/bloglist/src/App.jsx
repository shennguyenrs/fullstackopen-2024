import { useEffect, useState } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageVariant, setMessageVariant] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      let newBlogs = [...blogs].sort(
        (a, b) => b.likes - a.likes || b.id - a.id,
      );

      setBlogs(newBlogs);
    });
  }, []);

  if (!user) {
    return (
      <>
        <h2>Login to the application</h2>
        <Notification message={message} variant={messageVariant} />
        <LoginForm
          setUser={setUser}
          setMessage={setMessage}
          setMessageVariant={setMessageVariant}
        />
      </>
    );
  }

  return (
    <>
      <Notification message={message} variant={messageVariant} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {isVisible ? (
        <>
          <BlogForm
            setMessage={setMessage}
            setMessageVariant={setMessageVariant}
            setIsVisible={setIsVisible}
          />
          <button onClick={() => setIsVisible(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsVisible(true)}>New blog</button>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default App;
