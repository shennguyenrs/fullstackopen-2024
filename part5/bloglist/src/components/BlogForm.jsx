import { useState } from "react";

import blogService from "../services/blogs";

const BlogForm = ({ setMessage, setMessageVariant }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleInputTitle = (e) => setTitle(e.target.value);
  const handleInputAuthor = (e) => setAuthor(e.target.value);
  const handleInputUrl = (e) => setUrl(e.target.value);

  const handleSaveBlog = async (e) => {
    e.preventDefault();

    const blog = { title, author, url };
    const res = await blogService.create(blog);

    if (res) {
      setTitle("");
      setAuthor("");
      setUrl("");

      setMessage(`A new blog ${blog.title} by ${blog.author} added`);
      setMessageVariant("success");
    } else {
      setMessage("Something went wrong");
      setMessageVariant("error");
    }

    setTimeout(() => {
      setMessage("");
      setMessageVariant("");
    }, 5000);
  };

  return (
    <>
      <h2>Add a new blog</h2>
      <form>
        <div>
          <label>title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputTitle}
          />
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleInputAuthor}
          />
        </div>
        <div>
          <label>url:</label>
          <input type="text" name="url" value={url} onChange={handleInputUrl} />
        </div>
        <button type="submit" onClick={handleSaveBlog}>
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
