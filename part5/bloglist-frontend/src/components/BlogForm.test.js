import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('test for new blog form', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const likes = component.container.querySelector('#likes')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Testing Title' },
  })

  fireEvent.change(author, {
    target: { value: 'Jhon Doe' },
  })

  fireEvent.change(url, {
    target: { value: 'www.example.com' },
  })

  fireEvent.change(likes, {
    target: { value: 3 },
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Jhon Doe')
  expect(createBlog.mock.calls[0][0].url).toBe('www.example.com')
  expect(createBlog.mock.calls[0][0].likes).toBe('3')
})
