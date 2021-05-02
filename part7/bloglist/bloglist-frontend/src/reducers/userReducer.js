import blogService from '../services/blogs'
import loginService from '../services/login'
import { setSuccessMessage, setErrorMessage } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.data
    }
    case 'LOGOUT_USER': {
      return null
    }
    default: {
      return state
    }
  }
}

export const setUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'SET_USER',
      data: user,
    }
  }
  return { type: 'LOGOUT_USER' }
}

export const userLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return { type: 'LOGOUT_USER' }
}

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser())
      dispatch(setSuccessMessage(`Welcome ${user.username}`))
    } catch (error) {
      dispatch(setErrorMessage(error))
    }
  }
}

export default userReducer
