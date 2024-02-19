import { useParams } from "react-router-dom";
import { Room, RoomFromDB } from "../models/room";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API, SOCKET_SERVER } from "../environment";
import { decodeToken } from "react-jwt";
import { User, UserFromDB } from "../models/user";
import MessagesList from "./messagesList";
import { Button } from "react-bootstrap";
import { Socket, io } from "socket.io-client";
import { Message } from "../models/message";

function ChatRoom() {
    const token = localStorage.getItem('user') as string;
    const myToken = decodeToken(token) as {id: number};
    const myId = myToken.id;
    const roomId = useParams().id;
    const [room, setRoom] = useState<Room>();
    const [me, setMe] = useState<User>();
    const [other, setOther] = useState<User>();
    const [messageBody, setMessageBody] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    
    const socketRef = useRef<Socket | null>(null);


    useEffect(() => {
        try {
            getRoomInfo();
            socketRef.current = io(SOCKET_SERVER);
            socketRef.current.on('connect', () => {
                console.log('Connected!');
            });
        } catch (error) {
            throw error;
        }
    }, [messages]);

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
                    createdTime: otherFromDB.created_time
                }
                setOther(other);
            
                const room: Room = {
                    id: roomFromDB.id,
                    user1: me,
                    user2: other, 
                    createdTime: roomFromDB.created_time,
                };
            
                setRoom(room);
        } catch (error) {
            throw error;
        }
    }

    async function onMessageSubmit(e: any) {
        try {
            e.preventDefault();
            const newMessage: Message = {
                sender: me as User,
                content: messageBody,
                receiver: other as User,
                room: room as Room,
                sentTime: new Date()

            }
            socketRef.current?.emit('message to server', newMessage);
        } catch (error) {
            throw error;
        }
    }

    function onTextChange(e: any) {
        setMessageBody(e.target.value);
    }

    return <>
        <h1>{other?.firstName + ' ' + other?.lastName}</h1>
        {room && <MessagesList room={room} setMessages={setMessages} />}
        <form onSubmit={onMessageSubmit}>
            <textarea
                placeholder="Type here..."
                onChange={(e) => {onTextChange(e)}}
            ></textarea>

            <Button type='submit' disabled = {messageBody === ''}>Send</Button>
        </form>
    </>
}

export default ChatRoom;