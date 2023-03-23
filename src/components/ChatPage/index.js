import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup, Navbar, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import MessageCard, { MessageCardLoading } from '../MessageCard';
import { getChat, postChat, createChat, getChatbot } from '../../requests/chatbot-service';
import Loading from '../Loading';
import Error from '../Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import ChatDisplay from '../ChatDisplay';



function ChatPage() {
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [chatId, setChatId] = useState('');
  const [role, setRole] = useState('');
  const [greeting, setGreeting] = useState('');

  const { chatbotId } = useParams();

  useEffect(() => {
    handleGetChatbot();
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


  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === '') {
      return;
    }

    setIsLoading(true);

    try {
      setMessages((messages) => [
        ...messages,
        { "role": "user", "content": message }
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
    <div style={{height: "100vh"}}>
      <ChatDisplay messages={messages} title={title} description={description} message={message} isLoading={isLoading} errorMessage={errorMessage} handleSendMessage={handleSendMessage} setMessage={setMessage}/>
    </div>
  );
}

export default ChatPage;
