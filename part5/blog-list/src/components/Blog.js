import React, { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const Blog = ({ blog, handleLikes, onDelete, onError, user }) => {
  const [showExpanded, setShowExpanded] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleClick = async () => {
    if (!window.confirm(`Delete ${blog.title} ?`)) return
    try {
      await blogService.remove(blog.id)
      onDelete(blog.id)
    } catch (error) {
      onDelete(blog.id)
      onError({ message: `the blog '${blog.title}' was already deleted from server`, type: 'error' })
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowExpanded(!showExpanded)}>{showExpanded ? 'hide' : 'view'}</button>
      </div>
      {showExpanded && (
        <>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes} <button onClick={() => handleLikes(blog)}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user?.id !== (blog.user?.id || blog?.user) && <button onClick={handleClick}>delete</button>}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export default Blog
