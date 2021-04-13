import React from 'react'

const CourseTotalParts = ({parts}) => {
  const totalExercises =
      parts.map(x=>x.exercises).reduce((x, y) => x + y, 0)

  return (
    <p><b>Total number of exercises: {totalExercises}</b></p>
  )
}

export default CourseTotalParts
