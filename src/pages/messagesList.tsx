import { useEffect, useState } from "react";
import { Message, MessageFromDB } from "../models/message";
import { Room } from "../models/room";
import { API } from "../environment";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { User, UserFromDB } from "../models/user";

interface MessagesListProps {
    room: Room
}

function MessagesList({ room }: MessagesListProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const token = localStorage.getItem('user') as string;
    const myToken = decodeToken(token) as {id: number};
    const myId = myToken.id;



    async function getMessages() {
        try {
            const messagesfromDB: MessageFromDB[] = (await axios.get(API + '/messages/roomMessages/' + room.id, {headers: {'token': token}})).data;
            const messages: Message[] = await Promise.all(
                messagesfromDB.map(async (messageFromDB: MessageFromDB) => {
                    
                    const senderFromDB: UserFromDB = (await axios.get(API + '/users/' + messageFromDB.sender_id, {headers: {'token': token}})).data;
                    const sender: User = {
                        id: senderFromDB.id,
                        firstName: senderFromDB.first_name,
                        lastName: senderFromDB.last_name,
                        email: senderFromDB.email,
                        password: senderFromDB.password,
                        createdTime: senderFromDB.created_time
                    }

                    const receiverFromDB: UserFromDB = (await axios.get(API + '/users/' + messageFromDB.receiver_id, {headers: {'token': token}})).data;
                    const receiver: User = {
                        id: receiverFromDB.id,
                        firstName: receiverFromDB.first_name,
                        lastName: receiverFromDB.last_name,
                        email: receiverFromDB.email,
                        password: receiverFromDB.password,
                        createdTime: receiverFromDB.created_time
                    }

                    const room = (await axios.get(API + '/rooms/' + messageFromDB.room_id, {headers: {'token': token}})).data;

                    const message: Message = {
                        id: messageFromDB.id,
                        sender: sender,
                        receiver: receiver,
                        content: messageFromDB.content,
                        sentTime: messageFromDB.sent_time,
                        room: room,
                    }
                    return message;
                })
            );

            console.log(messages);

            setMessages(messages);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getMessages();
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