import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { createChatbot } from '../../requests/chatbot-service';
import Loading from '../Loading';
import Error from '../Error';

function CreateChatbotForm( {setChatbotIds, handleClose} ) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [greeting, setGreeting] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleGreetingChange = (event) => {
    setGreeting(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await createChatbot(role, greeting, title, description);
      setChatbotIds((chatbotIds) => [
        ...chatbotIds,
        data.chatbot_id
      ]);
      handleClose();
      //navigation(`/chatbots/${data.chatbot_id}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loading />}
      {errorMessage && <Error message={errorMessage} />}
      <Form onSubmit={handleSubmit} id='create-chatbot-form'>
        {/* <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={handleTitleChange} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control autoFocus type="text" value={role} onChange={handleRoleChange} />
          <Form.Text className="text-muted">
            Think of a role as a way of describing the person this chatbot should behave as (e.g. an expert auto mechanic).
          </Form.Text>
        </Form.Group>
        <Form.Group md={4} className="mb-3" controlId="greeting">
          <Form.Label>Greeting</Form.Label>
          <Form.Control type="text" value={greeting} onChange={handleGreetingChange} />
          <Form.Text className="text-muted">
            This helps guide the conversation as the first message the chatbot will send everytime someone creates a new chat.
        </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateChatbotForm;



