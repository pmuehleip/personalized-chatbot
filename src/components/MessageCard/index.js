import React from 'react';
import { Card } from 'react-bootstrap';

function MessageCard(props) {
  const { message } = props;

  const messageStyle = {
    maxWidth: '75%',
    padding: '10px',
    //borderRadius: '5px',
    marginBottom: '10px',
    //textAlign: message.isAI ? 'left' : 'right',
    backgroundColor: message.isAI ? '#f0f0f0' : '#303030',
    color: message.isAI ? '#000' : '#fff',
    marginLeft: message.isAI ? 'unset' : 'auto',
  };

  const timeString = message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Card border="light" style={messageStyle}>
      <Card.Text style={{ fontSize: '20px', marginBottom: '0', textAlign: 'left' }}>{message.text}</Card.Text>
      <Card.Text style={{ fontSize: '14px', marginTop: '5px', textAlign: 'right' }}>{timeString}</Card.Text>
    </Card>
  );
}

export default MessageCard;
