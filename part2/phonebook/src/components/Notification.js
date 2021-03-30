import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={`notification notification_${message.type}`}>
            {message.text}
        </div>
    )
}

export default Notification