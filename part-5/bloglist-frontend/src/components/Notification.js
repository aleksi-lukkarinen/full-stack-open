import React from "react"

import PropTypes from "prop-types"
import { Alert } from "@material-ui/lab"


const Notification = ({ content, severity }) => {
  const id = `notification${severity}`

  return (
    content && (
      <Alert id={ id } severity={ severity }>
        {content}
      </Alert>
    )
  )
}

Notification.propTypes = {
  content: PropTypes.string,
  severity: PropTypes.string.isRequired,
}

export default Notification
