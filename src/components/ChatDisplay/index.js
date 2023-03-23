import React, { useEffect, useRef, useMemo } from 'react';
import { Container, Row, Col, Form, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import MessageCard, { MessageCardLoading } from '../MessageCard';
import Error from '../Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import './style.css';



function ChatDisplay({ messages, title, description, message, isLoading, errorMessage, handleSendMessage = (message) => { }, setMessage = (message) => { } }) {

    const messagesEndRef = useRef(null);
    const isMounted = useRef(false);
    const numMessages = useMemo(() => messages.length, [messages])

    const scrollToBottom = () => {
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // TODO: we should avoid scrolling into view when opening the chatbot editor. This is still occuring.
    useEffect(() => {
        if (isMounted.current) {
            scrollToBottom();
          } else {
            isMounted.current = true;
          }
    }, [numMessages]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div class="parent">
            <div class="chat-header">
                <Navbar bg="primary" variant="dark"  >
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <FontAwesomeIcon icon={faMessage} style={{ cursor: "pointer" }} />{' '}<strong>{title}</strong>
                        </Navbar.Brand>
                        <Navbar.Text>
                            {description}
                        </Navbar.Text>
                    </Container>
                </Navbar>
                {errorMessage && <Error message={errorMessage} />}
            </div>
            <div class="chat-scrollable">
                <Container fluid>
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
            </div>
            <div class="chat-footer">
                <Form className=" p-3" onSubmit={handleSendMessage}>
                    <Row>
                        <Col xs={true} md={true} lg={true} >
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

export default React.memo(ChatDisplay);
