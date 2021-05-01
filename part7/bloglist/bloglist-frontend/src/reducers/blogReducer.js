import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'NEW_BLOG': {
      return [...state, action.data]
    }
    case 'LIKE_BLOG': {
      return state.map((blog) =>
        blog.id === action.data.id
          ? { ...blog, likes: action.data.likes }
          : blog
      )
    }
    case 'DELETE_BLOG': {
      return state.filter((blog) => blog.id !== action.data.id)
    }
    default: {
      return state
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (id, likes) => {
  return async (dispatch) => {
    await blogService.update({
      id,
      likes,
    })

    dispatch({
      type: 'LIKE_BLOG',
      data: {
        id,
        likes,
      },
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove({
      id,
    })
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id,
      },
    })
  }
}

export default blogReducer
