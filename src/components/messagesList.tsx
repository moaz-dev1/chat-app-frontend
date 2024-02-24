import { useEffect, useState } from "react";
import { Message, MessageFromDB } from "../models/message";
import { Room } from "../models/room";
import { API } from "../environment";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { User } from "../models/user";
import { List, ListItem, Paper } from "@mui/material";

interface MessagesListProps {
    room: Room,
}

function MessagesList({ room }: MessagesListProps) {
    const token = localStorage.getItem('user') as string;
    const myToken = decodeToken(token) as {id: number};
    const myId = myToken.id;
    const [messages, setMessages] = useState<Message[]>([]);
    

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
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getMessages(room);
        console.log("Messages Updated");
    }, []);

    return (
        <Paper elevation={3} style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
            <List>
                {messages.map(message => (
                    <ListItem 
                        key={message.id} 
                        style={{ 
                            justifyContent: message.sender.id === myId ? 'flex-end' : 'flex-start' 
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: message.sender.id === myId ? '#1976D2' : 'lightgrey',
                                color: message.sender.id === myId ? 'white' : 'black',
                                padding: '10px',
                                borderRadius: '10px',
                                textAlign: message.sender.id === myId ? 'right' : 'left'
                            }}
                        >
                            {message.content}
                        </div>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default MessagesList;
