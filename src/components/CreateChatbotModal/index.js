import React from 'react';
import { Row, Col, Container, Modal, Button } from 'react-bootstrap';
import CreateChatbotForm from '../CreateChatbotForm';

function CreateChatbotModal({setChatbotIds, show, handleClose}) {

  return (
    <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h2>Create Your Chatbot</h2>
            <CreateChatbotForm setChatbotIds={setChatbotIds} handleClose={handleClose} />
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
