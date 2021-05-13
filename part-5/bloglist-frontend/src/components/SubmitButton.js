import React from "react"

import PropTypes from "prop-types"
import { Button } from "@material-ui/core"


const SubmitButton = ({ id, title, style }) => {
  return (
    <Button
      id={ id }
      type="submit"
      color="primary"
      style={ style }>

      { title }
    </Button>
  )
}

SubmitButton.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
}

export default SubmitButton
