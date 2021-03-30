import React from 'react'

const Notification = ({ message, type = "success" }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={`notification notification_${type}`}>
            {message}
        </div>
    )
}

export default Notification