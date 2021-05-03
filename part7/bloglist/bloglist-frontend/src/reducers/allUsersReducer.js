import blogService from '../services/blogs'

const allUsersReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_USERS': {
      return action.data
    }
    default: {
      return state
    }
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    const users = await blogService.getAllUsers()
    dispatch({
      type: 'GET_USERS',
      data: users,
    })
  }
}

export default allUsersReducer
