import React from 'react'

const Notification = ({ message, isError }) => {
    if (message === null) {
      return null
    }
    const classname = isError ? "message-error" : "message-info"
    return (
      <div className={classname}>
        {message}
      </div>
    )
  }

export default Notification