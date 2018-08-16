import {Person} from "./Person";
import {Course} from "./Course";

export interface Student{
  courseDto: Course;
  personDto: Person;
  registrationDate: Date;
  graduationDate: Date;
}
