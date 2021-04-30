import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

describe('<Blog />', () => {
  let component
  let sampleBlog = {
    title: 'Testing React Project With Jest',
    author: 'Jhon Doe',
    url: 'https://example.com/test',
    likes: 2,
    user: '606f2ec415917a37c0b3732f',
  }

  let mockHandler = jest.fn()

  blogService.update = jest.fn().mockImplementation(() => {
    return Promise.resolve({ success: true })
  })

  beforeEach(() => {
    component = render(<Blog blog={sampleBlog} handleLikes={mockHandler} />)
  })

  test('the component is displaying blog title and author by default', () => {
    expect(component.container).toHaveTextContent(sampleBlog.title)
    expect(component.container).toHaveTextContent(sampleBlog.author)
    expect(component.container).not.toHaveTextContent(sampleBlog.likes)
    expect(component.container).not.toHaveTextContent(sampleBlog.url)
  })

  test('the component is displaying url and likes after clicking button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(sampleBlog.likes)
    expect(component.container).toHaveTextContent(sampleBlog.url)
  })

  test('if the like button is clicked twice, the event handler should be called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
