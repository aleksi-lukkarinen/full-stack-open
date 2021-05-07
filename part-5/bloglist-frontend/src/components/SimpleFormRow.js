import React from "react"

import PropTypes from "prop-types"


const SimpleFormRow = ({ style, children }) => {
  return (
    <div className="row" style={ style }>
      {children}
    </div>
  )
}

SimpleFormRow.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
}

export default SimpleFormRow
