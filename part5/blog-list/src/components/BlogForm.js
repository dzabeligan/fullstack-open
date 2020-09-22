import React from 'react';

const BlogForm = ({ onChange, onSubmit, blog }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input type="text" value={blog.title} name="title" onChange={onChange} />
        </div>
        <div>
          author:
          <input type="text" value={blog.author} name="author" onChange={onChange} />
        </div>
        <div>
          url:
          <input type="text" value={blog.url} name="url" onChange={onChange} />
        </div>
        <button type="submit">add blog</button>
      </form>
    </>
  );
};

export default BlogForm;
