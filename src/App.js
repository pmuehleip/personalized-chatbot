import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ChatbotPage from './components/ChatbotPage';
import CreateChatbotPage from './components/CreateChatbotPage';
import HomePage from './components/HomePage';


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/create-chatbot" element={<CreateChatbotPage/>} />
            <Route path="/chatbots/:chatbotId" element={<ChatbotPage/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
