import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [update, setUpdate] = useState(null)

  const [user, setUser] = useState(null)

  const blogFromRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        text: `Welcome ${user.name}`,
        type: 'success',
      })
    } catch (exception) {
      setMessage({
        text: 'wrong username or password',
        type: 'error',
      })
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage({
      text: 'Logout success',
      type: 'success',
    })
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      blogFromRef.current.toggleVisibility()
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setMessage({
        text: `a new blog ${response.title} by ${response.author} added`,
        type: 'success',
      })
    } catch (exception) {
      setMessage({
        text: `${exception}`,
        type: 'error',
      })
    }
  }

  const handleLikes = async (id, likes) => {
    await blogService.update({
      id: id,
      likes: likes + 1,
    })
    setUpdate(Math.floor(Math.random() * 1000))
  }

  const handleRemoving = async (blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

    if (result) {
      await blogService.remove({
        id: blog.id,
      })
      setUpdate(Math.floor(Math.random() * 1000))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        handleSubmit={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )

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
      <Notification message={message} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {userInfo()}
          {blogForm()}
          {blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)) &&
            blogs.map((blog) => (
              // eslint-disable-next-line react/jsx-key
              <Blog
                blog={blog}
                handleLikes={handleLikes}
                handleRemoving={handleRemoving}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
