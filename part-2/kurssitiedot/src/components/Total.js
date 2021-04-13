import React from 'react'

const Total = (props) => {
  const totalExercises =
      props.parts.map(x=>x.exercises).reduce((x, y) => x + y, 0)

  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

export default Total
