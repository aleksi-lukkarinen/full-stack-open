import PropTypes from "prop-types"


const SectionHeader = ({ isFirst, content }) => {
  let classes = "sectionHeader"
  if (isFirst)
    classes += " first"

  return <h2 className={ classes }>{ content }</h2>
}

SectionHeader.propTypes = {
  isFirst: PropTypes.bool,
  content: PropTypes.string.isRequired,
}

export default SectionHeader
