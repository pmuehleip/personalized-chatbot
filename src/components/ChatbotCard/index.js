import React, { useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ChatbotPreviewModal from '../ChatbotPreviewModal';


function ChatbotCard({chatbotId}) {

    const [showModal, setShowModal] = useState(false);
  
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const url = `/chatbots/${chatbotId}`;

    return (
        <Card>
            <Card.Body>
                <Card.Title>title</Card.Title>
                <Card.Text>
                    <div>
                        Chatbot ID:
                        <Link to={url} target="_blank">
                            {chatbotId}
                        </Link>
                    </div>
                    <div>
                        <Button onClick={handleShowModal}>Edit</Button>
                        <ChatbotPreviewModal chatbotId={chatbotId} show={showModal} handleClose={handleCloseModal} />
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ChatbotCard;
//show={showModal} handleClose={handleCloseModal}