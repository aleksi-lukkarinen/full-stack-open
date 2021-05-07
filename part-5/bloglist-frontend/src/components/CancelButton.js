import React from "react"

import PropTypes from "prop-types"
import { Button } from "@material-ui/core"


const CancelButton = ({ title, onClick }) => {
  return (
    <Button
      type="button"
      variant="contained"
      size="small"
      onClick={ onClick }>

      { title }
    </Button>
  )
}

CancelButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default CancelButton
