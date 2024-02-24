import { useParams } from "react-router-dom";
import { Room, RoomFromDB } from "../models/room";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API, SOCKET_SERVER } from "../environment";
import { decodeToken } from "react-jwt";
import { User, UserFromDB } from "../models/user";
import MessagesList from "../components/messagesList";
import { Socket, io } from "socket.io-client";
import { Message } from "../models/message";
import { Avatar, Button, Container, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField } from "@mui/material";

function ChatRoom() {
    const token = localStorage.getItem('user') as string;
    const myToken = decodeToken(token) as {id: number};
    const myId = myToken.id;
    const roomId = useParams().id;
    const [room, setRoom] = useState<Room>();
    const [me, setMe]= useState<User>();
    const [other, setOther] = useState<User>();
    const [messageBody, setMessageBody] = useState('');
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        try {
            (async () => {
                const room = await getRoomInfo();
                await initializeSocket(room);
            })();
        } catch (error) {
            throw error;
        }
    }, []);

    async function initializeSocket(room: Room) {
        const me = room.user1;
        const other = room.user2;

        socketRef.current = io(SOCKET_SERVER);
        socketRef.current.on('connect', () => {
            console.log('Connected!');
        });
        socketRef.current.emit('login', me);
        
        socketRef.current.emit('create room', room);
        socketRef.current.on('invite', (room) => {
            if(socketRef.current) {
                socketRef.current.emit('join', room);
            }
        });

        socketRef.current.on('message to client', (message: Message) => {
            // console.log(message.content);
        });
    }

    async function getRoomInfo() {
        try {
            const roomFromDB: RoomFromDB = (await axios.get(API + '/rooms/' + roomId, {headers: {'token' : token}})).data;

            const meFromDB: UserFromDB = (await axios.get(API + '/users/' + myId, {headers: { 'token': token }})).data;
            const me: User = {
                id: meFromDB.id,
                firstName: meFromDB.first_name,
                lastName: meFromDB.last_name,
                email: meFromDB.email,
                password: meFromDB.password,
                createdTime: meFromDB.created_time
            }
            setMe(me);

            const otherId = roomFromDB.user1_id === myId ? roomFromDB.user2_id : roomFromDB.user1_id;
                const otherFromDB: UserFromDB = (await axios.get(API + '/users/' + otherId, {headers: { 'token': token }})).data;
                const other: User = {
                    id: otherFromDB.id,
                    firstName: otherFromDB.first_name,
                    lastName: otherFromDB.last_name,
                    email: otherFromDB.email,
                    password: otherFromDB.password,
                    createdTime: otherFromDB.created_time,
                }
                setOther(other);
            
                /* User1 is me and user2 is the other user */
                const room: Room = {
                    id: roomFromDB.id,
                    user1: me,
                    user2: other, 
                    createdTime: roomFromDB.created_time,
                };
            
                setRoom(room);
                return room;
        } catch (error) {
            throw error;
        }
    }

    async function handleMessageSubmit(e: any) {
        try {
            e.preventDefault();
            const newMessage: Message = {
                sender: me as User,
                content: messageBody,
                receiver: other as User,
                room: room as Room,
                sentTime: new Date()
            }
            // const result = await axios.post(API + '/messages', {newMessage}, {headers: {'token': token}});

            socketRef.current?.emit('message to server', newMessage);

            setMessageBody('');
        } catch (error) {
            throw error;
        }
    }

    return <>
        <Container style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Paper elevation={3}>
            <List>
            <ListItem>
                <ListItemAvatar>
                <Avatar />
                </ListItemAvatar>
                <ListItemText primary={room?.user2?.firstName + ' ' + room?.user2?.lastName} />
            </ListItem>
            </List>
        </Paper>

        {room && <MessagesList room={room} />}

        <Paper elevation={3} style={{ marginTop: 'auto'}}>
        <TextField
          id="outlined-basic"
          label="Type your message"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          value={messageBody}
          onChange={(e) => {setMessageBody(e.target.value);}}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleMessageSubmit}>
          Send
        </Button>
      </Paper>
        
        </Container>
    </>
}

export default ChatRoom;