import React, { useState } from 'react';
import { Container, Button, Row, Col, Badge } from 'react-bootstrap';
import CreateChatbotModal from '../CreateChatbotModal';
import ChatbotCard from '../ChatbotCard';

function DashboardPage() {

  const [chatbots, setChatbots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Container>
      <Row>
        <h1>Chatbot Dashboard</h1>
      </Row>
      <Row md={4} className="mt-3 mb-3 d-flex justify-content-center">
        <Button onClick={handleShowModal}>Create Chatbot</Button>
      </Row>
      <Row className="m-3">
        <Col>
          <Badge bg="warning" text="dark">Note</Badge> This currently does not persist created chatbots
        </Col>
      </Row>
      <Row xs={1} md={2} className="g-4">
      {chatbots.map((chatbot, index) => (
        <Col>
          <ChatbotCard chatbot={chatbot} />
        </Col>
      ))}
      </Row>

      <CreateChatbotModal setChatbots={setChatbots} show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
}

export default DashboardPage;
