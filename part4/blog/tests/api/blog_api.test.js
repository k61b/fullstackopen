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

afterAll(() => {
  mongoose.connection.close
})