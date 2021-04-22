const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'Plus_Vote': {
      return state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    }
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'Plus_Vote',
    data: {id},
  }
}

export const addAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer
