
const SectionHeader = ({isFirst, content}) => {
  let classes = "sectionHeader"
  if (isFirst)
    classes += " first"

  return <h2 className={classes}>{content}</h2>
}

export default SectionHeader
