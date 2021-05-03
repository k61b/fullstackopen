import React from 'react'

const SingleUser = ({ blogs }) => {
  if (!blogs[0]) return <p>There is no Blog</p>

  return (
    <div>
      <h2>{blogs[0].user.name}</h2>
      <p>added blogs</p>
      <ul>
        {blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default SingleUser
