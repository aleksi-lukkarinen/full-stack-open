import React from "react"

import PropTypes from "prop-types"
import { Button } from "@material-ui/core"


const SubmitButton = ({ title, style, id }) => {
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
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  id: PropTypes.string,
}

export default SubmitButton
