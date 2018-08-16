import {Professor} from "./Professor";

export interface Course {
  courseDto: Course;
  professorDto: Professor;
  title: string;
  credits: number;
  semester: string;
}
