import React, { useState } from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import {
  setSuccessMessage,
  setErrorMessage,
} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()
  const [showFull, setShowFull] = useState(false)

  const toggleShow = () => {
    setShowFull(!showFull)
  }

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
      } catch (error) {
        dispatch(setErrorMessage(error))
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <p className="title">
          {blog.title}
          <button className="view" onClick={toggleShow}>
            view
          </button>
        </p>
        <p className="author">{blog.author}</p>
      </div>
      {showFull && (
        <div className="show-full">
          <p>{blog.url}</p>
          <p>
            likes <span className="likes">{blog.likes}</span>
            <button
              className="like"
              onClick={() => addLike(blog.id, blog.likes)}
            >
              like
            </button>
          </p>
          <button className="remove" onClick={() => removeBlog(blog)}>
            remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
