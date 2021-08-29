export interface CoursePartBase {
  name: string,
  exerciseCount: number,
  type: string,
}

export interface DescribedCoursePart extends CoursePartBase {
  description: string,
}

export interface CourseNormalPart extends DescribedCoursePart {
  type: "normal",
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject",
  groupProjectCount: number,
}

export interface CourseSubmissionPart extends DescribedCoursePart {
  type: "submission",
  exerciseSubmissionLink: string,
}

export interface CourseSpecialPart extends DescribedCoursePart {
  type: "special",
  requirements: string[],
}

export type CoursePart =
  CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
