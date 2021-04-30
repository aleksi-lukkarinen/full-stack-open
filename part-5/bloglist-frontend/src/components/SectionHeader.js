
const SectionHeader = ({isFirst, children}) => {
  let classes = "sectionHeader"
  if (isFirst)
    classes += " first"

  return <h2 className={classes}>{children}</h2>
}

export default SectionHeader
