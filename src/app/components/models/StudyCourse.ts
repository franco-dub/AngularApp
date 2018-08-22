import {Module} from "./Module";

export interface StudyCourse {
  id?: number;
  name: string;
  description: string;
  teachings?: Array<Module>;
}
