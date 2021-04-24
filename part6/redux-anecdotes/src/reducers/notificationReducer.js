let timeId = 0

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      return action.data.notification
    }
    default:
      return state
  }
}

export const showNotification = (notification, time) => {
  return async (dispatch) => {
    clearTimeout(timeId)
    timeId = setTimeout(
      () =>
        dispatch({
          type: 'SHOW_NOTIFICATION',
          data: {
            notification: null,
          },
        }),
      time * 1000
    )

    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        notification,
      },
    })
  }
}

export default notificationReducer
