import { Message } from "./message";
import { User } from "./user";

export interface Room {
    id?: number;
    user1?: User;
    user2?: User;
    createdTime?: Date;
    lastMessage?: Message;
    unreadCount?: { [userId: string]: number };
    status?: { [userId: string]: 'online' | 'offline' | 'away' };
    messages?: Message[];
}

export interface RoomFromDB {
    id: number;
    user1_id: number;
    user2_id: number;
    created_time: Date;
    last_message_id: number;
}