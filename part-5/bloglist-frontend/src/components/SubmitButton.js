import PropTypes from "prop-types"


const SubmitButton = ({ title }) => {
  return <button type="submit">{ title }</button>
}

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SubmitButton
