import { Group } from "./group";
import { Room } from "./room";
import { User } from "./user";

export interface Message {
    id: number;
    sender: User;
    receiver: User;
    content: string;
    sentTime: Date;
    room: Room | Group;
}

export interface MessageFromDB {
    id: number;
    sender_id: number;
    receiver_id: number;
    room_id: number;
    content: string;
    sent_time: Date;
}