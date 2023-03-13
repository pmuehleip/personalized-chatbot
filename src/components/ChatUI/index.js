import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import MessageCard from '../MessageCard';

function AIChatUI() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{"isAI": true, "text": "hello from AI", "time": new Date()}, {"isAI": false, "text": "hello from user", "time": new Date()}]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      const newMessage = {
        text: message,
        time: new Date(),
        isAI: false,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      // TODO: Send message to AI assistant and handle response
    }
  };

  return (
    <div style={{ height: '100vh', fontFamily: 'monospace', fontWeight: '500', backgroundColor: '##fff' }}>
      <header style={{ height: '60px', backgroundColor: '#303030', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 20px', position: 'fixed', top: '0', left: '0', right: '0' }}>
        <h3>AI Chat</h3>
      </header>
      <Container fluid style={{ paddingTop: '80px', paddingBottom: '100px', backgroundColor: '#fff' }}>
        <Row >
          <Col xs={12}>
            <div style={{ height: 'calc(100vh - 200px)', overflowY: 'scroll', backgroundColor: '#fff',  padding: '20px' }}>
              {messages.map((message, index) => (
                <MessageCard key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Col>
        </Row>
        <Row style={{ position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#fff', borderTop: '1px solid #ccc', padding: '20px' }}>
          <Col >
            <Form onSubmit={handleSendMessage}>
                <Row>
                    <Col xs={true} md={true}>
                        <Form.Control size="lg" type="text" placeholder="Write message" value={message} onChange={handleMessageChange} />
                    </Col>
                    <Col xs={2} md={1} xsOffset={true} mdOffset={true}>
                        <Button size="lg" type="submit" style={{background: '#303030', color: '#fff', "&:hover": {background: "#efefef"}}}>➤</Button>
                    </Col>
                </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AIChatUI;
