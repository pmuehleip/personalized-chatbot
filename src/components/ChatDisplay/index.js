import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import MessageCard, { MessageCardLoading } from '../MessageCard';
import Error from '../Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import './style.css';



function ChatDisplay({ messages = [], title, description, message, isLoading, errorMessage, handleSendMessage = (message) => { }, setMessage = (message) => {} }) {

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div style={{height: "400px"}}>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <FontAwesomeIcon icon={faMessage} style={{ cursor: "pointer" }} />{' '}{title}
                    </Navbar.Brand>
                    <Navbar.Text>
                        {description}
                    </Navbar.Text>
                </Container>
            </Navbar>
            {errorMessage && <Error message={errorMessage} />}

            <Container fluid style={{ backgroundColor: "#fff", paddingBottom: '4rem', paddingTop: '2rem' }}>
                <Row>
                    <Col xs={12} className="p-3">
                        <div>
                            {messages.map((message, index) => (
                                <MessageCard key={index} message={message} />
                            ))}
                            {isLoading && <MessageCardLoading />}
                            <div ref={messagesEndRef} />
                        </div>
                    </Col>
                </Row>

            </Container>
            <div className=" p-3" style={{ backgroundColor: '#fff', borderTop: '1px solid #ccc', position: 'absolute', bottom: '0', width: '100%' }}>
                <Form onSubmit={handleSendMessage}>
                    <Row>
                        <Col xs={true} md={true} lg={true} style={{ flexGrow: 1 }}>
                            <Form.Control size="lg" type="text" placeholder="Type a message" value={message} onChange={handleMessageChange} />

                        </Col>
                        <Col xs="auto" md="auto" lg="auto">
                            <Button size="lg" variant="link" bsPrefix="clickable-text" type="submit" onClick={handleSendMessage}>➤</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default ChatDisplay;
