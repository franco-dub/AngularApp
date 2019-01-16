import {Professor} from "./Professor";
import {Room} from "./Room";
import {Secretary} from "./Secretary";

export interface Ticket {
  ticketId?: number;
  title?: string;
  professor?: Professor;
  room?: Room;
  secretary?: Secretary;
  date?: Date;
  description?: string;
  status: string;
  comment?: string;
  lastModified?: Date;
}
