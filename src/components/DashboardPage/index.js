import React, { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import CreateChatbotModal from '../CreateChatbotModal';
import ChatbotCard from '../ChatbotCard';

function DashboardPage() {


  const [chatbotIds, setChatbotIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Container>
      <Row>
        <h1>Dashboard</h1>
      </Row>
      <Row xs={1} md={2} className="g-4">
      {chatbotIds.map((chatbotId, index) => (
        <Col>
          <ChatbotCard chatbotId={chatbotId} />
        </Col>
      ))}
      </Row>
      <Row md={4} className="mt-3 mb-3 d-flex justify-content-center">
        <Button onClick={handleShowModal}>Create Chatbot</Button>
      </Row>

      <CreateChatbotModal setChatbotIds={setChatbotIds} show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
}

export default DashboardPage;
