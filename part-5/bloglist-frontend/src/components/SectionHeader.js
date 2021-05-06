import React from "react"

import PropTypes from "prop-types"


const SectionHeader = ({ thisIsFirstHeader, content }) => {
  let classes = "sectionHeader"
  if (thisIsFirstHeader)
    classes += " first"

  return <h2 className={ classes }>{ content }</h2>
}

SectionHeader.propTypes = {
  thisIsFirstHeader: PropTypes.bool,
  content: PropTypes.string.isRequired,
}

export default SectionHeader
