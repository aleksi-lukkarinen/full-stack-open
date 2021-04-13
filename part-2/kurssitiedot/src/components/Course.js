import React from 'react';
import CourseHeader from './CourseHeader';
import CourseContent from './CourseContent';
import CourseTotalParts from './CourseTotalParts';

export const Course = ({course}) => {
  return (
    <div>
      <CourseHeader content={course.name} />
      <CourseContent parts={course.parts} />
      <CourseTotalParts parts={course.parts} />
    </div>
  )
}

export default Course
