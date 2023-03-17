import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import MessageCard from '../MessageCard';
import { getChat, postChat, createChat, getChatbot } from '../../requests/chatbot-service';
import Loading from '../Loading';
import Error from '../Error';

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
    <div style={{ height: '100vh', fontFamily: 'monospace', fontWeight: '500', backgroundColor: '##fff' }}>
      <header style={{ height: '60px', backgroundColor: '#303030', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 20px', position: 'fixed', top: '0', left: '0', right: '0' }}>
        <h3>{title}</h3>
      </header>
      {isLoading && <Loading />}
      {errorMessage && <Error message={errorMessage} />}

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
                    <Col xs={2} md={1}>
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

export default ChatbotPage;
