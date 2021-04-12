import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
      likes,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes:
          <input
            value={likes}
            name="likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
