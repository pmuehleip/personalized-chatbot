import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import "./style.css"


function isUser(role) {
  return role === "user";
}

function MessageCard(props) {
  const { message } = props;

  const messageStyle = {
    maxWidth: '75%',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: isUser(message.role) ?  '#0d6efd' : '#f8f9fa',
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

function LoadingEllipsis() {
  return (
    <div>
      <span className="fa-layers">
        <FontAwesomeIcon icon={faCircle} transform="shrink-9" className="dot dotOne" />
        <FontAwesomeIcon icon={faCircle} transform="shrink-9 right-10" className="dot dotTwo" />
        <FontAwesomeIcon icon={faCircle} transform="shrink-9 right-20" className="dot dotThree" />
      </span>
     
    </div>
  )
}

export function MessageCardLoading(props) {

  const loadingStyle = {
    maxWidth: '68px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f0f0f0',
    color: '#000',
    marginLeft: 'unset',
    borderTopLeftRadius: '0',
  };
  
  return (
    <Card border="light" style={loadingStyle}>
      <div style={{ fontSize: '20px', marginBottom: '0', textAlign: 'left' }}><LoadingEllipsis /></div>
    </Card>
  );
}

export default MessageCard;
