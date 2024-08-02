import { useState } from "react";
import blogService from "../services/blogs";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleLike = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog.id, likedBlog);
  };

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
            <button onClick={handleLike}>Like</button>
          </p>
          <p>{blog.user.name}</p>
        </>
      ) : null}
    </div>
  );
};

export default Blog;
