import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
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
import Users from './components/Users'
import SingleUser from './components/SingleUser'

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

  const match = useRouteMatch('/users/:id')
  const userBlogs = match
    ? blogs.filter((blog) => blog.user.id === match.params.id)
    : null

  const padding = { padding: 5 }

  return (
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      <Notification message={notification} />
      <Switch>
        <Route path="/users/:id">
          <SingleUser blogs={userBlogs} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
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
              <Users />
            </div>
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App
