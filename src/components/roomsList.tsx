import axios from 'axios';
import {decodeToken} from 'react-jwt';
import { API } from '../environment';
import { useEffect, useState } from 'react';
import { Room, RoomFromDB } from '../models/room';
import { User, UserFromDB } from '../models/user';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, IconButton, Button } from '@mui/material';
import { Person } from '@mui/icons-material';
import { Message } from '../models/message';




function RoomsList() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const token = localStorage.getItem('user') as string;
    const myToken = decodeToken(token) as {id: number};
    const myId = myToken.id;
    const [lastMessage, setLastMessage] = useState<Message>();


    async function getRooms() {
        try {
            const roomsFromDB: RoomFromDB[] = (await axios.get(API + '/rooms/userRooms/' + myId, {headers: {'token': token}})).data;
            const meFromDB: UserFromDB = (await axios.get(API + '/users/' + myId, {headers: { 'token': token }})).data;
            const me: User = {
                id: meFromDB.id,
                firstName: meFromDB.first_name,
                lastName: meFromDB.last_name,
                email: meFromDB.email,
                password: meFromDB.password,
                createdTime: meFromDB.created_time
            }
    
            const rooms: Room[] = await Promise.all(roomsFromDB.map(async (roomFromDB: RoomFromDB) => {
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

                const room: Room = {
                    id: roomFromDB.id,
                    user1: me,
                    user2: other, 
                    createdTime: roomFromDB.created_time,
                };

                const lastMessage = (await axios.get(API + '/messages/' + roomFromDB.last_message_id, {headers: {'token': token}})).data;
                setLastMessage(lastMessage);
    
                return room;
            }));
    
            setRooms(rooms);
        } catch (error) {
            throw error;
        }
    }
    
    useEffect(() => {
        getRooms();
    }, []);
    
    const styles = {
        secondaryText: {
          color: 'lightgrey',
        },
      };

    return (
        <>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {rooms.map((room, index) => (
              <Link key={room.id} to={'/chatroom/' + room.id} style={{textDecoration: 'none'}}>
                    <ListItem style={{
                        backgroundColor: '#1976D2', 
                        color: 'white',
                        borderRadius: '30px',
                        margin: '3%'
                        }}>
                        <ListItemAvatar>
                            <Avatar>
                                <Person />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={room.user2?.firstName + ' ' + room.user2?.lastName}
                            secondary={<span style={{color: 'lightgrey'}}>{lastMessage?.content}</span>}
                        />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      );
      
}

export default RoomsList;