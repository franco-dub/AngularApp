import {Module} from "./Module";
import {Room} from "./Room";
import {RoomEquipment} from "./RoomEquipment";
import {CalendarDate} from './CalendarDate';

export interface  LectureCalendar {
  module?: Module;
  room?: Room;
  calendarId?: number;
  day?: string;
  roomEquipment?: Array<RoomEquipment>;
  calendarDate?: CalendarDate;
}
