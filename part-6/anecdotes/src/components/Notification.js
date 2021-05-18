import React, { useEffect } from "react"

import { connect } from "react-redux"

import { clearNotification } from "../reducers/notificationReducer"




const Notification = ({
  notification, clearNotification}) => {

  useEffect(() => {
    /*
      This would be better to be in some kind of service, but
      as there will be only one instance of the Notification
      and it will be rerendered when a new notification comes
      in, this works as well. Also, this should be generalized
      to handle an array of notifications with varying types
      and visibility times.
    */

    const visibilityTimeInMs =
        notification.visibilityInSeconds * 1000

    let timeoutHandle = 0

    function checkNotificationClearing() {
      clearTimeout(timeoutHandle)

      const passedTimeMs =
          Date.now() - notification.creationTimestamp

      if (passedTimeMs > visibilityTimeInMs) {
        clearNotification()
      }
      else {
        timeoutHandle = setTimeout(
            checkNotificationClearing,
            visibilityTimeInMs - passedTimeMs)
      }
    }

    if (notification.content) {
      timeoutHandle = setTimeout(
          checkNotificationClearing,
          visibilityTimeInMs)
    }

    return () => {
      clearTimeout(timeoutHandle)
    }
  }, [notification, clearNotification])

  const style = !notification.content ? undefined : {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

export default connect(
  state => {
    return { notification: state.notification, }
  },
  { clearNotification }
)(Notification)
