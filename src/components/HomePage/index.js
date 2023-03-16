import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome 👋</h1>
      <h3>Get started by creating a custom chatbot</h3>
      <Button as={Link} to="/create-chatbot">
        Create Chatbot
      </Button>
    </div>
  );
}

export default HomePage;