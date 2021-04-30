const _ = require('lodash')

const dummy = (blogs) => {
  return Number(blogs + 1)
}

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length) return 0

  if (blogs.length === 1) return blogs[0].likes

  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  return blogs.reduce((last_blog, current_blog) =>
    current_blog.likes > last_blog.likes ? current_blog : last_blog
  )
}

const mostiteratee = (blog) => blog.author

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const groupedBlogs = _.groupBy(blogs, mostiteratee)
  const blogsByAuthors = _.mapValues(groupedBlogs, (e) => e.length)
  const mostBlog = Object.entries(blogsByAuthors).reduce((a, b) => a[1] > b[1] ? a : b)
  return { 'author': mostBlog[0], 'blogs': mostBlog[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const groupedBlogs = _.groupBy(blogs, mostiteratee)
  const blogsByLikes = _.mapValues(groupedBlogs, totalLikes)
  const mostLikedAuthor = Object.entries(blogsByLikes).reduce((a, b) => a[1] > b[1] ? a : b)
  return { 'author': mostLikedAuthor[0], 'likes': mostLikedAuthor[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}