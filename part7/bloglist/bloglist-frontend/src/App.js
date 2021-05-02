import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import {
  setSuccessMessage,
  setErrorMessage,
} from './reducers/notificationReducer'
import { setUser, userLogout } from './reducers/userReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const blogFromRef = useRef()

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = async () => {
    dispatch(userLogout())
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
          <LoginForm />
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
