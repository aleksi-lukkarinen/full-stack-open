import React from 'react'
import Course from './components/Course'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'DOM, DOM! A kingdom for a DOM!',
        exercises: 23,
        id: 1
      },
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 2
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 3
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 4
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
