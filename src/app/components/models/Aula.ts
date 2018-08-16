import {Equipments} from "./Equipments";

export interface Aula {
  name: string;
  capacity: number;
  longitude: number;
  latitude: number;
  equipments?: Array<Equipments>;
}
