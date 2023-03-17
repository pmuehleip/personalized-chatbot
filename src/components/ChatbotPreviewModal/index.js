import React, { useState } from 'react';
import { Row, Col, Container, Button, Modal, Card } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function ChatbotPreviewModal({chatbotId, show, handleClose}) {

  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
  };

  const REACT_APP_URL = process.env.REACT_APP_URL;
  const src = `${REACT_APP_URL}/chatbots/${chatbotId}`;
  const code = `<iframe height="800px" src="${src}" scrolling="no" width="100%"></iframe>`;

  return (
     <Modal show={show} onHide={handleClose} size="xl" >
     <Modal.Header closeButton>
       <Modal.Title>Modal heading</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <Container>
          <Row>
            <Card>
              <iframe height="400px" src={src} scrolling="no" width="100%"></iframe>
            </Card>

          </Row>
          <Row>
          <br/>
            <br/>
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
