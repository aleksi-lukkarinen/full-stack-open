import React from "react"

import PropTypes from "prop-types"
import { Button } from "@material-ui/core"


const CancelButton = ({ id, title, style, onClick }) => {
  return (
    <Button
      id={ id }
      type="button"
      style={ style }
      onClick={ onClick }>

      { title }
    </Button>
  )
}

CancelButton.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func,
}

export default CancelButton
