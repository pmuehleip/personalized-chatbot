import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ChatbotPage from './components/ChatbotPage';
import DashboardPage from './components/DashboardPage';
import CreateChatbotModal from './components/CreateChatbotModal';
import HomePage from './components/HomePage';


function App() {
  return (
    <div className="App" style={{backgroundColor: "#fff", height: "100vh"}}>
      <Router>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/chatbots/:chatbotId" element={<ChatbotPage/>} />
            <Route exact path="/dashboard" element={<DashboardPage/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
