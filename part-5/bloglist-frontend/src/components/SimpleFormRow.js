import PropTypes from "prop-types"


const SimpleFormRow = ({children}) => {
  return (
    <div className="row">
      {children}
    </div>
  )
}

SimpleFormRow.propTypes = {
  children: PropTypes.any,
}

export default SimpleFormRow
