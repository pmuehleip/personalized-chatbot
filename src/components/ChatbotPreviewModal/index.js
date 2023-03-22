import React, { useState } from 'react';
import { Row, Col, Container, Button, Modal, Card, Form } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import ChatDisplay from '../ChatDisplay';
import { updateChatbot } from '../../requests/chatbot-service';
import Loading from '../Loading';
import Error from '../Error';
import Toast from '../Toast'

function ChatbotPreviewModal({ chatbot, show, handleClose }) {

  const [isCopied, setIsCopied] = useState(false);
  const [showUpdatedToast, setShowUpdatedToast] = useState(false);


  const [title, setTitle] = useState(chatbot.title);
  const [role, setRole] = useState(chatbot.role);
  const [greeting, setGreeting] = useState(chatbot.greeting);
  const [description, setDescription] = useState(chatbot.description);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

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

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await updateChatbot(chatbot.id, role, greeting, title, description);
      setShowUpdatedToast(true);
      setTimeout(() => setShowUpdatedToast(false), 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  const REACT_APP_URL = process.env.REACT_APP_URL;
  const src = `${REACT_APP_URL}/chatbots/${chatbot.id}`;
  const code = `<iframe height="800px" src="${src}" width="100%"></iframe>`;

  return (
    <Modal show={show} onHide={handleClose} size="xl" >
      <Modal.Header closeButton>
        <Modal.Title>Edit Your Chatbot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {isLoading && <Loading />}
      {errorMessage && <Error message={errorMessage} />}
      <Toast message="Successfully updated!" showToast={showUpdatedToast} setShowToast={setShowUpdatedToast} />
        <Container>
          <Row>
            <Col lg={true} >
              <Card border="light" className="shadow">
                {/* <Card.Text><iframe height="400px" src={src} width="100%"></iframe></Card.Text> */}
                <Card.Text><ChatDisplay messages={[{ "content": greeting }]} title={title} description={description} message={""} isLoading={false} errorMessage={""} /></Card.Text>
              </Card>
              <div className="my-3"><b>Chatbot Id:</b> {chatbot.id}</div>
            </Col>
            <Col lg={true} >
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className="text-muted">Title</Form.Label>
                  <Form.Control type="text" value={title} onChange={handleTitleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label className="text-muted">Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="role">
                  <Form.Label className="text-muted">Role</Form.Label>
                  <Form.Control autoFocus type="text" value={role} onChange={handleRoleChange} />
                  <Form.Text className="text-muted">
                    Think of a role as a way of describing the person this chatbot should behave as (e.g. an expert auto mechanic).
                  </Form.Text>
                </Form.Group>
                <Form.Group md={4} className="mb-3" controlId="greeting">
                  <Form.Label className="text-muted">Greeting</Form.Label>
                  <Form.Control type="text" value={greeting} onChange={handleGreetingChange} />
                  <Form.Text className="text-muted">
                    This helps guide the conversation as the first message the chatbot will send everytime someone creates a new chat.
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col>
              <SyntaxHighlighter language="javascript" style={tomorrow}>{code}</SyntaxHighlighter>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button size={"sm"} onClick={handleCopyClick}><FontAwesomeIcon icon={faCopy} /> {isCopied ? 'Copied!' : 'Copy Code'}</Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdate}>Update Your Chatbot</Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChatbotPreviewModal;
