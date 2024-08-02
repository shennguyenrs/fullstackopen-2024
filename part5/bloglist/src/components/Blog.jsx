import { useState } from 'react';
import PropTypes from 'prop-types';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={blogStyle}>
      <p className="title">
        {blog.title} {blog.author}
      </p>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'View'}
      </button>
      {isVisible ? (
        <>
          <p>{blog.url}</p>
          <p className="likes">
            {blog.likes} likes
            <button onClick={() => handleLike(blog)}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          <button onClick={() => handleDelete(blog)}>Delete</button>
        </>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
