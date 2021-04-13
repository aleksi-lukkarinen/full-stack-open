import React from 'react'

const CourseTotalParts = (x) => {
  console.log(x)
  let {parts} = x
  console.log(parts)
  const totalExercises =
      parts.map(x=>x.exercises).reduce((x, y) => x + y, 0)

  return (
    <p><b>Total number of exercises: {totalExercises}</b></p>
  )
}

export default CourseTotalParts
