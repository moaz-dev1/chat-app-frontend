import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../environment";
import { decodeToken } from "react-jwt";
import { Person } from "@mui/icons-material";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { User, UserFromDB } from "../models/user";

function FriendsList() {
    const token = localStorage.getItem('user') as string;
    const myToken = decodeToken(token) as {id: number};
    const myId = myToken.id;
    const [friends, setFriends] = useState<User[]>([]);    


    async function fetchData() {
        const usersFromDB = (await axios.get(API + '/users/others/' + myId, {headers: {'token': token}})).data;
        
        const users: User[] = await Promise.all(usersFromDB.map(async (userFromDB: UserFromDB) => {
            const user: User = {
                id: userFromDB.id,
                firstName: userFromDB.first_name,
                lastName: userFromDB.last_name,
                email: userFromDB.email,
                password: userFromDB.password,
                createdTime: userFromDB.created_time
            };
            return user;
        }));
        
        setFriends(users);
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {friends.map((friend, index) => (
              <Link key={friend.id} to={'/' } style={{textDecoration: 'none'}}>
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
                            primary={friend?.firstName + ' ' + friend.lastName}
                        />
                </ListItem>
            </Link>
            ))}
          </List>
    </>
}

export default FriendsList;