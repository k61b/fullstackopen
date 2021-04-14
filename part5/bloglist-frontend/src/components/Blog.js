import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleRemoving }) => {
  const [showFull, setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showFullBlog = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{' '}
          <button onClick={() => handleLikes(blog.id, blog.likes)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={() => handleRemoving(blog)}>Remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <i>{blog.author}</i>
      <button onClick={() => setShowFull(!showFull)}>
        {showFull ? 'hide' : 'view'}
      </button>
      {showFull && showFullBlog()}
    </div>
  )
}

Blog.propTypes = {
  setUpdate: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
  }),
}

export default Blog
