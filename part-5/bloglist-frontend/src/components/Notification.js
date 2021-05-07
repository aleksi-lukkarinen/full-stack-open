import React from "react"

import PropTypes from "prop-types"
import { Alert } from "@material-ui/lab"


const Notification = ({ content, severity }) => {
  return (
    content && (
      <Alert severity={ severity }>
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
