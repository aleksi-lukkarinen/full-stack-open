import React from "react"

import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"


const SectionHeader = ({ content, variant, component, className, style }) => {
  const effectiveVariant =
    variant ? variant : "h6"

  const effectiveClassName =
    "sectionHeader" + (className ? " " + className : "")

  return (
    <Typography
      variant={ effectiveVariant }
      component={ component }
      className={ effectiveClassName }
      style={ style }>

      { content }
    </Typography>
  )
}

SectionHeader.propTypes = {
  thisIsFirstHeader: PropTypes.bool,
  content: PropTypes.string.isRequired,
  variant: PropTypes.string,
  component: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default SectionHeader
