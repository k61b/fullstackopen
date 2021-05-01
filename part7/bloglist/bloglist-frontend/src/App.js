import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import {
  setSuccessMessage,
  setErrorMessage,
} from './reducers/notificationReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const notification = useSelector((state) => state.notification)
  const [user, setUser] = useState(null)
  const blogFromRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      dispatch(setSuccessMessage(`Welcome ${user.name}`))
    } catch (exception) {
      dispatch(setErrorMessage('wrong username or password'))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setSuccessMessage('Logout success'))
    setUser(null)
  }

  // TODO: Check Control
  const createBlog = async (blogObject) => {
    try {
      blogFromRef.current.toggleVisibility()
      dispatch(addBlog(blogObject))
      dispatch(
        setSuccessMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      )
    } catch (exception) {
      setErrorMessage(`${exception}`)
    }
  }

  const userInfo = () => (
    <div>
      {user.name} logged in <button onClick={handleLogout}>Logout</button>
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Create Blog" ref={blogFromRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={notification} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <LoginForm handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {userInfo()}
          {blogForm()}
          {blogs
            .sort((a, b) => (a.likes > b.likes ? -1 : 1))
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
