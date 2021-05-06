import React, { useState, useEffect } from "react"

import PropTypes from "prop-types"


function cssDisplayForHiddenVisibleContent(isVisible) {
  const cssDisplayValues = ["none", ""]

  function cssDisplayFor(bVisibility) {
    return {
      display: cssDisplayValues[Number(bVisibility)]
    }
  }

  return [
    cssDisplayFor(!isVisible),
    cssDisplayFor(isVisible)
  ]
}

const Showable = ({
  visibilityChanged,
  contentIsVisible, showContent,
  buttonLabel, buttonId,
  children }) => {

  const [oldVisibility, setOldVisibility] = useState(false)

  const [cssForHiddenContent, cssForVisibleContent] =
    cssDisplayForHiddenVisibleContent(contentIsVisible)

  function showChildren(event) {
    event.preventDefault()

    showContent()
  }

  useEffect(() => {
    if (visibilityChanged &&
      typeof(visibilityChanged) === "function" &&
      contentIsVisible !== oldVisibility) {

      setOldVisibility(contentIsVisible)
      visibilityChanged()
    }
  }, [visibilityChanged, contentIsVisible, oldVisibility])

  return (
    <div>
      <div style={ cssForHiddenContent }>
        <button
          id={ buttonId }
          type="button"
          onClick={ showChildren }>{buttonLabel}
        </button>
      </div>
      <div style={ cssForVisibleContent }>
        {children}
      </div>
    </div>
  )
}

Showable.propTypes = {
  visibilityChanged: PropTypes.func.isRequired,
  contentIsVisible: PropTypes.bool.isRequired,
  showContent: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
  children: PropTypes.any,
}

export default Showable
