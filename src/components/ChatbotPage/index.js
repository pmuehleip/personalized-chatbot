import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import MessageCard from '../MessageCard';
import { getChat, postChat, createChat, getChatbot } from '../../requests/chatbot-service';
import Loading from '../Loading';
import Error from '../Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import './style.css';



function ChatbotPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');
  const [role, setRole] = useState('');
  const [greeting, setGreeting] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { chatbotId } = useParams();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    handleGetChatbot()
  }, []);

  useEffect(() => {
    const fetchChat = async () => {
      setIsLoading(true);
      try {
        const chat = await getChat(chatId);
        setMessages(chat.messages.filter(message => message.role != "system"));
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (chatId !== '') {
      fetchChat();
    } else {
      handleStartChat();
    }
  }, [chatId]);


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === '') {
      return;
    }

    setIsLoading(true);

    try {
      setMessages((messages) => [
        ...messages,
        {"role": "user", "content": message}
      ]);
      setMessage('');
      const response = await postChat(chatId, message);
      setMessages((messages) => [
        ...messages,
        response
      ]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartChat = async () => {
    setIsLoading(true);

    try {
      const chat = await createChat(chatbotId); 
      setChatId(chat.chat_id);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetChatbot = async () => {
    setIsLoading(true);

    try {
      const chatbot = await getChatbot(chatbotId); 
      setRole(chatbot.role);
      setGreeting(chatbot.greeting);
      setTitle(chatbot.title);
      setDescription(chatbot.description);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#home">
          <FontAwesomeIcon icon={faMessage} style={{cursor: "pointer"}} />
            {' '}
            {title}
          </Navbar.Brand>
        </Container>
      </Navbar>
      {isLoading && <Loading />}
      {errorMessage && <Error message={errorMessage} />}

      <Container fluid style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <Row>
          <Col xs={12} className="p-3">
            <div>
              {messages.map((message, index) => (
                <MessageCard key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Col>
        </Row>
        <Row className="fixed-bottom p-3" style={{  backgroundColor: '#fff', borderTop: '1px solid #ccc' }}>
          <Col>
            <Form onSubmit={handleSendMessage}>
                <Row>
                    <Col xs={true} md={true} lg={true}>
                        <Form.Control size="lg" type="text" placeholder="Type a message" value={message} onChange={handleMessageChange} />

                    </Col>
                    <Col xs={2} md={1} lg={1}>
                        <div variant="link" className="clickable-text" onClick={handleSendMessage}><h3>➤</h3></div>
                    </Col>
                </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChatbotPage;
