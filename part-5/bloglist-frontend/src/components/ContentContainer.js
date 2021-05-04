import PropTypes from "prop-types"


const ContentContainer = ({children}) => {
  return (
    <div className="contentContainer">
      {children}
    </div>
  )
}

ContentContainer.propTypes = {
  children: PropTypes.any,
}

export default ContentContainer
