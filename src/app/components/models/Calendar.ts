import {Teaching} from "./Teaching";
import {Aula} from "./Aula";
import {Hours} from "./Hours";
import {StudyCourse} from "./StudyCourse";

export interface Calendar {
  aula?: Array<Aula>;
  teaching?: Array<Teaching>;
  hours?: Array<Hours>;
  semester?: number;
  studyCourse?: StudyCourse;
}
