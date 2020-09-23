import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({})
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    getBlogs()

    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setNotification({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const newBlog = async (blog) => {
    try {
      const response = await blogService.createBlog(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs((prevBlogs) => [...prevBlogs, response])
      setNotification({ message: `a new blog ${response.title} by ${response.author} added` })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    } catch (error) {
      setNotification({ message: 'Unauthorized', type: 'error' })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    }
  }

  const handleLikes = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    // eslint-disable-next-line no-unused-vars
    const { user, ...blogWithoutUser } = blogToUpdate
    await blogService.update(blog.id, blogWithoutUser)
    setBlogs(blogs.map((b) => (b.id !== blog.id ? b : blogToUpdate)))
  }

  const handleError = (notification) => {
    setNotification(notification)
    setTimeout(() => setNotification({}), 5000)
  }

  const handleDelete = (id) => setBlogs(blogs.filter((blog) => blog.id !== id))

  return (
    <div>
      <h2>{user === null ? 'log into application' : 'blogs'}</h2>
      <Notification type={notification.type} message={notification.message} />
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LoginForm login={handleLogin} />
        </Togglable>
      ) : (
        <>
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm newBlog={newBlog} />
          </Togglable>
        </>
      )}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={handleLikes}
            onError={handleError}
            onDelete={handleDelete}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
