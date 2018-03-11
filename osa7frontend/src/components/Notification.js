import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    if (props.notification.msg === null) {
      return null
    }
    const classname = props.notification.isError ? "message-error" : "message-info"
    return (
      <div className={classname}>
        {props.notification.msg}
      </div>
    )
  }

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification