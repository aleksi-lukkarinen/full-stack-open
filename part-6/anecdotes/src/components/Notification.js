import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import { clearNotification } from "../reducers/notificationReducer"




const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    const visibilityTimeInMs =
        notification.visibilityInSeconds * 1000

    let timeoutHandle = 0

    function checkNotificationClearing() {
      clearTimeout(timeoutHandle)

      const passedTimeMs =
          Date.now() - notification.creationTimestamp

      if (passedTimeMs > visibilityTimeInMs) {
        dispatch(clearNotification())
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
  }, [dispatch, notification])

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

export default Notification
