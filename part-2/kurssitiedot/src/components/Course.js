import React from 'react';
import CourseHeader from './CourseHeader';
import CourseContent from './CourseContent';
//import Total from './Total';

export const Course = ({course}) => {
  return (
    <div>
      <CourseHeader content={course.name} />
      <CourseContent parts={course.parts} />
    </div>
  ) // <Total parts={course.parts} />
}

export default Course
