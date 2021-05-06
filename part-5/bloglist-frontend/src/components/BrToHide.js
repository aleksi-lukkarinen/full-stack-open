import React from "react"


const BrToHide = ({ number }) => {
  let numberOfBreaks = number
  if (!Number.isInteger(numberOfBreaks) ||
        numberOfBreaks < 1) {

    numberOfBreaks = 1
  }

  const breaks = []
  for (let i=0; i<numberOfBreaks; i++) {
    breaks.push(<br key={ i } className="toHide" />)
  }

  return breaks
}

export default BrToHide
