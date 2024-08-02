import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleSaveBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleInputTitle = (e) => setTitle(e.target.value);
  const handleInputAuthor = (e) => setAuthor(e.target.value);
  const handleInputUrl = (e) => setUrl(e.target.value);

  const handleClearForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Add a new blog</h2>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleInputTitle}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={handleInputAuthor}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={handleInputUrl}
          />
        </div>
        <button
          type="submit"
          onClick={(e) =>
            handleSaveBlog(e, { title, author, url }, handleClearForm)
          }
        >
          Create
        </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  handleSaveBlog: PropTypes.func.isRequired,
};

export default BlogForm;
