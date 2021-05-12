import React from 'react'
import { Link } from 'react-router-dom'

const SingleUser = ({ blogs }) => {
  if (!blogs[0]) return <p>There is no Blog</p>

  return (
    <div>
      <h2>{blogs[0].user.name}</h2>
      <p>added blogs</p>
      <ul>
        {blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SingleUser
