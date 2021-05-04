import React from "react"

import PropTypes from "prop-types"


const SimpleFormCell = ({ children }) => {
  return (
    <div className="cell">
      {children}
    </div>
  )
}

SimpleFormCell.propTypes = {
  children: PropTypes.any,
}

export default SimpleFormCell
