import { useState, useEffect } from "react"

import PropTypes from "prop-types"


function cssDisplayForHiddenVisibleContent(isVisible) {
  const cssDisplayValues = ["none", ""]

  function cssDisplayFor(isVisible) {
    return {display: cssDisplayValues[Number(isVisible)]}
  }

  return [
    cssDisplayFor(!isVisible),
    cssDisplayFor(isVisible)
  ]
}

const Showable = ({
  visibilityChanged,
  isVisible, showContent,
  buttonLabel, buttonId,
  children}) => {

  const [oldVisibility, setOldVisibility] = useState(false)

  const [cssForHiddenContent, cssForVisibleContent] =
    cssDisplayForHiddenVisibleContent(isVisible)

  function showChildren(event) {
    event.preventDefault()

    showContent()
  }

  useEffect(() => {
    if (visibilityChanged &&
      typeof(visibilityChanged) === "function" &&
      isVisible !== oldVisibility) {

      setOldVisibility(isVisible)
      visibilityChanged()
    }
  }, [visibilityChanged, isVisible, oldVisibility])

  return (
    <div>
      <div style={cssForHiddenContent}>
        <button
          id={buttonId}
          onClick={showChildren}>{buttonLabel}</button>
      </div>
      <div style={cssForVisibleContent}>
        {children}
      </div>
    </div>
  )
}

Showable.propTypes = {
  visibilityChanged: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  showContent: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
  children: PropTypes.any,
}

export default Showable
