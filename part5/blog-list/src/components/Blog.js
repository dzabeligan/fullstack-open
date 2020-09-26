import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { setNotification } from '../reducers/notificationReducer';
import { addComment, removeBlog, like } from '../reducers/blogReducer';
import { useField } from '../hooks';
import { Button, Link, Typography, TextField } from '@material-ui/core';

const Comments = ({ comments }) => (
  <ul>
    {comments.map(({ comment, id }) => (
      <li key={id} style={{ listStyle: 'none', marginBottom: 5 }}>
        <Typography variant="body2">{comment}</Typography>
      </li>
    ))}
  </ul>
);

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const match = useRouteMatch('/blogs/:id');
  const history = useHistory();
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  const comment = useField('text');
  const { reset, ...commentToPass } = comment;

  const handleLikes = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 };
    dispatch(like(blogToUpdate));
  };

  const newComment = async (event) => {
    event.preventDefault();
    const newComment = { comment: comment.value, id: blog.id };
    dispatch(addComment(newComment));
    reset();
  };

  const handleClick = async () => {
    if (!window.confirm(`Delete ${blog.title} ?`)) return;
    try {
      dispatch(removeBlog(blog.id));
      dispatch(setNotification({ message: `the blog '${blog.title}' deleted`, type: 'info' }));
    } catch (error) {
      dispatch(setNotification({ message: `the blog '${blog.title}' was already deleted from server`, type: 'info' }));
    }
    history.push('/');
  };

  return blog ? (
    <div className="blog" style={{ marginTop: 30 }}>
      <Typography variant="h6">{blog.title}</Typography>
      <Typography variant="subtitle1">{blog.author}</Typography>
      <br />
      <Link href={blog.url}>{blog.url}</Link>
      <div style={{ lineSpacing: '2' }}>
        <Typography variant="body2" component="span">
          {blog.likes} likes{' '}
        </Typography>{' '}
        <Button variant="outlined" size="small" onClick={handleLikes}>
          like
        </Button>
      </div>
      <div>
        <Typography variant="caption" component="span">
          {blog.user?.name && <div>added by {blog.user?.name}</div>}
        </Typography>
        <br />
        {user?.username === blog.user?.username && (
          <Button color="secondary" size="small" variant="contained" onClick={handleClick}>
            delete
          </Button>
        )}
      </div>
      <br />
      <Typography variant="overline" component="h3">
        comments
      </Typography>
      <form onSubmit={newComment}>
        <TextField {...commentToPass} variant="outlined" size="small" /> <Button>add comment</Button>
      </form>
      <Comments comments={blog.comments} />
    </div>
  ) : null;
};

export default Blog;
