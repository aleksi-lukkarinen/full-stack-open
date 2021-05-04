import React from "react"

import PropTypes from "prop-types"


const Notification = ({ content, baseClass, messageVisibleClass }) => {
  if (content === null)
    content = ""

  let classes = baseClass
  if (content !== null && content.length > 0)
    classes += ` ${messageVisibleClass}`

  return <div className={classes}>{content}</div>
}

Notification.propTypes = {
  content: PropTypes.string,
  baseClass: PropTypes.string.isRequired,
  messageVisibleClass: PropTypes.string.isRequired,
}

export default Notification
