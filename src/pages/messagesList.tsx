import { useEffect, useState } from "react";
import { Message, MessageFromDB } from "../models/message";
import { Room } from "../models/room";
import { API } from "../environment";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { User, UserFromDB } from "../models/user";

interface MessagesListProps {
    room: Room,
    setMessages: any
}

function MessagesList({ room, setMessages }: MessagesListProps) {
    const token = localStorage.getItem('user') as string;
    const myToken = decodeToken(token) as {id: number};
    const myId = myToken.id;
    const [messages, setMessages1] = useState<Message[]>([]);
    

    async function getMessages(room: Room) {
        try {
            const messagesfromDB: MessageFromDB[] = (await axios.get(API + '/messages/roomMessages/' + room.id, {headers: {'token': token}})).data;
            
            const messages: Message[] = messagesfromDB.map((messageFromDB: MessageFromDB) => {
                return {
                    id: messageFromDB.id,
                    sender: messageFromDB.sender_id == room.user1?.id ? room.user1 : room.user2 as User,
                    receiver: messageFromDB.sender_id == room.user1?.id ? room.user1 : room.user2 as User,
                    content: messageFromDB.content,
                    sentTime: messageFromDB.sent_time,
                    room: room,
                }
            });
            
            setMessages(messages);
            setMessages1(messages);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getMessages(room);
        console.log("Messges Updated");
    }, []);

    return <>
        <strong>Chat Messages:</strong>
        <br />
        {messages && messages.map((message: Message) => (
            <div key={message.id}>
                <strong>{message.sender.firstName}: </strong>
                {message.content}
            </div>
        ))}
    </>
}

export default MessagesList;