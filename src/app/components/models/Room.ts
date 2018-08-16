import {Equipments} from "./Equipments";

export interface Room {
  roomId?: number;
  name: string;
  capacity: number;
  longitude: number;
  latitude: number;
  equipments?: Array<Equipments>;
}
