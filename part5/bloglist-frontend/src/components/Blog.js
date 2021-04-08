import React from 'react'
const Blog = ({ key, blog }) => (
  <div>
    <p key={key}>{blog.title} {blog.author}</p>
  </div>
)

export default Blog