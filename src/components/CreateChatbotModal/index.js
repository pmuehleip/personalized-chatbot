import React from 'react';
import { Row, Col, Container, Modal, Button } from 'react-bootstrap';
import CreateChatbotForm from '../CreateChatbotForm';

function CreateChatbotModal({setChatbots, show, handleClose}) {

  return (
    <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Chatbot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <CreateChatbotForm setChatbots={setChatbots} handleClose={handleClose} />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form='create-chatbot-form' type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CreateChatbotModal;
