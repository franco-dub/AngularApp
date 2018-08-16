import {Teaching} from "./Teaching";
import {StudyCourseType} from "./StudyCourseType";

export interface StudyCourse {
  id?: number;
  name: string;
  description: string;
  typeStudyCourse?: StudyCourseType;
  teachings?: Array<Teaching>;
}
