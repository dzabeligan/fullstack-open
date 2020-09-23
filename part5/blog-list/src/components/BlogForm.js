import React, { useState } from 'react'
import PropTypes from 'prop-types'

const initialState = { title: '', author: '', url: '' }

const BlogForm = ({ newBlog }) => {
  const [blog, setBlog] = useState(initialState)

  const handleChange = ({ target: { name, value } }) => {
    setBlog((prevValue) => ({ ...prevValue, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await newBlog(blog)
    setBlog(initialState)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input id="title" type="text" value={blog.title} name="title" onChange={handleChange} />
        </div>
        <div>
          author:
          <input id="author" type="text" value={blog.author} name="author" onChange={handleChange} />
        </div>
        <div>
          url:
          <input id="url" type="text" value={blog.url} name="url" onChange={handleChange} />
        </div>
        <button type="submit">add blog</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  newBlog: PropTypes.func.isRequired,
}

export default BlogForm
