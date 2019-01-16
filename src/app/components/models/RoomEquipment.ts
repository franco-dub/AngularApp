import {Room} from './Room';
import {Equipments} from './Equipments';

export interface RoomEquipment {
  roomEquipmentId?: number;
  room: Room;
  equipment: Equipments;
  issue?: string;
  work?: number;

}
