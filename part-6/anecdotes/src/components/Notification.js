import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import { clearNotification } from "../reducers/notificationReducer"


const NOTIFICATION_CLEARING_DELAY_MS = 5000


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    let timeoutHandle = 0

    function checkNotificationClearing() {
      clearTimeout(timeoutHandle)

      const passedTimeMs = Date.now() - notification.timestamp
      if (passedTimeMs > NOTIFICATION_CLEARING_DELAY_MS) {
        dispatch(clearNotification())
      }
      else {
        timeoutHandle = setTimeout(
          checkNotificationClearing,
          NOTIFICATION_CLEARING_DELAY_MS - passedTimeMs)
      }
    }

    if (notification.content) {
      timeoutHandle = setTimeout(
        checkNotificationClearing,
        NOTIFICATION_CLEARING_DELAY_MS)
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
