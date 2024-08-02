import { useEffect, useState } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [messageVariant, setMessageVariant] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleLike = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog.id, likedBlog);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id);
    }
  };

  const handleSaveBlog = async (e, { title, author, url }, handleClearForm) => {
    e.preventDefault();

    const blog = { title, author, url };
    const res = await blogService.create(blog);

    if (res) {
      handleClearForm();
      setMessage(`A new blog ${blog.title} by ${blog.author} added`);
      setMessageVariant('success');
      setIsVisible(false);
    } else {
      setMessage('Something went wrong');
      setMessageVariant('error');
    }

    setTimeout(() => {
      setMessage('');
      setMessageVariant('');
    }, 5000);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => {
        let newBlogs = [...blogs].sort(
          (a, b) => b.likes - a.likes || b.id - a.id,
        );

        setBlogs(newBlogs);
      });
    }
  }, [user]);

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
      <button onClick={handleLogout}>Logout</button>
      {isVisible ? (
        <>
          <BlogForm handleSaveBlog={handleSaveBlog} />
          <button onClick={() => setIsVisible(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsVisible(true)}>New blog</button>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </>
  );
};

export default App;
