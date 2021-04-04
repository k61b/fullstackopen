const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('query if a blog has id or _id', async () => {
  const singleBlog = await helper.blogsInDb()

  expect(singleBlog[0].id).toBeDefined()
  expect(singleBlog[0]._id).toBe(undefined)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test an app',
    author: 'Jhon Doe',
    url: 'https://fullstackopen.com/',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(t => t.title)
  expect(titles).toContain('Test an app')
})

test('verify if likes property is missing then it defaults to 0', async () => {
  const newBlog = {
    title: 'Test an app',
    author: 'Jhon Doe',
    url: 'https://fullstackopen.com/'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Test an app',
    author: 'Jhon Doe'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close
})