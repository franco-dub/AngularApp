import {Room} from "./Room";
import {Hours} from "./Hours";
import {Module} from "./Module";
import {Course} from "./Course";

export interface Calendar {
  aula?: Array<Room>;
  teaching?: Array<Module>;
  hours?: Array<Hours>;
  semester?: number;
  studyCourse?: Course;
}
