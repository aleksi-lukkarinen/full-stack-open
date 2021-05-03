import React, {useState, useEffect} from "react"


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

export default Showable
