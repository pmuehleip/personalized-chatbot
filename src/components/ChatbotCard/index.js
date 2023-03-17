import React, { useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ChatbotPreviewModal from '../ChatbotPreviewModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function ChatbotCard({chatbot}) {

    const [showModal, setShowModal] = useState(false);
  
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const url = `/chatbots/${chatbot.id}`;

    return (
        <Card>
            <Card.Body>
                <Card.Title><Link to={url} target="_blank">{chatbot.title}</Link></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{chatbot.description}</Card.Subtitle>
                <Card.Text>
                    <div>
                    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                        <FontAwesomeIcon icon={faGear} onClick={handleShowModal} style={{cursor: "pointer"}} />
                    </div>
                        
       
                
                        <ChatbotPreviewModal chatbot={chatbot} show={showModal} handleClose={handleCloseModal} />
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ChatbotCard;
//show={showModal} handleClose={handleCloseModal}