import { Message } from "./message";
import { User } from "./user";

export interface Group {
    id: number;
    name: string;
    creator: User;
    participants: User[];
    createdTime: Date;
    privacy?: 'public' | 'private';
    topic?: string;
    messages?: Message[];
}