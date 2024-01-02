import { useParams } from "react-router-dom";
import { Room, RoomFromDB } from "../models/room";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../environment";
import { decodeToken } from "react-jwt";
import { User, UserFromDB } from "../models/user";
import MessagesList from "./messagesList";
import { Button } from "react-bootstrap";

function ChatRoom() {
    const token = localStorage.getItem('user') as string;
    const myToken = decodeToken(token) as {id: number};
    const myId = myToken.id;
    const roomId = useParams().id;
    const [room, setRoom] = useState<Room>();
    const [me, setMe] = useState<User>();
    const [other, setOther] = useState<User>();
    const [messageBody, setMessageBody] = useState('');
    

    useEffect(() => {
        getRoomInfo();
    }, []);

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
            
              

        } catch (error) {
            throw error;
        }
    }

    function onTextChange(e: any) {
        setMessageBody(e.target.value);
    }

    return <>
        <h1>{other?.firstName + ' ' + other?.lastName}</h1>
        {room && <MessagesList room={room}/>}
        <form onSubmit={onMessageSubmit}>
            <textarea 
                placeholder="Type here..."
                onChange={(e) => {onTextChange(e)}}
            >

            </textarea>
            <Button type='submit' disabled = {messageBody === ''}>Send</Button>
        </form>
    </>

    // return (
		// <div className="card">
		// 	<form onSubmit={onMessageSubmit}>
		// 		<h1>{otherUser.username}</h1>
		// 		<div>
		// 			<TextField
		// 				name="message"
		// 				onChange={(e: any) => onTextChange(e)}
		// 				value={messageBody}
		// 				variant="outlined"
		// 				label="Message"
		// 			/>
		// 		</div>
		// 		<button disabled = {messageBody === ''}>Send Message</button>
		// 	</form>
		// 	<div className="render-chat">
		// 		<h1>Chat Log</h1>
		// 		{renderChat()}
		// 	</div>
		// </div>
	// );
}

export default ChatRoom;