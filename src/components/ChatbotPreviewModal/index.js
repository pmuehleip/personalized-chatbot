import React, { useState } from 'react';
import { Row, Col, Container, Button, Modal, Card, Form } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function ChatbotPreviewModal({chatbot, show, handleClose}) {

  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
  };

  const REACT_APP_URL = process.env.REACT_APP_URL;
  const src = `${REACT_APP_URL}/chatbots/${chatbot.id}`;
  const code = `<iframe height="800px" src="${src}" scrolling="no" width="100%"></iframe>`;

  return (
     <Modal show={show} onHide={handleClose} size="xl" >
     <Modal.Header closeButton>
       <Modal.Title>Edit Your Chatbot</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <Container>
          <Row>
            <Col lg={true} >
              <Card border="light" className="shadow">
                <Card.Text><iframe height="400px" src={src} scrolling="no" width="100%"></iframe></Card.Text>
              </Card>
              <div className="my-3"><b>Chatbot Id:</b> {chatbot.id}</div>
       
             
              
            </Col>
            <Col lg={true} >
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className="text-muted">Title</Form.Label>
                  <Form.Control type="text" value={chatbot.title}  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label className="text-muted">Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={chatbot.description}  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="role">
                  <Form.Label className="text-muted">Role</Form.Label>
                  <Form.Control autoFocus type="text" value={chatbot.role}  />
                  <Form.Text className="text-muted">
                    Think of a role as a way of describing the person this chatbot should behave as (e.g. an expert auto mechanic).
                  </Form.Text>
                </Form.Group>
                <Form.Group md={4} className="mb-3" controlId="greeting">
                  <Form.Label className="text-muted">Greeting</Form.Label>
                  <Form.Control type="text" value={chatbot.greeting}  />
                  <Form.Text className="text-muted">
                    This helps guide the conversation as the first message the chatbot will send everytime someone creates a new chat.
                </Form.Text>
                </Form.Group>
              </Form>


            </Col>



          </Row>
  
          <Row>
            













          </Row>
         <Row className="d-flex justify-content-center">
           <Col sm={12}>
            <SyntaxHighlighter language="javascript" style={tomorrow}>{code}</SyntaxHighlighter>
           </Col>
         </Row>
       </Container>
     </Modal.Body>
     <Modal.Footer>
        <Button onClick={handleCopyClick}>{isCopied ? 'Copied!' : 'Copy Code'}</Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
     </Modal.Footer>
   </Modal>
  );
}

export default ChatbotPreviewModal;
