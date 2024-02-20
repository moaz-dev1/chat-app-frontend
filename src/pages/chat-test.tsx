import React, { useEffect, useState } from 'react';
import { Container, Paper, Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField, Button } from '@mui/material';

function ChatRoom() {
  // Dummy data for messages
  const data = [
    { id: 1, text: 'Hello!', sender: 'John' },
    { id: 2, text: 'Hi there!', sender: 'Jane' },
    { id: 3, text: 'How are you?', sender: 'John' },
    { id: 4, text: 'I\'m good, thanks!', sender: 'Jane' },
    { id: 1, text: 'Hello!', sender: 'John' },
    { id: 2, text: 'Hi there!', sender: 'Jane' },
    { id: 3, text: 'How are you?', sender: 'John' },
    { id: 4, text: 'I\'m good, thanks!', sender: 'Jane' },
    { id: 1, text: 'Hello!', sender: 'John' },
   
  ];

  const [messages, setMessages] = useState(data);
  const [newMessage, setNewMessage] = useState('');

  function handleSubmit() {
    const message = {
        id: 10, text: newMessage, sender: 'John'
    }
    messages.push(message);
    setMessages(messages);

    console.log(messages);
  }

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* User Info */}
      <Paper elevation={3} style={{ marginBottom: '8px' }}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary="Other User" />
          </ListItem>
        </List>
      </Paper>

      {/* Messages Area */}
      <Paper elevation={3} style={{ flex: 1, overflowY: 'auto'}}>
        <List>
          {messages.map(message => (
            <ListItem key={message.id}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={message.sender}
                secondary={message.text}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Typing Area */}
      <Paper elevation={3} style={{ marginTop: 'auto'}}>
        <TextField
          id="outlined-basic"
          label="Type your message"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={2}
          onChange={(e) => {setNewMessage(e.target.value)}}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Send
        </Button>
      </Paper>
    </Container>
  );
}

export default ChatRoom;
