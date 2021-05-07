import React from "react"

import PropTypes from "prop-types"
import { Button } from "@material-ui/core"


const SubmitButton = ({ title }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      size="small"
      color="primary">

      { title }
    </Button>
  )
}

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SubmitButton
