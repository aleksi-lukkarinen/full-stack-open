import React from 'react'
import CoursePart from './CoursePart'

const CourseContent = ({parts}) => {
  return parts.map((p) => <CoursePart part={p} key={p.id} />)
}

export default CourseContent
