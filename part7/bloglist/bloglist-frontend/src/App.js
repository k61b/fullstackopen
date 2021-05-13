import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import { Container } from '@material-ui/core'

import { initializeBlogs, addBlog } from './reducers/blogReducer'
import {
  setSuccessMessage,
  setErrorMessage,
} from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import Navigation from './components/Navigation'

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

  const blogForm = () => (
    <Togglable buttonLabel="Create Blog" ref={blogFromRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const matchUserId = useRouteMatch('/users/:id')
  const userBlogs = matchUserId
    ? blogs.filter((blog) => blog.user.id === matchUserId.params.id)
    : null

  const matchBlogId = useRouteMatch('/blogs/:id')
  const currentBlog = matchBlogId
    ? blogs.find((blog) => blog.id === matchBlogId.params.id)
    : null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <Container maxWidth="xl">
      <Navigation />
      <Notification message={notification} />
      <Switch>
        <Route path="/users/:id">
          <SingleUser blogs={userBlogs} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={currentBlog} />
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
              {blogForm()}
              {blogs
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map((blog) => (
                  <div key={blog.id} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </div>
                ))}
              <Users />
            </div>
          )}
        </Route>
      </Switch>
    </Container>
  )
}

export default App
