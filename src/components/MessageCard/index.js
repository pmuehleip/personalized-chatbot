import React from 'react';
import { Card } from 'react-bootstrap';

function isUser(role) {
  return role === "user"
}

function MessageCard(props) {
  const { message } = props;

  const messageStyle = {
    maxWidth: '75%',
    padding: '10px',
    //borderRadius: '5px',
    marginBottom: '10px',
    //textAlign: message.isAI ? 'left' : 'right',
    backgroundColor: isUser(message.role) ?  '#303030' : '#f0f0f0',
    color: isUser(message.role) ? '#fff' : '#000',
    marginLeft: isUser(message.role) ? 'auto' : 'unset',
  };

  if (isUser(message.role)) {
    messageStyle.borderTopRightRadius = 0;
  } else {
    messageStyle.borderTopLeftRadius = 0;
  }

  //const timeString = message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timeString = "";

  return (
    <Card border="light" style={messageStyle}>
      <Card.Text style={{ fontSize: '20px', marginBottom: '0', textAlign: 'left' }}>{message.content}</Card.Text>
      <Card.Text style={{ fontSize: '14px', marginTop: '5px', textAlign: 'right' }}>{timeString}</Card.Text>
    </Card>
  );
}

export default MessageCard;
