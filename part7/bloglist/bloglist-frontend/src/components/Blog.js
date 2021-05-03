import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import {
  setSuccessMessage,
  setErrorMessage,
} from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [allowRemove, setAllowRemove] = useState(false)

  useEffect(() => {
    const user = blogService.getUserInfo()
    const blogUser = blog.user.id || blog.user
    setAllowRemove(blogUser === user.id)
  }, [])

  const addLike = (id, likes) => {
    try {
      dispatch(likeBlog(id, likes + 1))
      dispatch(
        setSuccessMessage(`new like to blog ${blog.title} by ${blog.author}`)
      )
    } catch (error) {
      dispatch(setErrorMessage(error))
    }
  }

  const removeBlog = () => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

    if (result) {
      try {
        dispatch(
          setSuccessMessage(`blog ${blog.title} by ${blog.author} delete`)
        )
        dispatch(deleteBlog(blog.id))
        history.push('/')
      } catch (error) {
        dispatch(setErrorMessage(error))
      }
    }
  }

  return (
    <div>
      <h1 className="title">{blog.title}</h1>
      <div className="info">
        <a href={blog.url}>{blog.url}</a>
        <p>
          <span className="likes">{blog.likes} likes</span>
          <button className="like" onClick={addLike}>
            like
          </button>
        </p>
        <p className="author">added by {blog.author}</p>
        {allowRemove && (
          <button className="remove" onClick={removeBlog}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
