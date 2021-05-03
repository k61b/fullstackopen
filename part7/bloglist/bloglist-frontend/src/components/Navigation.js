import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const history = useHistory

  const handleLogout = () => {
    dispatch(userLogout())
    history.push('/')
  }
  const padding = { padding: 5 }

  return (
    <div>
      <div style={{ backgroundColor: '#eee' }}>
        <Link style={padding} to="/users">
          Users
        </Link>
        {user !== null && (
          <>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navigation
