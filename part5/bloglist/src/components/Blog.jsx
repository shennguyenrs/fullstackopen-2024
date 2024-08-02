import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
      </p>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "View"}
      </button>
      {isVisible ? (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button>like</button>
          </p>
          <p>{blog.user.name}</p>
        </>
      ) : null}
    </div>
  );
};

export default Blog;
